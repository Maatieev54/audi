import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '@/components/ui/Logo'
import { Close, Menu, Search } from '@/components/ui/Icons'
import NavPanel from './NavPanel'
import FamilyPanel from './FamilyPanel'
import ModelStrip from './ModelStrip'
import SearchDropdown from './SearchDropdown'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [family, setFamily] = useState(null)   
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const headerRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    setFamily(null)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen && !searchOpen && !family) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      setSearchOpen(false)
      setFamily(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, searchOpen, family])

  useEffect(() => {
    if (!menuOpen && !searchOpen && !family) return
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false)
        setSearchOpen(false)
        setFamily(null)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [menuOpen, searchOpen, family])

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[90] bg-ink px-4 py-2 text-sm text-paper"
      >
        Əsas məzmuna keç
      </a>

      <header
        ref={headerRef}
        className={`sticky top-0 z-[60] bg-paper transition-shadow duration-300 ${
          scrolled || menuOpen || searchOpen || family ? 'shadow-[0_1px_0_0_rgba(0,0,0,0.10)]' : ''
        }`}
      >
        <div className="shell-header relative flex h-14 items-center lg:h-16">
          
          <button
            type="button"
            onClick={() => {
              setMenuOpen((v) => !v)
              setSearchOpen(false)
              setFamily(null)
            }}
            aria-expanded={menuOpen}
            aria-controls="nav-panel"
            className="-ml-2 inline-flex shrink-0 items-center gap-2 p-2 text-ink
                       transition-opacity hover:opacity-60"
          >
            {menuOpen ? <Close /> : <Menu />}
            
            <span className="text-[14.4px]">{menuOpen ? 'Bağla' : 'Menu'}</span>
          </button>

          <ModelStrip
            className="ml-[30px]"
            active={family}
            onSelect={(f) => {
              setFamily(f)
              setMenuOpen(false)
              setSearchOpen(false)
            }}
          />

          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v)
              setMenuOpen(false)
              setFamily(null)
            }}
            aria-expanded={searchOpen}
            aria-controls="search-panel"
            className="inline-flex shrink-0 items-center gap-1.5 p-2 text-ink
                       transition-opacity hover:opacity-60"
            aria-label="Axtarış"
          >
            <Search className="h-[18px] w-[18px]" />
        
            <span className="text-[15.36px]">Axtarış</span>
          </button>

          
          <div className="ml-auto shrink-0 pl-4">
            <Logo />
          </div>
        </div>

        {menuOpen && (
          <div
            id="nav-panel"
            className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)]
                       animate-slideDown overflow-y-auto border-t border-steel-100
                       bg-paper shadow-[0_18px_30px_-14px_rgba(0,0,0,0.28)]"
          >
            <NavPanel onNavigate={() => setMenuOpen(false)} />
          </div>
        )}

        {family && (
          <div
            id="family-panel"
            className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)]
                       animate-slideDown overflow-y-auto border-t border-steel-100
                       bg-paper shadow-[0_18px_30px_-14px_rgba(0,0,0,0.28)]"
          >
            <FamilyPanel family={family} onNavigate={() => setFamily(null)} />
          </div>
        )}

        {searchOpen && (
          <div
            id="search-panel"
            className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)]
                       animate-slideDown overflow-y-auto border-t border-steel-100
                       bg-paper shadow-[0_18px_30px_-14px_rgba(0,0,0,0.28)]"
          >
            <SearchDropdown open={searchOpen} onClose={() => setSearchOpen(false)} />
          </div>
        )}
      </header>
    </>
  )
}
