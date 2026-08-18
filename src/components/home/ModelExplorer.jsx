import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Close } from '@/components/ui/Icons'
import ModelTile from '@/components/cars/ModelTile'
import CarImage from '@/components/ui/CarImage'
import { groupedModels } from '@/data/models'
import { familyAvailability, formatAzn } from '@/data/stock'

export default function ModelExplorer() {
  const groups = useMemo(() => groupedModels(), [])

  const familyTiles = useMemo(
    () =>
      Object.fromEntries(
        groups.map(({ family, items }) => [family, { family, name: family, body: items[0]?.body }]),
      ),
    [groups],
  )

  const trackRef = useRef(null)
  const [open, setOpen] = useState(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const activeGroup = groups.find((g) => g.family === open)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateArrows()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const scrollByCards = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.7
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' })
  }

  return (
    <section className="py-10 lg:py-14" aria-labelledby="models-title">
      <div className="shell">
        
        <h2 id="models-title" className="text-[16px] tracking-normal">
          Modellər
        </h2>
      </div>

      <div className="shell relative mt-6">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
        >
          {groups.map(({ family }) => {
            const { inStock } = familyAvailability(family)
            const isOpen = open === family

            return (
              <button
                key={family}
                type="button"
                data-card
                onClick={() => setOpen(isOpen ? null : family)}
                aria-expanded={isOpen}
                aria-controls="model-band-panel"
                className="group w-[170px] shrink-0 snap-start text-left sm:w-[196px]"
              >
                <ModelTile
                  model={familyTiles[family]}
                  inStock={inStock}
                  alt={`Audi ${family}`}
                  className="flex h-[104px] items-center justify-center sm:h-[122px]"
                  imgClassName={inStock ? 'group-hover:scale-[1.06]' : ''}
                />
                <p
                  className={`mt-2 text-center text-[16px] transition-colors ${
                    isOpen ? 'text-ink' : 'text-steel-800 group-hover:text-ink'
                  }`}
                >
                  Audi {family}
                </p>
                <span
                  aria-hidden="true"
                  className={`mx-auto mt-1.5 block h-[2px] w-8 transition-all duration-300 ${
                    isOpen ? 'bg-ink opacity-100' : 'bg-ink opacity-0'
                  }`}
                />
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          disabled={!canPrev}
          aria-label="Sola sürüşdür"
          className="absolute left-1 top-[45%] z-10 -translate-y-1/2 bg-paper/90 p-2 text-steel-700
                     transition-opacity hover:text-ink disabled:pointer-events-none
                     disabled:opacity-0"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          disabled={!canNext}
          aria-label="Sağa sürüşdür"
          className="absolute right-1 top-[45%] z-10 -translate-y-1/2 bg-paper/90 p-2 text-steel-700
                     transition-opacity hover:text-ink disabled:pointer-events-none
                     disabled:opacity-0"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
      {activeGroup && (
        <div
          id="model-band-panel"
          role="region"
          aria-label={`Audi ${activeGroup.family} versiyaları`}
          className="shell mt-8 animate-slideDown border-t border-steel-200 pt-7"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[16px] font-bold tracking-normal">Audi {activeGroup.family}</h3>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Bağla"
              className="-mr-2 -mt-1 p-2 text-steel-500 transition-colors hover:text-ink"
            >
              <Close />
            </button>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {activeGroup.items.map((m) => (
              <li key={m.slug}>
                <Link to={`/models/${m.slug}`} className="group block">
                  <div className="flex h-[92px] items-center justify-center overflow-hidden sm:h-[104px]">
                    <CarImage
                      model={m}
                      alt={`Audi ${m.name}`}
                      className="h-full w-full object-contain transition-transform
                                 duration-500 ease-audi group-hover:scale-[1.06]"
                    />
                  </div>
                  <p className="mt-2 text-center text-[16px] text-steel-800 transition-colors group-hover:text-ink">
                    {m.name}
                  </p>

                  {typeof m.priceAzn === 'number' && (
                    <p className="mt-0.5 text-center text-[11px] text-steel-500">
                      {formatAzn(m.priceAzn)}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="shell mt-8">
        <Link to="/models" className="link-underline text-ink">
          Bütün modellər
          <ArrowRight />
        </Link>
      </div>
    </section>
  )
}
