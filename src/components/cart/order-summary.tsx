import { ArrowRight } from "lucide-react";

import { formatCurrency } from "@/lib/formatters/currency";
import { Button } from "@/components/ui/button";

export function OrderSummary({
  totalUnits,
  subtotal,
  hasLeasingLine,
  currency,
  disabled,
  onCheckout,
}: {
  totalUnits: number;
  subtotal: number;
  hasLeasingLine: boolean;
  currency: string;
  disabled: boolean;
  onCheckout: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 border border-black/10 bg-white p-6">
      <h2 className="font-display text-sm font-black uppercase tracking-tight">
        Resumen del pedido
      </h2>

      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-500">Subtotal ({totalUnits} androides)</span>
        <span className="font-bold">{formatCurrency(subtotal, currency)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-500">Envío e instalación</span>
        <span className="font-bold text-green-700">Incluido</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-500">Garantía oficial</span>
        <span className="font-bold text-green-700">Incluido</span>
      </div>

      {hasLeasingLine && (
        <p className="text-xs text-neutral-400">
          Los montos en leasing son cargos mensuales; los de compra son pago único.
        </p>
      )}

      <div className="flex items-center justify-between border-t border-black/10 pt-4">
        <span className="font-bold uppercase tracking-wide">Total</span>
        <span className="font-display text-2xl font-black text-brand-red">
          {formatCurrency(subtotal, currency)}
        </span>
      </div>

      <Button size="lg" disabled={disabled} onClick={onCheckout}>
        Finalizar compra
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
