import { create } from 'zustand'
export type Genre = {
  id : string;
  title : string;
}
interface GenreState {
  genres: Genre[]
  setGenres: (genres: Genre[]) => void
}

export const useGenreStore = create<GenreState>((set) => ({
  genres: [],
  setGenres: (genres) => set({ genres }),
}))

