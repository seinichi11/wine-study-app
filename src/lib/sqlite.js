// /src/lib/sqlite.js
import initSqlJs from "sql.js";
import { get as idbGet, set as idbSet } from "idb-keyval";

const DB_KEY = "wine-study.db"; // 既存と合わせて変更なし（重要）
let sqlInitPromise = null;
let dbPromise = null;

function getSQL() {
  if (!sqlInitPromise) {
    sqlInitPromise = initSqlJs({
      // public 配下（デプロイ時は BASE_URL に追従）
      locateFile: () => `${import.meta.env.BASE_URL}sql-wasm.wasm`,
    });
  }
  return sqlInitPromise;
}

export async function persistStorage() {
  try {
    if ("storage" in navigator && navigator.storage?.persist) {
      await navigator.storage.persist();
    }
  } catch {}
}

export async function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = (async () => {
    const SQL = await getSQL();
    const saved = await idbGet(DB_KEY);
    const db = saved
      ? new SQL.Database(new Uint8Array(saved))
      : new SQL.Database();

    // 共通スキーマ（必要に応じてここにテーブルを追加）
    db.run(`
      PRAGMA user_version = 1;

      CREATE TABLE IF NOT EXISTS answers(
        id INTEGER PRIMARY KEY,
        question_key TEXT NOT NULL,
        correct INTEGER NOT NULL,
        answered_at INTEGER NOT NULL DEFAULT (strftime('%s','now')*1000)
      );
      CREATE INDEX IF NOT EXISTS idx_answers_qk ON answers(question_key);

      CREATE TABLE IF NOT EXISTS known_cards(
        id TEXT PRIMARY KEY,
        marked_at INTEGER NOT NULL
      );
    `);

    return db;
  })();
  return dbPromise;
}

export async function saveDb(db) {
  await idbSet(DB_KEY, db.export());
}

/** Quiz 用：回答結果を1件追記 */
export async function recordAnswer(questionKey, isCorrect) {
  const db = await openDb();
  const stmt = db.prepare(
    "INSERT INTO answers(question_key, correct) VALUES (?, ?)"
  );
  stmt.run([questionKey, isCorrect ? 1 : 0]);
  stmt.free();
  await saveDb(db);
}

/** Flashcards 用：覚えたIDの集合を取得 */
export async function readKnownIds() {
  const db = await openDb();
  const res = db.exec("SELECT id FROM known_cards");
  const rows = res[0]?.values ?? [];
  return new Set(rows.map((r) => String(r[0])));
}

/** Flashcards 用：覚えたIDを追加（重複無視） */
export async function addKnownId(id) {
  const db = await openDb();
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO known_cards(id, marked_at) VALUES (?, ?)"
  );
  stmt.run([String(id), Date.now()]);
  stmt.free();
  await saveDb(db);
}

/** Flashcards 用：覚えたリセット */
export async function clearKnown() {
  const db = await openDb();
  db.run("DELETE FROM known_cards");
  await saveDb(db);
}
// --- backup / restore ---
export async function exportDbBlob() {
  const db = await openDb();
  return new Blob([db.export()], { type: "application/octet-stream" });
}

export async function importDbBytes(arrayBuffer) {
  const SQL = await (sqlInitPromise ?? getSQL());
  const db = new SQL.Database(new Uint8Array(arrayBuffer));
  await saveDb(db); // IndexedDBへ上書き保存
}

// 指定キー群の wrong数 / 最終回答時刻を返す
export async function getWrongnessMap(keys) {
  if (!keys?.length) return new Map();
  const db = await openDb();
  // IN句を動的に
  const ph = keys.map(() => "?").join(",");
  const stmt = db.prepare(
    `SELECT question_key, SUM(1-correct) AS wrongs, MAX(answered_at) AS last
       FROM answers WHERE question_key IN (${ph}) GROUP BY question_key`
  );
  stmt.bind(keys);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return new Map(
    rows.map((r) => [
      r.question_key,
      { wrongs: +r.wrongs || 0, last: +r.last || 0 },
    ])
  );
}
