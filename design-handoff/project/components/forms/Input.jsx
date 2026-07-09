import React from "react";

export function Input({ label, placeholder, type = "text", value, onChange, error, style }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", font: "var(--text-body-sm)", ...style }}>
      {label && <span style={{ font: "var(--text-ui-label)", color: "var(--text-on-light)" }}>{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          padding: "12px 16px",
          borderRadius: "var(--radius-md)",
          border: error ? "1px solid var(--status-danger)" : "1px solid var(--border-on-light)",
          font: "var(--text-body-md)",
          color: "var(--text-on-light)",
          outline: "none",
          background: "var(--white)",
          transition: "border-color var(--duration-fast) var(--ease-standard)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--brand-primary)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = error ? "var(--status-danger)" : "var(--border-on-light)")}
      />
      {error && <span style={{ color: "var(--status-danger)", font: "var(--text-caption)" }}>{error}</span>}
    </label>
  );
}
