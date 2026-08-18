

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { MODELS } from '../src/data/models.js'
import { NEWS } from '../src/data/news.js'
import { STOCK, USED_CARS } from '../src/data/stock.js'
import { SITE } from '../src/data/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE = (process.env.SITE_URL || SITE.url).replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

/** @type {{loc: string, priority: string, changefreq: string, lastmod?: string}[]} */
const urls = []

const add = (loc, priority, changefreq, lastmod = today) =>
  urls.push({ loc, priority, changefreq, lastmod })


add('/', '1.0', 'weekly')
add('/models', '0.9', 'monthly')
add('/stock', '0.9', 'daily')
add('/used', '0.8', 'daily')
add('/test-drive', '0.7', 'monthly')
add('/service', '0.7', 'monthly')
add('/about', '0.5', 'yearly')
add('/news', '0.7', 'weekly')
add('/contacts', '0.6', 'yearly')
add('/privacy', '0.3', 'yearly')


for (const m of MODELS) add(`/models/${m.slug}`, '0.8', 'monthly')
for (const n of NEWS) add(`/news/${n.slug}`, '0.6', 'yearly', n.date)
for (const c of [...STOCK, ...USED_CARS]) add(`/stock/${c.id}`, '0.7', 'weekly')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const outDir = resolve(__dirname, '../public')
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'sitemap.xml'), xml, 'utf8')


const robots = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`
writeFileSync(resolve(outDir, 'robots.txt'), robots, 'utf8')

console.log(`✓ sitemap.xml (${urls.length} URL) və robots.txt yaradıldı → ${BASE}`)
