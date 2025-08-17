import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  fallbackText?: string
}

const buildPlaceholder = (text?: string, width = 800, height = 600) => {
  const label = encodeURIComponent(text ?? 'Selúnia')
  return `https://placehold.co/${width}x${height}?text=${label}`
}

export function ImageWithFallback({ src, alt, className, fallbackText }: Props) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-100" aria-hidden />
      )}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setImgSrc(buildPlaceholder(fallbackText))}
        className="w-full h-full object-cover block"
      />
    </div>
  )
}


