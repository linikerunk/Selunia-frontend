import type { Product, Category } from '@types/product'
import { mockProducts, mockCategories } from '@mocks/data'

// Adapter para futura integração com backend
// Substituir por fetch('/api/...') quando o backend estiver pronto
export const api = {
  async listCategories(): Promise<Category[]> {
    return Promise.resolve(mockCategories)
  },
  async listProducts(params?: { categorySlug?: Category['slug']; search?: string }): Promise<Product[]> {
    let data = mockProducts
    if (params?.categorySlug) {
      data = data.filter(p => p.category.slug === params.categorySlug)
    }
    if (params?.search) {
      const q = params.search.toLowerCase()
      data = data.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    return Promise.resolve(data)
  },
  async getProduct(id: number): Promise<Product | undefined> {
    return Promise.resolve(mockProducts.find(p => p.id === id))
  }
}


