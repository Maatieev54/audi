
export const FUEL_TYPES = ['Benzin', 'Dizel', 'Hibrid']
export const COLORS = ['Ağ', 'Qara', 'Boz', 'Gümüşü', 'Mavi', 'Qırmızı']


const W3 = 'Zəmanət - 3 il və ya 90 000 km'
const W5 = 'Zəmanət - 5 il və ya 150 000 km'

const shots = (slug, n) =>
  Array.from({ length: n }, (_, i) => `/images/models/shots/${slug}/${i + 1}.webp`)

const photos = (dir, n) =>
  Array.from({ length: n }, (_, i) => `/images/stock/${dir}/${i + 1}.webp`)


export const STOCK = [
  {
    id: 213,
    modelSlug: 'a6-design',
    title: 'A6 40 Design',
    family: 'A6',
    priceEur: 49500,
    priceAzn: 98259,
    warranty: W5,
    engine: '2.0 L.',
    power: '190 a.g.',
    year: 2020,
    mileage: 0,
    fuel: 'Benzin',
    color: 'Typhoon Grey',
    colorSwatch: 'gray',
    interior: 'Okapi Brown',
    interiorSwatch: 'brown',
    image: '/images/models/shots/a6-design/1.webp',
    gallery: shots('a6-design', 6),
    options: [
      {
        title: 'Standart opsiyalar',
        items: [
          'Mülayim hibrid',
          'Qabaq və arxa ayaqaltılar',
          'İngilis dilində informasiya kitabçası',
          'Standart asqılar',
          'Standart təkər boltları',
          'Üçbucaq',
          'Ön çəkimli',
          'Audi drive select',
          '"Design line" bamperlər',
          '3 - milli çoxfunksiyalı sürət keçirilicili dəri sükan',
          'Arxa oturacaqlarda ISOFIX uşaq oturacağı üçün birləşmə',
          'Qatlanmayan oturacaqlar və arxa oturacaqların söykənəcəyi',
          'İstiyə qarşı ön və yan şüşələr',
          'İstilik saxlayan şüşələr',
          'Hava yastıqları',
          'Ön hissədə yan pərdə hava yastıqları',
          'Parlaq paket',
          'Alüminium dekorativ taxmalar',
          'Sürücü və öndə əyləşən sərnişin üçün makiyaj güzgülü günə baxanlar',
          'Ön başaltılar',
          'Ön orta dirsəkaltlıq',
          'Alətlər paneli və qapı paneli (ikili, bir-rəngli, çoxrəngli)',
          'Baqaj üçün əlavə örtük',
          'Sürət limitləşdirici',
          'Dermatin üst interyer elementləri',
          'Start / stop sistemi',
          'Ön və arxa alüminium taxmalar',
          'LED ön fənərlər',
          'Kruiz kontrol və sürət limiti',
          '2-zonalı klimat kontrol',
          'Sürücü informasiya sistemi rəngli displeydə',
        ],
      },
    ],
  },
  {
    id: 216,
    modelSlug: 'a6-sport',
    title: 'A6 40 Sport',
    family: 'A6',
    priceEur: 58000,
    priceAzn: 115132,
    warranty: W5,
    engine: '2.0 L.',
    power: '190 a.g.',
    year: 2020,
    mileage: 0,
    fuel: 'Benzin',
    color: 'Firmament blue',
    colorSwatch: 'blue',
    interior: 'Black',
    interiorSwatch: 'black',
    image: '/images/stock/216/1.webp',
    gallery: photos('216', 6),
  },
  {
    id: 219,
    modelSlug: 'a6-sport',
    title: 'A6 40 Sport',
    family: 'A6',
    priceEur: 57000,
    priceAzn: 113147,
    warranty: W5,
    engine: '2.0 L.',
    power: '190 a.g.',
    year: 2020,
    mileage: 0,
    fuel: 'Benzin',
    color: 'Brilliant black',
    colorSwatch: 'black',
    interior: 'Black',
    interiorSwatch: 'black',
    image: '/images/stock/219/1.webp',
    gallery: photos('219', 10),
  },
  {
    id: 221,
    modelSlug: 'q7-45-tdi',
    title: 'Q7 45 TDI',
    family: 'Q7',
    priceEur: 72500,
    priceAzn: 143915,
    warranty: W5,
    engine: '2.0 L.',
    power: '190 a.g.',
    year: 2020,
    fuel: 'Dizel',
    mileage: 0,
    color: 'Qara',
    colorSwatch: 'black',
    interior: 'Qəhvəyi',
    interiorSwatch: 'brown',
    image: '/images/stock/221/1.webp',
    gallery: photos('221', 7),
  },
  {
    id: 223,
    modelSlug: 'a8-55-lux',
    title: 'A8 Long 55 TFSI',
    family: 'A8',
    priceEur: 115000,
    priceAzn: 228278,
    warranty: W3,
    engine: '3.0 L.',
    power: '340 a.g.',
    year: 2023,
    mileage: 0,
    fuel: 'Benzin',
    color: 'Brilliant Black',
    colorSwatch: 'black',
    interior: 'Black',
    interiorSwatch: 'black',
    image: '/images/models/shots/a8-55-lux/1.webp',
    gallery: shots('a8-55-lux', 6),
  },
]
export const USED_CARS = [
  {
    id: 2,
    modelSlug: null,
    used: true,
    title: 'A5',
    family: 'A5',
    priceEur: 40000,
    priceAzn: 68100,
    warranty: W3,
    engine: '2.0 L.',
    power: '252 a.g.',
    year: 2017,
    mileage: 0,
    fuel: 'Benzin',
    color: 'Qırmızı',
    colorSwatch: 'red',
    image: '/images/stock/u2/1.webp',
    gallery: photos('u2', 5),
  },
]
export const formatPrice = (n) =>
  typeof n === 'number' ? n.toLocaleString('az-AZ').replace(/,/g, ' ') : n
export const formatEur = (n) => `€ ${formatPrice(n)}`
export const formatAzn = (n) => `₼ ${formatPrice(n)}`

export const getStockCar = (id) =>
  [...STOCK, ...USED_CARS].find((c) => String(c.id) === String(id))
export const stockByModel = (slug) => STOCK.filter((c) => c.modelSlug === slug)
export const usedByModel = (slug) => USED_CARS.filter((c) => c.modelSlug === slug)
export const stockByFamily = (family) => STOCK.filter((c) => c.family === family)
export const usedByFamily = (family) => USED_CARS.filter((c) => c.family === family)

/**
 * @returns {{ fresh: number, used: number, total: number, inStock: boolean }}
 * 
 */
export const familyAvailability = (family) => {
  const fresh = stockByFamily(family).length
  const used = usedByFamily(family).length
  return { fresh, used, total: fresh + used, inStock: fresh + used > 0 }
}

export const modelAvailability = (slug) => {
  const fresh = stockByModel(slug).length
  const used = usedByModel(slug).length
  return { fresh, used, total: fresh + used, inStock: fresh + used > 0 }
}
