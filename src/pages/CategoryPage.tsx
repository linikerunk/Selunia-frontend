import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ProductCard } from '@components/ProductCard'
import { mockProducts } from '@mocks/data'

export function CategoryPage() {
  const { slug } = useParams()

  const products = useMemo(() => mockProducts.filter(p => p.category.slug === slug), [slug])

  return (
    <div className="container">
      <h1>{products[0]?.category.name ?? 'Categoria'}</h1>
      <div className="cards-grid">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}


