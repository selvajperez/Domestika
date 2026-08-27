"use client";

import { Check, GitCompareArrows } from "lucide-react";

import { useCompareStore } from "@/store/compare-store";
import { cn } from "@/lib/utils";

export function CompareToggle({
  androidId,
  className,
}: {
  androidId: string;
  className?: string;
}) {
  const selected = useCompareStore((state) => state.isSelected(androidId));
  const disabled = useCompareStore((state) => !selected && state.isFull());
  const toggle = useCompareStore((state) => state.toggle);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => toggle(androidId)}
      aria-pressed={selected}
      title={disabled ? "Ya tenés 4 androides para comparar" : "Seleccionar para comparar"}
      className={cn(
        "flex items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:opacity-30",
        selected
          ? "border-brand-red bg-brand-red text-white"
          : "border-black/15 bg-white text-neutral-500 hover:border-black hover:text-black",
        className,
      )}
    >
      {selected ? <Check className="size-4" /> : <GitCompareArrows className="size-4" />}
    </button>
  );
}
