import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

export interface SimpleContentBlockProps {
  blockType: 'simple-content'
  pageTitle?: string | null
  content: SerializedEditorState
}

export function SimpleContent({ pageTitle, content }: SimpleContentBlockProps) {
  return (
    <>
      {pageTitle ? (
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
              {pageTitle}
            </h1>
          </div>
        </section>
      ) : null}

      <section
        className="simple-content"
        style={{ padding: 'calc(var(--section-padding-y) / 2) 0 var(--section-padding-y)' }}
      >
        <style>{`
          .simple-content h3 { font: var(--text-display-sm); color: var(--text-on-light); margin: var(--space-10) 0 12px; }
          .simple-content p { font: var(--text-body-md); color: var(--text-on-light-muted); margin: 0 0 16px; }
          .simple-content ul, .simple-content ol { margin: 0 0 16px; padding-left: 20px; font: var(--text-body-md); color: var(--text-on-light-muted); display: flex; flex-direction: column; gap: 6px; }
          .simple-content a { color: var(--brand-primary); }
          .simple-content .lexical-table-container { overflow-x: auto; margin: 0 0 var(--space-8); border-radius: var(--radius-lg); border: 1px solid var(--border-on-light); }
          .simple-content table.lexical-table { width: 100%; border-collapse: collapse; font: var(--text-body-sm); }
          .simple-content .lexical-table-cell { border: 1px solid var(--border-on-light); padding: 12px 16px !important; color: var(--text-on-light-muted); text-align: left; }
          .simple-content .lexical-table-cell p { margin: 0; color: inherit; font: inherit; }
          .simple-content .lexical-table-cell-header-1,
          .simple-content .lexical-table-cell-header-3 { background: var(--navy-950); color: var(--white) !important; font-weight: 700 !important; }
          .simple-content .lexical-table-row:nth-child(even) .lexical-table-cell:not(.lexical-table-cell-header-1):not(.lexical-table-cell-header-3) { background: var(--paper); }
        `}</style>
        <div className="ac-container">
          <RichText data={content} />
        </div>
      </section>
    </>
  )
}
