import { Helmet } from "react-helmet-async";

export default function Chardonnay() {
  const site = "https://<あなたのドメイン>";
  const url = site + "/articles/chardonnay";

  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <Helmet>
        <title>シャルドネ徹底ガイド｜特徴・主要産地・スタイル</title>
        <meta
          name="description"
          content="世界で最も広く栽培される白ブドウ品種シャルドネ。特徴・主要産地・代表的なワインスタイルをまとめ、ワインエキスパート試験対策にも役立つ解説。"
        />
        <link rel="canonical" href={url} />
      </Helmet>

      <header style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
          Articles / 品種
        </p>
        <h1 style={{ margin: "6px 0 8px 0" }}>
          シャルドネ徹底ガイド：特徴・主要産地・スタイル
        </h1>
        <p style={{ color: "#555" }}>
          世界で最も人気のある白ブドウ品種、シャルドネ。
          栽培地域や醸造法によって多彩なスタイルを生み出す万能品種です。
          本記事では特徴・主要産地・試験での出題ポイントを整理します。
        </p>
      </header>

      <section style={{ marginTop: 16 }}>
        <h2>① 品種の特徴</h2>
        <p>
          シャルドネはニュートラルな品種で、栽培環境や醸造法による個性が強く表れます。
          典型的なアロマは<strong>リンゴ、柑橘、洋梨、白い花</strong>。
          樽熟成を経ると<strong>バニラ、バター、ヘーゼルナッツ</strong>
          などの香りも。 熟成すると<strong>蜂蜜やトースト</strong>
          のニュアンスも加わります。
        </p>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>② 主要産地とスタイル</h2>
        <ul>
          <li>
            <strong>フランス・ブルゴーニュ</strong>
            ：世界的に最も権威あるシャルドネ産地。
            シャブリは冷涼でミネラル感、コート・ド・ボーヌはリッチで樽の効いたスタイル。
          </li>
          <li>
            <strong>アメリカ・カリフォルニア</strong>：ナパやソノマで有名。
            熟した果実、トロピカルフルーツ、ヴァニラやトーストの濃厚な樽香が特徴。
          </li>
          <li>
            <strong>オーストラリア</strong>
            ：ヤラ・ヴァレーやマーガレット・リヴァー。
            近年は樽控えめで柑橘・ストーンフルーツ主体のクリーンなスタイルが主流。
          </li>
          <li>
            <strong>チリ・アルゼンチン</strong>
            ：安定した品質とコストパフォーマンス。
            熟した果実味にミネラル感が加わる。
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>③ ワインエキスパート試験でのポイント</h2>
        <ul>
          <li>ブルゴーニュ（シャブリ〜コート・ド・ボーヌ）の対比は頻出</li>
          <li>新世界との違い（果実の熟度・樽のニュアンス）が問われやすい</li>
          <li>「世界で最も広く栽培される白ブドウ品種」である点は必須知識</li>
        </ul>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>④ 学習のコツ</h2>
        <p>
          シャルドネは<strong>「場所によって変わる顔」</strong>
          を整理するのが鍵。
          シャブリ＝冷涼・ミネラル、ボーヌ＝リッチ・樽香、カリフォルニア＝熟した果実・濃厚、
          という対比で覚えると記憶が定着します。
        </p>
      </section>

      <hr
        style={{ border: "0", borderTop: "1px solid #eee", margin: "18px 0" }}
      />

      <section>
        <p style={{ margin: "12px 0" }}>
          👉 関連学習：<a href="/flashcards/chardonnay">暗記カード（品種編）</a>
          <br />
          👉 クイズに挑戦：<a href="/quiz/chardonnay?limit=10&random=1">今日の10問</a>
        </p>
      </section>
    </article>
  );
}
