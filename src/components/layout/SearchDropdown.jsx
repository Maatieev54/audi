import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon } from '@/components/ui/Icons'
import CarImage from '@/components/ui/CarImage'
import { searchSite } from '@/lib/search'


function Thumb({ item }) {
  const box = 'h-9 w-14 shrink-0 overflow-hidden bg-steel-50'

  if (item.image) {
    return (
      <span className={box}>
        <img src={item.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
      </span>
    )
  }

  if (item.model) {
    return (
      <span className={`${box} flex items-center justify-center`}>
        <CarImage
          model={item.model}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
        />
      </span>
    )
  }

  return <span className={box} aria-hidden="true" />
}

export default function SearchDropdown({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const results = useMemo(() => (open ? searchSite(query, 8) : []), [query, open])

  
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const t = setTimeout(() => inputRef.current?.focus(), 40)
    return () => clearTimeout(t)
  }, [open])

  const go = (to) => {
    navigate(to)
    onClose()
  }

  const submit = (e) => {
    e.preventDefault()
    if (results[active]) go(results[active].to)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    }
  }

  if (!open) return null

  return (

    <form onSubmit={submit} className="shell pb-10 pt-8 card:pb-14 card:pt-10" role="search">
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
          placeholder="axtarış"
          aria-label="Axtarış sorğusu"
          autoComplete="off"
       
          className="h-10 w-full max-w-[700px] border border-[#d0d3d4] bg-paper px-[15px]
                     text-[14px] outline-none transition-colors
                     placeholder:text-steel-400 focus:border-[#222]
                     focus-visible:ring-0 focus-visible:ring-offset-0
                     [&::-webkit-search-cancel-button]:hidden"
        />

        <button
          type="submit"
          aria-label="Axtar"
          className="ml-[10px] flex h-10 w-10 shrink-0 items-center justify-center bg-ink
                     text-paper transition-opacity hover:opacity-60"
        >
          <SearchIcon className="h-[22px] w-[22px]" />
        </button>
      </div>

      
      <div className="mt-5 max-w-[750px]">
        {query.length < 2 ? (
          <p className="text-[13px] text-steel-500">Axtarmaq üçün ən azı 2 hərf yazın.</p>
        ) : results.length === 0 ? (
          <p className="text-[13px] text-steel-500">Nəticə tapılmadı.</p>
        ) : (
          <ul className="divide-y divide-steel-100 border-y border-steel-100" role="listbox">
            {results.map((r, i) => (
              <li key={`${r.to}-${i}`} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.to)}
                  className={`flex w-full items-center gap-4 px-2 py-2.5 text-left
                              transition-colors ${i === active ? 'bg-steel-50' : ''}`}
                >
                  <Thumb item={r} />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] text-ink">{r.title}</span>
                    <span className="block text-[12px] text-steel-500">{r.group}</span>
                  </span>

                  {r.meta && (
                    <span className="shrink-0 text-[12px] text-steel-500">{r.meta}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  )
}
