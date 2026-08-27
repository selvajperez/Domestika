import type { Android } from "@/types/android";
import { ANDROID_CATEGORY_LABELS } from "@/types/android";
import { formatCurrency } from "@/lib/formatters/currency";
import { Badge } from "@/components/ui/badge";
import { RowActions } from "./row-actions";

export function AndroidTable({ androids, readOnly }: { androids: Android[]; readOnly: boolean }) {
  return (
    <div className="overflow-x-auto border border-black/10">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="border-b border-black/10 bg-brand-panel text-left text-xs font-bold uppercase tracking-widest text-neutral-500">
            <th className="px-4 py-3">Androide</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {androids.map((android) => (
            <tr key={android.id} className="border-b border-black/10 last:border-0">
              <td className="px-4 py-3">
                <p className="font-bold">{android.name}</p>
                <p className="text-xs text-neutral-400">{android.code}</p>
              </td>
              <td className="px-4 py-3">
                <Badge variant="muted">{ANDROID_CATEGORY_LABELS[android.category]}</Badge>
              </td>
              <td className="px-4 py-3">{formatCurrency(android.purchasePrice, android.currency)}</td>
              <td className="px-4 py-3">{android.stock}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-bold uppercase ${
                    android.active ? "text-green-700" : "text-neutral-400"
                  }`}
                >
                  {android.active ? "Activo" : "Inactivo"}
                </span>
                {android.featured && (
                  <span className="ml-2 text-xs font-bold uppercase text-brand-red">
                    Destacado
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <RowActions
                  id={android.id}
                  name={android.name}
                  active={android.active}
                  readOnly={readOnly}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
