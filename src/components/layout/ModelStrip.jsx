import { FAMILIES } from '@/data/models'
const ACCENTED = new Set(['R8', 'RS'])

export default function ModelStrip({ className = '', active, onSelect }) {
  return (
    <div className={`hidden strip:block ${className}`}>
      <ul className="flex items-center">
        {FAMILIES.map((family) => {
          const isOpen = active === family

          return (
            <li key={family}>
              <button
                type="button"
                onClick={() => onSelect(isOpen ? null : family)}
                aria-expanded={isOpen}
                aria-controls="family-panel"
                className={`mr-[9px] inline-flex items-center py-2 text-[15.36px]
                            transition-colors duration-200 ${
                              isOpen ? 'text-ink' : 'text-steel-800 hover:text-ink'
                            }`}
              >
                {ACCENTED.has(family) && (
                  <span
                    aria-hidden="true"
                    className="ml-[3px] mr-[6px] inline-block h-[13px] w-[12px]
                               -skew-x-[30deg] bg-accent"
                  />
                )}
                {family}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
