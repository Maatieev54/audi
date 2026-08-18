import { Link } from 'react-router-dom'
import { ChevronRight } from '@/components/ui/Icons'


export default function PageHeader({ title, lead, breadcrumbs = [], children }) {
  return (
    <div className="shell pt-10 lg:pt-14">
      {breadcrumbs.length > 0 && (
        <nav aria-label="Naviqasiya izi" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-steel-500">
            <li>
              <Link to="/" className="hover:text-ink">
                Ana səhifə
              </Link>
            </li>
            {breadcrumbs.map((b, i) => (
              <li key={b.to ?? b.name} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {i === breadcrumbs.length - 1 || !b.to ? (
                  <span aria-current="page" className="text-ink">
                    {b.name}
                  </span>
                ) : (
                  <Link to={b.to} className="hover:text-ink">
                    {b.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <h1 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h1>

      {lead && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-600">{lead}</p>
      )}

      {children}
    </div>
  )
}
