import { useDrag } from "react-dnd";

const BTN = {
  base: {
    background: "#fff",
    color: "#8B0000",
    padding: "10px 14px",
    border: "2px solid #8B0000",
    borderRadius: 8,
    cursor: "grab",
    transition: "background .15s ease",
  },
  hover: { background: "#fff5f5" },
  disabled: { opacity: 0.45, cursor: "not-allowed" },
  dragging: { opacity: 0.6 },
};

export default function DraggableCard({ name, disabled }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "CARD",
      item: { name },
      canDrag: !disabled,
      collect: (m) => ({ isDragging: m.isDragging() }),
    }),
    [disabled]
  );

  return (
    <button
      ref={drag}
      disabled={disabled}
      style={{
        ...BTN.base,
        ...(disabled ? BTN.disabled : {}),
        ...(isDragging ? BTN.dragging : {}),
      }}
      onMouseEnter={(e) =>
        !disabled && Object.assign(e.currentTarget.style, BTN.hover)
      }
      onMouseLeave={(e) =>
        !disabled && Object.assign(e.currentTarget.style, BTN.base)
      }
      title={disabled ? "正解済み" : "ドラッグで地図へ"}
    >
      {name}
    </button>
  );
}
