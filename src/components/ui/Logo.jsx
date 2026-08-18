import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '@/data/site'

export default function Logo({ className = '', invert = false }) {
  const [broken, setBroken] = useState(false)
  const showImage = Boolean(SITE.logo) && !broken

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label={`${SITE.logoAlt} — ana səhifə`}
    >
      {showImage ? (
        <img
          src={SITE.logo}
          alt={SITE.logoAlt}
          onError={() => setBroken(true)}
          className={`h-7 w-auto object-contain lg:h-8 ${invert ? 'brightness-0 invert' : ''}`}
        />
      ) : (
        <span
          className={`text-lg font-semibold uppercase tracking-[0.3em] transition-opacity
                      duration-300 hover:opacity-60 lg:text-xl
                      ${invert ? 'text-paper' : 'text-ink'}`}
        >
          Audi
        </span>
      )}
    </Link>
  )
}
