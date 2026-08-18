import { Link } from 'react-router-dom'

const ITEMS = [
  { id: 'service', to: '/service', label: 'Servis', img: '/images/icons/service.webp' },
  { id: 'message', to: '/contacts', label: 'Mesaj', img: '/images/icons/contacts.webp' },
]

export default function SideWidget() {
  return (
    <>
      
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex bg-ink/95 backdrop-blur-sm card:hidden"
        aria-label="Sürətli keçidlər"
      >
        {ITEMS.map(({ id, to, label, img }, i) => (
          <Link
            key={id}
            to={to}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5
                        text-paper transition-colors active:bg-accent
                        ${i > 0 ? 'border-l border-paper/15' : ''}`}
          >
            <img src={img} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
            <span className="text-[11px] leading-none">{label}</span>
          </Link>
        ))}
      </nav>

     
      <div
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col
                   items-end card:flex"
      >
        {ITEMS.map(({ id, to, label, img }, i) => (
          <Link
            key={id}
            to={to}
            aria-label={label}
            className={`group/item flex items-center overflow-hidden bg-ink/90 text-paper
                        backdrop-blur-sm transition-colors duration-300 hover:bg-accent
                        ${i === 0 ? 'rounded-tl-[15px]' : ''}
                        ${i === ITEMS.length - 1 ? 'rounded-bl-[15px]' : ''}
                        ${i > 0 ? 'border-t border-paper/15' : ''}`}
          >
   
            <span
              className="max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-bold
                         opacity-0 transition-all duration-300 ease-audi
                         group-hover/item:max-w-[140px] group-hover/item:pl-5
                         group-hover/item:opacity-100"
            >
              {label}
            </span>
            <span className="flex h-[60px] w-[50px] shrink-0 items-center justify-center">
              <img
                src={img}
                alt=""
                aria-hidden="true"
                className="h-[26px] w-[26px] object-contain"
              />
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
