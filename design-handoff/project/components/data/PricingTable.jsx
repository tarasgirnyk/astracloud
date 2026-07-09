import React from "react";

export function PricingTable({ columns = [], rows = [], highlightRow = null, style }) {
  return (
    <div style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border-on-light)", overflow: "hidden", background: "var(--white)", ...style }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", font: "var(--text-body-sm)" }}>
          <thead>
            <tr style={{ background: "var(--gray-100)" }}>
              {columns.map((col) => (
                <th key={col.key} style={{ textAlign: "left", padding: "16px 20px", font: "var(--text-ui-label)", color: "var(--text-on-light-muted)", whiteSpace: "nowrap" }}>
                  {col.label}
                </th>
              ))}
              <th style={{ padding: "16px 20px" }} />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                style={{
                  background: row.plan === highlightRow ? "rgba(255,112,22,0.06)" : "transparent",
                  borderTop: "1px solid var(--border-on-light)",
                }}
              >
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: "16px 20px", color: "var(--text-on-light)", whiteSpace: "nowrap" }}>
                    {col.key === "plan" ? (
                      <span style={{ font: "var(--text-ui-label)" }}>{row[col.key]}</span>
                    ) : col.key === "price" ? (
                      <span style={{ font: "700 17px/1 var(--font-body)", color: "var(--text-on-light)" }}>{row[col.key]}</span>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
                <td style={{ padding: "12px 20px", textAlign: "right" }}>
                  <button
                    style={{
                      padding: "8px 20px",
                      borderRadius: "var(--radius-pill)",
                      border: "none",
                      cursor: "pointer",
                      font: "600 14px/1 var(--font-body)",
                      backgroundImage: "var(--gradient-orange)",
                      color: "var(--white)",
                    }}
                  >
                    Замовити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
