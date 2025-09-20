// src/features/mapquiz/MapQuizBase.jsx
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMemo, useState } from "react";
import DraggableCard from "../../components/quiz/DraggableCard";
import MapRegion from "../../components/quiz/MapRegion";
import ProgressBar from "./ProgressBar";
import Legend from "./Legend";
import { useQuizState, useShuffledDeck } from "./hooks";

/**
 * props:
 * - title
 * - regions: { [name]: { polygon: "x,y ...", info: string } }
 * - background?: () => ReactNode
 * - brandColor?: string
 * - initialScale?: number
 */
export default function MapQuizBase({
  title,
  regions,
  background,
  brandColor = "#8B0000",
  initialScale = 85,
}) {
  const names = useMemo(() => Object.keys(regions), [regions]);

  const { deck, reshuffle } = useShuffledDeck(names);
  const {
    answered,
    setAnswered,
    attempts,
    setAttempts,
    result,
    setResult,
    lastWrong,
    setLastWrong,
    solvedCount,
    percent,
    accuracy,
    errorKeyFor,
    resetState,
  } = useQuizState(names);

  const [mapScale, setMapScale] = useState(initialScale);

  const onDrop = (correct, expectedRegion, attemptedName) => {
    setAttempts((n) => n + 1);
    if (correct) {
      setAnswered((prev) => ({ ...prev, [expectedRegion]: true }));
      setResult(`✅ ${expectedRegion}\n${regions[expectedRegion]?.info ?? ""}`);
      setLastWrong(null);
    } else {
      setResult(`❌ ここは「${attemptedName}」ではないよ。`);
      setLastWrong({
        region: expectedRegion,
        attempted: attemptedName,
        ts: Date.now(),
      });
    }
  };

  const resetAll = () => {
    resetState();
    reshuffle();
    setMapScale(initialScale);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: 24 }}>
        {/* ヘッダー */}
        <div
          style={{
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                color: brandColor,
              }}
            >
              {title}
            </h1>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <ProgressBar percent={percent} color={brandColor} />
              <span style={{ fontSize: 13, color: "#444" }}>
                {percent}% 完了（{solvedCount}/{names.length}）
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <label style={{ fontSize: 13, color: "#444" }}>
              表示サイズ：<b>{mapScale}%</b>
            </label>
            <input
              type="range"
              min={60}
              max={110}
              value={mapScale}
              onChange={(e) => setMapScale(Number(e.target.value))}
              style={{ width: 160, accentColor: brandColor }}
            />
            <button
              onClick={resetAll}
              style={{
                background: "#fff",
                color: brandColor,
                padding: "8px 14px",
                border: `2px solid ${brandColor}`,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              リセット（シャッフル）
            </button>
          </div>
        </div>

        {/* レイアウト：カード（左） ←→ マップ（右） */}
        <div
          style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 16 }}
        >
          {/* 左：カード・結果・統計 */}
          <div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
                boxShadow: "0 6px 18px rgba(0,0,0,.05)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px",
                  color: brandColor,
                  fontWeight: 700,
                }}
              >
                ドラッグするカード
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {deck.map((name) => (
                  <DraggableCard
                    key={name}
                    name={name}
                    disabled={!!answered[name]}
                  />
                ))}
              </div>

              {/* 統計＆凡例 */}
              <div
                style={{
                  marginTop: 14,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #eee",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <div style={{ fontSize: 12, color: "#666" }}>
                    クイック統計
                  </div>
                  <div style={{ marginTop: 6, fontSize: 14 }}>
                    試行回数：<b>{attempts}</b>
                    <br />
                    正解数　：<b>{solvedCount}</b>
                    <br />
                    正答率　：<b>{attempts ? Math.round(accuracy) : 0}%</b>
                  </div>
                </div>
                <Legend />
              </div>
            </div>

            {!!result && (
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderLeft: "4px solid #2d6cdf",
                  color: "#1e40af",
                  padding: "10px 12px",
                  borderRadius: 8,
                  whiteSpace: "pre-line",
                  boxShadow: "0 4px 18px rgba(0,0,0,.06)",
                }}
                aria-live="polite"
              >
                {result}
              </div>
            )}
          </div>

          {/* 右：マップ（ラッパーに%を当てる） */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
              boxShadow: "0 6px 18px rgba(0,0,0,.05)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${mapScale}%`,
                minWidth: 420,
                maxWidth: "100%",
                maxHeight: "62vh",
              }}
            >
              <svg
                viewBox="0 0 700 620"
                style={{ width: "100%", height: "auto" }}
              >
                {typeof background === "function" ? (
                  background()
                ) : (
                  <>
                    <rect x="0" y="0" width="700" height="620" fill="#fafafa" />
                    <path
                      d="M300,70 C360,80 390,110 400,150 C360,140 330,130 300,120 Z"
                      fill="#e0f2fe"
                      opacity="0.7"
                    />
                    <path
                      d="M600,200 C540,210 500,230 450,250 C420,260 380,270 350,280"
                      fill="none"
                      stroke="#93c5fd"
                      strokeWidth="10"
                      opacity="0.75"
                      strokeLinecap="round"
                    />
                    <path
                      d="M330,560 C340,520 345,480 340,440 C335,400 330,360 330,320 C330,280 335,230 360,190 C380,160 400,140 430,130"
                      fill="none"
                      stroke="#93c5fd"
                      strokeWidth="12"
                      opacity="0.8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="360"
                      cy="200"
                      r="10"
                      fill="#93c5fd"
                      opacity="0.8"
                    />
                  </>
                )}

                {names.map((name) => (
                  <MapRegion
                    key={name}
                    expected={name}
                    onDrop={onDrop}
                    answered={!!answered[name]}
                    polygonPoints={regions[name].polygon}
                    colors={{
                      default: "#fff",
                      hover: "#e8ffe8",
                      locked: "#4ade80",
                      error: "#fecaca",
                    }}
                    stroke="#bbb"
                    strokeWidth={2}
                    label={name}
                    errorFlashKey={errorKeyFor(name)}
                  />
                ))}

                <text x="650" y="30" fontSize="12" fill="#64748b">
                  N
                </text>
                <line
                  x1="650"
                  y1="40"
                  x2="650"
                  y2="70"
                  stroke="#64748b"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
