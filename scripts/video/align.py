#!/usr/bin/env python3
"""Kelime zamanlarını gerçek sesten çıkarır ve spec.json'a yazar.

  python3 scripts/video/align.py scripts/video/specs/1111.json ses.mp3 --model /yol/sherpa-onnx-whisper-small

Yöntem:
  1. ffmpeg silencedetect ile sesteki gerçek duraklar (>= PAUSE sn) bulunur; her cümle
     (SpeechGenAI cümle sınırları) duraklarla konuşma bloklarına bölünür.
  2. Her blok sherpa-onnx Whisper'a dinletilir (Türkçe). Tanınan metin, beklenen
     kelimelerle eşleştirilerek "hangi blokta hangi kelimeler" kararı verilir (DP).
  3. Kelimeler, kendi bloklarının süresi içinde hece ağırlığına göre yerleştirilir.
  4. segments[i].map ekrandaki kelimeleri okunan kelimelere bağlar; anchorRules
     animasyon anlarını kelime zamanlarından türetir.

--model verilmezse (yalnızca sezgisel): kelimeler duraklar hariç konuşulan süreye
eşit hızla dağıtılır; bu yöntem hız değişimlerinde YANILIR, ASR varken kullanma.

Model: https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models
       (sherpa-onnx-whisper-small.tar.bz2), pip install sherpa-onnx numpy

Spec alanları:
  segments[i].text   okunan metin      segments[i].show  ekrandaki altyazı
  segments[i].map    (ops.) ekran kelimesi -> [okunan_başı, okunan_sonu); yoksa 1:1
  anchorRules[ad]    [segment, okunan_kelime, "s"|"e", ofset_sn]  (liste ise liste döner)
"""
import difflib
import json
import re
import subprocess
import sys

import numpy as np

args = [a for a in sys.argv[1:] if not a.startswith("--")]
spec_path, audio = args[0], args[1]
model_dir = sys.argv[sys.argv.index("--model") + 1] if "--model" in sys.argv else None
PAUSE = 0.28  # bundan uzun duraklar blok sınırıdır

spec = json.load(open(spec_path, encoding="utf-8"))
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio],
                           capture_output=True, text=True).stdout)
