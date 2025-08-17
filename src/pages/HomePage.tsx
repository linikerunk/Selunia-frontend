import { Link } from 'react-router-dom'
import { ProductCard } from '@components/ProductCard'
import { mockHighlightedProducts, mockCategories } from '@mocks/data'
import { ImageWithFallback } from '@components/Image'

export function HomePage() {
  const highlighted = mockHighlightedProducts.slice(0, 8)

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-inner">
          <h1>Selúnia</h1>
          <p>Beleza que ilumina — semijoias, roupas e cosméticos selecionados com carinho.</p>
          <div className="hero-cta">
            <Link to="/categoria/semi-joias" className="btn">Ver semijoias</Link>
            <Link to="/categoria/roupas" className="btn btn-secondary">Ver roupas</Link>
          </div>
        </div>
      </section>

      <section className="categories container">
        <h2>Categorias</h2>
        <div className="category-grid">
          {mockCategories.map((cat) => (
            <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="category-card">
              <ImageWithFallback src={cat.banner} alt={cat.name} className="w-full h-[160px]" fallbackText={cat.name} />
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <h2>Destaques</h2>
        <div className="cards-grid">
          {highlighted.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}


