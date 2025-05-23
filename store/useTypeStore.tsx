import { create } from 'zustand'

type Type = 'TV' | 'MOVIE' | ""

interface TypeState {
  type: Type 
  setType: (type: Type) => void
  reset: () => void
}

export const useTypeStore = create<TypeState>((set) => ({
    type: "",
    setType: (type) => set({ type }),
    reset: () => set({ type: "" }),
}))

