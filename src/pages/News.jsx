import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import { resolveImage } from '@/lib/media'
import { sortedNews, formatDate } from '@/data/news'

export default function News() {
  const items = useMemo(() => sortedNews(), [])

  return (
    <>
      <Seo
        title="Xəbərlər"
        description="Audi Bakı Mərkəzindən son xəbərlər, yeni model təqdimatları və kampaniyalar."
      />
      <BreadcrumbJsonLd items={[{ name: 'Xəbərlər', to: '/news' }]} />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-[100px] text-[14.4px] leading-[2]">
        <h1 className="m-0 text-[28.8px] font-bold tracking-normal">Xəbərlər</h1>

        <ul className="mt-10 grid gap-x-[20px] gap-y-[50px] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <li key={n.slug}>
              <Link to={`/news/${n.slug}`} className="group block text-ink">
                <img
                  src={resolveImage(n.image, { label: n.title, w: 800, h: 440 })}
                  alt={n.title}
                  loading="lazy"
                  className="h-[220px] w-full rounded-[10px] bg-steel-100 object-cover
                             transition-transform duration-700 ease-audi
                             group-hover:scale-[1.02]"
                />

                
                <span className="block pr-[20px]">
                  <span className="mt-[20px] block text-[13.68px] leading-[1.7]">
                    {n.title}
                  </span>
                  <time
                    dateTime={n.date}
                    className="mt-[30px] block text-[10.08px] opacity-50"
                  >
                    {formatDate(n.date)}
                  </time>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
