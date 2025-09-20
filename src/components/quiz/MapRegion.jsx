import { useDrop } from "react-dnd";

export default function MapRegion({
  expected,
  onDrop,
  answered = false,
  colors = {
    default: "#ffffff",
    hover: "#e8ffe8",
    locked: "#4ade80",
    error: "#fecaca",
  },
  polygonPoints,
  pathD,
  rect,
  stroke = "#bbb",
  strokeWidth = 2,
  label,
  labelOffset = { dx: 0, dy: 0 },
  errorFlashKey = 0,
}) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (item) => onDrop(item.name === expected, expected, item.name),
      collect: (m) => ({ isOver: m.isOver() }),
    }),
    [expected, onDrop]
  );

  const baseFill = answered
    ? colors.locked
    : isOver
      ? colors.hover
      : colors.default;
  const common = {
    ref: drop,
    style: { pointerEvents: "all", cursor: "grab" },
    fill: baseFill,
    stroke,
    strokeWidth,
    className: "region-shape",
  };

  // ラベル位置（簡易重心）
  let cx = null,
    cy = null;
  if (polygonPoints) {
    const pts = polygonPoints
      .trim()
      .split(/\s+/)
      .map((p) => p.split(",").map(Number));
    cx =
      Math.round(pts.reduce((s, [x]) => s + x, 0) / pts.length) +
      (labelOffset.dx || 0);
    cy =
      Math.round(pts.reduce((s, [, y]) => s + y, 0) / pts.length) +
      (labelOffset.dy || 0);
  } else if (rect) {
    cx = rect.x + rect.width / 2 + (labelOffset.dx || 0);
    cy = rect.y + rect.height / 2 + (labelOffset.dy || 0);
  }

  return (
    <>
      <style>{`
        .region-shape { transition: fill .18s ease; }
        .flash-error { animation: flashError .45s ease; }
        @keyframes flashError {
          0% { fill: ${colors.error}; }
          100% { fill: ${baseFill}; }
        }
      `}</style>

      {polygonPoints && (
        <polygon
          points={polygonPoints}
          {...common}
          key={`poly-${expected}-${errorFlashKey}`}
          className={`region-shape ${errorFlashKey ? "flash-error" : ""}`}
        />
      )}
      {pathD && (
        <path
          d={pathD}
          {...common}
          key={`path-${expected}-${errorFlashKey}`}
          className={`region-shape ${errorFlashKey ? "flash-error" : ""}`}
        />
      )}
      {rect && (
        <rect
          {...rect}
          {...common}
          key={`rect-${expected}-${errorFlashKey}`}
          className={`region-shape ${errorFlashKey ? "flash-error" : ""}`}
        />
      )}

      {/* 正解時ラベル */}
      {answered && label && cx != null && cy != null && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          fontSize="14"
          fill="#0a3d1a"
          fontWeight="700"
          style={{ userSelect: "none" }}
        >
          {label}
        </text>
      )}
    </>
  );
}
