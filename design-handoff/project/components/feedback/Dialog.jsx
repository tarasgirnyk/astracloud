import React from "react";

export function Dialog({ open, onClose, title, children, style }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(5,7,15,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--white)", borderRadius: "var(--radius-lg)", padding: "32px",
          maxWidth: 440, width: "90%", boxShadow: "var(--shadow-popover)", ...style,
        }}
      >
        {title && <h3 style={{ font: "var(--text-display-sm)", marginBottom: 16 }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
