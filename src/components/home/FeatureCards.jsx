import { useState } from 'react'
import { Link } from 'react-router-dom'
import { heroScene } from '@/lib/media'
import { FEATURE_CARDS } from '@/data/home'


function Card({ card, className = '' }) {
  const generated = heroScene({
    type: card.carType,
    label: card.imageLabel,
    tone: 'dark',
    w: 1400,
    h: 900,
  })

  const [src, setSrc] = useState(
    typeof card.image === 'string' && card.image.startsWith('/') ? card.image : generated,
  )

  return (
    <Link to={card.to} className={`group block card:relative card:isolate ${className}`}>
      
      <div
        className="aspect-[16/10] overflow-hidden bg-steel-300
                   card:absolute card:inset-0 card:-z-10 card:aspect-auto"
      >
        <img
          src={src}
          alt={card.imageLabel ?? card.model}
          onError={() => src !== generated && setSrc(generated)}
          loading="lazy"
          
          className="h-full w-full object-cover transition-all duration-700
                     ease-audi group-hover:scale-105
                     card:brightness-[0.82] card:group-hover:brightness-100"
        />
      </div>

      
      <div
        className="hidden card:absolute card:inset-x-0 card:top-0 card:-z-10 card:block
                   card:h-2/5 card:bg-gradient-to-b card:from-ink/45 card:to-transparent"
        aria-hidden="true"
      />

      <div className="pt-4 text-ink card:p-5 card:text-paper md:p-6 lg:p-11">
        <h3
          className="max-w-[36rem] text-[18.72px] font-bold leading-snug tracking-normal
                     card:drop-shadow"
        >
          {card.heading}
        </h3>
        <p className="mt-2 text-[18.72px] font-bold card:mt-7 card:drop-shadow">
          {card.model}
        </p>
      </div>
    </Link>
  )
}

export default function FeatureCards({ cards = FEATURE_CARDS }) {
  const [left, right] = cards

  return (

    <section className="shell" aria-label="Seçilmiş modellər">
      <div className="grid gap-tile card:[&>*]:min-h-[clamp(300px,34vw,540px)] md:grid-cols-3">
        {left && <Card card={left} className="md:col-span-2" />}
        {right && <Card card={right} />}
      </div>
    </section>
  )
}
