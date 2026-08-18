import { useEffect, useMemo, useState } from 'react'
import { bodyToSilhouette, carSilhouette } from '@/lib/media'


export default function CarImage({
  model,
  alt,
  className = '',
  loading = 'lazy',
  ...rest
}) {
  
  const candidates = useMemo(() => {
    const list = []

    if (typeof model?.image === 'string' && model.image.startsWith('/')) {
      list.push(model.image)
    }

    if (model?.family) {
      const slug = String(model.family).toLowerCase()
      list.push(`/images/models/${slug}.webp`)
      list.push(`/images/models/${slug}.webp`)
    }

    list.push(carSilhouette(bodyToSilhouette(model?.body), `Audi ${model?.name ?? ''}`))
    return list
  }, [model])

  const [index, setIndex] = useState(0)

  
  useEffect(() => setIndex(0), [candidates])

  return (
    <img
      src={candidates[index]}
      alt={alt ?? `Audi ${model?.name ?? ''}`}
      loading={loading}
      onError={() => {
        
        setIndex((i) => (i < candidates.length - 1 ? i + 1 : i))
      }}
      className={className}
      {...rest}
    />
  )
}
