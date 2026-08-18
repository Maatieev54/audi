import { Link } from 'react-router-dom'
import { COPYRIGHT, COPYRIGHT_NOTE } from '@/data/site'

const ITEMS = [
  { to: '/models', label: 'Bütün modellər', img: '/images/icons/key.webp' },
  { to: '/test-drive', label: 'Test drive', img: '/images/icons/test-drive.webp' },
  { to: '/service', label: 'Servis', img: '/images/icons/service.webp' },
  { to: '/contacts', label: 'Bizimlə əlaqə', img: '/images/icons/contacts.webp' },
  { to: '/privacy', label: 'Məxfilik bildirişi', img: '/images/icons/privacy.webp' },
]

export default function Footer() {
  return (
    <footer className="mt-4 bg-steel-700 text-paper">
      <div className="shell py-10 lg:py-12">
        <nav aria-label="Alt naviqasiya">
          <ul
            className="grid grid-cols-2 gap-y-8 divide-steel-500 sm:grid-cols-3
                       lg:grid-cols-5 lg:divide-x"
          >
            {ITEMS.map(({ to, label, img }) => (
              <li key={to} className="flex justify-center">
                <Link
                  to={to}
                  className="group flex flex-col items-center gap-3 px-4 text-center
                             transition-opacity duration-300 hover:opacity-70"
                >
                  <img
                    src={img}
                    alt=""
                    aria-hidden="true"
                    className="h-7 w-7 object-contain opacity-85"
                  />
                  <span className="text-[14.4px] leading-snug text-paper/85">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 border-t border-steel-600 pt-7">
          <p
            className="mx-auto max-w-4xl text-center text-[12.8px] leading-relaxed
                       text-paper/55 card:text-[16px]"
          >
            {COPYRIGHT} {COPYRIGHT_NOTE}
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-[12.8px] leading-relaxed text-paper/40">
            Bu sayt tədris məqsədi ilə hazırlanmış nümunədir. “Audi” adı və əlaqəli
            nişanlar Audi AG-nin ticarət nişanlarıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
