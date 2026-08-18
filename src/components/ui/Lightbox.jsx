import { useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Close } from '@/components/ui/Icons'
import useLockBodyScroll from '@/hooks/useLockBodyScroll'

export default function Lightbox({ images, index, title, onClose, onIndexChange }) {
  const total = images.length

  const go = useCallback(
    (delta) => onIndexChange((index + delta + total) % total),
    [index, total, onIndexChange],
  )

  useLockBodyScroll(true)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  
  useEffect(() => {
    if (total < 2) return
    for (const d of [1, -1]) {
      const img = new Image()
      img.src = images[(index + d + total) % total]
    }
  }, [images, index, total])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Şəkil qalereyası"
      onClick={onClose}
      className="fixed inset-0 z-[100] animate-fadeIn bg-black"
    >
      
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start
                      justify-between px-5 py-4 sm:px-7">
        <span aria-live="polite" className="text-[13px] text-paper/70">
          {index + 1} / {total}
        </span>

        {title && (
          <span className="absolute left-1/2 -translate-x-1/2 text-[13px] text-paper/80">
            {title}
          </span>
        )}

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          aria-label="Bağla"
          className="pointer-events-auto -mr-2 -mt-2 p-2 text-paper/70 transition-colors hover:text-paper"
        >
          <Close className="h-7 w-7" />
        </button>
      </div>

      
      <div className="flex h-full w-full items-center justify-center px-12 py-16 sm:px-20">
        <img
          key={images[index]}
          src={images[index]}
          alt={`${title ?? 'Şəkil'} — ${index + 1} / ${total}`}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full animate-zoomIn object-contain"
        />
      </div>

      
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            aria-label="Əvvəlki şəkil"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-paper/60
                       transition-colors duration-200 hover:text-paper sm:left-2 sm:p-4"
          >
            <ChevronLeft className="h-9 w-9 [stroke-width:1.25] sm:h-11 sm:w-11" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1) }}
            aria-label="Növbəti şəkil"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-paper/60
                       transition-colors duration-200 hover:text-paper sm:right-2 sm:p-4"
          >
            <ChevronRight className="h-9 w-9 [stroke-width:1.25] sm:h-11 sm:w-11" />
          </button>
        </>
      )}
    </div>
  )
}
