import { Link } from "react-router-dom";
import { loadProgress, resetProgress } from "../lib/storage";

export default function Result() {
  const p = loadProgress();
  const rate = p.total ? Math.round((p.correct / p.total) * 100) : 0;

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: 24,
        textAlign: "center",
      }}
    >
      <h2>結果</h2>
      <p>
        正解 {p.correct} / {p.total}（正答率 {rate}%）
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        <Link to="/" style={linkBtn}>
          ホームへ
        </Link>
        <button
          onClick={() => {
            resetProgress();
            location.href = "/quiz";
          }}
          style={btnPrimary}
        >
          もう一度クイズ
        </button>
      </div>
    </div>
  );
}

const linkBtn = {
  display: "inline-block",
  padding: "10px 18px",
  borderRadius: 8,
  border: "2px solid #8B0000",
  color: "#8B0000",
  textDecoration: "none",
};

const btnPrimary = {
  background: "#8B0000",
  color: "#fff",
  padding: "10px 18px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};
