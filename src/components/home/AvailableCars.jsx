import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from '@/components/ui/Icons'
import Dropdown from '@/components/ui/Dropdown'
import { FAMILIES } from '@/data/models'
import { STOCK, USED_CARS } from '@/data/stock'

export default function AvailableCars() {
 
  const [family, setFamily] = useState('')
  const navigate = useNavigate()

  const stockCount = family
    ? STOCK.filter((c) => c.family === family).length
    : STOCK.length
  const usedCount = family
    ? USED_CARS.filter((c) => c.family === family).length
    : USED_CARS.length

  const query = family ? `?family=${family}` : ''

  return (
    <section className="bg-steel-800 text-paper" aria-labelledby="available-title">
    
      <div className="shell">
        <div
          className="flex flex-col divide-y divide-paper/15 lg:h-16 lg:flex-row
                     lg:items-center lg:divide-y-0"
        >
          <h2
            id="available-title"
            className="flex items-center py-4 text-[19.2px] font-normal tracking-normal
                       lg:py-0 lg:pr-9"
          >
            Mövcud modellər
          </h2>

          <div className="flex items-center py-3 lg:py-0 lg:pr-10">
            <Dropdown
              id="model-select"
              value={family}
              onChange={setFamily}
              placeholder="Modeli seçin"
              options={FAMILIES.map((f) => ({ value: f, label: `Audi ${f}` }))}
              className="w-full lg:w-[232px]"
              tone="dark"
            />
          </div>

          <div className="flex flex-col divide-y divide-paper/15 sm:flex-row sm:divide-y-0">
            <button
              type="button"
              onClick={() => navigate(`/stock${query}`)}
              className="group flex items-center gap-2.5 py-4 text-left text-[17.6px]
                         transition-colors hover:text-paper/70 lg:py-0 lg:pr-9"
            >
              <span>
                <span className="mr-1.5">{stockCount}</span>
                Satışda olan
              </span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => navigate(`/used${query}`)}
              className="group flex items-center gap-2.5 py-4 text-left text-[17.6px]
                         transition-colors hover:text-paper/70 lg:py-0"
            >
              <span>
                <span className="mr-1.5">{usedCount}</span>
                İkinci əl
              </span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
