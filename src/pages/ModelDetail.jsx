import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import Media from '@/components/ui/Media'
import Lightbox from '@/components/ui/Lightbox'
import CarCard from '@/components/cars/CarCard'
import ModelOrderForm from '@/components/forms/ModelOrderForm'
import { ArrowRight } from '@/components/ui/Icons'
import CarImage from '@/components/ui/CarImage'
import { getModel, modelsByFamily } from '@/data/models'

import { MODEL_DETAIL, MODEL_SIZES } from '@/data/model-detail'
import { formatEur, formatAzn, stockByModel, usedByModel } from '@/data/stock'
import NotFound from './NotFound'
import { SITE } from '@/data/site'


const TABS = [
  { id: 'specs', label: 'Texniki göstəricilər', icon: '/images/icons/tab-tech.svg' },
  { id: 'options', label: 'Opsiyalar', icon: '/images/icons/tab-options.svg' },
  { id: 'dimensions', label: 'Dəqiq ölçülər', icon: '/images/icons/tab-sizes.svg' },
  { id: 'reserve', label: 'Sifariş et', icon: '/images/icons/tab-order.svg' },
]

export default function ModelDetail() {
  const { slug } = useParams()
  const model = getModel(slug)
  const [tab, setTab] = useState('specs')
  const [sizeView, setSizeView] = useState(0)
  const [lightbox, setLightbox] = useState(-1)

  if (!model) return <NotFound />

  
  const detail =
    MODEL_DETAIL[slug] ?? { lead: '', intro: '', hero: [], gallery: [], tech: [], options: [] }
  
  const heroImage = detail.hero?.[0] ?? null
  const gallery = [...(detail.hero ?? []).slice(1), ...detail.gallery]
  const sizesRec = MODEL_SIZES[model.family]
  const sizes = sizesRec?.images?.length ? sizesRec : null

  
  const visibleTabs = TABS.filter(
    (t) =>
      (t.id === 'specs' && detail.tech.length > 0) ||
      (t.id === 'options' && detail.options.length > 0) ||
      (t.id === 'dimensions' && sizes) ||
      t.id === 'reserve',
  )
  const activeTab = visibleTabs.some((t) => t.id === tab) ? tab : visibleTabs[0]?.id

  const siblings = modelsByFamily(model.family)
  const stock = stockByModel(model.slug)
  const used = usedByModel(model.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `Audi ${model.name}`,
    brand: { '@type': 'Brand', name: 'Audi' },
    model: model.name,
    vehicleConfiguration: model.body,
    vehicleEngine: {
      '@type': 'EngineSpecification',
      name: model.engine,
      enginePower: { '@type': 'QuantitativeValue', value: parseInt(model.specs.power, 10), unitText: 'a.g.' },
    },
    ...(typeof model.priceAzn === 'number' && {
      offers: {
        '@type': 'Offer',
        price: model.priceAzn,
        priceCurrency: 'AZN',
        availability: stock.length ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
        seller: { '@type': 'AutoDealer', name: SITE.name },
      },
    }),
  }

  return (
    <>
      <Seo
        title={`Audi ${model.name}`}
        description={`Audi ${model.name} — ${model.engine}. Güc: ${model.specs.power}, yanacaq sərfiyyatı: ${model.specs.consumption}. ${model.intro ?? ''}`}
        type="article"
        jsonLd={jsonLd}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Model siyahısı', to: '/models' },
          { name: `Audi ${model.name}`, to: `/models/${model.slug}` },
        ]}
      />
      <div className="bg-[#f2f2f2]">
        {heroImage ? (
          <div className="relative">
           
            <h1
              className="bg-[#f2f2f2] px-5 py-4 text-[16px] font-bold tracking-normal
                         card:absolute card:left-[60px] card:top-[60px] card:z-10
                         card:bg-paper card:px-[7px] card:pb-0 card:pt-[5px]
                         card:text-[27.2px]"
            >
              {model.name}
            </h1>
            <img
              src={heroImage}
              alt={`Audi ${model.name}`}
              loading="eager"
              fetchPriority="high"
              style={{ aspectRatio: detail.aspect ?? 3.2 }}
              className="w-full object-contain"
            />
          </div>
        ) : (
          <>
            <h1 className="bg-[#f2f2f2] px-5 py-4 text-[16px] font-bold tracking-normal card:text-[27.2px]">
              {model.name}
            </h1>
            <div className="flex aspect-[16/9] items-center justify-center p-8">
              <CarImage
                model={model}
                loading="eager"
                className="max-h-full w-auto max-w-[560px] object-contain"
              />
            </div>
          </>
        )}
      </div>
      {siblings.length > 1 && (
        <section className="shell mt-10" aria-labelledby="trims-title">
          <h2 id="trims-title" className="mb-4 text-sm uppercase tracking-[0.15em] text-steel-500">
            Audi {model.family} versiyaları
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s) => {
              const isCurrent = s.slug === model.slug
              const inner = (
                <>
                  <span className="text-sm font-medium">{s.name}</span>
                  {typeof s.priceEur === 'number' && (
                    <span className="mt-1 block text-sm text-steel-600">
                      {formatEur(s.priceEur)}
                      <span className="ml-2 text-xs text-steel-400">
                        {formatAzn(s.priceAzn)}
                      </span>
                    </span>
                  )}
                </>
              )

              return isCurrent ? (
                <div
                  key={s.slug}
                  aria-current="true"
                  className="border border-ink bg-ink p-4 text-paper"
                >
                  <span className="text-sm font-medium">{s.name}</span>
                  {typeof s.priceEur === 'number' && (
                    <span className="mt-1 block text-sm text-paper/75">
                      {formatEur(s.priceEur)}
                      <span className="ml-2 text-xs text-paper/50">
                        {formatAzn(s.priceAzn)}
                      </span>
                    </span>
                  )}
                </div>
              ) : (
                <Link
                  key={s.slug}
                  to={`/models/${s.slug}`}
                  className="border border-steel-200 p-4 transition-colors hover:border-ink"
                >
                  {inner}
                </Link>
              )
            })}
          </div>
        </section>
      )}
      <section className="shell mt-14" aria-labelledby="details-title">
        <h2 id="details-title" className="sr-only">
          Model haqqında məlumat
        </h2>
        <div
          role="tablist"
          aria-label="Model məlumatları"
          className="group mx-auto flex max-w-[800px] flex-wrap justify-center"
        >
          {visibleTabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={activeTab === t.id}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`flex w-1/2 flex-col items-center gap-2 px-2 pb-6 pt-4
                          text-[11.2px] font-bold transition-all duration-200
                          card:w-1/5
                          group-hover:scale-90 group-hover:opacity-30
                          hover:!scale-110 hover:!opacity-100
                          ${activeTab === t.id ? 'opacity-100' : 'opacity-60'}`}
            >
              <img src={t.icon} alt="" aria-hidden="true" className="h-[60px] w-[60px]" />
              <span className="text-center leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
        {activeTab === 'specs' && (
          <div id="panel-specs" role="tabpanel" aria-labelledby="tab-specs" className="animate-fadeIn pt-10">
            <p className="mb-8 text-lg">{model.engine}</p>

            {detail.tech.length > 0 ? (
              <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {detail.tech.map((g) => (
                  <div key={g.title}>
                    {g.title && (
                      <h3 className="mb-3 border-b border-steel-200 pb-2 font-bold">
                        {g.title}
                      </h3>
                    )}
                    <dl className="text-[13px]">
                      {g.rows.map(([label, value], i) => (
                        <div key={i} className="py-2">
                          {label && <dt className="text-steel-400">{label}</dt>}
                          <dd className="m-0 leading-snug">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
        {activeTab === 'options' && (
          <div id="panel-options" role="tabpanel" aria-labelledby="tab-options" className="animate-fadeIn pt-10">
            {detail.options.length > 0 ? (
              <div className="space-y-12">
                {detail.options.map((g) => (
                  <div key={g.title}>
                    <h3 className="mb-4 text-[16.85px] font-bold">{g.title}</h3>
                    <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                      {g.items.map((opt, i) => (
                        <li
                          key={i}
                          className="border-b border-steel-100 py-2.5 text-[13px] leading-snug text-steel-700"
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
        {activeTab === 'dimensions' && (
          <div id="panel-dimensions" role="tabpanel" aria-labelledby="tab-dimensions" className="animate-fadeIn pt-10">
            {sizes ? (
              <>
                <img
                  key={sizeView}
                  src={sizes.images[sizeView]}
                  alt={`Audi ${model.family} — ${sizes.labels[sizeView]}`}
                  className="mx-auto w-full max-w-[900px]"
                />
                <div className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-2 bg-ink px-6 py-5">
                  {sizes.labels.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setSizeView(i)}
                      aria-pressed={sizeView === i}
                      className={`text-[12px] text-paper transition-opacity ${
                        sizeView === i ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-steel-500">Bu ailə üçün ölçü sxemi mövcud deyil.</p>
            )}
          </div>
        )}
        {activeTab === 'reserve' && (
          <div id="panel-reserve" role="tabpanel" aria-labelledby="tab-reserve" className="animate-fadeIn pt-10">
            <h3 className="mb-6 text-[16.85px] font-bold">
              Audi {model.name} — sifariş et
            </h3>
            <ModelOrderForm modelName={`Audi ${model.name}`} />
          </div>
        )}
      </section>
      {stock.length > 0 && (
        <section className="shell mt-20" aria-labelledby="model-stock-title">
          <h2 id="model-stock-title" className="section-title mb-8">
            Satışda olan avtomobillər
          </h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {stock.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}
      {used.length > 0 && (
        <section className="shell mt-20" aria-labelledby="model-used-title">
          <h2 id="model-used-title" className="section-title mb-8">
            İkinci əl avtomobillər
          </h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {used.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}
      {(detail.lead || detail.intro) && (
        <section className="mx-auto mb-[100px] max-w-[1200px] px-5 py-5 card:px-[60px] card:text-center">
          {detail.lead && (
            <h2 className="text-[22.4px] font-bold leading-snug tracking-normal card:text-[35.2px]">
              {detail.lead}
            </h2>
          )}
          {detail.intro && (
            <p className="mt-5 text-[14.4px] leading-[1.9] text-steel-800">{detail.intro}</p>
          )}
        </section>
      )}
      {gallery.length > 0 && (
        <section className="shell mt-20" aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="section-title mb-8">
            Qalereya
            <span className="ml-3 align-middle text-[14.4px] font-normal text-steel-400">
              {gallery.length} şəkil
            </span>
          </h2>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Şəkli böyüt: ${i + 1} / ${gallery.length}`}
                  className="group block w-full overflow-hidden bg-steel-100"
                >
                  <img
                    src={src}
                    alt={`Audi ${model.name} qalereya şəkli ${i + 1}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform
                               duration-500 ease-audi group-hover:scale-[1.04]"
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {lightbox >= 0 && (
        <Lightbox
          images={gallery}
          index={lightbox}
          title={model.name}
          onIndexChange={setLightbox}
          onClose={() => setLightbox(-1)}
        />
      )}
      <section className="shell mt-20">
        <div className="flex flex-col gap-4 border-t border-steel-200 pt-10 sm:flex-row">
          <Link to="/test-drive" className="btn-solid">
            Test yürüşünə yazıl
            <ArrowRight />
          </Link>
          <Link to="/contacts" className="btn-outline">
            Bizimlə əlaqə
          </Link>
        </div>
      </section>
    </>
  )
}
