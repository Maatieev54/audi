import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from '@/components/ui/Icons'

/**
 
 * @param {{value: string, label: string}[]} options 
 */
export default function Dropdown({
  value,
  onChange,
  options,
  placeholder = 'Seçin',
  id,
  className = '',
  tone = 'dark',
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const rootRef = useRef(null)
  const listRef = useRef(null)

  const all = [{ value: '', label: placeholder }, ...options]
  const selected = all.find((o) => o.value === value)

  
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  
  useEffect(() => {
    if (open) {
      setActive(all.findIndex((o) => o.value === value))
    }
  }, [open]) 

  
  useEffect(() => {
    if (!open || active < 0) return
    const el = listRef.current?.children[active]
    el?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const pick = (v) => {
    onChange(v)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault()
      setOpen(true)
      return
    }
    if (!open) return

    if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % all.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + all.length) % all.length)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(all.length - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (all[active]) pick(all[active].value)
    }
  }

  const dark = tone === 'dark'

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        
        className={`flex w-full items-center gap-2 border-b py-2 pl-0 pr-2 text-left
                    text-[16px] transition-colors focus:outline-none
                    ${
                      dark
                        ? 'border-paper/30 text-paper hover:border-paper focus-visible:border-paper'
                        : 'border-steel-300 text-ink hover:border-ink focus-visible:border-ink'
                    }`}
      >
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          } ${dark ? 'text-paper/80' : 'text-steel-500'}`}
        />
        <span className="truncate">{selected?.label ?? placeholder}</span>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
          className="absolute left-0 top-[calc(100%+4px)] z-50 max-h-72 w-full min-w-[240px]
                     animate-slideDown overflow-y-auto border border-steel-200 bg-paper
                     py-1 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)]"
        >
          {all.map((o, i) => (
            <li
              key={o.value || '__placeholder'}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(o.value)}
              className={`cursor-pointer px-4 py-2 text-[16px] transition-colors ${
                i === active ? 'bg-steel-100 text-ink' : 'text-steel-700'
              } ${o.value === value ? 'font-medium text-ink' : ''} ${
                !o.value ? 'text-steel-500' : ''
              }`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
