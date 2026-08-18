import { Link } from 'react-router-dom'
import { ArrowRight } from '@/components/ui/Icons'
import Media from '@/components/ui/Media'
import { latestNews, formatDate } from '@/data/news'

export default function NewsPreview({ items = latestNews(3) }) {
  return (
    <section className="shell pb-16 lg:pb-20" aria-labelledby="news-title">
      <h2 id="news-title" className="text-[32px] font-bold tracking-normal">
        <Link to="/news" className="transition-colors hover:text-steel-600">
          Xəbərlər
        </Link>
      </h2>

      <div className="mt-7 grid gap-tile sm:grid-cols-2 md:grid-cols-3">
        {items.map((n) => (
          <article key={n.slug}>
            <Link to={`/news/${n.slug}`} className="group block">
              <Media
                src={n.image}
                label="Xəbər"
                alt={n.title}
                ratio="16/10"
                w={1200}
                h={750}
                imgClassName="brightness-[0.82] transition-all duration-500 ease-audi
                              group-hover:scale-[1.03] group-hover:brightness-100"
              />

              <p className="mt-4 text-[14.4px] leading-[1.5]">{n.title}</p>
              <span className="link-underline mt-2.5 inline-flex text-[12.8px] font-bold text-ink">
                <time dateTime={n.date}>{formatDate(n.date)}</time>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
