import React from "react";

const tones = {
  orange: { background: "rgba(255, 112, 22, 0.12)", color: "var(--orange-600)" },
  cyan: { background: "rgba(62, 230, 216, 0.14)", color: "var(--cyan-500)" },
  violet: { background: "rgba(139, 108, 247, 0.14)", color: "var(--violet-500)" },
  neutral: { background: "var(--gray-100)", color: "var(--text-on-light)" },
  "on-dark": { background: "rgba(255,255,255,0.1)", color: "var(--white)" },
};

export function Badge({ children, tone = "orange", style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 12px",
        borderRadius: "var(--radius-pill)",
        font: "var(--text-caption)",
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
