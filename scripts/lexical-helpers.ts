/**
 * Minimal builders for Payload's Lexical richText JSON shape, for seed
 * scripts that need to populate a `richText` field without going through
 * the admin editor. Matches the node shape Payload's default lexicalEditor()
 * features (paragraph/heading/list) read and write.
 */

function textNode(text: string) {
  return { type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 }
}

export function paragraphNode(text: string) {
  return {
    type: 'paragraph',
    version: 1,
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    textStyle: '',
  }
}

export function headingNode(tag: 'h2' | 'h3' | 'h4', text: string) {
  return {
    type: 'heading',
    version: 1,
    tag,
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
  }
}

export function bulletListNode(items: string[]) {
  return {
    type: 'list',
    version: 1,
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    children: items.map((text, i) => ({
      type: 'listitem',
      version: 1,
      value: i + 1,
      children: [textNode(text)],
      direction: 'ltr',
      format: '',
      indent: 0,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
  }
}

/**
 * Table builders matching @lexical/table's SerializedTableCellNode /
 * SerializedTableRowNode / SerializedTableNode shape (Payload's
 * EXPERIMENTAL_TableFeature). headerState follows Lexical's convention:
 * 0 = normal cell, 1 = row header, 2 = column header, 3 = both.
 */
export function tableCellNode(text: string, opts: { header?: boolean; colSpan?: number } = {}) {
  return {
    type: 'tablecell',
    version: 1,
    colSpan: opts.colSpan ?? 1,
    rowSpan: 1,
    headerState: opts.header ? 1 : 0,
    backgroundColor: null,
    children: [paragraphNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
  }
}

export function tableRowNode(cells: ReturnType<typeof tableCellNode>[]) {
  return {
    type: 'tablerow',
    version: 1,
    children: cells,
    direction: 'ltr',
    format: '',
    indent: 0,
  }
}

export function tableNode(rows: ReturnType<typeof tableRowNode>[]) {
  return {
    type: 'table',
    version: 1,
    children: rows,
    direction: 'ltr',
    format: '',
    indent: 0,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function richTextDoc(children: any[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
    },
  }
}
