import React from "react";

export function Tooltip({ label, children }) {
  const [show, setShow] = React.useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          style={{
            position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
            background: "var(--navy-950)", color: "var(--white)", padding: "6px 12px", borderRadius: "var(--radius-sm)",
            font: "var(--text-caption)", whiteSpace: "nowrap", boxShadow: "var(--shadow-popover)", zIndex: 10,
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
