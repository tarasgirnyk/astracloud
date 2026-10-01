export const DEFAULT_ELECTRICITY_FORMULA =
  '(powerW / 2 * 31 * 15 * 1.7 * 24) / 1000'

export const FORMULA_VARIABLES = ['powerW', 'hoursPerDay', 'daysPerMonth', 'pricePerKwh'] as const

export type FormulaVariables = Record<(typeof FORMULA_VARIABLES)[number], number>

type Token =
  | { type: 'number'; value: number }
  | { type: 'variable'; value: keyof FormulaVariables }
  | { type: 'operator'; value: string }
  | { type: 'paren'; value: '(' | ')' }

const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2 }

function tokenize(formula: string): Token[] {
  const tokens: Token[] = []
  let index = 0

  while (index < formula.length) {
    const rest = formula.slice(index)
    const whitespace = rest.match(/^\s+/)
    if (whitespace) {
      index += whitespace[0].length
      continue
    }

    const number = rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)/)
    if (number) {
      tokens.push({ type: 'number', value: Number(number[0]) })
      index += number[0].length
      continue
    }

    const identifier = rest.match(/^[A-Za-z][A-Za-z0-9]*/)
    if (identifier) {
      if (!FORMULA_VARIABLES.includes(identifier[0] as keyof FormulaVariables)) {
        throw new Error(`Невідома змінна: ${identifier[0]}`)
      }
      tokens.push({ type: 'variable', value: identifier[0] as keyof FormulaVariables })
      index += identifier[0].length
      continue
    }

    const character = formula[index]
    if (character && '+-*/'.includes(character)) tokens.push({ type: 'operator', value: character })
    else if (character === '(' || character === ')')
      tokens.push({ type: 'paren', value: character })
    else throw new Error(`Недопустимий символ: ${character ?? ''}`)
    index += 1
  }

  return tokens
}

export function evaluateElectricityFormula(formula: string, variables: FormulaVariables): number {
  const output: Token[] = []
  const operators: Token[] = []
  const tokens = tokenize(formula)

  if (tokens.length === 0) throw new Error('Формула порожня')

  for (const token of tokens) {
    if (token.type === 'number' || token.type === 'variable') output.push(token)
    else if (token.type === 'operator') {
      while (operators.length) {
        const top = operators.at(-1)
        if (!top || top.type !== 'operator' || precedence[top.value]! < precedence[token.value]!)
          break
        output.push(operators.pop()!)
      }
      operators.push(token)
    } else if (token.value === '(') operators.push(token)
    else {
      let foundOpening = false
      while (operators.length) {
        const top = operators.pop()!
        if (top.type === 'paren' && top.value === '(') {
          foundOpening = true
          break
        }
        output.push(top)
      }
      if (!foundOpening) throw new Error('Незбалансовані дужки')
    }
  }

  while (operators.length) {
    const token = operators.pop()!
    if (token.type === 'paren') throw new Error('Незбалансовані дужки')
    output.push(token)
  }

  const stack: number[] = []
  for (const token of output) {
    if (token.type === 'number') stack.push(token.value)
    else if (token.type === 'variable') stack.push(variables[token.value])
    else if (token.type === 'operator') {
      const right = stack.pop()
      const left = stack.pop()
      if (left === undefined || right === undefined)
        throw new Error('Некоректний порядок операторів')
      if (token.value === '+') stack.push(left + right)
      if (token.value === '-') stack.push(left - right)
      if (token.value === '*') stack.push(left * right)
      if (token.value === '/') {
        if (right === 0) throw new Error('Ділення на нуль')
        stack.push(left / right)
      }
    }
  }

  if (stack.length !== 1 || !Number.isFinite(stack[0])) throw new Error('Некоректна формула')
  return stack[0]!
}

export function validateElectricityFormula(value: unknown): true | string {
  if (typeof value !== 'string') return 'Вкажіть формулу'
  try {
    evaluateElectricityFormula(value, {
      powerW: 100,
      hoursPerDay: 24,
      daysPerMonth: 30,
      pricePerKwh: 18.7,
    })
    return true
  } catch (error) {
    return error instanceof Error ? error.message : 'Некоректна формула'
  }
}
