import type { ProductMedia } from '@types/product'
import { ImageWithFallback } from '@components/Image'

type Props = {
  item: ProductMedia
  className?: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
}

export function Media({ item, className, controls = true, autoPlay = false, muted = true, loop = true }: Props) {
  if (item.kind === 'video') {
    return (
      <video className={className} controls={controls} autoPlay={autoPlay} muted={muted} loop={loop} playsInline preload="metadata" poster={item.thumbnail}>
        <source src={item.src} />
        Seu navegador não suporta vídeo.
      </video>
    )
  }
  return <ImageWithFallback src={item.src} alt={item.alt ?? ''} className={className} />
}


