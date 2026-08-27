import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Android } from "@/types/android";
import { ANDROID_CATEGORY_LABELS } from "@/types/android";
import { formatCurrency } from "@/lib/formatters/currency";
import { PlaceholderPortrait } from "./placeholder-portrait";
import { Badge } from "@/components/ui/badge";

export function RobotCard({ android }: { android: Android }) {
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

        <div className="mt-auto flex items-end justify-between border-t border-black/10 pt-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              Desde
            </p>
            {android.leasingMonthly ? (
              <p className="font-bold">
                {formatCurrency(android.leasingMonthly, android.currency)}
                <span className="text-xs font-medium text-neutral-400">/mes</span>
              </p>
            ) : (
              <p className="font-bold">
                {formatCurrency(android.purchasePrice, android.currency)}
              </p>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-brand-red">
            Ver detalle
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
