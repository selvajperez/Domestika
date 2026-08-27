"use client";

import { useCartStore } from "@/store/cart-store";

export function CartBadge() {
  const count = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  if (count === 0) return null;

  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-brand-red text-[11px] font-bold text-white">
      {count}
    </span>
  );
}
