import Link from "next/link";
import { ArrowRight, BatteryCharging } from "lucide-react";

import type { Android } from "@/types/android";
import { ANDROID_CATEGORY_LABELS } from "@/types/android";
import { formatCurrency } from "@/lib/formatters/currency";
import { PlaceholderPortrait } from "./placeholder-portrait";
import { Badge } from "@/components/ui/badge";

export function RobotCard({ android }: { android: Android }) {
  const isAvailable = android.stock > 0;

  return (
    <Link
      href={`/androides/${android.slug}`}
      className="group flex flex-col border border-black/10 bg-white text-black transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <PlaceholderPortrait label={android.name} code={android.code} className="aspect-square" />
        <Badge variant="default" className="absolute left-3 top-3">
          {ANDROID_CATEGORY_LABELS[android.category]}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-xl font-black uppercase tracking-tight">
            {android.name}
          </h3>
          <p className="text-sm text-neutral-500">{android.functionTitle}</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${isAvailable ? "bg-green-600" : "bg-neutral-300"}`}
            />
            {isAvailable ? "Operativa" : "Sin stock"}
          </span>
          <span className="flex items-center gap-1.5">
            <BatteryCharging className="size-3.5" />
            {android.autonomyHours} h
          </span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-black/10 pt-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              Compra
            </p>
            <p className="text-sm font-bold">
              {android.purchaseAvailable
                ? formatCurrency(android.purchasePrice, android.currency)
                : "No disponible"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              Leasing
            </p>
            <p className="text-sm font-bold">
              {android.leasingAvailable && android.leasingMonthly
                ? `${formatCurrency(android.leasingMonthly, android.currency)}/mes`
                : "A consultar"}
            </p>
          </div>
        </div>

        <span className="flex items-center justify-end gap-1 text-xs font-bold uppercase tracking-wide text-brand-red">
          Ver detalle
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
