import { Link } from 'react-router-dom'
import type { Product } from '@types/product'
import { ImageWithFallback } from '@components/Image'
import { Media } from '@components/Media'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  return (
    <article className="product-card">
      <Link to={`/produto/${product.id}`} className="product-card-thumb block" aria-label={`Ver detalhes de ${product.name}`}>
        {product.media?.[0]
          ? <Media item={product.media[0]} className="w-full h-full object-cover block aspect-[4/3]" />
          : <ImageWithFallback src={product.images?.[0] ?? ''} alt={product.name} className="aspect-[4/3]" fallbackText={product.name} />}
      </Link>
      <div className="product-card-info">
        <h3 className="product-card-title">{product.name}</h3>
        <div className="product-card-meta">
          <span className="product-price">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          {product.oldPrice && (
            <span className="product-old-price">{product.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          )}
        </div>
      </div>
    </article>
  )
}


