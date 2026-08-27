import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  androidIds: string[];
  isFavorite: (androidId: string) => boolean;
  toggleFavorite: (androidId: string) => void;
}

// Persistencia en localStorage (spec sección 8): no hace falta login de
// cliente en la primera versión.
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      androidIds: [],
      isFavorite: (androidId) => get().androidIds.includes(androidId),
      toggleFavorite: (androidId) =>
        set((state) => ({
          androidIds: state.androidIds.includes(androidId)
            ? state.androidIds.filter((id) => id !== androidId)
            : [...state.androidIds, androidId],
        })),
    }),
    { name: "domestika-favorites" },
  ),
);
