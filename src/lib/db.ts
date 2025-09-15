import initSqlJs from "sql.js";
import { get, set } from "idb-keyval";

const DB_KEY = "wine-study.db";

let sqlPromise: Promise<any> | null = null;
function getSQL() {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: f => `/node_modules/sql.js/dist/${f}`, // Viteならこの指定でOK
    });
  }
  return sqlPromise;
}

export async function openDb() {
  const SQL = await getSQL();
  const saved = await get(DB_KEY); // IndexedDB からバイト列を取得
  const db = saved ? new SQL.Database(new Uint8Array(saved)) : new SQL.Database();

  // 初期スキーマ（必要に応じて拡張）
  db.run(`
    CREATE TABLE IF NOT EXISTS answers(
      id INTEGER PRIMARY KEY,
      question_id TEXT NOT NULL,
      correct INTEGER NOT NULL,
      answered_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_answers_q ON answers(question_id);
  `);
  return db;
}

export async function saveDb(db: any) {
  const data = db.export(); // Uint8Array
  await set(DB_KEY, data);
}

export function recordAnswer(db: any, questionId: string, correct: boolean) {
  const stmt = db.prepare("INSERT INTO answers (question_id, correct) VALUES (?, ?)");
  stmt.run([questionId, correct ? 1 : 0]);
  stmt.free();
}

export function stats(db: any) {
  const res = db.exec(`
    SELECT 
      COUNT(*) AS total,
      SUM(correct) AS correct,
      ROUND(100.0 * SUM(correct) / NULLIF(COUNT(*),0), 1) AS accuracy
    FROM answers
  `);
  const row = res[0]?.values?.[0] ?? [0,0,0];
  return { total: row[0], correct: row[1], accuracy: row[2] };
}

export function exportBlob(db: any) {
  return new Blob([db.export()], { type: "application/octet-stream" });
}
