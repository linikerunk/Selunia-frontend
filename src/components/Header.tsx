import { Link, NavLink } from 'react-router-dom'
import { useCartStore } from '@store/cartStore'
import { SearchBar } from '@components/SearchBar'

export function Header() {
  const { totalQuantity } = useCartStore()

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="flex items-center gap-6">
          <Link to="/" className="logo font-display">Selúnia</Link>
          <div className="hidden md:block text-sm text-ink-600">Beleza que ilumina</div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/categoria/semi-joias" className={({ isActive }) => isActive ? 'active' : ''}>Semi joias</NavLink>
            <NavLink to="/categoria/roupas" className={({ isActive }) => isActive ? 'active' : ''}>Roupas</NavLink>
            <NavLink to="/categoria/cosmeticos" className={({ isActive }) => isActive ? 'active' : ''}>Cosméticos</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block"><SearchBar /></div>
          <Link to="/carrinho" className="cart-link" aria-label="Abrir carrinho">
            <span>🛒</span>
            <span className="cart-badge" aria-live="polite">{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}


