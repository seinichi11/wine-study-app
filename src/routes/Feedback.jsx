export default function Feedback() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>フィードバック</h1>
      <p>改善の参考にします。バグ報告、要望、使い心地など何でもどうぞ！</p>
      <p style={{ color: "#777", marginTop: 12, fontSize: 12 }}>
        ※ 個人情報の入力は不要です。送信内容は改善以外の目的では利用しません。
      </p>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScE8Lqs-xq8ZuZQXrNy2Whx0g5mdyq_lVfgYXVIk1Lo5jEW7A/viewform?embedded=true"
        width="100%"
        height="800"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="feedback-form"
      >
        読み込んでいます…
      </iframe>
    </div>
  );
}
