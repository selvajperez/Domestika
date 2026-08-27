"use client";

import type { CartLine } from "@/lib/business-rules/cart";
import { formatCurrency } from "@/lib/formatters/currency";
import { useCartStore } from "@/store/cart-store";
import { PlaceholderPortrait } from "@/components/product/placeholder-portrait";

export function SavedForLater({ lines }: { lines: CartLine[] }) {
  const moveToCart = useCartStore((state) => state.moveToCart);

  if (lines.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="mb-4 font-display text-sm font-black uppercase tracking-tight">
        Guardado para después ({lines.length})
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lines.map((line) => (
          <div
            key={`${line.android.id}-${line.item.mode}`}
            className="flex gap-3 border border-black/10 p-3"
          >
            <PlaceholderPortrait
              label={line.android.name}
              code={line.android.code}
              className="aspect-square w-20 shrink-0"
            />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-sm font-bold">{line.android.name}</p>
                <p className="text-xs text-neutral-500">
                  {formatCurrency(line.unitPrice, line.android.currency)}
                  {line.item.mode === "leasing" ? "/mes" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => moveToCart(line.android.id, line.item.mode)}
                className="self-start text-xs font-bold uppercase tracking-wide text-brand-red hover:underline"
              >
                Mover al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
