import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import articles from "../../data/articles.json";

function formatDate(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function ArticlesIndex() {
  // 新しい順に並べ替え
  const list = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <Helmet>
        <title>記事一覧 | Wine Study App</title>
        <meta
          name="description"
          content="ワインエキスパート・ソムリエ試験対策に役立つ記事一覧。産地・品種・醸造・勉強法などを解説。"
        />
        <link rel="canonical" href="https://<あなたのドメイン>/articles" />
      </Helmet>

      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: "0 0 6px 0" }}>記事一覧</h1>
        <p style={{ color: "#666", margin: 0 }}>
          ワインエキスパート／ソムリエ試験の学習に役立つ読み物をまとめています。
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {list.map((a) => (
          <article
            key={a.slug}
            className="card"
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 14,
              padding: 16,
              boxShadow: "0 8px 24px rgba(0,0,0,.06)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 12, color: "#777" }}>
              {a.category} ・ {formatDate(a.date)}
            </div>
            <h2 style={{ margin: 0, fontSize: 18, lineHeight: 1.4 }}>
              <Link
                to={`/articles/${a.slug}`}
                style={{ color: "#7A001C", textDecoration: "none" }}
              >
                {a.title}
              </Link>
            </h2>
            <p style={{ color: "#555", margin: 0 }}>{a.excerpt}</p>

            <div style={{ marginTop: "auto" }}>
              <Link
                to={`/articles/${a.slug}`}
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: "1px solid #7A001C",
                  color: "#7A001C",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                記事を読む →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
