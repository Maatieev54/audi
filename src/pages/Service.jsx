import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import PageHeader from '@/components/ui/PageHeader'
import ServiceForm from '@/components/forms/ServiceForm'
import { Phone, Pin } from '@/components/ui/Icons'
import { COMPANY } from '@/data/site'

const SERVICES = [
  'Planlı texniki baxış',
  'Mühərrik və ötürücü diaqnostikası',
  'Əyləc sisteminin yoxlanılması',
  'Kondisioner xidməti',
  'Təkər və disk xidmətləri',
  'Kuza və boya işləri',
  'Orijinal ehtiyat hissələri',
  'Zəmanət xidməti',
]

export default function Service() {
  return (
    <>
      <Seo
        title="Audi servis xidməti"
        description="Audi Bakı Mərkəzinin rəsmi servis xidməti. Onlayn qeydiyyatdan keçin, növbədə gözləməyin. Ünvan: Babək pr. 43A, Bakı."
      />
      <BreadcrumbJsonLd items={[{ name: 'Servis', to: '/service' }]} />

      <PageHeader
        title="Audi servis xidməti"
        lead="Servisə öncədən yazılın, növbədə gözləməyin. Orijinal ehtiyat hissələri və sertifikatlı mütəxəssislər."
        breadcrumbs={[{ name: 'Servis' }]}
      />

      
      <section className="shell mt-10" aria-label="Servis əlaqə məlumatları">
        <div className="grid gap-6 border-y border-steel-200 py-8 sm:grid-cols-3">
          <p className="flex items-start gap-3 text-sm">
            <Pin className="mt-0.5 h-4 w-4 shrink-0 text-steel-500" />
            <span>
              <span className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-steel-400">
                Ünvan
              </span>
              {COMPANY.city} şəh., {COMPANY.address}
            </span>
          </p>

          <p className="flex items-start gap-3 text-sm">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-steel-500" />
            <span>
              <span className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-steel-400">
                Qəbul bölməsi
              </span>
              {COMPANY.serviceReception}
            </span>
          </p>

          <p className="flex items-start gap-3 text-sm">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-steel-500" />
            <span>
              <span className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-steel-400">
                Ehtiyat hissələri
              </span>
              {COMPANY.serviceParts}
            </span>
          </p>
        </div>
      </section>

      
      <section className="shell mt-14" aria-labelledby="services-title">
        <h2 id="services-title" className="text-2xl sm:text-3xl">
          Xidmətlərimiz
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s} className="border-b border-steel-100 py-3 text-sm text-steel-700">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="shell mt-16 max-w-3xl" aria-labelledby="service-form-title">
        <h2 id="service-form-title" className="text-xl sm:text-2xl">
          Servisə yazılmaq üçün qeydiyyatdan keçin
        </h2>
        <div className="mt-8">
          <ServiceForm />
        </div>
      </section>
    </>
  )
}
