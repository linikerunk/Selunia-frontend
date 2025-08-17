import type { Category, Product } from '@types/product'

export const mockCategories: Category[] = [
  { slug: 'semi-joias', name: 'Semi joias', banner: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'roupas', name: 'Roupas', banner: 'https://images.unsplash.com/photo-1520975693410-001d721d1730?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'cosmeticos', name: 'Cosméticos', banner: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop' }
]

const baseDesc = 'Peça selecionada com carinho para realçar sua beleza. Materiais de qualidade e design autoral.'

export const mockProducts: Product[] = [
  { id: 1, name: 'Colar Aurora', description: baseDesc, price: 149.9, oldPrice: 199.9, category: mockCategories[0], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=800&auto=format&fit=crop' },
    { kind: 'image', src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop' },
    { kind: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnail: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217' }
  ], tags: ['banho de ouro', 'hipoalergênico'], featured: true },
  { id: 2, name: 'Brinco Luma', description: baseDesc, price: 99.9, category: mockCategories[0], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1617038260897-41a1f50dd3ba?q=80&w=800&auto=format&fit=crop' }
  ], featured: true },
  { id: 3, name: 'Anel Estelar', description: baseDesc, price: 129.9, category: mockCategories[0], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop' }
  ] },
  { id: 4, name: 'Vestido Brisa', description: baseDesc, price: 219.9, category: mockCategories[1], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop' }
  ], featured: true },
  { id: 5, name: 'Blusa Aurora', description: baseDesc, price: 119.9, category: mockCategories[1], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop' }
  ] },
  { id: 6, name: 'Hidratante Rosê', description: baseDesc, price: 79.9, category: mockCategories[2], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop' }
  ], tags: ['vegano', 'cruelty-free'], featured: true },
  { id: 7, name: 'Batom Selúnia', description: baseDesc, price: 59.9, category: mockCategories[2], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1556228453-efd1e0d04f66?q=80&w=800&auto=format&fit=crop' }
  ] },
  { id: 8, name: 'Pulseira Aurora', description: baseDesc, price: 89.9, category: mockCategories[0], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop' }
  ] },
  { id: 9, name: 'Saia Lunar', description: baseDesc, price: 139.9, category: mockCategories[1], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800&auto=format&fit=crop' }
  ] },
  { id: 10, name: 'Iluminador Celeste', description: baseDesc, price: 89.9, category: mockCategories[2], media: [
    { kind: 'image', src: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=800&auto=format&fit=crop' }
  ] }
]

export const mockHighlightedProducts = mockProducts.filter(p => p.featured)


