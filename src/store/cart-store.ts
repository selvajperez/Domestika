import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AcquisitionMode } from "@/types/android";
import type { CartItem } from "@/types/commerce";

interface CartState {
  items: CartItem[];
  addItem: (androidId: string, mode: AcquisitionMode, quantity: number) => void;
  removeItem: (androidId: string, mode: AcquisitionMode) => void;
  setQuantity: (androidId: string, mode: AcquisitionMode, quantity: number) => void;
  clear: () => void;
}

// Store mínimo para poder agregar al carrito desde la ficha (Fase 6).
// Las reglas de envío y el resumen completo del pedido se arman en la
// página /carrito (Fase 8).
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (androidId, mode, quantity) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.androidId === androidId && item.mode === mode,
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item === existing ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            };
          }
          return { items: [...state.items, { androidId, mode, quantity }] };
        }),
      removeItem: (androidId, mode) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.androidId === androidId && item.mode === mode),
          ),
        })),
      setQuantity: (androidId, mode, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.androidId === androidId && item.mode === mode ? { ...item, quantity } : item,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "domestika-cart" },
  ),
);
