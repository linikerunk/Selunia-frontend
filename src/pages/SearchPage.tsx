import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '@components/ProductCard'
import { api } from '@services/api'
import type { Product } from '@types/product'
import { mockCategories } from '@mocks/data'

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = useMemo(() => params.get('q')?.trim() ?? '', [params])
  const category = useMemo(() => params.get('cat') ?? 'all', [params])
  const sort = useMemo(() => params.get('sort') ?? 'relevance', [params])
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    api.listProducts({ search: query || undefined }).then((data) => {
      if (!active) return
      let filtered = data
      if (category !== 'all') {
        filtered = filtered.filter(p => p.category.slug === category)
      }
      if (sort === 'price-asc') filtered = [...filtered].sort((a,b) => a.price - b.price)
      if (sort === 'price-desc') filtered = [...filtered].sort((a,b) => b.price - a.price)
      setResults(filtered)
      setLoading(false)
    })
    return () => { active = false }
  }, [query, category, sort])

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value === 'all' && key === 'cat') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  return (
    <div className="container">
      <h1>Resultados {query ? `para "${query}"` : ''}</h1>
      <div className="flex items-center justify-between gap-3 my-3">
        <div className="text-sm text-ink-600">{loading ? 'Carregando…' : `${results.length} itens`}</div>
        <div className="flex items-center gap-3">
          <select value={category} onChange={(e) => updateParam('cat', e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200">
            <option value="all">Todas categorias</option>
            {mockCategories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => updateParam('sort', e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200">
            <option value="relevance">Relevância</option>
            <option value="price-asc">Preço: menor para maior</option>
            <option value="price-desc">Preço: maior para menor</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="cards-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-gray-200 bg-white">
              <div className="w-full h-56 bg-gray-100 animate-pulse" />
              <div className="p-3">
                <div className="h-5 bg-gray-100 rounded mb-2 animate-pulse" />
                <div className="h-4 bg-gray-100 w-1/2 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && <p>Nenhum produto encontrado.</p>}

      {!loading && (
        <div className="cards-grid">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}


