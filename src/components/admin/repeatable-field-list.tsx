"use client";

import { useId, useState } from "react";
import { Plus, X } from "lucide-react";

interface RepeatableFieldListProps {
  title: string;
  fieldAName: string;
  fieldBName: string;
  placeholderA: string;
  placeholderB: string;
  initialRows: { a: string; b: string }[];
}

export function RepeatableFieldList({
  title,
  fieldAName,
  fieldBName,
  placeholderA,
  placeholderB,
  initialRows,
}: RepeatableFieldListProps) {
  const baseId = useId();
  const [rows, setRows] = useState(() =>
    (initialRows.length > 0 ? initialRows : [{ a: "", b: "" }]).map((row, index) => ({
      key: `${baseId}-${index}`,
      ...row,
    })),
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">{title}</h3>
        <button
          type="button"
          onClick={() => setRows((prev) => [...prev, { key: `${baseId}-${prev.length}-${Date.now()}`, a: "", b: "" }])}
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-brand-red hover:underline"
        >
          <Plus className="size-3.5" /> Agregar
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.key} className="flex gap-2">
            <input
              type="text"
              name={fieldAName}
              defaultValue={row.a}
              placeholder={placeholderA}
              className="w-1/3 border border-black/15 px-3 py-2 text-sm outline-none focus:border-black"
            />
            <input
              type="text"
              name={fieldBName}
              defaultValue={row.b}
              placeholder={placeholderB}
              className="flex-1 border border-black/15 px-3 py-2 text-sm outline-none focus:border-black"
            />
            <button
              type="button"
              aria-label="Quitar fila"
              onClick={() => setRows((prev) => prev.filter((entry) => entry.key !== row.key))}
              className="flex size-9 shrink-0 items-center justify-center text-neutral-400 hover:text-black"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
