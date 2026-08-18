
import { existsSync, readdirSync, statSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIR = resolve(__dirname, '../public/fonts')

const green = (s) => `\x1b[32m${s}\x1b[0m`
const red = (s) => `\x1b[31m${s}\x1b[0m`
const yellow = (s) => `\x1b[33m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`
const bold = (s) => `\x1b[1m${s}\x1b[0m`

const WANTED = [
  { base: 'audi-regular', weight: '400 (normal)', required: true },
  { base: 'audi-bold', weight: '700 (qalın)', required: true },
  { base: 'audi-light', weight: '300 (nazik)', required: false },
]

console.log(`\n${bold('Şrift yoxlaması')}  ${dim(DIR)}\n`)

let found = 0
let missingRequired = 0

for (const { base, weight, required } of WANTED) {
  const hits = ['woff2', 'woff']
    .map((ext) => ({ ext, path: join(DIR, `${base}.${ext}`) }))
    .filter((x) => existsSync(x.path))

  if (hits.length) {
    const info = hits
      .map((h) => `${base}.${h.ext} (${Math.round(statSync(h.path).size / 1024)} KB)`)
      .join(', ')
    console.log(`  ${green('✓')} ${weight.padEnd(16)} ${dim(info)}`)
    found++
  } else {
    const mark = required ? red('✗') : yellow('–')
    console.log(
      `  ${mark} ${weight.padEnd(16)} ${dim(`gözlənilir: ${base}.woff2 və ya ${base}.woff`)}`,
    )
    if (required) missingRequired++
  }
}

const all = existsSync(DIR)
  ? readdirSync(DIR).filter((f) => /\.(woff2?|ttf|otf)$/i.test(f))
  : []

if (all.length) {
  console.log(`\n${dim('Qovluqdaki bütün şrift faylları:')}`)
  for (const f of all) {
    const kb = Math.round(statSync(join(DIR, f)).size / 1024)
    console.log(dim(`  · ${f} (${kb} KB)`))
  }

  const unexpected = all.filter(
    (f) => !WANTED.some(({ base }) => f === `${base}.woff` || f === `${base}.woff2`),
  )
  if (unexpected.length) {
    console.log(
      `\n${yellow('Diqqət:')} bu fayllar CSS-in gözlədiyi adlarla üst-üstə düşmür,` +
        ` ona görə işlənmir:`,
    )
    for (const f of unexpected) console.log(`  · ${f}`)
    console.log(dim('  Adlarını audi-regular / audi-bold / audi-light kimi dəyiş.'))
  }
}

if (found === 0) {
  console.log(
    `\n${bold('Nəticə')}  ${yellow('heç bir şrift faylı yoxdur')} — sayt sistem şrifti ilə işləyir.\n` +
      `${dim(`Faylları bura at: open ${DIR}`)}\n`,
  )
} else if (missingRequired > 0) {
  console.log(
    `\n${bold('Nəticə')}  ${green(`${found} fayl hazır`)}, ` +
      `${red(`${missingRequired} mütləq fayl çatmır`)}\n`,
  )
} else {
  console.log(
    `\n${bold('Nəticə')}  ${green('şriftlər hazırdır')} — brauzeri Cmd+Shift+R ilə yenilə.\n` +
      `${dim('Saytda “Mükəmməlliyin” sözünə bax: ə hərfi digərləri ilə eyni şriftdəndirsə hər şey qaydasındadır.')}\n`,
  )
}
