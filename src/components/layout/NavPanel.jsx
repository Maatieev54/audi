import { Link } from 'react-router-dom'
import { ChevronRight } from '@/components/ui/Icons'

const RIGHT_LINKS = [
  { label: 'Haqqımızda', to: '/about' },
  { label: 'Xəbərlər', to: '/news' },
  { label: 'Test Drive yazılın', to: '/test-drive' },
  { label: 'Audi servis xidməti', to: '/service' },
  { label: 'Bizimlə əlaqə', to: '/contacts' },
]

export default function NavPanel({ onNavigate }) {
  return (
    <div className="shell grid gap-10 py-8 sm:grid-cols-2 lg:gap-16 lg:py-10">
      
      <div>
        <Link
          to="/"
          onClick={onNavigate}
          className="block text-[14px] font-bold text-ink transition-opacity hover:opacity-60"
        >
          Ana səhifə
        </Link>

        <div className="mt-7">
          <Link
            to="/models"
            onClick={onNavigate}
            className="block text-[14px] font-bold text-ink transition-opacity hover:opacity-60"
          >
            Model siyahısı
          </Link>

          
          <Link to="/models" onClick={onNavigate} className="group mt-3 block max-w-[280px]">
            <img
              src="/images/nav/model-siyahisi.webp"
              alt="Audi model sırası"
              loading="lazy"
              className="w-full object-contain transition-transform duration-500
                         ease-audi group-hover:scale-[1.03]"
            />
          </Link>
        </div>
      </div>

      
      <div>
        <p className="text-[14px] font-bold text-ink">Audi Bakı Mərkəzi</p>

        <ul className="mt-5 space-y-3">
          {RIGHT_LINKS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={onNavigate}
                className="group inline-flex items-center gap-1.5 text-[13px] text-steel-800
                           transition-colors hover:text-ink"
              >
                {item.label}
                <ChevronRight
                  className="h-3 w-3 text-steel-500 transition-transform duration-300
                             group-hover:translate-x-0.5 group-hover:text-ink"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
