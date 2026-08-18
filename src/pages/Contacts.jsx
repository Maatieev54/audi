import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import ContactForm from '@/components/forms/ContactForm'
import { COMPANY, SITE } from '@/data/site'


export default function Contacts() {
  const { lat, lng } = COMPANY.geo
  const mapQuery = encodeURIComponent(`${SITE.name}, ${COMPANY.address}, ${COMPANY.city}`)
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&ll=${lat},${lng}&hl=az&z=17&iwloc=B&output=embed`

  return (
    <>
      <Seo
        title="Bizimlə əlaqə"
        description={`Audi Bakı Mərkəzi ilə əlaqə. Ünvan: ${COMPANY.address}, ${COMPANY.city}. Telefon: ${COMPANY.phone}. E-mail: ${COMPANY.email}`}
      />
      <BreadcrumbJsonLd items={[{ name: 'Bizimlə əlaqə', to: '/contacts' }]} />
      <div className="mx-auto w-full max-w-[1200px] px-5 py-[100px] text-[14.4px] leading-[2]">
        <h1 className="m-0 text-[28.8px] font-bold tracking-normal">Bizimlə əlaqə</h1>
        <div className="mt-8 flex flex-col gap-10 card:flex-row card:gap-0">
          <div className="card:w-1/2">
            <h2 className="text-[16.85px] font-bold tracking-normal">{COMPANY.legalName}</h2>
            <dl className="mt-6">
              <div className="mb-5">
                <dt className="field-label">Ünvan:</dt>
                <dd>
                  {COMPANY.address}, {COMPANY.city}, {COMPANY.country}
                </dd>
              </div>

              <div className="mb-5">
                <dt className="field-label">E-mail:</dt>
                <dd>
                  <a href={`mailto:${COMPANY.email}`} className="link-underline text-ink">
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
              <div className="mb-5">
                <dt className="field-label">Telefon:</dt>
                <dd>
                  <a href={`tel:${COMPANY.phoneHref}`} className="link-underline text-ink">
                    {COMPANY.phone}
                  </a>
                </dd>
              </div>

              <div className="mb-5">
                <dt className="field-label">Servis qəbulu:</dt>
                <dd>
                  <a
                    href={`tel:${COMPANY.serviceReception.replace(/\D/g, '')}`}
                    className="link-underline text-ink"
                  >
                    {COMPANY.serviceReception}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="card:w-1/2">
            <h2 className="text-[16.85px] font-bold uppercase tracking-normal">
              Əlaqə forması
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
        <section className="mt-12" aria-label="Xəritə">
          <iframe
            title="Audi Bakı Mərkəzinin xəritədəki yeri"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[400px] w-full border-0 grayscale card:h-[600px]"
          />
        </section>
      </div>
    </>
  )
}
