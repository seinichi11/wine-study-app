import { Helmet } from "react-helmet-async";

export default function BordeauxClassification() {
  const site = "https://<あなたのドメイン>";
  const url = site + "/articles/bordeaux-classification";

  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <Helmet>
        <title>ボルドー格付け入門｜メドック・サンテミリオン・グラーヴ</title>
        <meta
          name="description"
          content="1855年のメドック格付けを中心に、サンテミリオン、グラーヴの格付け制度を整理。ワインエキスパート・ソムリエ試験対策にも役立つボルドー格付け入門記事。"
        />
        <link rel="canonical" href={url} />
      </Helmet>

      <header style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
          Articles / France
        </p>
        <h1 style={{ margin: "6px 0 8px 0" }}>
          ボルドー格付け入門：1855年から現代まで
        </h1>
        <p style={{ color: "#555" }}>
          フランス・ボルドー地方は、格付けワインの代表格。
          1855年パリ万博で制定されたメドック格付けを中心に、サンテミリオン、グラーヴなど複数の格付け制度が存在します。
          本記事では試験に頻出のポイントをまとめます。
        </p>
      </header>

      <section style={{ marginTop: 16 }}>
        <h2>① 1855年メドック格付け</h2>
        <p>
          ナポレオン3世がパリ万博用に依頼して作成。メドック地区のシャトー61軒と
          ソーテルヌ＆バルサックの甘口27軒が対象。
        </p>
        <ul>
          <li>
            <strong>五大シャトー（第1級）</strong>
            ：ラフィット、ラトゥール、マルゴー、ムートン、オーブリオン
          </li>
          <li>
            <strong>第2級〜第5級</strong>：価格と評判に基づき階層化
          </li>
          <li>
            <strong>例外</strong>：ムートンは1973年に第2級から第1級へ昇格
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>② サンテミリオン格付け</h2>
        <p>
          1955年に制定。特徴は<strong>10年ごとに見直し</strong>が行われる点。
          「プルミエ・グラン・クリュ・クラッセA/B」と「グラン・クリュ・クラッセ」の2階層。
        </p>
        <p>
          Aは最高位で、以前はシュヴァル・ブラン、オーゾンヌなどが有名。
          最近の改訂ではシャトー・フィジャックが昇格。
        </p>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>③ グラーヴ格付け</h2>
        <p>
          1953年制定。赤白両方のワインが対象。ペサック＝レオニャン地区が中心。
          特に有名なのは<strong>シャトー・オーブリオン</strong>。
        </p>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>④ 試験での出題ポイント</h2>
        <ul>
          <li>「1855年」「ナポレオン3世」「パリ万博」というキーワード</li>
          <li>五大シャトーの暗記（特にムートンの昇格は頻出）</li>
          <li>サンテミリオンは「定期改訂される」唯一の格付け</li>
          <li>グラーヴは赤白両方が対象</li>
        </ul>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>⑤ 学習のコツ</h2>
        <p>
          「<strong>1855メドック（固定）</strong>」「
          <strong>サンテミリオン（改訂制）</strong>」 「
          <strong>グラーヴ（赤白両方）</strong>
          」の違いを整理して覚えると効率的です。
          五大シャトーは略語「ララマムオ（Lafite, Latour, Margaux, Mouton,
          Haut-Brion）」で暗記。
        </p>
      </section>

      <hr
        style={{ border: "0", borderTop: "1px solid #eee", margin: "18px 0" }}
      />

      <section>
        <p style={{ margin: "12px 0" }}>
          👉 関連学習：
          <a href="/flashcards/bordeaux-classification">
            暗記カード（格付け編）
          </a>
          <br />
          👉 クイズに挑戦：
          <a href="/quiz/bordeaux-classification?limit=10&random=1">
            今日の10問
          </a>
        </p>
      </section>
    </article>
  );
}
