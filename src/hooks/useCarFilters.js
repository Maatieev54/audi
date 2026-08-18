import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MODELS } from '@/data/models'

const EMPTY = {
  family: '',
  fuel: '',
  year: '',
  engine: '',
  color: '',
  priceMax: '',
  mileageMax: '',
  q: '',
  model: '',
}

function normalize(s) {
  return String(s)
    .toLocaleLowerCase('az')
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .trim()
}

export default function useCarFilters(cars) {
  const [params, setParams] = useSearchParams()

  const filters = useMemo(() => {
    const f = { ...EMPTY }
    for (const key of Object.keys(EMPTY)) {
      f[key] = params.get(key) ?? ''
    }
    return f
  }, [params])

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const reset = () => setParams(new URLSearchParams(), { replace: true })
  const options = useMemo(
    () => ({
      families: [...new Set(cars.map((c) => c.family))].sort(),
      fuels: [...new Set(cars.map((c) => c.fuel))].sort(),
      years: [...new Set(cars.map((c) => c.year))].sort((a, b) => b - a),
      engines: [...new Set(cars.map((c) => c.engine))].sort(),
      colors: [...new Set(cars.map((c) => c.color))].sort(),
    }),
    [cars],
  )

  const results = useMemo(() => {
    return cars.filter((c) => {
      if (filters.family && c.family !== filters.family) return false
      if (filters.fuel && c.fuel !== filters.fuel) return false
      if (filters.year && String(c.year) !== filters.year) return false
      if (filters.engine && c.engine !== filters.engine) return false
      if (filters.color && c.color !== filters.color) return false
      if (filters.model && c.modelSlug !== filters.model) return false

      if (filters.priceMax) {
        const max = Number(filters.priceMax)
        if (Number.isFinite(max) && max > 0 && c.priceEur > max) return false
      }

      if (filters.mileageMax) {
        const max = Number(filters.mileageMax)
        if (Number.isFinite(max) && max > 0 && c.mileage > max) return false
      }

      if (filters.q && !normalize(`${c.title} ${c.family}`).includes(normalize(filters.q))) {
        return false
      }

      return true
    })
  }, [cars, filters])
  const activeModelName = filters.model
    ? MODELS.find((m) => m.slug === filters.model)?.name
    : null
  const activeFamily = filters.family || null
  const activeLabel = activeModelName ?? activeFamily

  return {
    filters,
    setFilter,
    reset,
    options,
    results,
    activeModelName,
    activeFamily,
    activeLabel,
  }
}
