/* eslint-disable jsx-a11y/alt-text -- react-pdf <Image> HTML img değildir, alt özelliği yoktur */
// Ücretli rapor PDF'i (sunucuda @react-pdf/renderer ile üretilir).

import path from "node:path";
import fs from "node:fs";
import { Circle, Document, Ellipse, Font, G, Image, Page, Path, StyleSheet, Svg, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { K_PATH, ORBIT } from "@/lib/brand.generated";

const FONT_DIR = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Cormorant",
  fonts: [
    { src: path.join(FONT_DIR, "CormorantGaramond-500.ttf"), fontWeight: 500 },
    { src: path.join(FONT_DIR, "CormorantGaramond-600.ttf"), fontWeight: 600 },
    { src: path.join(FONT_DIR, "CormorantGaramond-500-italic.ttf"), fontWeight: 500, fontStyle: "italic" },
  ],
});
Font.register({
  family: "Inter",
  fonts: [
    { src: path.join(FONT_DIR, "Inter-400.ttf"), fontWeight: 400 },
    { src: path.join(FONT_DIR, "Inter-600.ttf"), fontWeight: 600 },
  ],
});
// Türkçe metinde kelimeleri hecelere bölme
Font.registerHyphenationCallback((word) => [word]);

// ─── Görseller (public/gorseller/pdf/*.jpg; react-pdf WebP desteklemez) ──
const IMG_DIR = path.join(process.cwd(), "public", "gorseller", "pdf");
const imgCache = new Map<string, Buffer | null>();
function img(name: string): { data: Buffer; format: "jpg" } | null {
  if (!imgCache.has(name)) {
    try {
      imgCache.set(name, fs.readFileSync(path.join(IMG_DIR, `${name}.jpg`)));
    } catch {
      imgCache.set(name, null);
    }
  }
  const data = imgCache.get(name);
  return data ? { data, format: "jpg" } : null;
}
const VALID_NUMS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]);
const sigil = (n: number) => (VALID_NUMS.has(n) ? img(`sayi-${n}`) : null);

/** Başlıktaki sayıyı bulur: "Yaşam Yolun: 6 · Bakıcı", "Ocak · Kişisel ay 4" */
function headingNumber(text: string): number | null {
  const m = text.match(/:\s*(\d{1,2})\s*·/) ?? text.match(/[Kk]işisel (?:ay|yıl)\s*(\d{1,2})/);
  const n = m ? Number(m[1]) : NaN;
  return VALID_NUMS.has(n) ? n : null;
}

const C = { ink: "#07070d", surface: "#0e0d18", line: "#2a2840", text: "#ece8f5", muted: "#b9b5cc", faint: "#8a86a3", gold: "#e9c46a", violet: "#a594ff" };

const s = StyleSheet.create({
  page: { backgroundColor: C.ink, color: C.text, fontFamily: "Inter", fontSize: 10.5, lineHeight: 1.6, paddingTop: 48, paddingBottom: 56, paddingHorizontal: 52 },
  brand: { fontFamily: "Inter", fontWeight: 600, fontSize: 9, letterSpacing: 2.4, color: C.gold },
  coverTitle: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 40, lineHeight: 1.1, marginTop: 14 },
  coverMeta: { color: C.muted, fontSize: 11, marginTop: 8 },
  coverCode: { color: C.faint, fontSize: 9, marginTop: 4 },
  rule: { borderBottomWidth: 1, borderBottomColor: C.line, marginVertical: 20 },
  sectionLabel: { fontFamily: "Inter", fontWeight: 600, fontSize: 9, letterSpacing: 2.2, color: C.gold, marginBottom: 6 },
  h2: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 21, lineHeight: 1.2, color: C.text, marginTop: 18, marginBottom: 6 },
  h3: { fontFamily: "Inter", fontWeight: 600, fontSize: 11.5, color: C.gold, marginTop: 12, marginBottom: 3 },
  p: { color: C.muted, marginBottom: 7 },
  li: { flexDirection: "row", marginBottom: 4, paddingLeft: 2 },
  bullet: { width: 14, paddingTop: 4.5 },
  liText: { color: C.muted, flex: 1 },
  bold: { fontWeight: 600, color: C.text },
  hero: { width: "100%", borderRadius: 12, marginBottom: 16 },
  cards: { flexDirection: "row", gap: 8, marginBottom: 18 },
  card: { flex: 1, backgroundColor: C.surface, borderRadius: 10, padding: 8, alignItems: "center", borderWidth: 1, borderColor: C.line },
  cardImg: { width: 64, height: 64, borderRadius: 8 },
  cardLabel: { fontSize: 8, color: C.faint, marginTop: 6, textAlign: "center" },
  cardSub: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 12, color: C.text, textAlign: "center", lineHeight: 1.1 },
  headRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  footer: { position: "absolute", bottom: 24, left: 52, right: 52, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: C.faint },
});

// "✦" Inter'de yok; vektör yıldız çiz
const STAR = "M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z";
function Star({ size, color = C.gold }: { size: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={STAR} fill={color} />
    </Svg>
  );
}

function LogoMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path d={K_PATH} fill={C.gold} />
      <G transform={`rotate(${ORBIT.rotate} 50 50)`}>
        <Ellipse cx={50} cy={50} rx={ORBIT.rx} ry={ORBIT.ry} fill="none" stroke={C.gold} strokeWidth={ORBIT.stroke} />
        <Circle cx={50 + ORBIT.rx} cy={50} r={ORBIT.dot} fill={C.gold} />
      </G>
    </Svg>
  );
}

