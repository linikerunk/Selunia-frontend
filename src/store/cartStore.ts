import { create } from 'zustand'
import type { Product } from '@types/product'

export type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
  totalQuantity: number
  addItem: (payload: CartItem) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clear: () => void
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalQuantity: 0,

  addItem: (payload) => set((state) => {
    const existing = state.items.find(i => i.product.id === payload.product.id)
    let items: CartItem[]
    if (existing) {
      items = state.items.map(i => i.product.id === payload.product.id ? { ...i, quantity: i.quantity + payload.quantity } : i)
    } else {
      items = [...state.items, payload]
    }
    const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0)
    return { items, totalQuantity }
  }),

  removeItem: (productId) => set((state) => {
    const items = state.items.filter(i => i.product.id !== productId)
    const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0)
    return { items, totalQuantity }
  }),

  updateQuantity: (productId, quantity) => set((state) => {
    const items = state.items.map(i => i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i)
    const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0)
    return { items, totalQuantity }
  }),

  clear: () => set({ items: [], totalQuantity: 0 }),

  totalPrice: () => get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
}))


