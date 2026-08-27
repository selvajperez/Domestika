import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AcquisitionMode } from "@/types/android";
import type { CartItem, DeliveryMethod } from "@/types/commerce";

interface CartState {
  items: CartItem[];
  savedForLater: CartItem[];
  deliveryMethod: DeliveryMethod | null;
  addItem: (androidId: string, mode: AcquisitionMode, quantity: number) => void;
  removeItem: (androidId: string, mode: AcquisitionMode) => void;
  setQuantity: (androidId: string, mode: AcquisitionMode, quantity: number) => void;
  setMode: (androidId: string, previousMode: AcquisitionMode, nextMode: AcquisitionMode) => void;
  saveForLater: (androidId: string, mode: AcquisitionMode) => void;
  moveToCart: (androidId: string, mode: AcquisitionMode) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  clear: () => void;
}

function upsert(items: CartItem[], next: CartItem): CartItem[] {
  const existing = items.find(
    (item) => item.androidId === next.androidId && item.mode === next.mode,
  );
  if (existing) {
    return items.map((item) =>
      item === existing ? { ...item, quantity: item.quantity + next.quantity } : item,
    );
  }
  return [...items, next];
}

// Store del carrito (spec sección 8): items, cantidad, modalidad
// compra/leasing, agregar/quitar/modificar, y ahora guardar para
// después y método de envío (spec 9.3/9.4). Persistido en localStorage.
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      savedForLater: [],
      deliveryMethod: null,
      addItem: (androidId, mode, quantity) =>
        set((state) => ({ items: upsert(state.items, { androidId, mode, quantity }) })),
      removeItem: (androidId, mode) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.androidId === androidId && item.mode === mode),
          ),
        })),
      setQuantity: (androidId, mode, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.androidId === androidId && item.mode === mode
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),
      setMode: (androidId, previousMode, nextMode) =>
        set((state) => {
          const current = state.items.find(
            (item) => item.androidId === androidId && item.mode === previousMode,
          );
          if (!current) return state;
          const withoutCurrent = state.items.filter((item) => item !== current);
          return { items: upsert(withoutCurrent, { ...current, mode: nextMode }) };
        }),
      saveForLater: (androidId, mode) =>
        set((state) => {
          const item = state.items.find(
            (entry) => entry.androidId === androidId && entry.mode === mode,
          );
          if (!item) return state;
          return {
            items: state.items.filter((entry) => entry !== item),
            savedForLater: upsert(state.savedForLater, item),
          };
        }),
      moveToCart: (androidId, mode) =>
        set((state) => {
          const item = state.savedForLater.find(
            (entry) => entry.androidId === androidId && entry.mode === mode,
          );
          if (!item) return state;
          return {
            savedForLater: state.savedForLater.filter((entry) => entry !== item),
            items: upsert(state.items, item),
          };
        }),
      setDeliveryMethod: (method) => set({ deliveryMethod: method }),
      clear: () => set({ items: [], deliveryMethod: null }),
    }),
    { name: "domestika-cart" },
  ),
);
