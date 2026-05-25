"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Sparkles, ChevronRight } from "lucide-react";

const compatibilityMatrix: Record<number, Record<number, { score: number; summary: string; strengths: string; challenges: string }>> = {
  1: {
    1: { score: 72, summary: "Güçlü ama rekabetçi bir birliktelik", strengths: "Karşılıklı saygı, bağımsızlık, ortak hedefler", challenges: "Ego çatışmaları, liderlik yarışı" },
    2: { score: 88, summary: "Birbirini mükemmel tamamlayan bir çift", strengths: "Lider ve destekçi dengesi, güçlü uyum", challenges: "1'in baskınlığı 2'yi yorabilir" },
    3: { score: 82, summary: "Dinamik, yaratıcı ve eğlenceli bir ilişki", strengths: "Yaratıcılık, enerji, iletişim gücü", challenges: "Sorumluluk paylaşımı zaman zaman sorun çıkarır" },
    4: { score: 65, summary: "Farklı tempolarda ilerleyen bir birliktelik", strengths: "4'ün istikrarı 1'in vizyonunu destekler", challenges: "Esneklik ve hız konusunda anlaşmazlıklar" },
    5: { score: 78, summary: "Özgür ruhların enerjik buluşması", strengths: "Macera, yenilik, özgürlük sevgisi", challenges: "Kararlılık eksikliği, dengesizlik riski" },
    6: { score: 70, summary: "Denge arayan bir ilişki", strengths: "6'nın şefkati 1'i yumuşatır", challenges: "Kontrol çatışmaları, farklı öncelikler" },
    7: { score: 60, summary: "Derin ama zorlu bir bağ", strengths: "Entelektüel uyum, birbirini büyüleme", challenges: "İletişim güçlüğü, duygusal mesafe" },
    8: { score: 85, summary: "Güçlü bir güç ortaklığı", strengths: "Başarı odaklılık, ortak hırslar", challenges: "İkisi de lider olmak ister" },
    9: { score: 75, summary: "İlham verici ve büyütücü bir ilişki", strengths: "9'un vizyonu 1'i dengeler", challenges: "Farklı değer sistemleri" },
  },
  2: {
    2: { score: 80, summary: "Uyumlu, hassas ve dengeli bir birliktelik", strengths: "Derin empati, karşılıklı anlayış", challenges: "Karar almakta güçlük, aşırı uyumluluk" },
    3: { score: 85, summary: "Neşeli ve destekleyici bir çift", strengths: "3'ün neşesi 2'yi açar, güçlü iletişim", challenges: "2'nin duygusal ihtiyaçları bazen karşılanmayabilir" },
    4: { score: 78, summary: "Güvenli ve istikrarlı bir birliktelik", strengths: "Güven, sadakat, uzun vadeli uyum", challenges: "Spontanlık eksikliği" },
    5: { score: 62, summary: "Zıtlıkların çekimi — dikkat gerekli", strengths: "Birbirini tamamlama potansiyeli", challenges: "5'in özgürlük ihtiyacı 2'yi güvensizleştirir" },
    6: { score: 92, summary: "En uyumlu eşleşmelerden biri", strengths: "Şefkat, hizmet, aile değerleri", challenges: "Bazen fazla iç dönük kalabilirler" },
    7: { score: 70, summary: "Sessiz ama derin bir bağ", strengths: "Sezgisel anlayış, ruhsal bağlantı", challenges: "İletişimi söze dökmek zor olabilir" },
    8: { score: 68, summary: "Güç ile şefkatin buluşması", strengths: "8'in başarısı 2'nin desteğiyle pekişir", challenges: "Değer öncelikleri farklılaşabilir" },
    9: { score: 88, summary: "Şefkatli ve idealizmle dolu bir birliktelik", strengths: "Ortak insancıl değerler, derin empati", challenges: "Pratik konularda zorluk" },
  },
  3: {
    3: { score: 76, summary: "Yaratıcı enerjilerin buluşması", strengths: "Yaratıcılık, eğlence, neşe", challenges: "Sorumluluktan kaçınma eğilimi" },
    4: { score: 60, summary: "Yaratıcılık ile pratikliğin çatışması", strengths: "4 dengeyi sağlar, 3 renk katar", challenges: "Yaşam tarzı farklılıkları" },
    5: { score: 87, summary: "Dinamik ve özgür bir ilişki", strengths: "Macera, iletişim, enerji", challenges: "Her ikisi de istikrardan kaçınabilir" },
    6: { score: 80, summary: "Yaratıcılık ve sevginin buluşması", strengths: "6'nın istikrarı 3'ü dengeler", challenges: "3'ün özgürlük ihtiyacı zaman zaman sorun yaratır" },
    7: { score: 65, summary: "Farklı dünyaların karşılaşması", strengths: "3 7'yi dışa açar, 7 3'ü derinleştirir", challenges: "İletişim tarzı farklılıkları" },
    8: { score: 72, summary: "Başarılı bir ekip çalışması", strengths: "8'in hırsı 3'ün yaratıcılığıyla birleşir", challenges: "Öncelik çatışmaları" },
    9: { score: 90, summary: "Harika bir uyum — yaratıcılık ve vizyon", strengths: "Ortak yaratıcı değerler, birbirini ilham", challenges: "Her ikisi de pratik olmayabilir" },
  },
  4: {
    4: { score: 82, summary: "İstikrarlı, güvenilir ve sağlam bir birliktelik", strengths: "Ortak değerler, güven, uzun vadeli planlama", challenges: "Rutinleşme, spontanlık eksikliği" },
    5: { score: 55, summary: "Zıt enerjilerin zorlu dansı", strengths: "Birbirinden öğrenme potansiyeli", challenges: "5'in özgürlüğü 4'ün istikrarıyla çatışır" },
    6: { score: 88, summary: "Mükemmel bir aile temeli", strengths: "Ortak sorumluluk anlayışı, güven", challenges: "Aşırı rutinleşme riski" },
    7: { score: 75, summary: "Sessiz ama sağlam bir bağ", strengths: "Karşılıklı saygı, derin bağlılık", challenges: "Duygusal ifade güçlüğü" },
    8: { score: 80, summary: "Güçlü bir iş ve yaşam ortaklığı", strengths: "Başarı odaklılık, pratik uyum", challenges: "Çalışmak yerine ilişkiyi beslemek unutulabilir" },
    9: { score: 62, summary: "Toprak ve gökyüzünün buluşması", strengths: "9'un vizyonu 4'ü genişletir", challenges: "Hayata bakış açısı farklılıkları" },
  },
  5: {
    5: { score: 70, summary: "Özgür ruhların heyecanlı birlikteliği", strengths: "Macera, özgürlük, yenilik", challenges: "Kararlılık ve istikrar eksikliği" },
    6: { score: 65, summary: "Özgürlük ve sorumluluk arasında denge arayışı", strengths: "6'nın sevgisi 5'i yumuşatır", challenges: "5'in bağlanma korkusu 6'yı üzer" },
    7: { score: 75, summary: "Zihinsel bağlantısı güçlü bir ilişki", strengths: "Merak, keşif, entelektüel uyum", challenges: "Duygusal derinlik kurulması zaman alabilir" },
    8: { score: 68, summary: "Enerji farklılıkları olan bir ilişki", strengths: "8'in istikrarı 5'i dengeler", challenges: "Kontrol ve özgürlük çatışması" },
    9: { score: 80, summary: "Büyük ideallerin paylaşıldığı bir birliktelik", strengths: "Macera, özgürlük, idealizm", challenges: "Pratik konularda zorluk" },
  },
  6: {
    6: { score: 85, summary: "Şefkat dolu bir yuva ortaklığı", strengths: "Ortak değerler, aile sevgisi, hizmet", challenges: "Bağımlılık riski, kişisel sınırları kaybetme" },
    7: { score: 70, summary: "Ruhsal derinliklerin buluşması", strengths: "Ruhsal büyüme, karşılıklı öğrenme", challenges: "7'nin içe dönüklüğü 6'yı yalnız hissettirebilir" },
    8: { score: 78, summary: "Başarı ve huzurun birlikteliği", strengths: "8'in başarısı ile 6'nın huzuru dengeli bir yaşam yaratır", challenges: "Zaman öncelikleri çatışabilir" },
    9: { score: 88, summary: "Hizmet ve şefkatin mükemmel birleşimi", strengths: "Ortak insancıl değerler, derin anlayış", challenges: "İkisi de başkalarına öncelik verip birbirini ihmal edebilir" },
  },
  7: {
    7: { score: 78, summary: "Derin ruhsal bir bağ", strengths: "Entelektüel uyum, maneviyat, derinlik", challenges: "Sosyal izolasyon riski, duygusal mesafe" },
    8: { score: 72, summary: "Zihin ve güç birlikteliği", strengths: "7'nin bilgeliği 8'in başarısını destekler", challenges: "Değer çatışmaları" },
    9: { score: 82, summary: "Ruhsal yolculuğun ortakları", strengths: "Maneviyat, bilgelik, derin anlayış", challenges: "Pratik hayattan kopukluk riski" },
  },
  8: {
    8: { score: 75, summary: "Güçlü bir güç çifti", strengths: "Başarı, güç, maddi hedefler", challenges: "İkisi de lider olmak ister, ego çatışması" },
    9: { score: 70, summary: "Başarı ve değerlerin kesişimi", strengths: "Büyük vizyonlar paylaşımı", challenges: "8 maddi, 9 ruhsal odaklıdır" },
  },
  9: {
    9: { score: 85, summary: "İnsanlığa hizmetin büyük birlikteliği", strengths: "Ortak idealler, şefkat, vizyon", challenges: "Her ikisi de kendi ideallerini önde tutabilir" },
  },
};

