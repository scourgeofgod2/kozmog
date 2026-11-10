// Model çıktısını güvenli HTML'e çevirir (önce tamamen kaçırılır).

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
}

// Model çıktısı önce tamamen kaçırılır, sonra yalnızca bilinen markdown
// kalıpları güvenli etiketlere çevrilir (XSS koruması).
export function markdownToHtml(raw: string): string {
  const lines = escapeHtml(raw).replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let list = false;
  const closeList = () => {
    if (list) {
      out.push("</ul>");
      list = false;
    }
  };

  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!line) {
      closeList();
      continue;
    }
    let m: RegExpMatchArray | null;
    if ((m = line.match(/^#{1,2}\s+(.+)/))) {
      closeList();
      out.push(`<h3>${inline(m[1])}</h3>`);
    } else if ((m = line.match(/^#{3,}\s+(.+)/))) {
      closeList();
      out.push(`<h4>${inline(m[1])}</h4>`);
    } else if ((m = line.match(/^[-*•]\s+(.+)/))) {
      if (!list) {
        out.push("<ul>");
        list = true;
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if (line.length < 90 && /^(\d+\.\s|🌌|⚖️|✨|🔮)/u.test(line)) {
      // Prompt formatındaki bölüm başlıkları: "1. Yaşam Yolu Sayın: 7 - Mistik"
      closeList();
      out.push(`<h3>${inline(line.replace(/\*\*/g, ""))}</h3>`);
    } else if ((m = line.match(/^(Hesaplama|Yorum):\s*(.*)/))) {
      closeList();
      out.push(`<p><strong>${m[1]}:</strong> ${inline(m[2])}</p>`);
    } else {
      closeList();
      out.push(`<p>${inline(line)}</p>`);
    }
  }
  closeList();
  return out.join("");
}

