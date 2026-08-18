import CarImage from '@/components/ui/CarImage'

/**
 * @param {object}  model     
 * @param {boolean} inStock   
 * @param {string}  alt
 * @param {string}  className 
 * @param {string}  imgClassName
 */
export default function ModelTile({
  model,
  inStock = true,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <CarImage
        model={model}
        alt={alt}
        loading={loading}
        className={`h-full w-full object-contain transition-all duration-500 ease-audi
                    ${inStock ? '' : 'opacity-40 grayscale'} ${imgClassName}`}
      />

      {!inStock && (
        <>
          
          <div className="pointer-events-none absolute inset-0 bg-ink/45" aria-hidden="true" />

          
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="-rotate-45 whitespace-nowrap border-y border-paper/70 bg-ink/75
                         px-6 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]
                         text-paper shadow-sm"
            >
              Stokda yoxdur
            </span>
          </div>
        </>
      )}
    </div>
  )
}
