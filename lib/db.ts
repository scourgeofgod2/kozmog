// Basit sipariş veritabanı: SQLite (Node 22 yerleşik node:sqlite, ek paket yok).
// Dosya: DATABASE_PATH (Docker'da /app/data/kozmograf.db, Coolify kalıcı birimi).

import fs from "node:fs";
import path from "node:path";
import type { DatabaseSync as DB } from "node:sqlite";
import type { Order } from "@/lib/order";

export type OrderStatus = "bekliyor" | "odendi" | "gonderildi" | "iptal";
export const ORDER_STATUSES: OrderStatus[] = ["bekliyor", "odendi", "gonderildi", "iptal"];

export interface OrderRow {
  code: string;
  pkg: string;
  price: number;
  name: string;
  birth_date: string;
  partner_name: string | null;
  partner_birth_date: string | null;
  email: string;
  status: OrderStatus;
  note: string | null;
  created_at: string;
  paid_at: string | null;
  delivered_at: string | null;
}

let db: DB | null = null;

function open(): DB {
  if (db) return db;
  // Paketleyiciyi (Turbopack) atlayarak yerleşik modülü yükle; ilk istekte açılır
  const { DatabaseSync } = process.getBuiltinModule("node:sqlite") as typeof import("node:sqlite");
  const file = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "kozmograf.db");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 3000;
    CREATE TABLE IF NOT EXISTS orders (
      code TEXT PRIMARY KEY,
      pkg TEXT NOT NULL,
      price INTEGER NOT NULL,
      name TEXT NOT NULL,
      birth_date TEXT NOT NULL,
      partner_name TEXT,
      partner_birth_date TEXT,
      email TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'bekliyor',
      note TEXT,
      created_at TEXT NOT NULL,
      paid_at TEXT,
      delivered_at TEXT
    );
    CREATE INDEX IF NOT EXISTS orders_created ON orders(created_at DESC);
    -- Anonim günlük sayaçlar (kişi bazında kayıt yok)
    CREATE TABLE IF NOT EXISTS stats (
      day TEXT NOT NULL,
      kind TEXT NOT NULL,
      key TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (day, kind, key)
    );
  `);
  return db;
}

export function insertOrder(o: Order, price: number) {
  open()
    .prepare(
      `INSERT INTO orders (code, pkg, price, name, birth_date, partner_name, partner_birth_date, email, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(o.code, o.pkg, price, o.name, o.birthDate, o.partnerName ?? null, o.partnerBirthDate ?? null, o.contact, o.createdAt);
}

export function listOrders(limit = 200): OrderRow[] {
  return open().prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT ?").all(limit) as unknown as OrderRow[];
}

export function setOrderStatus(code: string, status: OrderStatus) {
  const now = new Date().toISOString();
  open()
    .prepare(
      `UPDATE orders SET status = ?,
         paid_at = CASE WHEN ? IN ('odendi','gonderildi') AND paid_at IS NULL THEN ? ELSE paid_at END,
         delivered_at = CASE WHEN ? = 'gonderildi' THEN ? ELSE delivered_at END
       WHERE code = ?`
    )
    .run(status, status, now, status, now, code);
}

export function setOrderNote(code: string, note: string) {
  open().prepare("UPDATE orders SET note = ? WHERE code = ?").run(note.slice(0, 500), code);
}

export function deleteOrder(code: string) {
  open().prepare("DELETE FROM orders WHERE code = ?").run(code);
}

/** Veritabanı hatası siparişi/teslimi asla düşürmesin */
export function safely(fn: () => void, label: string) {
  try {
    fn();
  } catch (err) {
    console.error(`[db] ${label}`, err);
  }
}

// ─── Anonim istatistikler ─────────────────────────────────────────────────

export type StatKind = "uv" | "pv" | "src" | "evt" | "cihaz";

/** Türkiye saatine göre YYYY-MM-DD */
export function todayTR(d = new Date()): string {
  return d.toLocaleDateString("sv-SE", { timeZone: "Europe/Istanbul" });
}

export function bump(kind: StatKind, key: string, n = 1, day = todayTR()) {
  open()
    .prepare(
      `INSERT INTO stats (day, kind, key, count) VALUES (?, ?, ?, ?)
       ON CONFLICT(day, kind, key) DO UPDATE SET count = count + excluded.count`
    )
    .run(day, kind, key, n);
}

export interface StatRow {
  day: string;
  kind: StatKind;
  key: string;
  count: number;
}

export function statsSince(fromDay: string): StatRow[] {
  return open().prepare("SELECT day, kind, key, count FROM stats WHERE day >= ? ORDER BY day").all(fromDay) as unknown as StatRow[];
}

export function ordersSince(fromIso: string): OrderRow[] {
  return open().prepare("SELECT * FROM orders WHERE created_at >= ? ORDER BY created_at").all(fromIso) as unknown as OrderRow[];
}
