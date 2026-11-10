import { renderOg } from "@/lib/og";
import { sanitizeName } from "@/lib/validation";
import { getAngel } from "@/lib/content/angel";

export const runtime = "nodejs";

const VALID = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]);

// Kişiye özel paylaşım görseli: /api/og?lp=7&n=Elif
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Melek sayısı sayfaları: /api/og?m=444
  const angel = getAngel(searchParams.get("m") ?? "");
  if (angel) return renderOg({ eyebrow: "Melek sayısı", title: angel.title, big: angel.slug });

  // Kişisel yıl sayfası: /api/og?yil=1
  if (searchParams.get("yil")) return renderOg({ eyebrow: "2027 numerolojisi", title: "2027 senin için nasıl geçecek?", big: "2027" });

  const lpRaw = Number(searchParams.get("lp"));
  const lp = VALID.has(lpRaw) ? lpRaw : null;
  const name = sanitizeName(searchParams.get("n"))?.split(" ")[0]?.slice(0, 20);
  return renderOg({ lp, name });
}
