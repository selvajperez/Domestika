import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_COMPARE = 4;

interface CompareState {
  androidIds: string[];
  isSelected: (androidId: string) => boolean;
  isFull: () => boolean;
  toggle: (androidId: string) => void;
  remove: (androidId: string) => void;
  clear: () => void;
}

// Persistencia en localStorage (spec sección 8). Máximo 4 androides
// simultáneos (spec sección 9.2): si ya hay 4 y se intenta agregar uno
// nuevo, no hace nada — el usuario tiene que quitar uno primero.
export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      androidIds: [],
      isSelected: (androidId) => get().androidIds.includes(androidId),
      isFull: () => get().androidIds.length >= MAX_COMPARE,
      toggle: (androidId) =>
        set((state) => {
          if (state.androidIds.includes(androidId)) {
            return { androidIds: state.androidIds.filter((id) => id !== androidId) };
          }
          if (state.androidIds.length >= MAX_COMPARE) return state;
          return { androidIds: [...state.androidIds, androidId] };
        }),
      remove: (androidId) =>
        set((state) => ({ androidIds: state.androidIds.filter((id) => id !== androidId) })),
      clear: () => set({ androidIds: [] }),
    }),
    { name: "domestika-compare" },
  ),
);
