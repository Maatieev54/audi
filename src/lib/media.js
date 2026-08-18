
function svgToDataUri(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}


export function placeholder({ label = '', w = 1600, h = 900, tone = 'light' } = {}) {
  const bg = tone === 'dark' ? '#1a1a1a' : '#e5e5e5'
  const fg = tone === 'dark' ? '#4c4c4c' : '#b3b3b3'
  const fontSize = Math.round(Math.min(w, h) * 0.055)

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="28" stroke="${fg}" stroke-width="1" opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <rect width="${w}" height="${h}" fill="url(#p)"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        fill="#808080" font-family="Inter, Arial, sans-serif"
        font-size="${fontSize}" font-weight="500" letter-spacing="1">${escapeXml(label)}</text>
</svg>`
  return svgToDataUri(svg)
}

export function resolveImage(image, { label, w, h, tone } = {}) {
  if (typeof image === 'string' && image.startsWith('/')) return image
  return placeholder({ label: label ?? image ?? '', w, h, tone })
}

export function bodyToSilhouette(body = '') {
  const b = String(body).toLowerCase()
  if (b.includes('suv')) return 'suv'
  if (b.includes('coupe') || b.includes('spyder') || b.includes('roadster')) return 'coupe'
  return 'sedan'
}
const CARS = {
  sedan: {
    body: 'M26,176 C26,152 33,139 60,132 L146,117 C174,113 189,107 207,95 L245,69 C258,59 274,54 296,53 L392,53 C418,54 435,61 447,73 L493,113 L575,125 C605,131 616,143 616,166 L616,176 Z',
    glass: 'M231,93 C247,76 267,66 292,63 L386,63 C405,65 417,71 427,81 L461,111 L225,111 Z',
    shoulder: 'M60,132 L146,117 C174,113 189,107 207,95 L245,69',
    pillar: [[332, 63, 332, 111]],
    doors: [[306, 116, 306, 170], [432, 116, 432, 170]],
    wheels: [[152, 178, 46], [488, 178, 46]],
    head: { x: 28, y: 139, w: 27, h: 14 },
    tail: { x: 588, y: 137, w: 25, h: 13 },
    bottom: 176,
  },
  suv: {
    body: 'M24,168 C24,140 30,126 56,119 L132,106 C158,100 172,92 186,78 L216,48 C228,38 244,33 268,32 L400,32 C428,33 446,40 458,52 L492,86 L572,100 C604,107 616,120 616,146 L616,168 Z',
    glass: 'M206,74 C220,58 238,48 264,45 L396,45 C416,47 430,54 440,64 L470,96 L200,96 Z',
    shoulder: 'M56,119 L132,106 C158,100 172,92 186,78 L216,48',
    pillar: [[310, 45, 310, 96]],
    doors: [[284, 101, 284, 162], [420, 101, 420, 162]],
    wheels: [[156, 176, 52], [484, 176, 52]],
    head: { x: 26, y: 128, w: 28, h: 15 },
    tail: { x: 586, y: 126, w: 26, h: 14 },
    bottom: 168,
  },
  coupe: {
    body: 'M26,178 C26,154 33,141 60,134 L142,120 C170,116 186,109 204,96 L248,66 C264,54 284,49 308,48 L372,48 C402,50 424,58 444,76 L512,124 L578,132 C606,138 616,148 616,168 L616,178 Z',
    glass: 'M232,94 C250,74 274,62 302,59 L368,59 C392,62 410,70 426,86 L462,114 L226,114 Z',
    shoulder: 'M60,134 L142,120 C170,116 186,109 204,96 L248,66',
    pillar: [[330, 59, 330, 114]],
    doors: [[300, 119, 300, 172]],
    wheels: [[152, 180, 46], [488, 180, 46]],
    head: { x: 28, y: 141, w: 27, h: 14 },
    tail: { x: 590, y: 139, w: 24, h: 12 },
    bottom: 178,
  },
}

function wheelSvg(cx, cy, r) {
  const spokes = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 72 - 90) * (Math.PI / 180)
    const x1 = cx + Math.cos(a) * r * 0.2
    const y1 = cy + Math.sin(a) * r * 0.2
    const x2 = cx + Math.cos(a) * r * 0.54
    const y2 = cy + Math.sin(a) * r * 0.54
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"
            stroke="#c2c7cc" stroke-width="${(r * 0.16).toFixed(1)}" stroke-linecap="round"/>`
  }).join('')

  return `
  <g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#22252a"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.97}" fill="none" stroke="#14161a" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.63}" fill="url(#rim)"/>
    ${spokes}
    <circle cx="${cx}" cy="${cy}" r="${r * 0.15}" fill="#6b7075"/>
  </g>`
}

