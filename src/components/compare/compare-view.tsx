"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Scale, Plus, X } from "lucide-react";

import type { Android } from "@/types/android";
import { ANDROID_CATEGORY_LABELS } from "@/types/android";
import { formatCurrency } from "@/lib/formatters/currency";
import { useCompareStore, MAX_COMPARE } from "@/store/compare-store";
import { PlaceholderPortrait } from "@/components/product/placeholder-portrait";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CompareRow {
  label: string;
  render: (android: Android) => React.ReactNode;
}

const ROWS: CompareRow[] = [
  { label: "Función principal", render: (a) => a.functionTitle },
  { label: "Autonomía", render: (a) => `${a.autonomyHours} h` },
  {
    label: "Límite sanitario",
    render: (a) => a.sanitaryLimit ?? "—",
  },
  {
    label: "Asistencia física máx.",
    render: (a) => (a.maxAssistanceKg ? `${a.maxAssistanceKg} kg` : "—"),
  },
  { label: "Reconocimiento de voz", render: (a) => a.voiceRecognition || "—" },
  { label: "Interacción social", render: (a) => a.socialInteraction || "—" },
  { label: "Conectividad", render: (a) => a.connectivity || "—" },
  {
    label: "Modalidades",
    render: (a) =>
      [a.purchaseAvailable && "Compra", a.leasingAvailable && "Leasing"]
        .filter(Boolean)
        .join(" · ") || "—",
  },
  {
    label: "Precio compra",
    render: (a) => (a.purchaseAvailable ? formatCurrency(a.purchasePrice, a.currency) : "—"),
  },
  {
    label: "Precio leasing",
    render: (a) =>
      a.leasingAvailable && a.leasingMonthly
        ? `${formatCurrency(a.leasingMonthly, a.currency)}/mes`
        : "—",
  },
];

export function CompareView({ androids }: { androids: Android[] }) {
  const selectedIds = useCompareStore((state) => state.androidIds);
  const remove = useCompareStore((state) => state.remove);
  const clear = useCompareStore((state) => state.clear);

  const selected = selectedIds
    .map((id) => androids.find((android) => android.id === id))
    .filter((android): android is Android => Boolean(android));

  if (selected.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-black/15 py-24 text-center">
        <Scale className="size-10 text-neutral-300" />
        <div>
          <p className="font-display text-lg font-black uppercase">
            No hay androides para comparar
          </p>
          <p className="text-sm text-neutral-500">
            Seleccioná hasta {MAX_COMPARE} androides desde el catálogo con el ícono de comparar.
          </p>
        </div>
        <Button asChild>
          <Link href="/androides">Ver catálogo</Link>
        </Button>
      </div>
    );
  }

  const columns = selected.length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          {selected.length}/{MAX_COMPARE} androides seleccionados
        </p>
        <button
          type="button"
          onClick={clear}
          className="text-xs font-bold uppercase tracking-wide text-brand-red hover:underline"
        >
          Limpiar comparación
        </button>
      </div>

      <div className="overflow-x-auto">
        <div
          className="grid min-w-[720px] gap-px bg-black/10"
          style={{ gridTemplateColumns: `160px repeat(${columns}, 1fr)` }}
        >
          <div className="bg-white" />
          {selected.map((android) => (
            <div key={android.id} className="relative bg-white p-4">
              <button
                type="button"
                onClick={() => remove(android.id)}
                aria-label={`Quitar ${android.name} de la comparación`}
                className="absolute right-2 top-2 z-10 flex size-6 items-center justify-center rounded-full bg-black/5 hover:bg-black/10"
              >
                <X className="size-3.5" />
              </button>
              <PlaceholderPortrait
                label={android.name}
                code={android.code}
                className="aspect-square"
              />
              <Badge className="mt-3">{ANDROID_CATEGORY_LABELS[android.category]}</Badge>
              <p className="mt-2 font-display text-lg font-black uppercase">{android.name}</p>
              <Link
                href={`/androides/${android.slug}`}
                className="mt-1 block text-xs font-bold uppercase tracking-wide text-brand-red hover:underline"
              >
                Ver detalle →
              </Link>
            </div>
          ))}

          {ROWS.map((row) => (
            <Fragment key={row.label}>
              <div className="bg-brand-panel px-4 py-3 text-xs font-bold uppercase tracking-wide text-neutral-500">
                {row.label}
              </div>
              {selected.map((android) => (
                <div key={`${row.label}-${android.id}`} className="bg-white px-4 py-3 text-sm font-medium">
                  {row.render(android)}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      {selected.length < MAX_COMPARE && (
        <Link
          href="/androides"
          className="mt-6 flex items-center justify-center gap-2 border border-dashed border-black/20 py-4 text-sm font-bold uppercase tracking-wide text-neutral-500 hover:border-black hover:text-black"
        >
          <Plus className="size-4" />
          Agregar androides ({MAX_COMPARE - selected.length} disponibles)
        </Link>
      )}
    </div>
  );
}
