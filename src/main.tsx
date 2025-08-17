import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './ui/AppLayout'
import { RouteErrorPage } from './ui/RouteErrorPage'
import { HomePage } from '@pages/HomePage'
import { CategoryPage } from '@pages/CategoryPage'
import { ProductPage } from '@pages/ProductPage'
import { CartPage } from '@pages/CartPage'
import { SearchPage } from '@pages/SearchPage'
import { AppErrorBoundary } from './ui/AppErrorBoundary'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'categoria/:slug', element: <CategoryPage /> },
      { path: 'produto/:id', element: <ProductPage /> },
      { path: 'carrinho', element: <CartPage /> },
      { path: 'buscar', element: <SearchPage /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  </React.StrictMode>
)


