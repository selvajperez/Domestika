"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingCart } from "lucide-react";

import type { Android } from "@/types/android";
import { buildCartLines, computeCartTotals } from "@/lib/business-rules/cart";
import { getDeliveryLabel } from "@/lib/business-rules/shipping";
import { formatCurrency } from "@/lib/formatters/currency";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { CartItemRow } from "./cart-item-row";
import { DeliverySelector } from "./delivery-selector";
import { OrderSummary } from "./order-summary";
import { SavedForLater } from "./saved-for-later";

export function CartView({ androids }: { androids: Android[] }) {
  const items = useCartStore((state) => state.items);
  const savedForLater = useCartStore((state) => state.savedForLater);
  const deliveryMethod = useCartStore((state) => state.deliveryMethod);
  const clear = useCartStore((state) => state.clear);

  const [confirmedOrder, setConfirmedOrder] = useState<{
    total: number;
    currency: string;
    units: number;
    delivery: string;
  } | null>(null);

  const lines = buildCartLines(items, androids);
  const savedLines = buildCartLines(savedForLater, androids);
  const totals = computeCartTotals(lines);
  const currency = lines[0]?.android.currency ?? "USD";

  function handleCheckout() {
    setConfirmedOrder({
      total: totals.subtotal,
      currency,
      units: totals.totalUnits,
      delivery: getDeliveryLabel(deliveryMethod),
    });
    clear();
  }

  if (confirmedOrder) {
    return (
      <div className="flex flex-col items-center gap-4 border border-dashed border-green-600/30 bg-green-50 py-16 text-center">
        <CheckCircle2 className="size-12 text-green-700" />
        <div>
          <p className="font-display text-2xl font-black uppercase">¡Pedido confirmado!</p>
          <p className="mt-1 text-sm text-neutral-600">
            {confirmedOrder.units} androide(s) por{" "}
            {formatCurrency(confirmedOrder.total, confirmedOrder.currency)} —{" "}
            {confirmedOrder.delivery}.
          </p>
          <p className="mt-4 text-xs text-neutral-400">
            Esta es una demo de portfolio: no se procesan pagos ni pedidos reales.
          </p>
        </div>
        <Button asChild>
          <Link href="/androides">Seguir explorando</Link>
        </Button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-black/15 py-24 text-center">
          <ShoppingCart className="size-10 text-neutral-300" />
          <div>
            <p className="font-display text-lg font-black uppercase">Tu carrito está vacío</p>
            <p className="text-sm text-neutral-500">
              Agregá androides desde el catálogo para verlos acá.
            </p>
          </div>
          <Button asChild>
            <Link href="/androides">Ver catálogo</Link>
          </Button>
        </div>
        <SavedForLater lines={savedLines} />
      </>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          {lines.map((line) => (
            <CartItemRow key={`${line.android.id}-${line.item.mode}`} line={line} />
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <DeliverySelector androids={lines.map((line) => line.android)} />
          <OrderSummary
            totalUnits={totals.totalUnits}
            subtotal={totals.subtotal}
            hasLeasingLine={totals.hasLeasingLine}
            currency={currency}
            disabled={!deliveryMethod}
            onCheckout={handleCheckout}
          />
          <Link
            href="/androides"
            className="text-center text-sm font-bold uppercase tracking-wide text-neutral-500 hover:text-black"
          >
            ← Seguir comprando
          </Link>
        </div>
      </div>

      <SavedForLater lines={savedLines} />
    </div>
  );
}
