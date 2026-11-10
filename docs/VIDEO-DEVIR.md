# Kozmograf – Video üretimi devir notu

Dal: `claude/kozmograf-site-review-ucnhwi` (video araçları henüz `master`'da DEĞİL; ihtiyaç olursa master'a alınır).

## Hedef
Instagram/TikTok/YouTube Shorts videolarıyla kozmograf.com'a trafik/satış. Hesap: @kozmografcom.
Marka: koyu zemin, altın (#e9c46a), Cormorant + Inter, logo "Yörüngedeki K". Site: Next.js 16, Coolify/Docker.

## İlk video: 11.11.2026 (Reel, 49,1 sn, 1080x1920)
- Seslendirme: SpeechGenAI, Aslı (`sg-tr-asli`), Quality model (3 kredi/karakter; 580 karakter ≈ 1.740 kredi). 10 Kasım'da yayınlanacağı için metin "Yarın" diyor.
- Anlatım: 2026→1; 11+11+1=23→5; 5 = değişim/özgürlük; 11.11.2026 Çarşamba. CTA: "Bu videoyu bir arkadaşına gönder" + kozmograf.com.
- Çıktı: `kozmograf-11-11.mp4` (H.264+AAC, -14 LUFS) + `-kapak.png`.

## Boru hattı (`scripts/video/`)
1. `specs/1111.json`: cümleler (`text` okunan, `show` ekranda), süreler, `map`, `anchorRules`.
2. `templates/1111.html`: sahneler; `window.RENDER(t)` deterministik. Altyazı kelime zamanı `segments[i].wt`, animasyon anları `anchors`.
3. `align.py`: gerçek sesten kelime zamanı çıkarır (ffmpeg silencedetect ile konuşma blokları + sherpa-onnx Whisper-small Türkçe ASR + DP eşleştirme, blok içinde hece ağırlığı). Sonucu spec'e yazar.
   `python3 scripts/video/align.py specs/1111.json ses.mp3 --model <sherpa-onnx-whisper-small dizini>`
   Model: github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models (`pip install sherpa-onnx numpy soundfile`).
4. `render.mjs`: Playwright Chromium kare kare → ffmpeg.
   `node scripts/video/render.mjs specs/1111.json out.mp4 --audio ses.mp3 --workers 4 --cover 1.7`
   Hızlı tasarım kontrolü: `--test 1.0,9.6,...` (PNG).

## Dersler (aynı hataları tekrarlama)
- Altyazı senkronu: SpeechGenAI yalnızca cümle zamanı verir (doğru). Kelime vurgusunu tahminle (karakter/hece oranı) yapmak KAYAR; TTS hızı cümle içinde değişir. Mutlaka gerçek sesten hizala (align.py).
- Sandbox'ta SpeechGenAI ses linkleri (speechgenai.com, media.speechgenai.com) ve HuggingFace engelli; ses MP3'ü elle yüklendi. Co-work'te ağ serbestse doğrudan indirilebilir.
- Instagram güvenli alan: içerik y 270–1250; altyazı alt kenarı y≈1230.
- Ardışık rakamlar bitişik görünmesin (ör. "11 11 2026" aralığı animasyonla açıldı).
- Ses: stereo, 48 kHz, loudnorm I=-14.
- Süre mümkünse 30 sn altı; 49 sn bu video için uzun kaldı.

## Sıradaki fikirler
"7 çıkıyorsa" (Bilge) ve 444 melek sayısı videoları (<30 sn). Yeni video = yeni `specs/X.json` + `templates/X.html`; render/align aynı kalır.

## Gerekenler
node (global playwright + Chromium), ffmpeg, python3 + numpy/soundfile/sherpa-onnx, `public/fonts` (repo içinde).
