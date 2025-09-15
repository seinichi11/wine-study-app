import { useMemo, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import rawQuestions from "../data/quiz.json";
import {
  openDb,
  recordAnswer,
  persistStorage,
  getWrongnessMap,
} from "../lib/sqlite";

function shuffle(a) {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeItem(item) {
  if (item.q && Array.isArray(item.choices)) {
    return {
      q: item.q,
      choices: item.choices,
      answerIndex:
        typeof item.answer === "number"
          ? item.answer
          : Math.max(0, item.choices.indexOf(item.answer)),
    };
  }
  if (item.question && Array.isArray(item.options)) {
    const idx = item.options.indexOf(item.answer);
    return {
      q: item.question,
      choices: item.options,
      answerIndex: idx >= 0 ? idx : 0,
    };
  }
  return { q: "（不明な問題形式）", choices: [], answerIndex: 0 };
}

export default function Quiz() {
  // /quiz/:topic or /quiz?topic=xxx
  const { topic: topicFromPath } = useParams();
  const { search } = useLocation();
  const qs = new URLSearchParams(search);
  const topicFromQuery = qs.get("topic");
  const topic = topicFromPath || topicFromQuery || "";
  const limit = Number(qs.get("limit") || 0);
  const useRandom = qs.get("random") === "1";

  const list = useMemo(() => {
    let base = Array.isArray(rawQuestions) ? rawQuestions : [];
    if (topic) base = base.filter((q) => q.topic === topic);
    if (useRandom) base = shuffle(base);
    if (limit > 0) base = base.slice(0, limit);
    return base.map(normalizeItem);
  }, [topic, limit, useRandom]);

  const [ordered, setOrdered] = useState(list);

  const [i, setI] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  // DB準備フラグ（効果の競合を避ける）
  const [dbReady, setDbReady] = useState(false);

  // 1) 初回：永続化許可＆DBオープン
  useEffect(() => {
    (async () => {
      await persistStorage();
      await openDb();
      setDbReady(true);
    })();
  }, []);

  // 2) listが変わったら：UIリセット → 履歴で並べ替え
  useEffect(() => {
    let cancelled = false;

    // まずUIリセット＆暫定表示
    setI(0);
    setSelected(null);
    setChecked(false);
    setOrdered(list);

    (async () => {
      if (!dbReady || !list.length) return;
      try {
        const keys = list.map((qItem) => {
          const choices = (qItem?.choices ?? []).join("|");
          return `${topic || "all"}::${qItem?.q || ""}::${choices}`;
        });

        const stat = await getWrongnessMap(keys);
        if (cancelled) return;

        const sorted = [...list].sort((a, b) => {
          const keyA = `${topic || "all"}::${a.q}::${(a.choices ?? []).join("|")}`;
          const keyB = `${topic || "all"}::${b.q}::${(b.choices ?? []).join("|")}`;
          const sa = stat.get(keyA) ?? { wrongs: 0, last: 0 };
          const sb = stat.get(keyB) ?? { wrongs: 0, last: 0 };
          if (sb.wrongs !== sa.wrongs) return sb.wrongs - sa.wrongs;
          return sa.last - sb.last;
        });

        setOrdered(sorted);
      } catch {
        setOrdered(list);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [list, dbReady, topic]);

  const safeIndex = ordered.length ? Math.min(i, ordered.length - 1) : 0;
  const q = ordered[safeIndex];

  function questionKeyOf(qItem) {
    const choices = (qItem?.choices ?? []).join("|");
    return `${topic || "all"}::${qItem?.q || ""}::${choices}`;
  }

  if (!ordered.length) {
    return (
      <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h2>クイズデータが見つかりません</h2>
        <p style={{ marginTop: 8 }}>
          対象: <code>{topic || "all"}</code>
        </p>
        <p style={{ marginTop: 8 }}>
          ファイル: <code>src/data/quiz.json</code> を確認してください。
        </p>
        <p style={{ marginTop: 8 }}>
          <a href="/quiz">全体から挑戦する</a>
        </p>
      </div>
    );
  }

  async function submit() {
    if (selected == null) return;
    try {
      await recordAnswer(questionKeyOf(q), Number(selected) === q.answerIndex);
    } catch {
    }
    setChecked(true);
  }

  function next() {
    setSelected(null);
    setChecked(false);
    if (safeIndex + 1 < ordered.length) setI(safeIndex + 1);
    else setI(0);
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <span>
          問題 {safeIndex + 1} / {ordered.length}
          {topic && (
            <span style={{ marginLeft: 8, color: "#888", fontSize: 12 }}>
              topic: {topic}
            </span>
          )}
        </span>
      </div>

      <h2 style={{ lineHeight: 1.5 }}>
        Q{safeIndex + 1}. {q?.q ?? "（質問なし）"}
      </h2>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {(q?.choices ?? []).map((c, idx) => {
          const isAnswer = idx === q.answerIndex;
          const isSelected = idx === selected;
          const showJudge = checked && (isSelected || isAnswer);
          const bg = !checked
            ? "#fff"
            : isAnswer
              ? "#e8ffe8"
              : isSelected
                ? "#ffe8e8"
                : "#fff";

          return (
            <li key={idx} style={{ margin: "8px 0" }}>
              <label
                style={{
                  display: "block",
                  padding: "12px 14px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  background: bg,
                  cursor: checked ? "default" : "pointer",
                }}
              >
                <input
                  type="radio"
                  name="choice"
                  value={idx}
                  disabled={checked}
                  checked={isSelected}
                  onChange={() => setSelected(idx)}
                  style={{ marginRight: 8 }}
                />
                {c}
                {showJudge && isAnswer && (
                  <span style={{ marginLeft: 8 }}>✅</span>
                )}
                {showJudge && isSelected && !isAnswer && (
                  <span style={{ marginLeft: 8 }}>❌</span>
                )}
              </label>
            </li>
          );
        })}
      </ul>

      {!checked ? (
        <button onClick={submit} disabled={selected == null} style={btnPrimary}>
          回答する
        </button>
      ) : (
        <div style={{ marginTop: 12 }}>
          <p
            style={{
              marginBottom: 12,
              color: Number(selected) === q.answerIndex ? "#0a0" : "#a00",
            }}
          >
            {Number(selected) === q.answerIndex
              ? "正解！"
              : `不正解… 正解は「${q.choices?.[q.answerIndex]}」`}
          </p>
          <button onClick={next} style={btnGhost}>
            次へ
          </button>
        </div>
      )}
    </div>
  );
}

const btnPrimary = {
  background: "#8B0000",
  color: "#fff",
  padding: "10px 18px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const btnGhost = {
  background: "#fff",
  color: "#8B0000",
  padding: "10px 18px",
  border: "2px solid #8B0000",
  borderRadius: 8,
  cursor: "pointer",
};
