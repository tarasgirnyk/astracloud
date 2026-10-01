'use client'

import { FieldLabel, useField, useForm } from '@payloadcms/ui'
import type { ArrayFieldClientComponent } from 'payload'
import styles from './admin.module.css'

export const AdminOptionsTable: ArrayFieldClientComponent = ({
  field,
  path: pathFromProps,
  schemaPath: schemaPathFromProps,
}) => {
  const { rows = [], path } = useField({
    hasRows: true,
    potentiallyStalePath: pathFromProps,
  })
  const { addFieldRow, moveFieldRow, removeFieldRow } = useForm()
  const schemaPath = schemaPathFromProps ?? field.name
  const isPower = path.endsWith('powerOptions')

  return (
    <section className={styles.tableField}>
      <FieldLabel
        label={typeof field.label === 'string' ? field.label : field.name}
        required={field.required}
      />
      {field.admin?.description ? (
        <p className={styles.description}>{String(field.admin.description)}</p>
      ) : null}
      <div className={styles.scroller}>
        <table>
          <thead>
            <tr>
              <th>Назва для клієнта</th>
              <th>{isPower ? 'Потужність, W' : 'Значення'}</th>
              <th>Ціна</th>
              <th aria-label="Дії" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <OptionTableRow
                key={row.id}
                index={index}
                isPower={isPower}
                path={path}
                rowCount={rows.length}
                onMove={(direction) =>
                  moveFieldRow({
                    path,
                    moveFromIndex: index,
                    moveToIndex: index + direction,
                  })
                }
                onRemove={() => removeFieldRow({ path, rowIndex: index })}
              />
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className={styles.add}
        onClick={() => addFieldRow({ path, schemaPath })}
      >
        + Додати рядок
      </button>
    </section>
  )
}

function OptionTableRow({
  index,
  isPower,
  onMove,
  onRemove,
  path,
  rowCount,
}: {
  index: number
  isPower: boolean
  onMove: (direction: -1 | 1) => void
  onRemove: () => void
  path: string
  rowCount: number
}) {
  const label = useField<string>({ path: `${path}.${index}.label` })
  const value = useField<number>({ path: `${path}.${index}.value` })
  const price = useField<number>({ path: `${path}.${index}.monthlyPrice` })

  return (
    <tr>
      <td>
        <input value={label.value ?? ''} onChange={(event) => label.setValue(event.target.value)} />
      </td>
      <td>
        <input
          type="number"
          min="0"
          value={value.value ?? 0}
          onChange={(event) => value.setValue(Number(event.target.value))}
        />
      </td>
      <td>
        {isPower ? (
          <span className={styles.automatic}>за формулою</span>
        ) : (
          <input
            type="number"
            min="0"
            step="0.01"
            value={price.value ?? 0}
            onChange={(event) => price.setValue(Number(event.target.value))}
          />
        )}
      </td>
      <td className={styles.actions}>
        <button
          type="button"
          title="Перемістити вгору"
          disabled={index === 0}
          onClick={() => onMove(-1)}
        >
          ↑
        </button>
        <button
          type="button"
          title="Перемістити вниз"
          disabled={index === rowCount - 1}
          onClick={() => onMove(1)}
        >
          ↓
        </button>
        <button type="button" title="Видалити" className={styles.remove} onClick={onRemove}>
          ×
        </button>
      </td>
    </tr>
  )
}
