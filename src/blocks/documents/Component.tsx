'use client'

import { useState } from 'react'

export interface DocumentsBlockProps {
  blockType: 'documents'
  heading: string
  intro?: string | null
  items?: { title: string; fileUrl: string }[] | null
  viewLinkLabel?: string | null
  downloadLinkLabel?: string | null
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

function isImageFile(url: string): boolean {
  const lower = url.toLowerCase()
  return IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

export function Documents({ heading, intro, items, viewLinkLabel, downloadLinkLabel }: DocumentsBlockProps) {
  const documents = items ?? []
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = documents[selectedIndex]

  return (
    <>
      <section
        style={{
          padding: 'var(--space-16) 0',
          background: 'var(--paper)',
          borderBottom: '1px solid var(--border-on-light)',
        }}
      >
        <div className="ac-container">
          <h1
            style={{
              font: '800 2.75rem/1.15 var(--font-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-on-light)',
              margin: 0,
            }}
          >
            {heading}
          </h1>
        </div>
      </section>

      <section style={{ padding: 'calc(var(--section-padding-y) / 2) 0 var(--section-padding-y)' }}>
        <div
          className="ac-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr',
            gap: 'var(--space-16)',
            alignItems: 'start',
          }}
        >
          <div>
            {intro ? (
              <p
                style={{
                  font: 'var(--text-body-md)',
                  color: 'var(--text-on-light-muted)',
                  margin: '0 0 var(--space-8)',
                }}
              >
                {intro}
              </p>
            ) : null}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {documents.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: i === selectedIndex ? '1px solid var(--brand-primary)' : '1px solid var(--border-on-light)',
                    background: 'var(--white)',
                  }}
                >
                  <span style={{ font: 'var(--text-ui-label)', color: 'var(--text-on-light)' }}>{item.title}</span>
                  <span style={{ display: 'flex', gap: 12, flex: 'none' }}>
                    {viewLinkLabel ? (
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(i)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          color: 'var(--brand-primary)',
                          font: 'var(--text-caption)',
                        }}
                      >
                        {viewLinkLabel}
                      </button>
                    ) : null}
                    {downloadLinkLabel ? (
                      <a
                        href={item.fileUrl}
                        download
                        style={{ color: 'var(--text-on-light-muted)', font: 'var(--text-caption)' }}
                      >
                        {downloadLinkLabel}
                      </a>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {selected ? (
              <>
                <p
                  style={{
                    font: 'var(--text-caption)',
                    color: 'var(--text-on-light-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-eyebrow)',
                    marginBottom: 12,
                  }}
                >
                  {selected.title}
                </p>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '3 / 4',
                    border: '1px solid var(--border-on-light)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--white)',
                    overflow: 'hidden',
                  }}
                >
                  {isImageFile(selected.fileUrl) ? (
                    // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-provided file path, not worth next/image config here
                    <img
                      src={selected.fileUrl}
                      alt={selected.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <iframe
                      src={selected.fileUrl}
                      title={selected.title}
                      style={{ display: 'block', width: '100%', height: '100%', border: 'none' }}
                    />
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}
