import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import PageHeader from '@/components/ui/PageHeader'
import CarFilter from '@/components/cars/CarFilter'
import CarCard from '@/components/cars/CarCard'
import useCarFilters from '@/hooks/useCarFilters'
import { STOCK } from '@/data/stock'

export default function Stock() {
  const { filters, setFilter, reset, options, results, activeLabel } =
    useCarFilters(STOCK)

  return (
    <>
      <Seo
        title="Satışda olan avtomobillər"
        description="Audi Bakı Mərkəzində satışda olan yeni Audi avtomobilləri — qiymət, mühərrik, buraxılış ili və digər göstəricilər üzrə filtr."
      />
      <BreadcrumbJsonLd items={[{ name: 'Satışda olan avtomobillər', to: '/stock' }]} />

      <PageHeader
        title="Satışda olan avtomobillər"
        lead={
          activeLabel
            ? `Filtr: Audi ${activeLabel}`
            : 'Anbarda mövcud olan yeni avtomobillər. Axtarışı daraltmaq üçün filtrdən istifadə edin.'
        }
        breadcrumbs={[{ name: 'Satışda olan' }]}
      />

      <div className="shell mt-10">
        <CarFilter
          filters={filters}
          options={options}
          onChange={setFilter}
          onReset={reset}
          resultCount={results.length}
        />

        {results.length > 0 ? (
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="mt-16 border border-steel-200 p-10 text-center">
            <p className="text-base">Seçilmiş şərtlərə uyğun avtomobil tapılmadı.</p>
            <button type="button" onClick={reset} className="btn-outline mt-6">
              Filtri sıfırla
            </button>
          </div>
        )}
      </div>
    </>
  )
}
