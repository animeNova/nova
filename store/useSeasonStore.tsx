import { create } from 'zustand'

type Season = 'spring' | 'summer' | 'fall' | 'winter' | ""

interface SeasonState {
  season: Season 
  setSeason: (season: Season) => void
  reset: () => void
}

export const useSeasonStore = create<SeasonState>((set) => ({
  season: "",
  setSeason: (season) => set({ season }),
  reset: () => set({ season: "" }),
}))

