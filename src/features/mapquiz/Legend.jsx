// src/features/mapquiz/Legend.jsx
export default function Legend() {
  const Dot = ({ bg, border }) => (
    <span
      style={{
        width: 12,
        height: 12,
        display: "inline-block",
        borderRadius: 999,
        marginRight: 6,
        verticalAlign: "-2px",
        background: bg,
        border: border ? `1px solid ${border}` : "none",
      }}
    />
  );
  return (
    <div
      style={{
        background: "#fafafa",
        border: "1px solid #eee",
        borderRadius: 10,
        padding: 10,
      }}
    >
      <div style={{ fontSize: 12, color: "#666" }}>凡例</div>
      <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.8 }}>
        <Dot bg="#ffffff" border="#e5e5e5" />
        未回答
        <br />
        <Dot bg="#e8ffe8" border="#d4f4d4" />
        ドロップ中
        <br />
        <Dot bg="#4ade80" />
        正解
      </div>
    </div>
  );
}
