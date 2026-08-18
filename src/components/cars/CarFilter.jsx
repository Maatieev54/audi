import { ChevronDown, Close, Search } from '@/components/ui/Icons'

export default function CarFilter({ filters, options, onChange, onReset, resultCount }) {
  const set = (key) => (e) => onChange(key, e.target.value)

  const selects = [
    { key: 'family', label: 'Modellər', items: options.families },
    { key: 'fuel', label: 'Yanacaq növü', items: options.fuels },
    { key: 'year', label: 'Buraxılış ili', items: options.years },
    { key: 'engine', label: 'Mühərrik', items: options.engines },
    { key: 'color', label: 'Rəng', items: options.colors },
  ]

  const hasActive = Object.values(filters).some(Boolean)

  return (
    <form
      className="border border-steel-200 bg-steel-50 p-5 lg:p-6"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Avtomobil filtri"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {selects.map(({ key, label, items }) => (
          <div key={key}>
            <label htmlFor={`f-${key}`} className="field-label">
              {label}
            </label>
            <div className="relative">
              <select
                id={`f-${key}`}
                value={filters[key]}
                onChange={set(key)}
                className="w-full appearance-none border border-steel-300 bg-paper py-2.5 pl-3 pr-9
                           text-sm transition-colors hover:border-ink focus:border-ink focus:outline-none"
              >
                <option value="">Hamısı</option>
                {items.map((it) => (
                  <option key={it} value={it}>
                    {it}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
            </div>
          </div>
        ))}
        <div>
          <label htmlFor="f-priceMax" className="field-label">
            Maksimum qiymət (AZN)
          </label>
          <input
            id="f-priceMax"
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            value={filters.priceMax}
            onChange={set('priceMax')}
            placeholder="məs. 80000"
            className="w-full border border-steel-300 bg-paper px-3 py-2.5 text-sm
                       transition-colors hover:border-ink focus:border-ink focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="f-mileageMax" className="field-label">
            Maksimum yürüş (km)
          </label>
          <input
            id="f-mileageMax"
            type="number"
            min="0"
            step="5000"
            inputMode="numeric"
            value={filters.mileageMax}
            onChange={set('mileageMax')}
            placeholder="məs. 100000"
            className="w-full border border-steel-300 bg-paper px-3 py-2.5 text-sm
                       transition-colors hover:border-ink focus:border-ink focus:outline-none"
          />
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="f-q" className="field-label">
            Axtar
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
            <input
              id="f-q"
              type="search"
              value={filters.q}
              onChange={set('q')}
              placeholder="Model adı ilə axtarın…"
              className="w-full border border-steel-300 bg-paper py-2.5 pl-9 pr-3 text-sm
                         transition-colors hover:border-ink focus:border-ink focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-steel-200 pt-5">
        <p className="text-sm text-steel-600" role="status">
          <span className="font-medium text-ink">{resultCount}</span> avtomobil tapıldı
        </p>

        {hasActive && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-sm text-steel-600 transition-colors hover:text-ink"
          >
            <Close className="h-4 w-4" />
            Filtri sıfırla
          </button>
        )}
      </div>
    </form>
  )
}
