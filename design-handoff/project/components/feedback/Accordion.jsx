import React from "react";

export function Accordion({ items = [], style }) {
  const [openIndex, setOpenIndex] = React.useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...style }}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i} style={{ border: "1px solid var(--border-on-light)", borderRadius: "var(--radius-md)", background: "var(--white)", overflow: "hidden" }}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                font: "var(--text-ui-label)",
                color: "var(--text-on-light)",
                textAlign: "left",
              }}
            >
              {item.question}
              <span style={{
                width: 24, height: 24, borderRadius: "50%", background: "var(--gray-100)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: open ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform var(--duration-standard) var(--ease-standard)",
                flexShrink: 0, marginLeft: 12,
              }}>+</span>
            </button>
            {open && (
              <div style={{ padding: "0 20px 18px", font: "var(--text-body-sm)", color: "var(--text-on-light-muted)" }}>
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