log = subprocess.run(["ffmpeg", "-v", "info", "-i", audio, "-af", "silencedetect=noise=-36dB:d=0.10", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
if len(starts) > len(ends):
    ends.append(dur)
SR = 16000
pcm = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", audio, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                                   capture_output=True).stdout, dtype=np.float32)

VOW = set("aeıioöuüâîû")
FOLD = str.maketrans("çğıöşüÇĞİÖŞÜâîû", "cgiosuCGIOSUaiu")


def weight(tok):
    t = re.sub(r"[^\wçğıöşüÇĞİÖŞÜ]", "", tok.lower())
    v = sum(1 for c in t if c in VOW)
    return max(v, 1) + 0.25 * (len(t) - v)


# ── Türkçe sayı → yazı (tanıma çıktısındaki rakamlar için) ────────────────
ONES = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"]
TENS = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"]


def num_tr(n):
    if n == 0:
        return "sıfır"
    out = []
    if n >= 1000:
        k = n // 1000
        out.append(("" if k == 1 else ONES[k] + " ") + "bin")
        n %= 1000
    if n >= 100:
        k = n // 100
        out.append(("" if k == 1 else ONES[k] + " ") + "yüz")
        n %= 100
    if n >= 10:
        out.append(TENS[n // 10])
        n %= 10
    if n:
        out.append(ONES[n])
    return " ".join(x for x in out if x)


def norm(s):
    s = s.replace("İ", "i").replace("I", "ı").lower()
    s = re.sub(r"\d+", lambda m: " " + num_tr(int(m.group())) + " ", s)
    s = re.sub(r"[^\wçğıöşü\s]", " ", s)
    return re.sub(r"\s+", " ", s).strip().translate(FOLD)


def speech_intervals(s, e, thr=0.10):
    iv = [(s, e)]
    for a, b in zip(starts, ends):
        if b <= s or a >= e or b - a < thr:
            continue
        a, b = max(a, s), min(b, e)
        nxt = []
        for x, y in iv:
            if b <= x or a >= y:
                nxt.append((x, y))
                continue
            if a > x:
                nxt.append((x, a))
            if b < y:
                nxt.append((b, y))
        iv = nxt
    return [(x, y) for x, y in iv if y - x > 0.02] or [(s, e)]


def speech_blocks(min_len=0.15):
    """Tüm dosyada PAUSE'tan uzun duraklarla ayrılan konuşma blokları: [(t0, t1)]."""
    pts = [(a, b) for a, b in zip(starts, ends) if b - a >= PAUSE]
    edges, t = [], 0.0
    for a, b in pts:
        if a - t >= min_len:
            edges.append((t, a))
        t = b
    if dur - t >= min_len:
        edges.append((t, dur))
    return edges


# ── Tanıma ────────────────────────────────────────────────────────────────
rec = None
if model_dir:
    import glob
    import sherpa_onnx
    enc = glob.glob(f"{model_dir}/*encoder*.int8.onnx")[0]
    dec = glob.glob(f"{model_dir}/*decoder*.int8.onnx")[0]
    tok = glob.glob(f"{model_dir}/*tokens.txt")[0]
    rec = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=enc, decoder=dec, tokens=tok, language="tr",
                                                    task="transcribe", num_threads=4)


def transcribe(t0, t1):
    a, b = int(max(0, t0 - 0.12) * SR), int(min(dur, t1 + 0.12) * SR)
    pad = np.zeros(int(0.4 * SR), dtype=np.float32)
    s = rec.create_stream()
    s.accept_waveform(SR, np.concatenate([pad, pcm[a:b], pad]))
    rec.decode_stream(s)
    return s.result.text


def partition(exp, texts, maxg=14):
    """Tüm beklenen kelimeleri (norm) bloklara ardışık dağıt (boş blok serbest);
    tanınan metne en çok benzeyen bölümü seç. Döner: [(a, b)] her blok için."""
    n, m = len(exp), len(texts)
    NEG = -1e9
    cache = {}

    def sim(j, a, b):
        if a == b:
            return 0.12 if not texts[j] else -0.15  # boş atama: yalnızca gürültü/boş bloklar için
        k = (j, a, b)
        if k not in cache:
            cache[k] = difflib.SequenceMatcher(None, texts[j], " ".join(exp[a:b])).ratio()
        return cache[k]

    best = [[(NEG, 0)] * (n + 1) for _ in range(m + 1)]
    best[0][0] = (0.0, 0)
    for j in range(1, m + 1):
        for b in range(0, n + 1):
            for a in range(max(0, b - maxg), b + 1):
                if best[j - 1][a][0] <= NEG / 2:
                    continue
                sc = best[j - 1][a][0] + sim(j - 1, a, b)
                if sc > best[j][b][0]:
                    best[j][b] = (sc, a)
    cuts, b = [], n
    for j in range(m, 0, -1):
        a = best[j][b][1]
        cuts.append((a, b))
        b = a
    return cuts[::-1]


# ── Küresel hizalama: bütün kelimeler ↔ bütün konuşma blokları ───────────
flat = []  # (segment, kelime_no)
for si, seg in enumerate(spec["segments"]):
    for wi, _ in enumerate(seg["text"].split()):
        flat.append((si, wi))
all_toks = [t for seg in spec["segments"] for t in seg["text"].split()]
all_ws = [weight(t) for t in all_toks]
all_exp = [norm(t) for t in all_toks]

if rec:
    blocks = speech_blocks()
    heard = [norm(transcribe(a, b)) for a, b in blocks]
    parts = partition(all_exp, heard)
else:  # sezgisel: tek blok (güvenilmez)
    blocks = [(spec["segments"][0]["start"], spec["segments"][-1]["end"])]
    heard = [""]
    parts = [(0, len(all_toks))]

gtimes = [None] * len(all_toks)
for (ta, tb), (p0, p1) in zip(blocks, parts):
    if p1 <= p0:
        continue
    tot = sum(all_ws[p0:p1])
    acc = 0.0
    for k in range(p0, p1):
        gtimes[k] = (ta + acc / tot * (tb - ta), ta + (acc + all_ws[k]) / tot * (tb - ta))
        acc += all_ws[k]

spoken_times, off = [], 0
for si, seg in enumerate(spec["segments"]):
    n = len(seg["text"].split())
    times = gtimes[off: off + n]
    off += n
    spoken_times.append(times)
    seg.setdefault("ttsStart", seg["start"])
    seg.setdefault("ttsEnd", seg["end"])
    seg["start"], seg["end"] = round(times[0][0], 2), round(times[-1][1], 2)
    show = seg["show"].split()
    m = seg.get("map") or [[i, i + 1] for i in range(len(show))]
    assert len(m) == len(show), f"map uzunluğu: {seg['show']}"
    seg["wt"] = [[round(times[a][0], 2), round(times[b - 1][1], 2)] for a, b in m]
    seg.pop("pausesAfter", None)

report = [(si, blocks[k], heard[k], " ".join(all_toks[parts[k][0]:parts[k][1]])) for k, si in enumerate(range(len(blocks)))] if rec else []

rules = spec.get("anchorRules", {})
anchors = spec.setdefault("anchors", {})


def rule(r):
    i, w, which, off = r
    return round(spoken_times[i][w][0 if which == "s" else 1] + off, 2)


for name, r in rules.items():
    anchors[name] = [rule(x) for x in r] if isinstance(r[0], list) else rule(r)

json.dump(spec, open(spec_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("kelime zamanları yazıldı:", sum(len(s["wt"]) for s in spec["segments"]), "kelime", "(ASR)" if rec else "(sezgisel)")
for k, (_, (a, b), h, asg) in enumerate(report):
    print(f"{a:6.2f}-{b:6.2f}  duyulan: «{h}»  →  atanan: «{asg}»")
