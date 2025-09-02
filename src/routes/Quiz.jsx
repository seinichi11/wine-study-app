import { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/flashcards.json";
import { loadProgress, saveProgress } from "../lib/storage";

export default function Quiz() {
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const nav = useNavigate();

  const q = questions[i];

  function submit() {
    if (selected == null) return;
    // 正誤を進捗に反映
    const p = loadProgress();
    const isCorrect = Number(selected) === q.answer;
    saveProgress({ correct: p.correct + (isCorrect ? 1 : 0), total: p.total + 1 });
    setChecked(true);
  }

  function next() {
    setSelected(null);
    setChecked(false);
    if (i + 1 < questions.length) {
      setI(i + 1);
    } else {
      nav("/result");
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span>問題 {i + 1} / {questions.length}</span>
      </div>

      <h2 style={{ lineHeight: 1.5 }}>Q{i + 1}. {q.q}</h2>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {q.choices.map((c, idx) => {
          const isAnswer = idx === q.answer;
          const isSelected = idx === selected;
          const showJudge = checked && (isSelected || isAnswer);
          const bg =
            !checked ? "#fff" :
            isAnswer ? "#e8ffe8" :
            isSelected ? "#ffe8e8" : "#fff";

          return (
            <li key={idx} style={{ margin: "8px 0" }}>
              <label
                style={{
                  display: "block",
                  padding: "12px 14px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  background: bg,
                  cursor: checked ? "default" : "pointer"
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
                {showJudge && isAnswer && <span style={{ marginLeft: 8 }}>✅</span>}
                {showJudge && isSelected && !isAnswer && <span style={{ marginLeft: 8 }}>❌</span>}
              </label>
            </li>
          );
        })}
      </ul>

      {!checked ? (
        <button
          onClick={submit}
          disabled={selected == null}
          style={btnPrimary}
        >
          回答する
        </button>
      ) : (
        <div style={{ marginTop: 12 }}>
          <p style={{ marginBottom: 12, color: Number(selected) === q.answer ? "#0a0" : "#a00" }}>
            {Number(selected) === q.answer ? "正解！" : `不正解… 正解は「${q.choices[q.answer]}」`}
          </p>
          {q.ex && <p style={{ color: "#555" }}>補足：{q.ex}</p>}
          <button onClick={next} style={btnGhost}>次へ</button>
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
  cursor: "pointer"
};

const btnGhost = {
  background: "#fff",
  color: "#8B0000",
  padding: "10px 18px",
  border: "2px solid #8B0000",
  borderRadius: 8,
  cursor: "pointer"
};
