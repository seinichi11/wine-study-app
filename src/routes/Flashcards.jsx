import { useEffect, useMemo, useState } from "react";
import cards from "../data/flashcards.json";
import {
  loadKnownCardIds,
  saveKnownCardIds,
  resetKnownCardIds,
} from "../lib/storage";

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Flashcards() {
  const knownSetInitial = useMemo(() => loadKnownCardIds(), []);
  const [known, setKnown] = useState(knownSetInitial);
  const [order, setOrder] = useState(() => shuffle(cards));
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [dir, setDir] = useState(1);
  const card = order[i];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        setFlipped((v) => !v);
      }
      if (e.key === "ArrowRight") animateToNext(1);
      if (e.key === "ArrowLeft") animateToNext(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i]);

  function animateToNext(nextDir) {
    if (phase !== "idle") return;
    setDir(nextDir);
    setPhase("leaving");
    setTimeout(() => {
      setFlipped(false);
      setI((prev) => {
        if (nextDir === 1) return (prev + 1) % order.length;
        return (prev - 1 + order.length) % order.length;
      });
      setPhase("entering");
      setTimeout(() => setPhase("idle"), 180);
    }, 180);
  }

  function markKnown() {
    const next = new Set(known);
    next.add(card.id);
    setKnown(next);
    saveKnownCardIds(next);
    animateToNext(1);
  }
  function reshuffle() {
    setPhase("leaving");
    setTimeout(() => {
      setOrder(shuffle(cards));
      setI(0);
      setFlipped(false);
      setDir(1);
      setPhase("entering");
      setTimeout(() => setPhase("idle"), 180);
    }, 180);
  }
  function resetKnown() {
    resetKnownCardIds();
    setKnown(new Set());
  }

  const motion = (() => {
    const base = {
      transition: "transform .18s ease, opacity .18s ease",
      transform: "translateX(0px)",
      opacity: 1,
    };
    if (phase === "leaving") {
      return {
        ...base,
        transform: `translateX(${dir * 24}px)`,
        opacity: 0,
      };
    }
    if (phase === "entering") {
      return {
        ...base,
        transform: `translateX(${dir * -24}px)`,
        opacity: 0,
      };
    }
    return base;
  })();

  return (
    <div style={wrap}>
      <header style={header}>
        <div>
          カード {i + 1} / {order.length}
        </div>
        <div>覚えた: {known.size}</div>
      </header>

      {}
      <div style={{ ...motion }}>
        {}
        <div
          style={cardScene}
          onClick={() => setFlipped((v) => !v)}
          role="button"
          aria-label="カードを反転"
        >
          <div
            style={{
              ...cardInner,
              transform: `rotateY(${flipped ? 180 : 0}deg)`,
            }}
          >
            {}
            <div style={{ ...cardFace, ...cardFront }}>
              <div style={faceText}>{card.front}</div>
              <div style={hint}>クリック/スペースで裏面</div>
            </div>
            {}
            <div style={{ ...cardFace, ...cardBack }}>
              <div style={faceText}>{card.back}</div>
              <div style={hint}>クリック/スペースで表面</div>
            </div>
          </div>
        </div>
      </div>

      <div style={actions}>
        <button
          style={btnGhost}
          onClick={() => animateToNext(-1)}
          disabled={phase !== "idle"}
        >
          &larr; 前
        </button>
        <button
          style={btnPrimary}
          onClick={markKnown}
          disabled={phase !== "idle"}
        >
          覚えた
        </button>
        <button
          style={btnGhost}
          onClick={() => animateToNext(1)}
          disabled={phase !== "idle"}
        >
          次 &rarr;
        </button>
      </div>

      <div style={subActions}>
        <button style={tinyBtn} onClick={reshuffle} disabled={phase !== "idle"}>
          並び替え
        </button>
        <button
          style={tinyBtn}
          onClick={resetKnown}
          disabled={phase !== "idle"}
        >
          覚えたリセット
        </button>
      </div>

      <p style={help}>
        ヒント：スペース=反転、←/→=前後。移動時にスライド＆フェードします。
      </p>
    </div>
  );
}

/* ===== styles ===== */
const wrap = {
  maxWidth: 720,
  margin: "0 auto",
  padding: 24,
  textAlign: "center",
};
const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 12,
  color: "#444",
};

const cardScene = {
  width: "100%",
  maxWidth: 640,
  height: 280,
  margin: "16px auto",
  perspective: "1000px",
  cursor: "pointer",
};
const cardInner = {
  position: "relative",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform .5s ease",
};
const cardFace = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  borderRadius: 12,
  border: "1px solid #ddd",
  boxShadow: "0 4px 24px rgba(0,0,0,.06)",
  backfaceVisibility: "hidden",
  background: "#fff",
};
const cardFront = { transform: "rotateY(0deg)" };
const cardBack = { transform: "rotateY(180deg)", background: "#fff7f7" };
const faceText = { fontSize: 20, lineHeight: 1.8, whiteSpace: "pre-wrap" };
const hint = {
  position: "absolute",
  bottom: 10,
  right: 12,
  fontSize: 12,
  color: "#888",
};

const actions = {
  display: "flex",
  gap: 8,
  justifyContent: "center",
  marginTop: 16,
  flexWrap: "wrap",
};
const subActions = {
  display: "flex",
  gap: 8,
  justifyContent: "center",
  marginTop: 8,
  flexWrap: "wrap",
};

const btnPrimary = {
  background: "#8B0000",
  color: "#fff",
  padding: "10px 18px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};
const btnGhost = {
  background: "#fff",
  color: "#8B0000",
  padding: "10px 18px",
  border: "2px solid #8B0000",
  borderRadius: 8,
  cursor: "pointer",
};
const tinyBtn = {
  background: "#f3f3f3",
  color: "#333",
  padding: "6px 10px",
  border: "1px solid #ddd",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 12,
};
const help = { color: "#666", marginTop: 12 };