type Block = { t: "h2" | "h3" | "p" | "li"; text: string };

function parse(md: string): Block[] {
  const out: Block[] = [];
  for (const raw of md.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    let m: RegExpMatchArray | null;
    if ((m = line.match(/^#{1,2}\s+(.+)/))) out.push({ t: "h2", text: m[1] });
    else if ((m = line.match(/^#{3,}\s+(.+)/))) out.push({ t: "h3", text: m[1] });
    else if ((m = line.match(/^[-*•]\s+(.+)/)) || (m = line.match(/^\d+[.)]\s+(.+)/))) out.push({ t: "li", text: m[1] });
    else out.push({ t: "p", text: line });
  }
  return out;
}

/** **kalın** parçalarını korur, tek yıldızları temizler */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <Text key={i} style={s.bold}>
            {p.slice(2, -2)}
          </Text>
        ) : (
          <Text key={i}>{p.replace(/\*/g, "")}</Text>
        )
      )}
    </>
  );
}

export interface ReportPdfInput {
  title: string;
  subtitle: string;
  code: string;
  /** Paketler sayfasındaki örnek raporlar için etiket */
  sample?: boolean;
  sections: {
    label?: string;
    markdown: string;
    /** Bölüm başı görseli (public/gorseller/pdf/<ad>.jpg) */
    hero?: string;
    /** Bölüm başında sembollü sayı kartları */
    cards?: { n: number; label: string; sub?: string }[];
  }[];
}

function ReportDoc({ title, subtitle, code, sections, sample }: ReportPdfInput) {
  return (
    <Document title={`${title} — Kozmograf`} author="Kozmograf" creator="kozmograf.com" language="tr">
      {sections.map((sec, si) => (
        <Page key={si} size="A4" style={s.page}>
          {si === 0 && (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <LogoMark size={26} />
                <Text style={s.brand}>KOZMOGRAF</Text>
              </View>
              <Text style={s.coverTitle}>{title}</Text>
              <Text style={s.coverMeta}>{subtitle}</Text>
              {sample ? (
                <View style={{ marginTop: 10, alignSelf: "flex-start", backgroundColor: C.gold, borderRadius: 999, paddingVertical: 3, paddingHorizontal: 10 }}>
                  <Text style={{ fontWeight: 600, fontSize: 8.5, letterSpacing: 1.6, color: C.ink }}>ÖRNEK RAPOR · HAYALİ KİŞİ</Text>
                </View>
              ) : (
                <Text style={s.coverCode}>Sipariş {code}</Text>
              )}
              <View style={s.rule} />
            </View>
          )}
          {sec.label && <Text style={s.sectionLabel}>{sec.label.toLocaleUpperCase("tr-TR")}</Text>}
          {sec.hero && img(sec.hero) && <Image style={s.hero} src={img(sec.hero)!} />}
          {!!sec.cards?.length && (
            <View style={s.cards} wrap={false}>
              {sec.cards.map((c, ci) => (
                <View key={ci} style={s.card}>
                  {sigil(c.n) && <Image style={s.cardImg} src={sigil(c.n)!} />}
                  <Text style={s.cardLabel}>{c.label.toLocaleUpperCase("tr-TR")}</Text>
                  {c.sub && <Text style={s.cardSub}>{c.sub}</Text>}
                </View>
              ))}
            </View>
          )}
          {parse(sec.markdown).map((b, i) =>
            b.t === "h2" ? (
              headingNumber(b.text) ? (
                <View key={i} style={[s.headRow, { marginTop: 14 }]} minPresenceAhead={110} wrap={false}>
                  <Image style={{ width: 40, height: 40, borderRadius: 8 }} src={sigil(headingNumber(b.text)!)!} />
                  <Text style={[s.h2, { marginTop: 0, marginBottom: 0, flex: 1 }]}>{b.text.replace(/\*/g, "")}</Text>
                </View>
              ) : (
                <Text key={i} style={s.h2} minPresenceAhead={110}>
                  {b.text.replace(/\*/g, "")}
                </Text>
              )
            ) : b.t === "h3" ? (
              headingNumber(b.text) ? (
                <View key={i} style={[s.headRow, { marginTop: 10, marginBottom: 2 }]} minPresenceAhead={80} wrap={false}>
                  <Image style={{ width: 22, height: 22, borderRadius: 5 }} src={sigil(headingNumber(b.text)!)!} />
                  <Text style={[s.h3, { marginTop: 0, marginBottom: 0 }]}>{b.text.replace(/\*/g, "")}</Text>
                </View>
              ) : (
                <Text key={i} style={s.h3} minPresenceAhead={80}>
                  {b.text.replace(/\*/g, "")}
                </Text>
              )
            ) : b.t === "li" ? (
              <View key={i} style={s.li} wrap={false}>
                <View style={s.bullet}>
                  <Star size={7} />
                </View>
                <Text style={s.liText}>
                  <Rich text={b.text} />
                </Text>
              </View>
            ) : (
              <Text key={i} style={s.p}>
                <Rich text={b.text} />
              </Text>
            )
          )}
          <View style={s.footer} fixed>
            <Text>
              {sample ? "Örnek rapordur · kozmograf.com/paketler" : "kozmograf.com · Kişisel keşif amaçlıdır; tıbbi, hukuki veya finansal tavsiye değildir."}
            </Text>
            <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
          </View>
        </Page>
      ))}
    </Document>
  );
}

export async function renderReportPdf(input: ReportPdfInput): Promise<Buffer> {
  return renderToBuffer(<ReportDoc {...input} />);
}
