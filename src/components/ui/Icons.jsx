
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const ArrowRight = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

export const ArrowLeft = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </svg>
)

export const ChevronDown = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const ChevronRight = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)

export const ChevronLeft = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
)

export const Search = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
)

export const Menu = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

export const Close = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const Mail = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="5" width="18" height="14" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

export const Phone = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />
  </svg>
)

export const Pin = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const Check = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 13l4 4L19 7" />
  </svg>
)

export const Wrench = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M14.7 6.3a4 4 0 105.02 5.02l-2.5-2.5.98-.98 2.5 2.5" />
    <path d="M14.7 6.3L5.6 15.4a2 2 0 102.83 2.83l9.1-9.1" />
  </svg>
)


export const Car = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 32 24" className={className} {...base}>
    <path d="M3 16v-3l2-1 3-4h11l4 4 5 1v3" />
    <path d="M3 16h26" />
    <circle cx="9" cy="17" r="2.6" />
    <circle cx="23" cy="17" r="2.6" />
  </svg>
)


export const Key = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="8" cy="8" r="4.2" />
    <path d="M11 11l8 8M16.5 16.5l2 2M14 14l2.5 2.5" />
  </svg>
)


export const Document = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M14 3H7a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V7z" />
    <path d="M14 3v4h4M9 12h6M9 16h6" />
  </svg>
)


export const SpeechBubble = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 4.8h16v10.4H8.4L4 19.2z" />
  </svg>
)


export const Grid = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    {[5.25, 10.5, 15.75].map((y) =>
      [5.25, 10.5, 15.75].map((x) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" />
      )),
    )}
  </svg>
)



const solid = { fill: 'currentColor', 'aria-hidden': true, focusable: false }

export const Youtube = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...solid}>
    <path d="M21.6 7.2a2.5 2.5 0 00-1.75-1.77C18.25 5 12 5 12 5s-6.25 0-7.85.43A2.5 2.5 0 002.4 7.2C2 8.82 2 12 2 12s0 3.18.4 4.8a2.5 2.5 0 001.75 1.77C5.75 19 12 19 12 19s6.25 0 7.85-.43a2.5 2.5 0 001.75-1.77C22 15.18 22 12 22 12s0-3.18-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
  </svg>
)

export const Instagram = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...solid}>
    <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43-.25.66-.6 1.22-1.15 1.77-.55.55-1.11.9-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.25-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.45 2.53c.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 1.8a3.2 3.2 0 110 6.4 3.2 3.2 0 010-6.4zM17.8 5.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
  </svg>
)

export const Facebook = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...solid}>
    <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H17V4.6c-.3-.04-1.3-.13-2.47-.13-2.45 0-4.13 1.5-4.13 4.24v2.19H7.7V14h2.7v8h3.1z" />
  </svg>
)

export const SOCIAL_ICONS = {
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
}



export const BrandYoutube = ({ className = 'h-10 w-10' }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
    <rect x="2" y="10" width="44" height="28" rx="7" fill="#FF0000" />
    <path d="M20 17.5l12 6.5-12 6.5z" fill="#fff" />
  </svg>
)

export const BrandInstagram = ({ className = 'h-10 w-10' }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#FFD521" />
        <stop offset="0.3" stopColor="#F50000" />
        <stop offset="0.65" stopColor="#B900B4" />
        <stop offset="1" stopColor="#4C68D7" />
      </linearGradient>
    </defs>
    <rect x="6" y="6" width="36" height="36" rx="10" fill="url(#ig)" />
    <circle cx="24" cy="24" r="8.5" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="33.5" cy="14.5" r="2.2" fill="#fff" />
  </svg>
)

export const BrandFacebook = ({ className = 'h-10 w-10' }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
    <rect x="6" y="6" width="36" height="36" rx="6" fill="#1877F2" />
    <path
      d="M31 24h-4.2v13h-5.2V24H18v-4.3h3.6v-2.8c0-3.4 1.9-5.4 5.4-5.4h3.6v4.3h-2.4c-1.1 0-1.5.5-1.5 1.5v2.4h4.1z"
      fill="#fff"
    />
  </svg>
)

export const BRAND_SOCIAL_ICONS = {
  youtube: BrandYoutube,
  instagram: BrandInstagram,
  facebook: BrandFacebook,
}
