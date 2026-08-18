
const FALLBACK_URL = 'https://audi-az.vercel.app'
const browserOrigin =
  typeof window !== 'undefined' && window.location?.origin ? window.location.origin : null
const envUrl =
  typeof process !== 'undefined' && process.env?.SITE_URL ? process.env.SITE_URL : null

export const SITE = {
  name: 'Audi Bakı Mərkəzi',
  shortName: 'Audi Bakı',
  url: browserOrigin || envUrl || FALLBACK_URL,
  locale: 'az_AZ',
  lang: 'az',
  defaultTitle: 'Audi Bakı Mərkəzi',
  titleTemplate: '%s | Audi Bakı Mərkəzi',
  defaultDescription:'Audi Bakı Mərkəzi — Audi modelləri, satışda olan avtomobillər, test yürüşü və rəsmi servis xidməti.',
  defaultOgImage: '/og-default.jpg',
  logo: '/images/logo.webp',
  logoAlt: 'Audi',
}

export const COMPANY = {
  legalName: 'DREAM AUTO MMC',
  address: 'Babək prospekti, 43A',
  city: 'Bakı',
  country: 'Azərbaycan',
  email: 'office@audi.az',
  phone: '(050) 570 00 77',
  phoneHref: '+994505700077',
  serviceReception: '*2299',
  serviceParts: '*2299',
  geo: { lat: 40.3923412, lng: 49.911085 },
}

export const SOCIAL = [
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCMFUFT5ooHCdcG5_HTtdMrw',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/audi.azerbaijan/',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/AudiAzerbaijan/',
  },
]


export const MAIN_NAV = [
  { label: 'Ana səhifə', to: '/' },
  { label: 'Model siyahısı', to: '/models' },
  { label: 'Haqqımızda', to: '/about' },
  { label: 'Xəbərlər', to: '/news' },
  { label: 'Test Drive yazılın', to: '/test-drive' },
  { label: 'Audi servis xidməti', to: '/service' },
  { label: 'Bizimlə əlaqə', to: '/contacts' },
]


export const FOOTER_NAV = [
  { label: 'Bütün modellər', to: '/models' },
  { label: 'Test drive', to: '/test-drive' },
  { label: 'Servis', to: '/service' },
  { label: 'Bizimlə əlaqə', to: '/contacts' },
  { label: 'Məxfilik bildirişi', to: '/privacy' },
]

export const COPYRIGHT = `© ${new Date().getFullYear()} Audi Bakı Mərkəzi. Bütün hüquqlar qorunur.`

export const COPYRIGHT_NOTE =
  '“Dream Auto” MMC Audi AG-nin Azərbaycanda eksklüziv idxalçısıdır. Şirkət Audi modellərinin ölkəmizdə satışını və satışdan sonra xidmətini həyata keçirir.'
