// Ücretli rapor PDF'i (sunucuda @react-pdf/renderer ile üretilir).

import path from "node:path";
import { Document, Font, Page, Path, StyleSheet, Svg, Text, View, renderToBuffer } from "@react-pdf/renderer";

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
  sections: { label?: string; markdown: string }[];
}

function ReportDoc({ title, subtitle, code, sections }: ReportPdfInput) {
  return (
    <Document title={`${title} — Kozmograf`} author="Kozmograf" creator="kozmograf.com" language="tr">
      {sections.map((sec, si) => (
        <Page key={si} size="A4" style={s.page}>
          {si === 0 && (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Star size={10} />
                <Text style={s.brand}>KOZMOGRAF</Text>
              </View>
              <Text style={s.coverTitle}>{title}</Text>
              <Text style={s.coverMeta}>{subtitle}</Text>
              <Text style={s.coverCode}>Sipariş {code}</Text>
              <View style={s.rule} />
            </View>
          )}
          {sec.label && <Text style={s.sectionLabel}>{sec.label.toLocaleUpperCase("tr-TR")}</Text>}
          {parse(sec.markdown).map((b, i) =>
            b.t === "h2" ? (
              <Text key={i} style={s.h2} minPresenceAhead={60}>
                {b.text.replace(/\*/g, "")}
              </Text>
            ) : b.t === "h3" ? (
              <Text key={i} style={s.h3} minPresenceAhead={40}>
                {b.text.replace(/\*/g, "")}
              </Text>
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
            <Text>kozmograf.com · Kişisel keşif amaçlıdır; tıbbi, hukuki veya finansal tavsiye değildir.</Text>
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