function getCompatibility(n1: number, n2: number) {
  const low = Math.min(n1, n2);
  const high = Math.max(n1, n2);
  return compatibilityMatrix[low]?.[high] ?? {
    score: 65,
    summary: "Farklı enerjiler — büyüme fırsatı",
    strengths: "Birbirinden öğrenme, tamamlama",
    challenges: "Anlayış ve sabır gerektirir",
  };
}

function calculateLifePath(dateStr: string): number | null {
  if (!dateStr) return null;
  const digits = dateStr.replace(/\D/g, "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? "#10B981" : score >= 65 ? "#F5C842" : "#EF4444";
  return (
    <div
      className="flex flex-col items-center justify-center w-28 h-28 mx-auto"
      style={{
        border: `3px solid ${color}40`,
        background: color + "0A",
      }}
    >
      <span
        className="font-display"
        style={{ fontSize: "2rem", fontWeight: 700, color, lineHeight: 1 }}
      >
        {score}
      </span>
      <span
        style={{
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--koz-text-faint)",
          marginTop: "4px",
        }}
      >
        Uyum
      </span>
    </div>
  );
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

export default function UyumlulukPage() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [result, setResult] = useState<{ lp1: number; lp2: number; compat: ReturnType<typeof getCompatibility> } | null>(null);

  function handleCalculate() {
    const lp1 = calculateLifePath(date1);
    const lp2 = calculateLifePath(date2);
    if (!lp1 || !lp2) return;
    setResult({ lp1, lp2, compat: getCompatibility(lp1, lp2) });
  }

  return (
    <div>
      <section
        className="relative overflow-hidden pb-16 pt-4"
        style={{
          background: "linear-gradient(180deg, rgba(219,39,119,0.07) 0%, transparent 60%)",
        }}
      >
        <div className="text-center fade-up relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 fade-up-d1">
            <div
              className="px-4 py-1.5 inline-flex items-center gap-2"
              style={{
                border: "1px solid rgba(219,39,119,0.3)",
                background: "rgba(219,39,119,0.06)",
              }}
            >
              <Heart className="w-3 h-3" style={{ color: "#DB2777" }} />
              <span
                style={{
                  color: "#DB2777",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Numeroloji Aracı
              </span>
            </div>
          </div>

          <h1
            className="font-display fade-up-d2"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#EAE6FF",
              marginBottom: "0.5rem",
              textShadow: "0 0 80px rgba(219,39,119,0.2)",
            }}
          >
            Numeroloji Uyumluluğu
          </h1>
          <p
            className="fade-up-d3"
            style={{
              color: "#DB2777",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 400,
              marginBottom: "1.5rem",
              letterSpacing: "0.04em",
            }}
          >
            Sayıların Aşk Dili
          </p>
          <p
            className="fade-up-d4 mx-auto"
            style={{
              color: "var(--koz-text-muted)",
              maxWidth: "520px",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            İki kişinin yaşam yolu sayıları arasındaki numerolojik uyumu keşfedin. Doğum
            tarihlerini girin, sayıların ne söylediğini öğrenin.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--koz-deep)", borderTop: "1px solid var(--koz-border)" }}>
        <div className="container mx-auto px-4 max-w-2xl py-16">
          <div
            style={{
              background: "var(--koz-card)",
              border: "1px solid var(--koz-border)",
              padding: "32px",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
              }}
            >
              ✦ Uyumluluk Hesapla
            </span>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--koz-text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  1. Kişi — Doğum Tarihi
                </label>
                <input
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  style={{
                    width: "100%",
                    background: "var(--koz-surface)",
                    border: "1px solid var(--koz-border-bright)",
                    color: "#EAE6FF",
                    padding: "10px 14px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--koz-text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  2. Kişi — Doğum Tarihi
                </label>
                <input
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  style={{
                    width: "100%",
                    background: "var(--koz-surface)",
                    border: "1px solid var(--koz-border-bright)",
                    color: "#EAE6FF",
                    padding: "10px 14px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!date1 || !date2}
              className="koz-btn-primary w-full mt-6 flex items-center justify-center gap-2"
              style={{ opacity: !date1 || !date2 ? 0.5 : 1 }}
            >
              <Heart className="w-3.5 h-3.5" />
              Uyumluluğu Hesapla
            </button>

            {result && (
              <div className="mt-8">
                <div
                  style={{
                    borderTop: "1px solid var(--koz-border)",
                    paddingTop: "24px",
                  }}
                >
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-center">
                      <div
                        className="w-12 h-12 flex items-center justify-center mx-auto mb-2"
                        style={{
                          background: "rgba(219,39,119,0.1)",
                          border: "1px solid rgba(219,39,119,0.3)",
                        }}
                      >
                        <span
                          className="font-display"
                          style={{ color: "#DB2777", fontSize: "1.4rem", fontWeight: 600 }}
                        >
                          {result.lp1}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "9px",
                          color: "var(--koz-text-faint)",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        1. Kişi
                      </p>
                    </div>

                    <span style={{ color: "#DB2777", fontSize: "1.5rem" }}>♥</span>

                    <div className="text-center">
                      <div
                        className="w-12 h-12 flex items-center justify-center mx-auto mb-2"
                        style={{
                          background: "rgba(219,39,119,0.1)",
                          border: "1px solid rgba(219,39,119,0.3)",
                        }}
                      >
                        <span
                          className="font-display"
                          style={{ color: "#DB2777", fontSize: "1.4rem", fontWeight: 600 }}
                        >
                          {result.lp2}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "9px",
                          color: "var(--koz-text-faint)",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        2. Kişi
                      </p>
                    </div>
                  </div>

                  <ScoreRing score={result.compat.score} />

                  <div className="mt-6 text-center">
                    <h3
                      className="font-display mb-4"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "#EAE6FF",
                      }}
                    >
                      {result.compat.summary}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-4">
                      <div
                        style={{
                          background: "rgba(16,185,129,0.05)",
                          border: "1px solid rgba(16,185,129,0.2)",
                          padding: "14px 16px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "#10B981",
                            marginBottom: "6px",
                          }}
                        >
                          ✦ Güçlü Yanlar
                        </p>
                        <p style={{ fontSize: "12px", color: "var(--koz-text-muted)", lineHeight: 1.7 }}>
                          {result.compat.strengths}
                        </p>
                      </div>
                      <div
                        style={{
                          background: "rgba(245,200,66,0.05)",
                          border: "1px solid rgba(245,200,66,0.2)",
                          padding: "14px 16px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "#F5C842",
                            marginBottom: "6px",
                          }}
                        >
                          ⚡ Dikkat Edilmesi Gerekenler
                        </p>
                        <p style={{ fontSize: "12px", color: "var(--koz-text-muted)", lineHeight: 1.7 }}>
                          {result.compat.challenges}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--koz-void)" }}>
        <div className="container mx-auto px-4 max-w-4xl py-16">
          <div className="mb-10">
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
              }}
            >
              ✦ Rehber
            </span>
            <h2
              className="font-display mt-3 mb-4"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#EAE6FF",
              }}
            >
              Numeroloji Uyumluluğu Nasıl Çalışır?
            </h2>
            <p style={{ color: "var(--koz-text-muted)", lineHeight: 1.8, maxWidth: "680px" }}>
              Numeroloji uyumluluğu, iki kişinin yaşam yolu sayıları arasındaki enerji uyumunu
              inceler. Her sayının kendine özgü titreşim frekansı vardır; bazı frekanslar
              birbirini tamamlarken bazıları çatışır. Bu çatışmalar zorluğu değil, büyüme
              fırsatını temsil eder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                range: "85–100",
                label: "Mükemmel Uyum",
                desc: "Enerjiler birbirini doğal olarak tamamlar. Güçlü bir bağ ve karşılıklı anlayış ön planda.",
                color: "#10B981",
              },
              {
                range: "65–84",
                label: "İyi Uyum",
                desc: "Sağlam bir temel var. Bazı alanlarda çaba gerekebilir ama ilişki büyümeye açık.",
                color: "#F5C842",
              },
              {
                range: "0–64",
                label: "Büyüme Uyumu",
                desc: "Farklı enerjiler. Sabır ve iletişimle bu ilişki karşılıklı dönüşüm sağlayabilir.",
                color: "#DB2777",
              },
            ].map((item) => (
              <div
                key={item.range}
                style={{
                  background: item.color + "08",
                  border: `1px solid ${item.color}25`,
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: item.color,
                    marginBottom: "6px",
                  }}
                >
                  {item.range}
                </p>
                <p
                  className="font-display"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "#EAE6FF",
                    marginBottom: "8px",
                  }}
                >
                  {item.label}
                </p>
                <p style={{ fontSize: "12px", color: "var(--koz-text-muted)", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{ background: "var(--koz-surface)", borderTop: "1px solid var(--koz-border)" }}
      >
        <div className="container mx-auto px-4 max-w-4xl py-16 text-center">
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--koz-gold)",
            }}
          >
            ✦ Daha Fazlası
          </span>
          <h2
            className="font-display mt-4 mb-4"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#EAE6FF",
              lineHeight: 1.2,
            }}
          >
            Kendi Sayılarını Keşfet
          </h2>
          <p
            className="mx-auto mb-8"
            style={{
              color: "var(--koz-text-muted)",
              maxWidth: "400px",
              fontSize: "0.95rem",
              lineHeight: 1.8,
            }}
          >
            Tam numeroloji profilini hesapla — yaşam yolu, kader sayısı, ruh arzusu ve daha
            fazlası.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#numerology-form"
              className="koz-btn-primary inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ücretsiz Hesapla
            </Link>
            <Link
              href="/yasam-yolu"
              className="inline-flex items-center gap-2 px-5 py-2.5"
              style={{
                border: "1px solid var(--koz-border-bright)",
                color: "var(--koz-text-muted)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Yaşam Yolu Rehberi
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}