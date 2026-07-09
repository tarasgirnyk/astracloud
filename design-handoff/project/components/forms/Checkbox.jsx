import React from "react";

export function Checkbox({ label, checked, onChange, style }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer", font: "var(--text-body-sm)", color: "var(--text-on-light)", ...style }}>
      <span
        onClick={() => onChange && onChange(!checked)}
        style={{
          width: 20,
          height: 20,
          borderRadius: "6px",
          border: checked ? "none" : "1.5px solid var(--border-on-light)",
          background: checked ? "var(--brand-primary)" : "var(--white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background var(--duration-fast) var(--ease-standard)",
        }}
      >
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
