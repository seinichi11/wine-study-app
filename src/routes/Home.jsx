import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import articles from "../data/articles.json";

export default function Home() {
  const latest = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  return (
    <section className="container" style={{ display: "grid", gap: 24 }}>
      <Helmet>
        <title>Wine Study App | ワインエキスパート・ソムリエ試験対策</title>
        <meta
          name="description"
          content="クイズと暗記カードで効率よく学習できる無料アプリ。ワインエキスパート・ソムリエ試験の一次試験対策に最適です。"
        />
      </Helmet>
      <div className="hero">
        <div className="hero-bg" />
        <div className="tag">ワインエキスパート／ソムリエ試験対策</div>
        <h1 className="hero-title">ワイン学習を、もっと身近に。</h1>
        <p className="hero-sub">
          ワインエキスパート／ソムリエ試験に向けたクイズ＆暗記カード
          <br />
          スキマ時間で頻出用語・産地・品種を反復学習できます
        </p>
        <div className="hero-cta">
          <Link to="/quiz" className="btn btn-primary">
            クイズを始める
          </Link>
          <Link to="/quiz?limit=10&random=1" className="btn btn-primary">
            今日の10問
          </Link>
          <Link to="/flashcards" className="btn btn-ghost">
            暗記カードへ
          </Link>
        </div>
      </div>

      {/* 新着記事 */}
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <h2 style={{ marginBottom: 12 }}>👉 新着記事</h2>
        <div
          style={{
            display: "inline-block",
            padding: "20px 24px",
            background: "linear-gradient(135deg, #7A001C, #B03060)",
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,.2)",
            color: "#fff",
            textAlign: "left",
            minWidth: 280,
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.9 }}>{latest.category}</div>
          <Link
            to={`/articles/${latest.slug}`}
            style={{
              color: "#fff",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: 18,
            }}
          >
            {latest.title}
          </Link>
          <p style={{ margin: "6px 0 0 0", opacity: 0.95 }}>{latest.excerpt}</p>
          <div style={{ marginTop: 8 }}>
            <Link to="/articles" style={{ color: "#fff", opacity: 0.9 }}>
              すべての記事 →
            </Link>
          </div>
        </div>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12 }}
      >
        <Kpi label="登録不要" value="今すぐ学習" />
        <Kpi label="収録カード" value="基本デッキ収録" />
        <Kpi label="モバイル最適" value="片手で操作" />
      </div>

      <div className="grid features">
        <div className="card feature">
          <div className="icon">🧠</div>
          <div className="title">記憶に残る</div>
          <div className="desc">
            4択クイズと即時フィードバックで、要点を素早く定着。
          </div>
        </div>
        <div className="card feature">
          <div className="icon">⏱️</div>
          <div className="title">スキマ時間</div>
          <div className="desc">
            1分から学習OK。通学・通勤時間にサクッと復習。
          </div>
        </div>
        <div className="card feature">
          <div className="icon">📚</div>
          <div className="title">暗記カード</div>
          <div className="desc">
            クリック/スペースで反転。並び替え・“覚えた”管理にも対応。
          </div>
        </div>
      </div>

      <div className="grid hiw">
        <div className="card" style={{ padding: 20 }}>
          <h2
            style={{
              margin: "4px 0 14px 0",
              fontFamily: "Noto Serif JP,serif",
            }}
          >
            使い方（3ステップ）
          </h2>
          <div className="grid" style={{ gap: 12 }}>
            <div className="hiw-steps step">
              <div className="num">1</div>
              <div>
                <div style={{ fontWeight: 700 }}>ホームからモードを選ぶ</div>
                <div className="desc" style={{ color: "var(--muted)" }}>
                  クイズ or 暗記カード。まずはカードからでもOK
                </div>
              </div>
            </div>
            <div className="hiw-steps step">
              <div className="num">2</div>
              <div>
                <div style={{ fontWeight: 700 }}>反復して弱点を潰す</div>
                <div className="desc" style={{ color: "var(--muted)" }}>
                  間違えた項目に注目して復習効率アップ
                </div>
              </div>
            </div>
            <div className="hiw-steps step">
              <div className="num">3</div>
              <div>
                <div style={{ fontWeight: 700 }}>毎日ちょっとずつ</div>
                <div className="desc" style={{ color: "var(--muted)" }}>
                  短時間でも継続が勝ち。ホームに戻って繰り返し
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <Link to="/quiz" className="btn btn-primary">
              まずは1問 解いてみる
            </Link>
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3
            style={{ margin: "0 0 10px 0", fontFamily: "Noto Serif JP,serif" }}
          >
            ユーザーの声（例）
          </h3>
          <div className="quote">
            <p>
              すきま時間に暗記カードを回せるのが最高。反転とスライドが気持ちよくて続く。
            </p>
            <small>受験予定・Aさん</small>
          </div>
          <div className="quote" style={{ marginTop: 12 }}>
            <p>
              クイズの即時判定で弱点が可視化。試験前の最終確認にも便利でした。
            </p>
            <small>合格者・Bさん</small>
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{ padding: "22px 18px", textAlign: "center" }}
      >
        <div
          style={{
            fontFamily: "Noto Serif JP,serif",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          今日の10問から、合格へ一歩。
        </div>
        <div style={{ color: "var(--muted)", marginTop: 6 }}>
          登録不要・無料で今すぐ始められます。
        </div>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/quiz" className="btn btn-primary">
            クイズを始める
          </Link>
          <Link to="/flashcards" className="btn btn-ghost">
            暗記カードへ
          </Link>
        </div>
      </div>
    </section>
  );
}

function Kpi({ label, value }) {
  return (
    <div className="card" style={{ padding: "14px 16px", textAlign: "center" }}>
      <div style={{ fontSize: 14, color: "var(--muted)" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>{value}</div>
    </div>
  );
}
