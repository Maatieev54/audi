import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CarImage from '@/components/ui/CarImage'
import { ArrowRight } from '@/components/ui/Icons'
import { modelsByFamily } from '@/data/models'
import { panelInfo } from '@/data/family-panel'
import { formatEur, formatAzn } from '@/data/stock'

export default function FamilyPanel({ family, onNavigate }) {
  const items = modelsByFamily(family)
  const [active, setActive] = useState(0)

  useEffect(() => setActive(0), [family])

  if (!items.length) return null

  const current = items[active] ?? items[0]
  const info = panelInfo(current.slug)
  const hasPrice = typeof current.priceEur === 'number'

  return (
    <div className="shell grid gap-8 py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14 lg:py-10">
      
      <ul className="min-w-0 self-start">
        {items.map((m, i) => (
          <li key={m.slug}>
            <Link
              to={`/models/${m.slug}`}
              onClick={onNavigate}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`flex items-center gap-4 border-b border-steel-100 py-2.5
                          text-[15.36px] transition-colors ${
                            i === active ? 'text-ink' : 'text-steel-700 hover:text-ink'
                          }`}
            >
              
              <CarImage
                model={m}
                alt=""
                aria-hidden="true"
                className="h-9 w-[74px] shrink-0 object-contain"
              />
              <span className="min-w-0 flex-1 truncate">{m.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      
      <div className="min-w-0">
        <Link to={`/models/${current.slug}`} onClick={onNavigate} className="group block">
          <img
            key={current.slug}
            src={`/images/models/preview/${current.slug}.webp`}
            alt={`Audi ${current.name}`}
            width="820"
            height="315"
            loading="lazy"
            className="aspect-[820/315] w-full animate-fadeIn bg-steel-100 object-cover"
          />
          <h3 className="mt-4 flex items-center gap-2 text-[19.2px] font-bold">
            {current.name}
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </h3>
        </Link>
        {hasPrice && (
          <p className="mt-2 text-[16px]">
            {formatEur(current.priceEur)}
            <span className="ml-3 text-steel-500">{formatAzn(current.priceAzn)}</span>
          </p>
        )}
        {info.engine && (
          <div className="mt-3 text-[14.4px] leading-relaxed text-steel-600">
            <p>Mühərrik - {info.engine}</p>
            {info.power && <p>Gücü - {info.power}</p>}
            {info.drive && <p>Ötürmə - {info.drive}</p>}
          </div>
        )}
        {info.warranty && (
          <p className="mt-3 text-[14.4px] text-steel-500">{info.warranty}</p>
        )}

        <Link
          to={`/models/${current.slug}`}
          onClick={onNavigate}
          className="link-underline mt-5 inline-flex text-[14.4px] text-ink"
        >
          Səhifəyə keç
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
