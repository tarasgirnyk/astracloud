export interface PricingColumn {
  key: string
  label: string
}

export interface PricingRow {
  [key: string]: string | boolean | null | undefined
  plan: string
  highlighted?: boolean | null
}

export interface PricingTableProps {
  columns: PricingColumn[]
  rows: PricingRow[]
}

export function PricingTable({ columns, rows }: PricingTableProps) {
  if (!rows.length) {
    return null
  }

  return (
    <div
      style={{
        overflowX: 'auto',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-on-light)',
        background: 'var(--white)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  textAlign: 'left',
                  padding: '16px 20px',
                  font: 'var(--text-ui-label)',
                  color: 'var(--text-on-light-muted)',
                  borderBottom: '1px solid var(--border-on-light)',
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.plan}
              style={{
                background: row.highlighted ? 'rgba(255,112,22,0.06)' : 'transparent',
              }}
            >
              {columns.map((column, i) => (
                <td
                  key={column.key}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--border-on-light)',
                    font: i === 0 ? 'var(--text-ui-label)' : 'var(--text-body-sm)',
                    color: row.highlighted && i === 0 ? 'var(--brand-primary)' : 'var(--text-on-light)',
                  }}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
