import { MODELS, getModel } from '@/data/models'
import { NEWS, formatDate } from '@/data/news'
import { STOCK, USED_CARS, formatAzn } from '@/data/stock'
function normalize(s) {
  return String(s)
    .toLocaleLowerCase('az')
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ğ/g, 'g')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .trim()
}

/**
  @returns {{group: string, title: string, meta?: string, to: string,
            model?: object|null, image?: string|null}[]}
 */
export function searchSite(query, limit = 12) {
  const q = normalize(query)
  if (q.length < 2) return []

  const results = []

  for (const m of MODELS) {
    if (normalize(`${m.name} ${m.family} ${m.body ?? ''}`).includes(q)) {
      results.push({
        group: 'Modellər',
        title: `Audi ${m.name}`,
        meta: m.body,
        to: `/models/${m.slug}`,
        model: m,
      })
    }
  }

  for (const c of [...STOCK, ...USED_CARS]) {
    if (normalize(`${c.title} ${c.family} ${c.year}`).includes(q)) {
      results.push({
        group: 'Avtomobillər',
        title: c.title,
        meta: `${formatAzn(c.priceAzn)} · ${c.year}`,
        to: `/stock/${c.id}`,
        model: getModel(c.modelSlug) ?? { family: c.family, name: c.title },
        image: typeof c.image === 'string' && c.image.startsWith('/') ? c.image : null,
      })
    }
  }

  for (const n of NEWS) {
    if (normalize(n.title).includes(q)) {
      results.push({
        group: 'Xəbərlər',
        title: n.title,
        meta: formatDate(n.date),
        to: `/news/${n.slug}`,
        image: typeof n.image === 'string' && n.image.startsWith('/') ? n.image : null,
      })
    }
  }

  return results.slice(0, limit)
}
