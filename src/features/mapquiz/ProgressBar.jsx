// src/features/mapquiz/ProgressBar.jsx
export default function ProgressBar({ percent, color = "#8B0000" }) {
  return (
    <div
      style={{
        width: 320,
        height: 12,
        background: "#f1f1f1",
        borderRadius: 999,
        border: "1px solid #e5e5e5",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${color}, #cf2f2f)`,
          borderRadius: 999,
          transition: "width .3s ease",
        }}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
