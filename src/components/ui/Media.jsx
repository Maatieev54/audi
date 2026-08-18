import { resolveImage } from '@/lib/media'


export default function Media({
  src,
  label = '',
  alt,
  ratio = '16/9',
  tone = 'light',
  w = 1600,
  h = 900,
 
  fit = 'cover',
  className = '',
  imgClassName = '',
  priority = false,
  children,
}) {
  const resolved = resolveImage(src, { label: label || alt, w, h, tone })

  return (
    <div
      className={`relative overflow-hidden bg-steel-100 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={resolved}
        alt={alt ?? label ?? ''}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={`h-full w-full ${
          fit === 'contain' ? 'object-contain' : 'object-cover'
        } ${imgClassName}`}
      />
      {children}
    </div>
  )
}
