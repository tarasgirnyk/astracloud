import React from "react";

export function Tabs({ tabs = [], active, onChange, style }) {
  return (
    <div style={{ display: "flex", gap: "4px", background: "var(--gray-100)", borderRadius: "var(--radius-pill)", padding: "4px", width: "fit-content", ...style }}>
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange && onChange(t.value)}
          style={{
            padding: "10px 20px",
            borderRadius: "var(--radius-pill)",
            border: "none",
            cursor: "pointer",
            font: "var(--text-ui-label)",
            background: active === t.value ? "var(--white)" : "transparent",
            color: active === t.value ? "var(--text-on-light)" : "var(--text-on-light-muted)",
            boxShadow: active === t.value ? "var(--shadow-card)" : "none",
            transition: "all var(--duration-standard) var(--ease-standard)",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