function carDefs() {
  return `
  <defs>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eef0f2"/>
      <stop offset="0.42" stop-color="#c6cbd0"/>
      <stop offset="0.76" stop-color="#9ba1a7"/>
      <stop offset="1" stop-color="#7b8187"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#61717e"/>
      <stop offset="1" stop-color="#2d3841"/>
    </linearGradient>
    <radialGradient id="rim" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0" stop-color="#e3e7ea"/>
      <stop offset="1" stop-color="#9198a0"/>
    </radialGradient>
  </defs>`
}

function carShapes(type) {
  const c = CARS[type] ?? CARS.sedan

  const lines = [
    ...c.pillar.map(
      ([x1, y1, x2, y2]) =>
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1f272e" stroke-width="4"/>`,
    ),
    ...c.doors.map(
      ([x1, y1, x2, y2]) =>
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8a9096" stroke-width="1.5" opacity="0.7"/>`,
    ),
  ].join('')

  return `
  <path d="${c.body}" fill="url(#body)"/>
  <path d="${c.glass}" fill="url(#glass)"/>
  <path d="${c.shoulder}" fill="none" stroke="#f6f8f9" stroke-width="2.5" opacity="0.75"/>
  ${lines}
  <rect x="${c.head.x}" y="${c.head.y}" width="${c.head.w}" height="${c.head.h}" rx="4" fill="#f1f5f7" opacity="0.95"/>
  <rect x="${c.tail.x}" y="${c.tail.y}" width="${c.tail.w}" height="${c.tail.h}" rx="4" fill="#bb2b38"/>
  ${wheelSvg(...c.wheels[0])}
  ${wheelSvg(...c.wheels[1])}`
}

/**
 * @param {'sedan'|'suv'|'coupe'} type
 * @param {string} label
 */
export function carSilhouette(type = 'sedan', label = '') {
  const key = CARS[type] ? type : 'sedan'

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="250" viewBox="0 0 640 250" role="img">
  <title>${escapeXml(label)}</title>
  ${carDefs()}
  <ellipse cx="320" cy="228" rx="272" ry="10" fill="#000" opacity="0.10"/>
  ${carShapes(key)}
</svg>`
  return svgToDataUri(svg)
}

/**
 * @param {{image?: string|null, body?: string, name?: string}} model
 */
export function modelImage(model) {
  if (typeof model?.image === 'string' && model.image.startsWith('/')) {
    return model.image
  }
  return carSilhouette(bodyToSilhouette(model?.body), `Audi ${model?.name ?? ''}`)
}


/**
 
 * @param {object} opts
 * @param {'sedan'|'suv'|'coupe'} opts.type
 * @param {string} opts.label
 * @param {'dark'|'light'} opts.tone
 * @param {number} opts.w
 * @param {number} opts.h
 */
export function heroScene({
  type = 'suv',
  label = '',
  tone = 'dark',
  w = 1920,
  h = 1080,
} = {}) {
  const key = CARS[type] ? type : 'sedan'

  const sky = tone === 'dark' ? ['#3a4046', '#15181b'] : ['#f4f6f7', '#c9ced3']
  const floor = tone === 'dark' ? ['#22262a', '#0d0f11'] : ['#dfe3e6', '#b6bcc2']
  const scale = (w * 0.62) / 640
  const carW = 640 * scale
  const carH = 250 * scale
  const tx = (w - carW) / 2
  const ty = h * 0.52 - carH * 0.45

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <title>${escapeXml(label)}</title>
  ${carDefs()}
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${sky[0]}"/>
      <stop offset="1" stop-color="${sky[1]}"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${floor[0]}"/>
      <stop offset="1" stop-color="${floor[1]}"/>
    </linearGradient>
    <radialGradient id="spot" cx="0.5" cy="0.42" r="0.62">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="fade">
      <rect x="0" y="0" width="${w}" height="${h}" fill="url(#fadeGrad)"/>
    </mask>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.45"/>
    </radialGradient>
  </defs>

  <!-- fon -->
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <rect y="${h * 0.58}" width="${w}" height="${h * 0.42}" fill="url(#floor)"/>
  <rect width="${w}" height="${h}" fill="url(#spot)"/>

  <!-- yol xetti -->
  <rect y="${h * 0.575}" width="${w}" height="2" fill="#ffffff" opacity="0.07"/>

  <!-- eks (asagi, seffaf) -->
  <g mask="url(#fade)"
     transform="translate(${tx} ${ty + carH * 1.86}) scale(${scale} ${-scale})">
    ${carShapes(key)}
  </g>

  <!-- avtomobil -->
  <g transform="translate(${tx} ${ty}) scale(${scale})">
    ${carShapes(key)}
  </g>

  <rect width="${w}" height="${h}" fill="url(#vig)"/>
</svg>`
  return svgToDataUri(svg)
}


export function bannerImage({ image, carType, label, tone, w, h } = {}) {
  if (typeof image === 'string' && image.startsWith('/')) return image
  return heroScene({ type: carType, label, tone, w, h })
}
export const BLANK =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
