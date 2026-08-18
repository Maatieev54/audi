import { Link } from 'react-router-dom'
import { ArrowRight } from '@/components/ui/Icons'
import { bannerImage } from '@/lib/media'
import { PROMOS } from '@/data/home'

export default function PromoGrid({ items = PROMOS }) {
  return (

    <section className="shell pb-14 pt-3 lg:pb-16" aria-label="Kampaniyalar">
      <div className="grid gap-tile sm:grid-cols-2 md:grid-cols-3">
        {items.map((p) => (
          <Link key={p.id} to={p.to} className="group block">
            <div className="overflow-hidden bg-steel-100" style={{ aspectRatio: '16/10' }}>
              <img
                src={bannerImage({
                  image: p.image,
                  carType: p.carType,
                  label: p.imageLabel,
                  tone: 'light',
                  w: 1200,
                  h: 750,
                })}
                alt={p.imageLabel}
                loading="lazy"
                className="h-full w-full object-cover brightness-[0.82] transition-all
                           duration-500 ease-audi group-hover:scale-[1.03]
                           group-hover:brightness-100"
              />
            </div>
            <p className="mt-4 text-[14.4px] leading-[1.5]">{p.text}</p>
            <span className="link-underline mt-2.5 inline-flex text-[12.8px] font-bold text-ink">
              daha ətraflı
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
