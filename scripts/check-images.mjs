
import { existsSync, readdirSync, statSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { FAMILIES, MODELS } from '../src/data/models.js'
import { NEWS } from '../src/data/news.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMG = resolve(__dirname, '../public/images')

const green = (s) => `\x1b[32m${s}\x1b[0m`
const red = (s) => `\x1b[31m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`
const bold = (s) => `\x1b[1m${s}\x1b[0m`

function findAny(base, exts = ['png', 'jpg', 'jpeg', 'webp']) {
  for (const ext of exts) {
    const p = join(IMG, `${base}.${ext}`)
    if (existsSync(p)) {
      const kb = Math.round(statSync(p).size / 1024)
      return { path: `${base}.${ext}`, kb }
    }
  }
  return null
}

let ok = 0
let missing = 0

function report(label, base) {
  const found = findAny(base)
  if (found) {
    console.log(`  ${green('✓')} ${label.padEnd(26)} ${dim(`${found.path} (${found.kb} KB)`)}`)
    ok++
  } else {
    console.log(`  ${red('✗')} ${label.padEnd(26)} ${dim(`gözlənilir: ${base}.png`)}`)
    missing++
  }
}

console.log(`\n${bold('Şəkil yoxlaması')}  ${dim(IMG)}\n`)

console.log(bold('Loqo'))
report('Header loqosu', 'logo')

console.log(`\n${bold('Hero')}`)
report('Ana səhifə hero', 'hero/q7')

console.log(`\n${bold(`Model şəkilləri (${FAMILIES.length} ailə)`)}`)
for (const f of FAMILIES) {
  report(`Audi ${f}`, `models/${f.toLowerCase()}`)
}

const trimGroups = new Map()
for (const m of MODELS) {
  if (typeof m.image !== 'string' || !m.image.startsWith('/images/')) continue
  const base = m.image.replace(/^\/images\//, '').replace(/\.(png|jpe?g|webp)$/i, '')
  if (!trimGroups.has(base)) trimGroups.set(base, [])
  trimGroups.get(base).push(m.name)
}

if (trimGroups.size) {
  console.log(`\n${bold(`Versiya şəkilləri (${trimGroups.size} fayl / ${MODELS.length} model)`)}`)
  for (const [base, names] of trimGroups) {
    report(names.length > 1 ? `${names[0]} +${names.length - 1}` : names[0], base)
  }
}

console.log(`\n${bold('Feature kartlar')}`)
report('Feature Q7', 'feature-q7')
report('Feature Q8', 'feature-q8')

console.log(`\n${bold('Promo bloklar')}`)
report('Promo A6', 'promo-a6')
report('Promo S8', 'promo-s8')
report('Promo Servis', 'promo-service')

const newsWithImage = NEWS.filter(
  (n) => typeof n.image === 'string' && n.image.startsWith('/images/'),
)

if (newsWithImage.length) {
  console.log(`\n${bold(`Xəbər şəkilləri (${newsWithImage.length} / ${NEWS.length})`)}`)
  for (const n of newsWithImage) {
    const base = n.image.replace(/^\/images\//, '').replace(/\.(png|jpe?g|webp)$/i, '')
    report(n.slug, base)
  }
}

console.log(`\n${bold('Haqqımızda')}`)
report('Salon fotosu', 'about')

const extras = []
function walk(dir, prefix = '') {
  if (!existsSync(dir)) return
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      walk(join(dir, entry.name), `${prefix}${entry.name}/`)
    } else if (/\.(png|jpe?g|webp|svg)$/i.test(entry.name)) {
      extras.push(`${prefix}${entry.name}`)
    }
  }
}
walk(IMG)

console.log(
  `\n${bold('Nəticə')}  ${green(`${ok} hazır`)}  ${missing ? red(`${missing} çatmır`) : green('hamısı yerində')}`,
)

if (extras.length) {
  console.log(`\n${dim('Qovluqdaki bütün şəkil faylları:')}`)
  for (const e of extras) console.log(dim(`  · ${e}`))
}

if (missing > 0) {
  console.log(
    `\n${dim('Faylları saxlamaq üçün:')} open ${IMG}\n` +
      `${dim('Çatmayan fayl olan yerdə avtomatik illüstrasiya göstərilir — sayt sınmır.')}\n`,
  )
} else {
  console.log()
}
