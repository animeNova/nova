import { create } from 'zustand'

type Order = 'desc' | 'asc' 

interface OrderState {
  order: Order 
  setOrder: (order: Order) => void
  reset: () => void
}

export const useOrderStore = create<OrderState>((set) => ({
    order: "desc",
    setOrder: (order) => set({ order }),
  reset: () => set({ order: "desc" }),
}))

