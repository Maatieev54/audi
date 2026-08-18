import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE } from '@/data/site'

/**
 * 
 *
 * @param {string}  title     
 * @param {string}  description
 * @param {string}  image      
 * @param {'website'|'article'} type
 * @param {boolean} noindex    
 * @param {object}  jsonLd     
 */
export default function Seo({
  title,
  description = SITE.defaultDescription,
  image,
  type = 'website',
  noindex = false,
  jsonLd,
  children,
}) {
  const { pathname } = useLocation()
  const canonical = `${SITE.url}${pathname}`
  const fullTitle = title ? SITE.titleTemplate.replace('%s', title) : SITE.defaultTitle

  const rawImage = image ?? SITE.defaultOgImage
  const ogImage = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `${SITE.url}${rawImage}`
    : null

  return (
    <Helmet prioritizeSeoTags>
      <html lang={SITE.lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}

      {children}
    </Helmet>
  )
}


export function OrganizationJsonLd({ company }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: SITE.name,
    legalName: company.legalName,
    url: SITE.url,
    email: company.email,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: company.city,
      addressCountry: 'AZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}


export function BreadcrumbJsonLd({ items = [] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.to}`,
    })),
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}
