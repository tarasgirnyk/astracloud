import React from "react";

export function Card({ children, tone = "light", padding = "32px", style }) {
  const base =
    tone === "dark"
      ? { background: "var(--surface-card-dark)", color: "var(--white)", border: "1px solid var(--border-on-dark)" }
      : { background: "var(--surface-card)", color: "var(--text-on-light)", border: "1px solid var(--border-on-light)" };
  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        boxShadow: tone === "light" ? "var(--shadow-card)" : "none",
        padding,
        ...base,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
