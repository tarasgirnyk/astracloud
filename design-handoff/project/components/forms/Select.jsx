import React, { useState, useRef, useEffect } from "react";

export function Select({ label, options = [], value, onChange, style }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={rootRef} style={{ position: "relative", display: "flex", flexDirection: "column", gap: "6px", ...style }}>
      {label && <span style={{ font: "var(--text-ui-label)", color: "var(--text-on-light)" }}>{label}</span>}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          padding: "6px 10px",
          borderRadius: "var(--radius-pill)",
          border: "1px solid var(--border-on-light)",
          font: "var(--text-body-sm)",
          color: "var(--text-on-light)",
          background: "var(--white)",
          outline: "none",
          cursor: "pointer",
          transition: "border-color var(--duration-fast) var(--ease-standard)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {selected?.flag && <img src={selected.flag} alt="" style={{ width: "18px", height: "13px", objectFit: "cover", borderRadius: "2px" }} />}
          {selected ? selected.label : ""}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform var(--duration-fast) var(--ease-standard)" }}>
          <path d="M1 1L5 5L9 1" stroke="var(--text-on-light-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            minWidth: "100%",
            zIndex: 100,
            background: "var(--white)",
            border: "1px solid var(--border-on-light)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-popover)",
            padding: "6px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange && onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 10px",
                  borderRadius: "var(--radius-md)",
                  font: "var(--text-body-sm)",
                  color: isSelected ? "var(--brand-primary)" : "var(--text-on-light)",
                  background: isSelected ? "rgba(255,112,22,0.08)" : "transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "var(--gray-100)"; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
              >
                {opt.flag && <img src={opt.flag} alt="" style={{ width: "18px", height: "13px", objectFit: "cover", borderRadius: "2px" }} />}
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
