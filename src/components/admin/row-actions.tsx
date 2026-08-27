"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { deleteAndroidAction, toggleActiveAction } from "@/app/admin/actions";

export function RowActions({
  id,
  name,
  active,
  readOnly,
}: {
  id: string;
  name: string;
  active: boolean;
  readOnly: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        disabled={readOnly || isPending}
        onClick={() => startTransition(() => toggleActiveAction(id, !active))}
        className="text-xs font-bold uppercase tracking-wide text-neutral-500 hover:text-black disabled:opacity-40"
      >
        {active ? "Desactivar" : "Activar"}
      </button>
      <Link
        href={`/admin/${id}`}
        aria-label={`Editar ${name}`}
        className="text-neutral-500 hover:text-black"
      >
        <Pencil className="size-4" />
      </Link>
      <button
        type="button"
        disabled={readOnly || isPending}
        aria-label={`Eliminar ${name}`}
        onClick={() => {
          if (window.confirm(`¿Eliminar "${name}" definitivamente? Esta acción no se puede deshacer.`)) {
            startTransition(() => deleteAndroidAction(id));
          }
        }}
        className="text-neutral-500 hover:text-brand-red disabled:opacity-40"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
