"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";

import type { CartLine } from "@/lib/business-rules/cart";
import { formatCurrency } from "@/lib/formatters/currency";
import { useCartStore } from "@/store/cart-store";
import { PlaceholderPortrait } from "@/components/product/placeholder-portrait";
import { ANDROID_CATEGORY_LABELS } from "@/types/android";

export function CartItemRow({ line }: { line: CartLine }) {
  const { android, item } = line;
  const { setQuantity, removeItem, setMode, saveForLater } = useCartStore();

  const canChooseMode = Boolean(
    android.purchaseAvailable && android.leasingAvailable && android.leasingMonthly,
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-4 overflow-hidden border-b border-black/10 py-6 sm:flex-row">
      <PlaceholderPortrait
        label={android.name}
        code={android.code}
        className="aspect-square w-full sm:w-32 sm:shrink-0"
      />

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">
              {ANDROID_CATEGORY_LABELS[android.category]}
            </p>
            <Link
              href={`/androides/${android.slug}`}
              className="font-display text-xl font-black uppercase tracking-tight hover:text-brand-red"
            >
              {android.name}
            </Link>
            <p className="text-sm text-neutral-500">{android.functionTitle}</p>
          </div>
          <button
            type="button"
            aria-label={`Quitar ${android.name} del carrito`}
            onClick={() => removeItem(android.id, item.mode)}
            className="flex size-8 items-center justify-center text-neutral-400 hover:text-black"
          >
            <X className="size-4" />
          </button>
        </div>

        {canChooseMode && (
          <div className="flex gap-2 text-xs font-bold uppercase tracking-wide">
            {(["compra", "leasing"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => item.mode !== mode && setMode(android.id, item.mode, mode)}
                className={`border px-3 py-1.5 transition-colors ${
                  item.mode === mode
                    ? "border-brand-red text-brand-red"
                    : "border-black/15 text-neutral-400 hover:border-black hover:text-black"
                }`}
              >
                {mode === "compra" ? "Compra" : "Leasing"}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center border border-black/15">
            <button
              type="button"
              aria-label="Restar cantidad"
              onClick={() => setQuantity(android.id, item.mode, item.quantity - 1)}
              className="flex size-9 items-center justify-center hover:bg-black/5"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
            <button
              type="button"
              aria-label="Sumar cantidad"
              onClick={() =>
                setQuantity(android.id, item.mode, Math.min(android.stock, item.quantity + 1))
              }
              className="flex size-9 items-center justify-center hover:bg-black/5"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          <p className="font-display text-lg font-black">
            {formatCurrency(line.lineTotal, android.currency)}
            {item.mode === "leasing" && (
              <span className="text-xs font-medium text-neutral-400">/mes</span>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => saveForLater(android.id, item.mode)}
          className="self-start text-xs font-bold uppercase tracking-wide text-neutral-400 hover:text-black hover:underline"
        >
          Guardar para después
        </button>
      </div>
    </motion.div>
  );
}
