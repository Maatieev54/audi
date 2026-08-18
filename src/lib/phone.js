export const AZ_COUNTRY_CODE = '994'
export const AZ_OPERATORS = {
  50: 'Azercell',
  51: 'Azercell',
  10: 'Azercell',
  55: 'Bakcell',
  99: 'Bakcell',
  70: 'Nar',
  77: 'Nar',
}

export const AZ_MOBILE_PREFIXES = Object.keys(AZ_OPERATORS)
const NATIONAL_LENGTH = 9
export function nationalDigits(value) {
  let d = String(value ?? '').replace(/\D/g, '')

  if (d.startsWith(AZ_COUNTRY_CODE)) d = d.slice(AZ_COUNTRY_CODE.length)
  if (d.startsWith('0')) d = d.slice(1)

  return d.slice(0, NATIONAL_LENGTH)
}

export function formatAzPhone(value) {
  const d = nationalDigits(value)
  if (!d) return ''

  const groups = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean)
  return `+${AZ_COUNTRY_CODE} ${groups.join(' ')}`
}

/**
 
 * @param {string} prevValue 
 * @param {string} rawInput  
 */
export function nextPhoneValue(prevValue, rawInput) {
  const prevDigits = nationalDigits(prevValue)
  const nextDigits = nationalDigits(rawInput)

  const digits =
    rawInput.length < String(prevValue ?? '').length && nextDigits === prevDigits
      ? prevDigits.slice(0, -1)
      : nextDigits

  return formatAzPhone(digits)
}

export function toE164(value) {
  const d = nationalDigits(value)
  return d.length === NATIONAL_LENGTH ? `+${AZ_COUNTRY_CODE}${d}` : ''
}

export function operatorOf(value) {
  return AZ_OPERATORS[nationalDigits(value).slice(0, 2)]
}

export function isValidAzPhone(value) {
  const d = nationalDigits(value)
  return d.length === NATIONAL_LENGTH && AZ_MOBILE_PREFIXES.includes(d.slice(0, 2))
}

export function validateAzPhone(value) {
  const raw = String(value ?? '')
  if (!raw.trim()) return undefined

  const d = nationalDigits(value)

  if (!d) return 'Mobil nömrə yalnız rəqəmlərdən ibarət olmalıdır.'

  if (d.length < NATIONAL_LENGTH) {
    const left = NATIONAL_LENGTH - d.length
    return `Nömrə tam deyil — ${left} rəqəm çatmır. Nümunə: +994 99 111 22 33`
  }

  const prefix = d.slice(0, 2)
  if (!AZ_MOBILE_PREFIXES.includes(prefix)) {
    return `“${prefix}” operator kodu yoxdur. Mümkün kodlar: ${AZ_MOBILE_PREFIXES.join(', ')}.`
  }

  return undefined
}
