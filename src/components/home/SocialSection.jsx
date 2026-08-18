import { SOCIAL } from '@/data/site'
import { BRAND_SOCIAL_ICONS } from '@/components/ui/Icons'
export default function SocialSection() {
  return (
    <section className="py-14 lg:py-20" aria-labelledby="social-title">
      <div className="shell">
        <h2 id="social-title" className="text-[32px] font-bold tracking-normal">
          Audi sosial şəbəkələrdə
        </h2>
        <ul className="mt-7 grid divide-y divide-steel-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {SOCIAL.map((s) => {
            const Icon = BRAND_SOCIAL_ICONS[s.id]
            return (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex items-center justify-center py-12"
                >
                  <Icon
                    className="h-14 w-14 transition-transform duration-300
                               group-hover:scale-110"
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
