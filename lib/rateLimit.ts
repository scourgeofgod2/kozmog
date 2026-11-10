// Basit bellek içi hız sınırlayıcı.
// Coolify'da tek konteyner çalıştığı için yeterli; birden fazla replika
// olursa Redis gibi paylaşımlı bir depoya taşınmalı.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();

function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

/** true dönerse istek kabul edilir. */
export function hit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count++;
  return true;
}

export function clientIp(headers: Headers): string {
  // Coolify (Traefik) gerçek istemci IP'sini X-Forwarded-For'un başına yazar.
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

/** Sayacı artırmadan sınırın aşılıp aşılmadığına bakar. */
export function isLimited(key: string, limit: number): boolean {
  const b = buckets.get(key);
  return !!b && b.resetAt > Date.now() && b.count >= limit;
}
