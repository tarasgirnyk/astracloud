'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { calculateColocationPrice } from './calculate'
import styles from './styles.module.css'
import { BookingModal } from './BookingModal'

interface PriceOption {
  label: string
  value: number
  monthlyPrice?: number
}

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
  electricitySettings: {
    pricePerKwh: number
    hoursPerDay: number
    daysPerMonth: number
    formula: string
  }
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
    calculationDetails?: string | null
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function ColocationCalculator(props: ColocationCalculatorBlockProps) {
  const t = useTranslations('colocationBooking')
  const { unitSettings, labels } = props
  const [units, setUnits] = useState(() =>
    clamp(unitSettings.defaultValue, unitSettings.minimum, unitSettings.maximum),
  )
  const [powerInput, setPowerInput] = useState(() => String(props.powerOptions[0]?.value ?? 0))
  const [ipIndex, setIpIndex] = useState(0)
  const [speedIndex, setSpeedIndex] = useState(0)
  const [comment, setComment] = useState('')
  const powerW = Math.max(0, Number(powerInput) || 0)

  const total = useMemo(
    () =>
      calculateColocationPrice({
        units,
        monthlyPricePerUnit: unitSettings.monthlyPricePerUnit,
        installationPrice: props.installationPrice,
        electricityPricePerKwh: props.electricitySettings.pricePerKwh,
        hoursPerDay: props.electricitySettings.hoursPerDay,
        daysPerMonth: props.electricitySettings.daysPerMonth,
        electricityFormula: props.electricitySettings.formula,
        power: { value: powerW },
        ip: {
          value: props.ipOptions[ipIndex]?.value ?? 0,
          monthlyPrice: props.ipOptions[ipIndex]?.monthlyPrice ?? 0,
        },
        speed: {
          value: props.speedOptions[speedIndex]?.value ?? 0,
          monthlyPrice: props.speedOptions[speedIndex]?.monthlyPrice ?? 0,
        },
      }),
    [
      ipIndex,
      powerW,
      props.electricitySettings,
      props.installationPrice,
      props.ipOptions,
      props.speedOptions,
      speedIndex,
      unitSettings,
      units,
    ],
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

            <div className={styles.field}>
              <label htmlFor="colocation-power">{labels.power}</label>
              <small id="colocation-power-hint" className={styles.fieldHint}>
                Сумарна потужність БЖ усіх пристроїв. Якщо пристрій має два БЖ — враховуйте лише
                один.
              </small>
              <div className={styles.numberInput}>
                <input
                  id="colocation-power"
                  aria-describedby="colocation-power-hint"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={powerInput}
                  onChange={(event) => {
                    const nextValue = event.target.value
                    if (nextValue === '') {
                      setPowerInput('')
                      return
                    }
                    setPowerInput(String(Math.max(0, event.target.valueAsNumber)))
                  }}
                />
                <span aria-hidden="true">W</span>
              </div>
            </div>
            <OptionSelect
              id="colocation-ip"
              label={labels.ip}
              options={props.ipOptions}
              value={ipIndex}
              onChange={setIpIndex}
            />
            <OptionSelect
              id="colocation-speed"
              label={labels.speed}
              options={props.speedOptions}
              value={speedIndex}
              onChange={setSpeedIndex}
            />
            <div className={styles.field}>
              <label htmlFor="colocation-comment">{t('comment')}</label>
              <textarea
                id="colocation-comment"
                maxLength={2000}
                rows={4}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder={t('commentPlaceholder')}
              />
            </div>
          </div>

          <aside className={styles.summary} aria-live="polite">
            <span>{labels.monthlyTotal}</span>
            <strong className={styles.totalPrice}>
              {money.format(monthlyTotal)} {labels.currency}
            </strong>
            <small>{labels.monthlySuffix}</small>
            <div className={styles.setup}>
              <span>{labels.setupTotal}</span>
              <b>
                {money.format(setupTotal)} {labels.currency}
              </b>
            </div>
            <div className={styles.calculationDetails}>
              <strong>{labels.calculationDetails ?? 'Деталі розрахунку'}</strong>
              <dl>
                <div>
                  <dt>{unitSettings.label}:</dt>
                  <dd>{units}U</dd>
                </div>
                <div>
                  <dt>{labels.power}:</dt>
                  <dd>{powerW} W</dd>
                </div>
                <div>
                  <dt>{labels.ip}:</dt>
                  <dd>{props.ipOptions[ipIndex]?.label ?? ''}</dd>
                </div>
                <div>
                  <dt>{labels.speed}:</dt>
                  <dd>{props.speedOptions[speedIndex]?.label ?? ''}</dd>
                </div>
                <div>
                  <dt>{labels.monthlyTotal}:</dt>
                  <dd>{`${monthlyTotal} ${labels.currency}`}</dd>
                </div>
                <div>
                  <dt>{labels.setupTotal}:</dt>
                  <dd>{`${setupTotal} ${labels.currency}`}</dd>
                </div>
              </dl>
            </div>
            {labels.vatNote ? <p>{labels.vatNote}</p> : null}
            <BookingModal
              comment={comment}
              configuration={{
                units,
                power: `${powerW} W`,
                ip: props.ipOptions[ipIndex]?.label ?? '',
                speed: props.speedOptions[speedIndex]?.label ?? '',
                monthlyTotal,
                setupTotal,
                currency: labels.currency,
              }}
            />
          </aside>
        </div>

        <div className={styles.instructions}>
          <strong>{t('instructionTitle')}</strong>
          <span>{t('instructionIntro')}</span>
          <ul>
            <li>{t('instructions.units')}</li>
            <li>{t('instructions.power')}</li>
            <li>{t('instructions.ip')}</li>
            <li>{t('instructions.speed')}</li>
            <li>{t('instructions.comment')}</li>
          </ul>
          <p>{t('instructionResult')}</p>
        </div>
      </div>
    </section>
  )
}

function OptionSelect({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string
  label: string
  options: PriceOption[]
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
