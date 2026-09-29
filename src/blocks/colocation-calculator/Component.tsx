'use client'

import { useMemo, useState } from 'react'
import { calculateColocationPrice } from './calculate'
import styles from './styles.module.css'
import { BookingModal } from './BookingModal'

interface PriceOption {
  label: string
  value: number
  monthlyPrice: number
}

const EMPTY_OPTION: PriceOption = { label: '', value: 0, monthlyPrice: 0 }

export interface ColocationCalculatorBlockProps {
  blockType: 'colocation-calculator'
  heading: string
  subheading?: string | null
  unitSettings: {
    label: string
    minimum: number
    maximum: number
    defaultValue: number
    monthlyPricePerUnit: number
  }
  installationPrice: number
  powerOptions: PriceOption[]
  ipOptions: PriceOption[]
  speedOptions: PriceOption[]
  labels: {
    power: string
    ip: string
    speed: string
    monthlyTotal: string
    setupTotal: string
    currency: string
    monthlySuffix: string
    vatNote?: string | null
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function ColocationCalculator(props: ColocationCalculatorBlockProps) {
  const { unitSettings, labels } = props
  const [units, setUnits] = useState(() => clamp(unitSettings.defaultValue, unitSettings.minimum, unitSettings.maximum))
  const [powerIndex, setPowerIndex] = useState(0)
  const [ipIndex, setIpIndex] = useState(0)
  const [speedIndex, setSpeedIndex] = useState(0)

  const total = useMemo(
    () =>
      calculateColocationPrice({
        units,
        monthlyPricePerUnit: unitSettings.monthlyPricePerUnit,
        installationPrice: props.installationPrice,
        power: props.powerOptions[powerIndex] ?? EMPTY_OPTION,
        ip: props.ipOptions[ipIndex] ?? EMPTY_OPTION,
        speed: props.speedOptions[speedIndex] ?? EMPTY_OPTION,
      }),
    [ipIndex, powerIndex, props.installationPrice, props.ipOptions, props.powerOptions, props.speedOptions, speedIndex, unitSettings, units],
  )

  const money = new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 })
  const monthlyTotal = Math.round(total.monthly)
  const setupTotal = Math.round(total.setup)

  return (
    <section className={styles.section}>
      <div className="ac-container">
        <header className={styles.header}>
          <h2>{props.heading}</h2>
          {props.subheading ? <p>{props.subheading}</p> : null}
        </header>

        <div className={styles.calculator}>
          <div className={styles.controls}>
            <div className={styles.field}>
              <div className={styles.fieldHeader}>
                <label htmlFor="colocation-units">{unitSettings.label}</label>
                <output>{units}U</output>
              </div>
              <input
                id="colocation-units"
                type="range"
                min={unitSettings.minimum}
                max={unitSettings.maximum}
                value={units}
                onChange={(event) => setUnits(Number(event.target.value))}
              />
              <div className={styles.rangeLimits}>
                <span>{unitSettings.minimum}U</span>
                <span>{unitSettings.maximum}U</span>
              </div>
            </div>

            <OptionSelect id="colocation-power" label={labels.power} options={props.powerOptions} value={powerIndex} onChange={setPowerIndex} />
            <OptionSelect id="colocation-ip" label={labels.ip} options={props.ipOptions} value={ipIndex} onChange={setIpIndex} />
            <OptionSelect id="colocation-speed" label={labels.speed} options={props.speedOptions} value={speedIndex} onChange={setSpeedIndex} />
          </div>

          <aside className={styles.summary} aria-live="polite">
            <span>{labels.monthlyTotal}</span>
            <strong className={styles.totalPrice}>{money.format(monthlyTotal)} {labels.currency}</strong>
            <small>{labels.monthlySuffix}</small>
            <div className={styles.setup}>
              <span>{labels.setupTotal}</span>
              <b>{money.format(setupTotal)} {labels.currency}</b>
            </div>
            {labels.vatNote ? <p>{labels.vatNote}</p> : null}
            <BookingModal configuration={{
              units,
              power: props.powerOptions[powerIndex]?.label ?? '',
              ip: props.ipOptions[ipIndex]?.label ?? '',
              speed: props.speedOptions[speedIndex]?.label ?? '',
              monthlyTotal,
              setupTotal,
              currency: labels.currency,
            }} />
          </aside>
        </div>
      </div>
    </section>
  )
}

function OptionSelect({ id, label, options, value, onChange }: { id: string; label: string; options: PriceOption[]; value: number; onChange: (value: number) => void }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {options.map((option, index) => <option key={`${option.value}-${index}`} value={index}>{option.label}</option>)}
      </select>
    </div>
  )
}
