import type { Android } from "@/types/android";
import type { CartItem } from "@/types/commerce";

export interface CartLine {
  item: CartItem;
  android: Android;
  unitPrice: number;
  lineTotal: number;
}

// Precio unitario según modalidad: compra es un precio único, leasing es
// un cargo mensual. El total del carrito los suma igual (ver nota en la
// UI): es una simplificación razonable para el alcance de este proyecto,
// ya que no hay checkout de pagos reales (spec sección 15).
function unitPrice(android: Android, item: CartItem): number {
  return item.mode === "compra" ? android.purchasePrice : (android.leasingMonthly ?? 0);
}

export function buildCartLines(items: CartItem[], androids: Android[]): CartLine[] {
  const byId = new Map(androids.map((android) => [android.id, android]));

  return items
    .map((item) => {
      const android = byId.get(item.androidId);
      if (!android) return null;
      const price = unitPrice(android, item);
      return { item, android, unitPrice: price, lineTotal: price * item.quantity };
    })
    .filter((line): line is CartLine => line !== null);
}

export function computeCartTotals(lines: CartLine[]) {
  const totalUnits = lines.reduce((sum, line) => sum + line.item.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const hasLeasingLine = lines.some((line) => line.item.mode === "leasing");

  return { totalUnits, subtotal, hasLeasingLine };
}
