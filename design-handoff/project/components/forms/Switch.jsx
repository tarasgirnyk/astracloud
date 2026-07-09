import React from "react";

export function Switch({ checked, onChange, style }) {
  return (
    <button
      onClick={() => onChange && onChange(!checked)}
      style={{
        width: 44,
        height: 26,
        borderRadius: "var(--radius-pill)",
        border: "none",
        padding: 3,
        background: checked ? "var(--brand-primary)" : "var(--gray-300)",
        cursor: "pointer",
        display: "flex",
        justifyContent: checked ? "flex-end" : "flex-start",
        transition: "background var(--duration-standard) var(--ease-standard)",
        ...style,
      }}
    >
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--white)", boxShadow: "0 1px 2px rgba(0,0,0,0.2)", transition: "transform var(--duration-standard) var(--ease-standard)" }} />
    </button>
  );
}
