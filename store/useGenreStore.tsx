import { create } from 'zustand';

type GenresStore = {
  genres: string[]; // Array of genre IDs (or names)
  setGenre: (genreId: string) => void; // Toggles a genre
  mergeGenres: (newGenres: string[]) => void; // Merges an array of genres into the existing genres

};

export const useGenresStore = create<GenresStore>((set) => ({
  genres: [], // Initial state
  setGenre: (genreId) =>
    set((state) => {
      const exists = state.genres.includes(genreId);
      return {
        genres: exists
          ? state.genres.filter((id) => id !== genreId) // Remove if it exists
          : [...state.genres, genreId], // Add if it doesn't exist
      };
    }),
  mergeGenres: (newGenres) =>
    set((state) => ({
      genres: Array.from(new Set([...state.genres, ...newGenres])), // Merge without duplicates
    })),
}));