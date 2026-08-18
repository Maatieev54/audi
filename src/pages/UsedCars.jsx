import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import PageHeader from '@/components/ui/PageHeader'
import CarFilter from '@/components/cars/CarFilter'
import CarCard from '@/components/cars/CarCard'
import useCarFilters from '@/hooks/useCarFilters'
import { USED_CARS } from '@/data/stock'

export default function UsedCars() {
  const { filters, setFilter, reset, options, results, activeLabel } =
    useCarFilters(USED_CARS)

  return (
    <>
      <Seo
        title="İkinci əl avtomobillər"
        description="Audi Bakı Mərkəzinin təsdiqlədiyi ikinci əl Audi avtomobilləri — yürüş, qiymət və texniki göstəricilər üzrə filtr."
      />
      <BreadcrumbJsonLd items={[{ name: 'İkinci əl avtomobillər', to: '/used' }]} />

      <PageHeader
        title="İkinci əl avtomobillər"
        lead={
          activeLabel
            ? `Filtr: Audi ${activeLabel}`
            : 'Yoxlanılmış və servis tarixçəsi məlum olan ikinci əl avtomobillər.'
        }
        breadcrumbs={[{ name: 'İkinci əl' }]}
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
