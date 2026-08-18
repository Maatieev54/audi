import { Link, useParams } from 'react-router-dom'
import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import PageHeader from '@/components/ui/PageHeader'
import Media from '@/components/ui/Media'
import TestDriveForm from '@/components/forms/TestDriveForm'
import { ArrowRight } from '@/components/ui/Icons'
import { formatPrice, formatEur, formatAzn, getStockCar } from '@/data/stock'
import { getModel } from '@/data/models'
import { SITE, COMPANY } from '@/data/site'
import NotFound from './NotFound'

export default function StockDetail() {
  const { id } = useParams()
  const car = getStockCar(id)

  if (!car) return <NotFound />

  const model = getModel(car.modelSlug)
  
  const isUsed = car.used === true

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `Audi ${car.title}`,
    brand: { '@type': 'Brand', name: 'Audi' },
    modelDate: car.year,
    color: car.color,
    fuelType: car.fuel,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'KMT' },
    itemCondition: isUsed
      ? 'https://schema.org/UsedCondition'
      : 'https://schema.org/NewCondition',
    offers: {
      '@type': 'Offer',
      price: car.priceAzn,
      priceCurrency: 'AZN',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'AutoDealer', name: SITE.name },
    },
  }

  
  const specs = [
    ['Yanacaq növü', car.fuel],
    ['Buraxılış ili', car.year],
    ['Mühərrik', `${car.engine} (${car.power})`],
    ['Rəng', car.color],
    ['İnteryer', car.interior],
    ...(car.mileage > 0 ? [['Yürüş', `${formatPrice(car.mileage)} km`]] : []),
  ].filter(([, v]) => v != null && v !== '')

  return (
    <>
      <Seo
        title={`Audi ${car.title} — ${car.year}`}
        description={`Audi ${car.title}, ${car.year}. Qiymət: ${formatAzn(car.priceAzn)}. Mühərrik: ${car.engine}, güc: ${car.power}, yanacaq: ${car.fuel}.`}
        type="article"
        jsonLd={jsonLd}
      />
      <BreadcrumbJsonLd
        items={[
          { name: isUsed ? 'İkinci əl' : 'Satışda olan', to: isUsed ? '/used' : '/stock' },
          { name: car.title, to: `/stock/${car.id}` },
        ]}
      />

      <PageHeader
        title={car.title}
        breadcrumbs={[
          { name: isUsed ? 'İkinci əl' : 'Satışda olan', to: isUsed ? '/used' : '/stock' },
          { name: car.title },
        ]}
      />

      <div className="shell mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        
        <div>  
          <Media
            src={car.image}
            label={`Audi ${car.title}`}
            alt={`Audi ${car.title}`}
            ratio="3/2"
            fit="contain"
            className="bg-[#f2f2f2]"
            priority
          />
          {car.gallery?.length > 1 && (
            <ul className="mt-4 grid grid-cols-3 gap-4">
              {car.gallery.slice(1).map((src, i) => (
                <li key={src}>
                  <Media
                    src={src}
                    label={`${car.title} — ${i + 2}`}
                    alt={`Audi ${car.title} şəkil ${i + 2}`}
                    ratio="3/2"
                    fit="contain"
                    className="bg-[#f2f2f2]"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="text-3xl">
            {formatEur(car.priceEur)}
          </p>
          {typeof car.priceAzn === 'number' && (
            <p className="mt-1 text-sm text-steel-500">{formatAzn(car.priceAzn)}</p>
          )}

          {car.warranty && (
            <p className="mt-4 text-sm text-steel-600">{car.warranty}</p>
          )}

          <dl className="mt-8">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 border-b border-steel-100 py-3"
              >
                <dt className="text-sm text-steel-500">{label}</dt>
                <dd className="text-sm">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3">
            <a href={`tel:${COMPANY.phoneHref}`} className="btn-solid">
              Zəng et: {COMPANY.phone}
            </a>
            {model && (
              <Link to={`/models/${model.slug}`} className="btn-outline">
                Model haqqında ətraflı
                <ArrowRight />
              </Link>
            )}
          </div>
        </div>
      </div>

      {car.options?.length > 0 && (
        <section className="shell mt-20" aria-labelledby="car-options-title">
          <h2 id="car-options-title" className="section-title mb-8">
            Komplektasiya
          </h2>
          <div className="space-y-12">
            {car.options.map((g) => (
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
        </section>
      )}

      
      <section className="shell mt-20 max-w-3xl" aria-labelledby="reserve-title">
        <h2 id="reserve-title" className="section-title">
          Bu avtomobil üçün müraciət
        </h2>
        <p className="mt-3 text-sm text-steel-600">
          Formu doldurun, operatorumuz sizinlə əlaqə saxlayacaq.
        </p>
        <div className="mt-8">
          <TestDriveForm selectedModel={`Audi ${car.title} (ID: ${car.id})`} />
        </div>
      </section>
    </>
  )
}
