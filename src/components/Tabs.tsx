'use client'

export interface TabItem {
  value: string
  label: string
}

export interface TabsProps {
  tabs: TabItem[]
  active: string
  onChange: (value: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex',
        padding: 4,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--gray-100)',
        border: '1px solid var(--border-on-light)',
        gap: 4,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === active
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              cursor: 'pointer',
              font: 'var(--text-ui-label)',
              color: isActive ? 'var(--brand-primary-text)' : 'var(--text-on-light)',
              background: isActive ? 'var(--brand-primary)' : 'transparent',
              transition: 'background var(--duration-fast) var(--ease-standard)',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
