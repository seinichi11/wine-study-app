export default function Burgundy() {
  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <header style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
          Articles / France
        </p>
        <h1 style={{ margin: "6px 0 8px 0" }}>
          ブルゴーニュ入門：産地・品種・格付けの基礎
        </h1>
        <p style={{ color: "#555" }}>
          ブルゴーニュはフランスを代表する銘醸地。細分化されたAOC、テロワールの違い、ドメーヌごとの個性が
          試験でも頻出です。ここでは「どこ（地域構成）」「なに（主要品種）」「どう違う（格付け）」の3点で整理します。
        </p>
      </header>

      <section style={{ marginTop: 16 }}>
        <h2>① 地域構成（北から南へ）</h2>
        <ul>
          <li>
            <strong>シャブリ</strong>
            ：冷涼な気候。辛口のシャルドネが中心。火打石や白い花、レモンのニュアンス。
            牡蠣との相性で有名。石灰質土壌（キンメリジャン）をキーワードで覚える。
          </li>
          <li>
            <strong>コート・ド・ニュイ</strong>
            ：ピノ・ノワールの銘醸地。ジュヴレ＝シャンベルタン、シャンボール＝ミュジニー、
            ヴォーヌ＝ロマネなど名村が並ぶ。力強さ〜エレガンスまで幅。
          </li>
          <li>
            <strong>コート・ド・ボーヌ</strong>
            ：白の聖地。ムルソー、ピュリニー＝モンラッシェ、シャサーニュ＝モンラッシェなど。
            ふくよかなシャルドネに加え、村によってミネラル感・樽感のバランスが異なる。
          </li>
          <li>
            <strong>コート・シャロネーズ</strong>
            ：価格と品質のバランスが良い地域。リュリー、メルキュレなど。
            ピノ・ノワールとシャルドネが主。
          </li>
          <li>
            <strong>マコネ</strong>
            ：温暖で、親しみやすいシャルドネの産地。プイィ＝フュイッセが代表的。
          </li>
          <li>
            <strong>ボージョレ</strong>
            ：ガメイ主体。ヌーヴォーで有名だが村名クラスは侮れない。花や赤系果実、軽快なタンニン。
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>② 主要ブドウ品種とスタイル</h2>
        <h3 style={{ marginTop: 8 }}>ピノ・ノワール（赤）</h3>
        <p>
          軽やかな色調〜中程度のボディ。赤系果実（イチゴ、ラズベリー）、スミレ、土やキノコのニュアンス。
          産地や畑、造り手で表情が大きく変わるのが魅力。ニュイ寄りは骨格があり、熟成で複雑性が増す。
        </p>
        <h3 style={{ marginTop: 8 }}>シャルドネ（白）</h3>
        <p>
          幅広いスタイルに順応。ボーヌ周辺はリッチでバターやヘーゼルナッツ、樽の要素。
          シャブリは鋼のようなミネラルとレモン、白い花。マコネは熟した果実で親しみやすい味わい。
        </p>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>③ 格付けの考え方（AOC階層）</h2>
        <ol>
          <li>
            <strong>グラン・クリュ</strong>
            ：最上級の特級畑。例：モンラッシェ、ラ・ロマネ＝コンティ等。
            畑名だけでAOCが成立。生産量が少なく個性が明瞭。
          </li>
          <li>
            <strong>プルミエ・クリュ</strong>
            ：一級畑。村名＋畑名で表記（例：Puligny-Montrachet 1er Cru Les
            Pucelles）。
          </li>
          <li>
            <strong>村名ワイン</strong>
            ：村の境界内で収穫。例：Gevrey-Chambertin、Meursaultなど。
          </li>
          <li>
            <strong>地方名（地域名）ワイン</strong>：Bourgogne Rouge/Blanc
            など広域AOC。 近年は「Bourgogne Côte
            d’Or」など細分化表示もチェック。
          </li>
        </ol>
        <p>
          試験では「<strong>どの階層がどの表記か</strong>」「
          <strong>代表的な村名・畑名の対応</strong>」が頻出。
          ラベル（エチケット）の読み解き問題も出るので、村名＋一級畑の表記形式を押さえておくと有利です。
        </p>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>④ 試験に出やすい“ひっかけ”ポイント</h2>
        <ul>
          <li>
            <strong>シャブリ＝ブルゴーニュ北端の白のみ</strong>
            （基本はシャルドネ）。ボーヌの白と混同しない。
          </li>
          <li>
            <strong>ボージョレの主要品種はガメイ</strong>
            。ピノ・ノワールと取り違え注意。
          </li>
          <li>
            <strong>1er Cru の表記</strong>
            ：綴りは「Premier」だが、ラベルでは「1er」と省略される。
          </li>
          <li>
            <strong>グラン・クリュは畑名のみでAOC成立</strong>
            （例外的な表記と合わせて確認）。
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>⑤ 学習のコツ（暗記の順番）</h2>
        <ol>
          <li>地域の“地図感覚”を作る（北→南）。</li>
          <li>
            村名と代表スタイルを1フレーズで覚える（例：ニュイ＝力強いピノ）。
          </li>
          <li>格付けの階層と表記ルールをセットで暗記。</li>
          <li>
            代表畑名は“音”で覚えてカード反復（例：モンラッシェ、ラ・ターシュ）。
          </li>
        </ol>
        <p>
          まずは広く浅く俯瞰し、暗記カードで頻出語を反復、最後にクイズで定着を確認するサイクルが効率的です。
        </p>
      </section>

      <hr
        style={{ border: "0", borderTop: "1px solid #eee", margin: "18px 0" }}
      />

      <section>
        <p style={{ margin: "12px 0" }}>
          👉 暗記カード：<a href="/flashcards/burgundy">ブルゴーニュ編</a>
          <br />
          👉 クイズに挑戦：
          <a href="/quiz/burgundy?limit=10&random=1">ランダム10問</a>
        </p>
        <p style={{ color: "#777", fontSize: 12 }}>
          ヒント：学習が進んだら、村名ごとの代表畑を自分の言葉で一言メモにすると記憶が残りやすいです。
        </p>
      </section>
    </article>
  );
}
