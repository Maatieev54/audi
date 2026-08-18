import { Link, useParams } from 'react-router-dom'
import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import { ArrowLeft, ArrowRight } from '@/components/ui/Icons'
import { resolveImage } from '@/lib/media'
import { getNews, sortedNews, formatDate, formatDateLong } from '@/data/news'
import { NEWS_BODY } from '@/data/news-body'
import { SITE } from '@/data/site'
import NotFound from './NotFound'


export default function NewsDetail() {
  const { slug } = useParams()
  const item = getNews(slug)

  if (!item) return <NotFound />

  const all = sortedNews()
  const index = all.findIndex((n) => n.slug === slug)
  const prev = all[index - 1]
  const next = all[index + 1]
  const related = all.filter((n) => n.slug !== slug).slice(0, 3)

  
  const body = NEWS_BODY[slug] ?? []
  const firstParagraph = body.find((b) => b.t === 'p')?.x

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    datePublished: item.date,
    dateModified: item.date,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: `${SITE.url}/news/${item.slug}`,
  }

  return (
    <>
      <Seo
        title={item.title}
        description={firstParagraph?.slice(0, 160) ?? item.title}
        type="article"
        jsonLd={jsonLd}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Xəbərlər', to: '/news' },
          { name: item.title, to: `/news/${item.slug}` },
        ]}
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-[100px] text-[14.4px] leading-[2]">
        
        <h1 className="m-0 text-[28.8px] font-bold tracking-normal">
          <Link to="/news" className="transition-opacity hover:opacity-60">
            Xəbərlər
          </Link>
        </h1>

        
        <div className="mt-8 text-[12.96px] leading-[1.8]">
          <h2 className="text-[19.44px] font-bold leading-snug tracking-normal">
            
            <span className="opacity-20">{formatDateLong(item.date)} // </span>
            {item.title}
          </h2>

          <div className="mt-6 max-w-[900px]">
            
            <img
              src={resolveImage(item.image, { label: item.title, w: 1600, h: 900, tone: 'dark' })}
              alt={item.title}
              className="my-[20px] w-full rounded-[10px] bg-steel-100"
            />
            {body.map((b, i) => {
              if (b.t === 'ul') {
                return (
                  <ul key={i} className="my-4 list-none p-0">
                    {b.x.map((li, k) => (
                      <li
                        key={k}
                        className="p-2 [background:linear-gradient(to_right,rgba(237,237,237,0.65)_0%,rgba(255,255,255,0)_100%)]"
                      >
                        {li}
                      </li>
                    ))}
                  </ul>
                )
              }

              if (b.t === 'img') {
                return (
                  <img
                    key={i}
                    src={b.x}
                    alt=""
                    loading="lazy"
                    className="my-[20px] w-full rounded-[10px] bg-steel-100"
                  />
                )
              }

              return (
                <p key={i} className="mb-4">
                  {b.x}
                </p>
              )
            })}
          </div>
        </div>

        
        <nav
          className="mt-14 max-w-[900px] border-t border-steel-200 pt-8"
          aria-label="Xəbərlər arasında keçid"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            {prev ? (
              <Link to={`/news/${prev.slug}`} className="group max-w-xs">
                <span className="inline-flex items-center gap-2 text-[10.08px] opacity-50">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Əvvəlki
                </span>
                <p className="text-[13.68px] leading-[1.7] transition-opacity group-hover:opacity-60">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link to={`/news/${next.slug}`} className="group max-w-xs sm:text-right">
                <span className="inline-flex items-center gap-2 text-[10.08px] opacity-50">
                  Növbəti
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <p className="text-[13.68px] leading-[1.7] transition-opacity group-hover:opacity-60">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </nav>

        
        <section className="mt-14 bg-[#eee] p-[30px]" aria-labelledby="related-title">
          <h2
            id="related-title"
            className="mb-[30px] text-[12.96px] font-normal tracking-normal text-[#737373]"
          >
            Digər xəbərlər
          </h2>

          <ul className="grid gap-x-[20px] gap-y-[30px] sm:grid-cols-3">
            {related.map((n) => (
              <li key={n.slug}>
                <Link to={`/news/${n.slug}`} className="group block text-ink">
                  <img
                    src={resolveImage(n.image, { label: n.title, w: 600, h: 340 })}
                    alt={n.title}
                    loading="lazy"
                    className="h-[140px] w-full rounded-[10px] bg-steel-100 object-cover
                               transition-transform duration-700 ease-audi
                               group-hover:scale-[1.02]"
                  />
                  <span className="mt-[20px] block text-[13.68px] leading-[1.7]">
                    {n.title}
                  </span>
                  <time dateTime={n.date} className="mt-[10px] block text-[10.08px] opacity-50">
                    {formatDate(n.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
