"use client";

import { useMemo, useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";

import type { Android, AcquisitionMode } from "@/types/android";
import { formatCurrency } from "@/lib/formatters/currency";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "./favorite-button";

export function PurchasePanel({ android }: { android: Android }) {
  const defaultMode: AcquisitionMode = android.purchaseAvailable ? "compra" : "leasing";
  const [mode, setMode] = useState<AcquisitionMode>(defaultMode);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const inStock = android.stock > 0;
  const price = mode === "compra" ? android.purchasePrice : android.leasingMonthly;

  const availableModes = useMemo(() => {
    const modes: { value: AcquisitionMode; label: string }[] = [];
    if (android.purchaseAvailable) modes.push({ value: "compra", label: "Compra" });
    if (android.leasingAvailable && android.leasingMonthly) {
      modes.push({ value: "leasing", label: "Leasing" });
    }
    return modes;
  }, [android]);

  function handleAddToCart() {
    addItem(android.id, mode, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="border border-black/10 bg-white p-6">
      {availableModes.length > 1 && (
        <div className="mb-5 grid grid-cols-2 gap-2">
          {availableModes.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setMode(option.value)}
              className={`border px-4 py-3 text-left text-sm font-bold uppercase tracking-wide transition-colors ${
                mode === option.value
                  ? "border-brand-red bg-brand-red/5 text-brand-red"
                  : "border-black/15 text-neutral-500 hover:border-black"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            {mode === "compra" ? "Precio de compra" : "Leasing mensual"}
          </p>
          <p className="font-display text-3xl font-black">
            {price ? formatCurrency(price, android.currency) : "A consultar"}
            {mode === "leasing" && price && (
              <span className="text-sm font-medium text-neutral-400">/mes</span>
            )}
          </p>
        </div>
        <span
          className={`text-xs font-bold uppercase tracking-wide ${
            inStock ? "text-green-700" : "text-neutral-400"
          }`}
        >
          {inStock ? `${android.stock} disponibles` : "Sin stock"}
        </span>
      </div>

      <div className="mb-5 flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          Cantidad
        </span>
        <div className="flex items-center border border-black/15">
          <button
            type="button"
            aria-label="Restar cantidad"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-9 items-center justify-center hover:bg-black/5"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-10 text-center text-sm font-bold">{quantity}</span>
          <button
            type="button"
            aria-label="Sumar cantidad"
            onClick={() => setQuantity((q) => Math.min(android.stock || 1, q + 1))}
            className="flex size-9 items-center justify-center hover:bg-black/5"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1"
          disabled={!inStock || !price}
          onClick={handleAddToCart}
        >
          {justAdded ? (
            <>
              <Check className="size-4" /> Agregado
            </>
          ) : (
            <>
              <ShoppingCart className="size-4" /> Agregar al carrito
            </>
          )}
        </Button>
        <FavoriteButton androidId={android.id} className="size-14 shrink-0" />
      </div>
    </div>
  );
}
