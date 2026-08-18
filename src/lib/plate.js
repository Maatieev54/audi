
export function plateParts(value) {
  const s = String(value ?? '')
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, '')

  let region = ''
  let letters = ''
  let serial = ''

  for (const ch of s) {
    const isDigit = ch >= '0' && ch <= '9'

  
    if (region.length < 2) {
      if (isDigit) region += ch
      continue
    }
    if (letters.length < 2) {
      if (!isDigit) letters += ch
      continue
    }
    if (serial.length < 3 && isDigit) serial += ch
  }

  return { region, letters, serial }
}


export function formatPlate(value) {
  const { region, letters, serial } = plateParts(value)
  return [region, letters, serial].filter(Boolean).join('-')
}

export function isValidPlate(value) {
  const { region, letters, serial } = plateParts(value)
  return (
    region.length === 2 && region !== '00' && letters.length === 2 && serial.length === 3
  )
}

export function validatePlate(value) {
  const raw = String(value ?? '')
  if (!raw.trim()) return undefined 

  const { region, letters, serial } = plateParts(value)

  if (region.length < 2) return 'Region kodu iki rəqəm olmalıdır. Nümunə: 10-AA-123'
  if (region === '00') return 'Region kodu düzgün deyil.'
  if (letters.length < 2) {
    return 'Region kodundan sonra iki hərf yazın (latın). Nümunə: 10-AA-123'
  }
  if (serial.length < 3) {
    const left = 3 - serial.length
    return `Nişan tam deyil — ${left} rəqəm çatmır. Nümunə: 10-AA-123`
  }

  return undefined
}
