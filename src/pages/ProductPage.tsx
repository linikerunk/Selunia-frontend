import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { mockProducts } from '@mocks/data'
import { useCartStore } from '@store/cartStore'
import { ImageWithFallback } from '@components/Image'
import { Media } from '@components/Media'

export function ProductPage() {
  const { id } = useParams()
  const product = useMemo(() => mockProducts.find(p => String(p.id) === String(id)), [id])
  const addItem = useCartStore(s => s.addItem)
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const navigate = useNavigate()

  if (!product) {
    return <div className="container"><p>Produto não encontrado.</p></div>
  }

  const priceBRL = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const oldPriceBRL = product.oldPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const installmentQty = 6
  const installmentValue = (product.price / installmentQty).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const freeShippingThreshold = 199.9
  const hasFreeShipping = product.price >= freeShippingThreshold
  const related = mockProducts.filter(p => p.category.slug === product.category.slug && p.id !== product.id).slice(0, 4)

  function handleBuyNow() {
    addItem({ product, quantity })
    navigate('/carrinho')
  }

  async function handleShare() {
    const shareData = {
      title: product.name,
      text: `Amei este produto da Selúnia: ${product.name}`,
      url: window.location.href
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch {}
    } else {
      await navigator.clipboard.writeText(shareData.url)
      alert('Link copiado!')
    }
  }

  return (
    <div className="container product-page">
      <div className="product-gallery">
        {product.media?.[imageIndex]
          ? <Media item={product.media[imageIndex]} className="w-full h-full object-cover block aspect-[4/3] rounded-xl" />
          : <ImageWithFallback src={product.images?.[imageIndex] ?? product.images?.[0] ?? ''} alt={product.name} className="aspect-[4/3]" fallbackText={product.name} />}
        <div className="thumbs">
          {(product.media ?? (product.images ?? []).map(src => ({ kind: 'image' as const, src }))).map((m, i) => (
            <button key={i} className={`p-0 border-0 bg-transparent ${i === imageIndex ? 'ring-2 ring-rose-300 rounded-lg' : ''}`} onClick={() => setImageIndex(i)} aria-label={`Ver mídia ${i + 1}`}>
              {m.kind === 'video'
                ? <div className="relative"><ImageWithFallback src={m.thumbnail ?? ''} alt={product.name} className="w-full h-full" fallbackText={product.name} /><span className="absolute inset-0 grid place-items-center text-white">▶</span></div>
                : <ImageWithFallback src={m.src} alt={`${product.name} ${i + 1}`} className="w-full h-full" fallbackText={product.name} />}
            </button>
          ))}
        </div>
      </div>

      <div className="product-details">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Início</Link>
          <span>/</span>
          <Link to={`/categoria/${product.category.slug}`}>{product.category.name}</Link>
        </nav>

        <h1>{product.name}</h1>
        <div className="rating">
          <span>⭐ 4,8</span>
          <span className="muted">(124 avaliações)</span>
        </div>

        <div className="price-box">
          <p className="product-price">{priceBRL}</p>
          {product.oldPrice && (
            <p className="product-old-price">{oldPriceBRL}</p>
          )}
          {hasFreeShipping && <span className="badge">Frete grátis</span>}
          <p className="installment">ou {installmentQty}x de {installmentValue} sem juros</p>
        </div>

        <div className="benefits">
          <span>✓ Troca em 7 dias</span>
          <span>✓ Pagamento seguro</span>
          <span>✓ Envio rápido</span>
        </div>

        <div className="tags flex flex-wrap gap-2 my-2">
          {product.tags?.map(t => (
            <span key={t} className="inline-block text-xs bg-rose-100 text-ink px-2 py-1 rounded-md">{t}</span>
          ))}
        </div>
        <p className="product-desc">{product.description}</p>

        <div className="buy">
          <label htmlFor="qty">Quantidade</label>
          <input id="qty" type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        </div>
        <div className="buy-actions">
          <button className="btn btn-secondary" onClick={() => addItem({ product, quantity })}>Adicionar ao carrinho</button>
          <button className="btn" onClick={handleBuyNow}>Comprar agora</button>
        </div>

        <div className="share-row">
          <button className="link" onClick={handleShare}>Compartilhar</button>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="related container">
          <h2>Você também pode gostar</h2>
          <div className="cards-grid">
            {related.map(p => (
              <Link key={p.id} to={`/produto/${p.id}`} className="no-underline">
                <div className="product-card">
                  <div className="product-card-thumb">
                    <ImageWithFallback src={p.images[0]} alt={p.name} className="aspect-[4/3]" />
                  </div>
                  <div className="product-card-info">
                    <h3 className="product-card-title">{p.name}</h3>
                    <div className="product-card-meta">
                      <span className="product-price">{p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="sticky-cta">
        <div className="sticky-cta-inner">
          <div className="sticky-cta-price">{priceBRL}</div>
          <button className="btn" onClick={handleBuyNow}>Comprar agora</button>
        </div>
      </div>
    </div>
  )
}


