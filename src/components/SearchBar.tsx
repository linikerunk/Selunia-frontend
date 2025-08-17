import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '@services/api'
import type { Product } from '@types/product'
import { ImageWithFallback } from '@components/Image'

type Props = {
  placeholder?: string
}

export function SearchBar({ placeholder = 'Buscar produtos' }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const initial = useMemo(() => params.get('q') ?? '', [location.search])
  const [query, setQuery] = useState(initial)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Product[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<number | undefined>()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === '/') {
        const input = containerRef.current?.querySelector('input') as HTMLInputElement | null
        if (input) {
          e.preventDefault()
          input.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    window.clearTimeout(debounceRef.current)
    if (!query || query.length < 2) {
      setResults([])
      setOpen(false)
      return
    }
    setLoading(true)
    debounceRef.current = window.setTimeout(() => {
      api.listProducts({ search: query }).then((items) => {
        setResults(items.slice(0, 6))
        setOpen(true)
        setLoading(false)
        setActiveIndex(-1)
      })
    }, 200)
  }, [query])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function submitSearch(q?: string) {
    const text = (q ?? query).trim()
    if (!text) return
    setOpen(false)
    navigate(`/buscar?q=${encodeURIComponent(text)}`)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        navigate(`/produto/${results[activeIndex].id}`)
      } else {
        submitSearch()
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="px-3 py-2 rounded-lg border border-gray-200 w-full"
          aria-autocomplete="list"
          role="combobox"
          aria-expanded={open}
        />
        <button className="btn btn-secondary" onClick={() => submitSearch()}>Buscar</button>
      </div>
      {open && (
        <div className="absolute z-30 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {loading && (
            <div className="p-3 text-sm text-ink-600">Buscando…</div>
          )}
          {!loading && results.length === 0 && (
            <div className="p-3 text-sm text-ink-600">Sem resultados</div>
          )}
          <ul role="listbox" className="max-h-80 overflow-auto">
            {results.map((p, i) => (
              <li
                key={p.id}
                role="option"
                aria-selected={i === activeIndex}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-rose-50 ${i === activeIndex ? 'bg-rose-50' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => { e.preventDefault(); navigate(`/produto/${p.id}`) }}
              >
                <div className="w-12 h-12 overflow-hidden rounded-md">
                  <ImageWithFallback src={p.images[0]} alt={p.name} className="w-full h-full" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium">{p.name}</div>
                  <div className="text-sm text-ink-600">{p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 p-2 text-right">
            <button className="text-sm text-rose-500" onMouseDown={(e) => { e.preventDefault(); submitSearch() }}>Ver todos resultados</button>
          </div>
        </div>
      )}
    </div>
  )
}


