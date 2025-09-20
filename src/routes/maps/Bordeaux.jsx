// src/routes/maps/Bordeaux.jsx
import MapQuizBase from "../../features/mapquiz/MapQuizBase";
import regions from "../../data/regions/bordeaux";
import rivers from "../../data/river/bordeauxRivers";
import cities from "../../data/city/bordeauxCities";

const VIEWBOX_W = 700;
const VIEWBOX_H = 620;

const Background = () => (
  <>
    <rect x="0" y="0" width={VIEWBOX_W} height={VIEWBOX_H} fill="#fafafa" />
    <g pointerEvents="none">
      {(rivers ?? []).map((r, i) =>
        r?.d?.length ? (
          <path
            key={`rv-p-${i}`}
            d={r.d}
            fill="none"
            stroke={r.stroke || "#9acbff"}
            strokeWidth={r.width ?? 12}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={r.opacity ?? 0.95}
          />
        ) : (
          <polyline
            key={`rv-l-${i}`}
            points={r?.points || ""}
            fill="none"
            stroke={r?.stroke || "#9acbff"}
            strokeWidth={r?.width ?? 12}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={r?.opacity ?? 0.95}
          />
        )
      )}
    </g>
    <g pointerEvents="none">
      {(cities ?? []).map((c, i) => (
        <g key={`ct-${i}`}>
          <circle
            cx={c.x}
            cy={c.y}
            r={c.size ?? 6}
            fill={c.color || "#111827"}
            stroke="#fff"
            strokeWidth="1.5"
          />
          <text
            x={(c.x ?? 0) + (c.size ?? 6) + 4}
            y={(c.y ?? 0) - ((c.size ?? 6) + 2)}
            fontSize="12"
            fill="#111827"
            fontWeight="700"
          >
            {c.name}
          </text>
        </g>
      ))}
    </g>
  </>
);

export default function Bordeaux() {
  if (import.meta?.env?.DEV) {
    console.log("[Bordeaux] rivers path ok?", rivers?.length);
    console.log("[Bordeaux] cities path ok?", cities?.length);
  }
  return (
    <MapQuizBase
      title="Bordeaux 地図クイズ"
      regions={regions}
      background={Background}
      brandColor="#8B0000"
      initialScale={85}
      viewBox={{ width: VIEWBOX_W, height: VIEWBOX_H }}
    />
  );
}
