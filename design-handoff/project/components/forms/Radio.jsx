import React from "react";

export function Radio({ label, checked, onChange, name, style }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer", font: "var(--text-body-sm)", color: "var(--text-on-light)", ...style }}>
      <span
        onClick={() => onChange && onChange()}
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: checked ? "6px solid var(--brand-primary)" : "1.5px solid var(--border-on-light)",
          background: "var(--white)",
          flexShrink: 0,
          transition: "border var(--duration-fast) var(--ease-standard)",
          boxSizing: "border-box",
        }}
      />
      {label}
    </label>
  );
}
