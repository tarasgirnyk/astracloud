import React from "react";

const sizeStyles = {
  sm: { padding: "8px 16px", font: "600 14px/1 var(--font-body)" },
  md: { padding: "12px 24px", font: "var(--text-button)" },
  lg: { padding: "16px 32px", font: "600 17px/1 var(--font-body)" },
};

function variantStyle(variant) {
  switch (variant) {
    case "secondary":
      return {
        background: "var(--white)",
        color: "var(--text-on-light)",
        border: "1px solid var(--border-on-light)",
      };
    case "ghost":
      return {
        background: "transparent",
        color: "var(--text-on-light)",
        border: "1px solid transparent",
      };
    case "ghost-dark":
      return {
        background: "transparent",
        color: "var(--text-on-dark)",
        border: "1px solid var(--border-on-dark)",
      };
    case "dark":
      return {
        background: "var(--navy-950)",
        color: "var(--white)",
        border: "none",
      };
    case "primary":
    default:
      return {
        backgroundImage: "var(--gradient-orange)",
        color: "var(--brand-primary-text)",
        border: "none",
      };
  }
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  icon = null,
  onClick,
  style,
  ...rest
}) {
  const vs = variantStyle(variant);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        borderRadius: "var(--radius-pill)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "transform var(--duration-fast) var(--ease-standard), filter var(--duration-fast) var(--ease-standard)",
        ...sizeStyles[size],
        ...vs,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "none"; }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = "brightness(1.06)"; }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
