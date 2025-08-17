export type Category = {
  slug: 'semi-joias' | 'roupas' | 'cosmeticos'
  name: string
  banner: string
}

export type ProductMedia = {
  kind: 'image' | 'video'
  src: string
  alt?: string
  thumbnail?: string
}

export type Product = {
  id: number
  name: string
  description: string
  price: number
  oldPrice?: number
  category: Category
  images?: string[]
  media?: ProductMedia[]
  tags?: string[]
  featured?: boolean
}


