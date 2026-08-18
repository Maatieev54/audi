import { useState } from 'react'
import { Link } from 'react-router-dom'
import { heroScene } from '@/lib/media'
import { HERO } from '@/data/home'

export default function Hero({ data = HERO }) {
  const generated = heroScene({
    type: data.carType,
    label: data.imageLabel,
    tone: 'dark',
    w: 1920,
    h: 1080,
  })

  const [src, setSrc] = useState(
    typeof data.image === 'string' && data.image.startsWith('/') ? data.image : generated,
  )

  return (
    <section className="relative isolate" aria-label={data.subtitle}>
      <div className="relative">
        
        <div
          className="relative max-h-[82vh] w-full overflow-hidden bg-steel-800"
          style={{ aspectRatio: data.aspect ?? '1200 / 587' }}
        >
          <img
            src={src}
            alt={data.imageLabel ?? data.subtitle}
            onError={() => src !== generated && setSrc(generated)}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />

        </div>
        <div className="card:absolute card:inset-x-0 card:top-0">
          <div className="shell pb-12 pt-6 card:pb-0 card:pt-8 xl:pt-11">
            <div className="max-w-2xl text-ink card:text-paper">
             
              <h1
                className="text-[27.2px] font-bold leading-snug tracking-normal
                           card:drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
              >
                {data.title}
              </h1>
              <p
                className="mt-[30px] text-[19.2px] font-bold
                           card:drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
              >
                {data.subtitle}
              </p>

              {data.cta && (
                <Link
                  to={data.cta.to}
                  className="mt-[30px] inline-block border px-[15px] pb-[13px] pt-[10px]
                             text-[16px] transition-colors duration-300
                             border-ink bg-ink text-paper hover:bg-steel-800
                             card:border-paper/60 card:bg-ink/30 card:text-paper
                             card:hover:bg-ink"
                >
                  {data.cta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
