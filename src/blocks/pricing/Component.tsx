'use client'

import { useMemo, useState } from 'react'
import { Tabs } from '@/components/Tabs'
import { Tag } from '@/components/Tag'
import { PricingTable } from '@/components/PricingTable'
import Image from 'next/image'

export interface PricingBlockProps {
  blockType: 'pricing'
  heading: string
  subheading?: string | null
  tabs?: { value: string; label: string }[] | null
  filterTags?: { label: string; selected?: boolean | null }[] | null
  columns?: { key: string; label: string }[] | null
  rowsByTab?: {
    tabValue: string
    rows?: { plan: string; cpu: string; ram: string; disk: string; price: string; highlighted?: boolean | null }[] | null
  }[] | null
  noDataMessage?: string | null
  paymentMethodsLabel?: string | null
  paymentMethods?: { name: string }[] | null
}

const PAYMENT_LOGOS: Record<string, string> = {
  Mastercard: '/images/payment/mastercard.svg',
  VISA: '/images/payment/visa.svg',
  Bitcoin: '/images/payment/bitcoin.svg',
  PayPal: '/images/payment/paypal.svg',
}

export function Pricing({
  heading,
  subheading,
  tabs,
  filterTags,
  columns,
  rowsByTab,
  noDataMessage,
  paymentMethodsLabel,
  paymentMethods,
}: PricingBlockProps) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.value ?? '')

  const rows = useMemo(
    () => rowsByTab?.find((entry) => entry.tabValue === activeTab)?.rows ?? [],
    [rowsByTab, activeTab],
  )

  return (
    <section style={{ padding: 'var(--section-padding-y) 0' }}>
      <div className="ac-container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2 style={{ font: 'var(--text-display-lg)', color: 'var(--text-on-light)' }}>{heading}</h2>
          {subheading ? (
            <p style={{ font: 'var(--text-body-md)', color: 'var(--text-on-light-muted)', marginTop: 12 }}>
              {subheading}
            </p>
          ) : null}
        </div>

        {tabs?.length ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-8)' }}>
            <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          </div>
        ) : null}

        {filterTags?.length ? (
          <div
            style={{
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-8)',
            }}
          >
            {filterTags.map((tag, i) => (
              <Tag key={i} selected={Boolean(tag.selected)}>
                {tag.label}
              </Tag>
            ))}
          </div>
        ) : null}

        {columns?.length ? (
          rows.length ? (
            <PricingTable columns={columns} rows={rows} />
          ) : noDataMessage ? (
            <p
              style={{
                textAlign: 'center',
                font: 'var(--text-body-md)',
                color: 'var(--text-on-light-muted)',
                padding: 'var(--space-10) 0',
              }}
            >
              {noDataMessage}
            </p>
          ) : null
        ) : null}

        {paymentMethods?.length ? (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            {paymentMethodsLabel ? (
              <p
                style={{
                  font: 'var(--text-caption)',
                  color: 'var(--text-on-light-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  marginBottom: 20,
                }}
              >
                {paymentMethodsLabel}
              </p>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              {paymentMethods.map((method) => {
                const logo = PAYMENT_LOGOS[method.name]
                return (
                  <span
                    key={method.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 44,
                      padding: '0 20px',
                      border: '1px solid var(--border-on-light)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--white)',
                    }}
                  >
                    {logo ? (
                      <Image src={logo} alt={method.name} width={48} height={24} style={{ height: 24, width: 'auto' }} />
                    ) : (
                      <span style={{ font: 'var(--text-ui-label)', color: 'var(--text-on-light)' }}>
                        {method.name}
                      </span>
                    )}
                  </span>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
