"use client";

import { useEffect } from "react";
import { Truck } from "lucide-react";

import type { Android } from "@/types/android";
import {
  DELIVERY_METHOD_OPTIONS,
  androidsRequireSpecializedInstall,
  getAllowedDeliveryMethods,
} from "@/lib/business-rules/shipping";
import { useCartStore } from "@/store/cart-store";

export function DeliverySelector({ androids }: { androids: Android[] }) {
  const deliveryMethod = useCartStore((state) => state.deliveryMethod);
  const setDeliveryMethod = useCartStore((state) => state.setDeliveryMethod);

  const allowedMethods = getAllowedDeliveryMethods(androids);
  const forced = androidsRequireSpecializedInstall(androids);

  useEffect(() => {
    if (!deliveryMethod || !allowedMethods.includes(deliveryMethod)) {
      setDeliveryMethod(allowedMethods[0]);
    }
    // Solo debe re-evaluarse cuando cambian los métodos permitidos.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedMethods.join(",")]);

  return (
    <div className="border border-black/10 bg-white p-6">
      <h2 className="mb-4 flex items-center gap-2 font-display text-sm font-black uppercase tracking-tight">
        <Truck className="size-4" />
        Modalidad de envío
      </h2>

      {forced && (
        <p className="mb-4 border border-brand-red/30 bg-brand-red/5 px-3 py-2 text-xs text-brand-red">
          Uno o más androides de tu carrito requieren instalación especializada obligatoria.
        </p>
      )}

      <div className="flex flex-col gap-2">
        {DELIVERY_METHOD_OPTIONS.map((option) => {
          const allowed = allowedMethods.includes(option.value);
          if (!allowed) return null;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 border p-3 text-sm transition-colors ${
                deliveryMethod === option.value
                  ? "border-brand-red bg-brand-red/5"
                  : "border-black/15 hover:border-black"
              }`}
            >
              <input
                type="radio"
                name="delivery-method"
                checked={deliveryMethod === option.value}
                onChange={() => setDeliveryMethod(option.value)}
                className="mt-1 accent-brand-red"
              />
              <span>
                <span className="block font-bold">{option.label}</span>
                <span className="block text-neutral-500">{option.description}</span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
