// src/routes/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main style={styles.wrap}>
      <h1 style={styles.title}>🍷 Wine Study App</h1>
      <p style={styles.lead}>
        ワインエキスパート／ソムリエ試験対策に使える学習アプリ。
        クイズと暗記カードでスキマ時間にサクッと！
      </p>

      <div style={styles.actions}>
        <Link to="/quiz" style={{ ...styles.button, ...styles.primary }}>
          クイズへ
        </Link>
        <Link to="/flashcards" style={{ ...styles.button, ...styles.ghost }}>
          暗記カードへ
        </Link>
      </div>
    </main>
  );
}

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "32px",
  },
  lead: {
    color: "#444",
    lineHeight: 1.8,
    marginTop: 12,
  },
  actions: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    marginTop: 24,
    flexWrap: "wrap",
  },
  button: {
    display: "inline-block",
    padding: "12px 20px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
  },
  primary: {
    background: "#8B0000",
    color: "#fff",
  },
  ghost: {
    border: "2px solid #8B0000",
    color: "#8B0000",
  },
};
