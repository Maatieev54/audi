
const NEWS_META = [
  { id: 32, slug: 'yeni-s3', title: 'Yeni S3 — daha çox güc, dinamika və sürüş həzzi', date: '2020-08-12', image: '/images/news/yeni-s3.webp' },
  { id: 31, slug: 'kampaniya-5-plus-1', title: 'Audi Bakı Mərkəzi çoxdan gözlənilən 5+1 kampaniyasına start verdi', date: '2020-07-08', image: '/images/news/kampaniya-5-plus-1.webp' },
  { id: 30, slug: 'yeni-a3-sedan', title: 'Yeni Audi A3 Sedan — eleqantlıq və effektivlik bir arada', date: '2020-04-25', image: '/images/news/yeni-a3-sedan.webp' },
  { id: 29, slug: 'yenilenmis-q7-2020', title: 'Yenilənmiş, 2020 model Audi Q7 artıq Azərbaycandadır', date: '2020-04-17', image: '/images/news/yenilenmis-q7-2020.webp' },
  { id: 27, slug: 'svetafor-texnologiyasi', title: 'Audi avtomobilləri svetaforların siqnallarını əvvəlcədən bilərək daha effektiv hərəkət edir', date: '2020-02-06', image: '/images/news/svetafor-texnologiyasi.webp' },
  { id: 26, slug: 'rs-q8-teqdimat', title: 'Sürətli və aqressiv Audi RS Q8 dünyaya nümayiş olundu', date: '2019-11-21', image: '/images/news/rs-q8-teqdimat.webp' },
  { id: 25, slug: 'e-tron-sportback', title: 'Los Ancelesdə yeni Audi e-tron Sportback modeli təqdim olundu', date: '2019-11-20', image: '/images/news/e-tron-sportback.webp' },
  { id: 24, slug: 'r8-rwd', title: 'Yeni arxaçəkişli superkar — Audi R8 RWD', date: '2019-11-08', image: '/images/news/r8-rwd.webp' },
  { id: 23, slug: 'q7-mukafat', title: 'Tanınmış jurnal Audi Q7-ni mükafatlandırdı', date: '2019-10-24', image: '/images/news/q7-mukafat.webp' },
  { id: 22, slug: 'rs4-avant', title: 'RS6 Avant-ın “kiçik qardaşı” RS4 Avant yeniləndi', date: '2019-10-02', image: '/images/news/rs4-avant.webp' },
  { id: 21, slug: 'rs-q3-sportback', title: 'Qarşılayın, yeni RS Q3 və RS Q3 Sportback modelləri', date: '2019-09-26', image: '/images/news/rs-q3-sportback.webp' },
  { id: 20, slug: 'rene-rast-dtm', title: '“Audi”-nin pilotu Rene Rast “DTM” yarışında çempion titulunu qazandı', date: '2019-09-21', image: '/images/news/rene-rast-dtm.webp' },
  { id: 19, slug: 'rs7-sportback', title: 'Tam yeni RS7 Sportback. Daha güclü və daha aqressiv', date: '2019-09-10', image: '/images/news/rs7-sportback.webp' },
  { id: 18, slug: 'ai-trail-quattro', title: 'Elektrik Audi AI: Trail quattro Frankfurt Motor Show-da nümayiş olunacaq', date: '2019-09-06', image: '/images/news/ai-trail-quattro.webp' },
  { id: 17, slug: 'ilin-avtomobili', title: 'İlin ən gözlənilən avtomobili dünyaya təqdim olundu', date: '2019-08-21', image: '/images/news/ilin-avtomobili.webp' },
  { id: 16, slug: 'a7-world-luxury-car', title: 'Audi A7 Sportback “2019 World Luxury Car” mükafatına layiq görüldü', date: '2019-06-10', image: '/images/news/a7-world-luxury-car.webp' },
  { id: 15, slug: 'trade-in-kampaniya', title: 'Köhnə avtomobilini gətir, yenisini apar', date: '2019-03-05', image: '/images/news/trade-in-kampaniya.webp' },
  { id: 14, slug: 'audi-mukafatlari-2018', title: 'Audi-nin mükafatları (2018)', date: '2019-02-04', image: '/images/news/audi-mukafatlari-2018.webp' },
  { id: 13, slug: 'e-tron-gt-dizayn', title: 'Yeni Audi e-tron GT-nin dizaynı dünyanı heyran etdi', date: '2018-11-29', image: '/images/news/e-tron-gt-dizayn.webp' },
  { id: 12, slug: 'premium-coupe-krossover', title: 'Yeni premium Coupe krossover Azərbaycanda', date: '2018-10-15', image: '/images/news/premium-coupe-krossover.webp' },
  { id: 11, slug: 'a4-elde-etmek', title: 'Audi A4 modelini əldə etmək asanlaşdı', date: '2018-10-04', image: '/images/news/a4-elde-etmek.webp' },
  { id: 10, slug: 'yeni-e-tron', title: 'Yeni Audi e-tron', date: '2018-09-24', image: '/images/news/yeni-e-tron.webp' },
  { id: 5, slug: 'yeni-q3-krossover', title: 'Yeni Audi Q3 krossoveri təqdim edilib', date: '2018-08-04', image: '/images/news/yeni-q3-krossover.webp' },
  { id: 4, slug: 'yeni-q8', title: 'Q ailəsinin yeni siması — yeni Audi Q8', date: '2018-07-03', image: '/images/news/yeni-q8.webp' },
  { id: 1, slug: 'yeni-avtosalon-bakida', title: 'Dünya şöhrətli Audi brendinin yeni avtosalonu Bakıda', date: '2018-04-18', image: '/images/news/yeni-avtosalon-bakida.webp' },
  { id: 3, slug: 'yeni-a7-sportback', title: 'Son texnologiyaları və müasir dizaynı təcəssüm etdirən yeni Audi A7 Sportback', date: '2018-03-02', image: '/images/news/yeni-a7-sportback.webp' },
  { id: 2, slug: 'moda-heftesi', title: 'Audi brendi Bakıda keçirilən Azərbaycan Moda Həftəsini dəstəklədi', date: '2017-11-07', image: '/images/news/moda-heftesi.webp' },
]

export const NEWS = NEWS_META

export const sortedNews = () =>
  [...NEWS].sort((a, b) => new Date(b.date) - new Date(a.date))


export const latestNews = (count = 3) => sortedNews().slice(0, count)

export const getNews = (slug) => NEWS.find((n) => n.slug === slug)


export const formatDate = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export const formatDateLong = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
