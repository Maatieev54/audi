import { useState } from 'react'

/**
 * @param {object} initial 
 * @param {(values) => object} validate  
 * @param {(values) => Promise<void>} onSubmit
 */
export default function useForm({ initial, validate, onSubmit }) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') 

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setField(name, type === 'checkbox' ? checked : value)
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    if (validate) {
      const all = validate(values)
      if (all[name]) setErrors((prev) => ({ ...prev, [name]: all[name] }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const found = validate ? validate(values) : {}
    const clean = Object.fromEntries(
      Object.entries(found).filter(([, v]) => Boolean(v)),
    )

    setErrors(clean)
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])))

    if (Object.keys(clean).length > 0) {
      const first = document.querySelector(`[name="${Object.keys(clean)[0]}"]`)
      first?.focus()
      return
    }

    try {
      setStatus('sending')
      await onSubmit(values)
      setStatus('success')
      setValues(initial)
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }
  const isValid = validate ? !Object.values(validate(values)).some(Boolean) : true

  return {
    values,
    errors,
    touched,
    status,
    isValid,
    setField,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  }
}


export const required = (v) => (!v || !String(v).trim() ? 'Bu sahə mütləqdir.' : undefined)

const NAME_ALLOWED = /^\p{L}+(?:[ '’-]\p{L}+)*$/u
const NAME_STRIP = /[^\p{L} '’-]/gu

export const sanitizeName = (v) =>
  String(v ?? '')
    .replace(NAME_STRIP, '')
    .replace(/\s{2,}/g, ' ')
    .slice(0, 60)

export const personName = (v) => {
  const s = String(v ?? '').trim()
  if (!s) return undefined

  if (/\d/.test(s)) return 'Ad və soyadda rəqəm ola bilməz.'
  if (!NAME_ALLOWED.test(s)) return 'Yalnız hərflər, boşluq və defis işlədilə bilər.'

  const words = s.split(/\s+/).filter(Boolean)
  if (words.length < 2) return 'Ad və soyadı tam yazın.'

  const lettersOf = (w) => w.replace(/[^\p{L}]/gu, '')
  if (words.some((w) => lettersOf(w).length < 2)) {
    return 'Hər ad ən azı 2 hərfdən olmalıdır.'
  }

  return undefined
}

export const nameWord = (v) => {
  const s = String(v ?? '').trim()
  if (!s) return undefined

  if (/\d/.test(s)) return 'Rəqəm ola bilməz.'
  if (!NAME_ALLOWED.test(s)) return 'Yalnız hərflər işlədilə bilər.'
  if (s.replace(/[^\p{L}]/gu, '').length < 2) return 'Ən azı 2 hərf olmalıdır.'

  return undefined
}
const EMAIL_RE = /^[^\s@,;:()[\]<>"\\]+@[^\s@.]+(?:\.[^\s@.]+)*\.\p{L}{2,}$/u

export const email = (v) => {
  const s = String(v ?? '').trim()
  if (!s) return undefined
  if (s.length > 100) return 'E-poçt ünvanı çox uzundur.'
  if (s.includes('..')) return 'E-poçt ünvanı düzgün deyil.'
  return EMAIL_RE.test(s) ? undefined : 'E-poçt ünvanı düzgün deyil. Nümunə: ad@domen.az'
}

export const BUSINESS = {
  openHour: 9,
  closeHour: 18,
  closedWeekdays: [0], 
  maxDaysAhead: 60,
}

const pad = (n) => String(n).padStart(2, '0')

const toLocalInput = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`

export function earliestSlot() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  d.setHours(BUSINESS.openHour, 0, 0, 0)
  return toLocalInput(d)
}

export function latestSlot() {
  const d = new Date()
  d.setDate(d.getDate() + BUSINESS.maxDaysAhead)
  d.setHours(BUSINESS.closeHour, 0, 0, 0)
  return toLocalInput(d)
}

export const appointmentSlot = (v) => {
  const s = String(v ?? '').trim()
  if (!s) return undefined

  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return 'Tarix və saatı düzgün seçin.'

  const now = new Date()
  if (d <= now) return 'Keçmiş tarix seçilə bilməz.'

  const limit = new Date()
  limit.setDate(limit.getDate() + BUSINESS.maxDaysAhead)
  if (d > limit) return `Ən çox ${BUSINESS.maxDaysAhead} gün sonrasına yazıla bilər.`

  if (BUSINESS.closedWeekdays.includes(d.getDay())) {
    return 'Bazar günü salon işləmir. Başqa gün seçin.'
  }

  const hour = d.getHours() + d.getMinutes() / 60
  if (hour < BUSINESS.openHour || hour > BUSINESS.closeHour) {
    return `Qəbul saatları: ${BUSINESS.openHour}:00 – ${BUSINESS.closeHour}:00.`
  }

  return undefined
}

export const minLen = (n) => (v) =>
  !v || String(v).trim().length >= n ? undefined : `Ən azı ${n} simvol olmalıdır.`

export const maxLen = (n) => (v) =>
  !v || String(v).trim().length <= n ? undefined : `Ən çox ${n} simvol ola bilər.`

export { validateAzPhone as phone } from '../lib/phone.js'
