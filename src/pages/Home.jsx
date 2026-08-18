import Seo from '@/components/Seo'
import Hero from '@/components/home/Hero'
import AvailableCars from '@/components/home/AvailableCars'
import ModelExplorer from '@/components/home/ModelExplorer'
import FeatureCards from '@/components/home/FeatureCards'
import PromoGrid from '@/components/home/PromoGrid'
import NewsPreview from '@/components/home/NewsPreview'
import SocialSection from '@/components/home/SocialSection'
import { SITE } from '@/data/site'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/models?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <Seo
        title={null}
        description={SITE.defaultDescription}
        jsonLd={jsonLd}
      />

      <Hero />
      <AvailableCars />
      <ModelExplorer />
      <FeatureCards />
      <PromoGrid />
      <NewsPreview />
      <SocialSection />
    </>
  )
}
