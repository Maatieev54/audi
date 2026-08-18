import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import CarImage from '@/components/ui/CarImage'
import { ArrowRight, Grid, Menu } from '@/components/ui/Icons'
import { MODELS, FAMILIES } from '@/data/models'
import { formatEur, formatAzn } from '@/data/stock'


function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-steel-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="font-bold">{title}</span>
        <span aria-hidden="true" className="text-[18px] leading-none text-steel-500">
          {open ? '−' : '+'}
        </span>
      </button>

      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}
function CheckOption({ label, checked, onChange, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 leading-tight">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-ink"
      />
      <span className={checked ? 'text-ink' : 'text-steel-700'}>{label}</span>
      {typeof count === 'number' && (
        <span className="ml-auto text-[12px] text-steel-400">{count}</span>
      )}
    </label>
  )
}

export default function Models() {
  
  const [searchParams] = useSearchParams()
  const initialFamily = searchParams.get('family')

  const [families, setFamilies] = useState(
    initialFamily && FAMILIES.includes(initialFamily) ? [initialFamily] : [],
  )
  const [types, setTypes] = useState([])
  const [view, setView] = useState('grid')

  
  const bodyTypes = useMemo(
    () => [...new Set(MODELS.map((m) => m.body).filter(Boolean))].sort(),
    [],
  )

  const visible = useMemo(
    () =>
      MODELS.filter(
        (m) =>
          (families.length === 0 || families.includes(m.family)) &&
          (types.length === 0 || types.includes(m.body)),
      ),
    [families, types],
  )

  const toggle = (list, setList) => (value) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const toggleFamily = toggle(families, setFamilies)
  const toggleType = toggle(types, setTypes)

  const hasFilters = families.length > 0 || types.length > 0
  const reset = () => {
    setFamilies([])
    setTypes([])
  }

  const countByFamily = (f) => MODELS.filter((m) => m.family === f).length
  const countByType = (t) => MODELS.filter((m) => m.body === t).length

  return (
    <>
      <Seo
        title="Model siyahısı"
        description="Audi Bakı Mərkəzində təqdim olunan bütün Audi modelləri: A1-dən R8-ə qədər tam kataloq, texniki göstəricilər və qiymətlər."
      />
      <BreadcrumbJsonLd items={[{ name: 'Model siyahısı', to: '/models' }]} />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-[100px] text-[14.4px] leading-[2]">
        <h1 className="m-0 text-[28.8px] font-bold tracking-normal">Model siyahısı</h1>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-12">
        
          <aside className="lg:w-[240px] lg:shrink-0" aria-label="Filtrlər">
            <FilterGroup title="Modellər">
              
              <div className="grid grid-cols-2 gap-x-4">
                {FAMILIES.map((f) => (
                  <CheckOption
                    key={f}
                    label={f}
                    count={countByFamily(f)}
                    checked={families.includes(f)}
                    onChange={() => toggleFamily(f)}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Gövdə tipi">
              {bodyTypes.map((t) => (
                <CheckOption
                  key={t}
                  label={t}
                  count={countByType(t)}
                  checked={types.includes(t)}
                  onChange={() => toggleType(t)}
                />
              ))}
            </FilterGroup>

            
            {hasFilters && (
              <button type="button" onClick={reset} className="link-underline mt-5 text-ink">
                əvvələ qayıtmaq
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </aside>

          
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between border-b border-steel-200 pb-3">
              <p aria-live="polite" className="text-steel-600">
                {visible.length} model
              </p>

              
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setView('list')}
                  aria-pressed={view === 'list'}
                  aria-label="Siyahı görünüşü"
                  className={`p-2 transition-colors ${
                    view === 'list' ? 'text-ink' : 'text-steel-400 hover:text-steel-700'
                  }`}
                >
                  <Menu className="h-[18px] w-[18px]" />
                </button>
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  aria-pressed={view === 'grid'}
                  aria-label="Qrid görünüşü"
                  className={`p-2 transition-colors ${
                    view === 'grid' ? 'text-ink' : 'text-steel-400 hover:text-steel-700'
                  }`}
                >
                  <Grid className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>

            {visible.length === 0 ? (
              <p className="py-16 text-center text-steel-500">
                Seçilmiş filtrlərə uyğun model tapılmadı.
              </p>
            ) : (
              <ul
                className={
                  view === 'grid'
                    ? 'mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3'
                    : 'mt-8 divide-y divide-steel-100'
                }
              >
                {visible.map((m) => (
                  <li key={m.slug} className={view === 'list' ? 'py-6 first:pt-0' : ''}>
                    <Link
                      to={`/models/${m.slug}`}
                      className={`group block ${
                        view === 'list' ? 'flex items-center gap-6 sm:gap-10' : ''
                      }`}
                    >
                      <CarImage
                        model={m}
                        alt={`Audi ${m.name}`}
                        className={
                          view === 'list'
                            ? 'h-[70px] w-[150px] shrink-0 object-contain transition-transform duration-500 ease-audi group-hover:scale-[1.04]'
                            : 'h-[120px] w-full object-contain transition-transform duration-500 ease-audi group-hover:scale-[1.04]'
                        }
                      />

                      <div className="min-w-0 flex-1">
                        
                        <span className="flex items-center gap-2 font-bold">
                          {m.name}
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-accent" />
                        </span>

                        {m.body && <span className="block text-steel-500">{m.body}</span>}

                        {typeof m.priceEur === 'number' ? (
                          <span className="mt-1 block">
                            <span className="text-steel-500">Qiymət: </span>
                            {formatEur(m.priceEur)}
                            <span className="ml-3 text-steel-500">
                              {formatAzn(m.priceAzn)}
                            </span>
                          </span>
                        ) : (
                          <span className="mt-1 block text-steel-400">
                            Qiymət: sorğu ilə
                          </span>
                        )}

                        {m.specs?.consumption && (
                          <span className="block text-steel-500">
                            Yanacaq sərfiyyatı: {m.specs.consumption}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
