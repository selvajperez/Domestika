"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { ANDROID_CATEGORY_LABELS, type AndroidCategory } from "@/types/android";
import { CATEGORY_ICONS } from "@/lib/category-icons";

const CATEGORIES = Object.keys(ANDROID_CATEGORY_LABELS) as AndroidCategory[];

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-black/10 py-5">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-400">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategories = searchParams.getAll("categoria") as AndroidCategory[];
  const compra = searchParams.get("compra") === "1";
  const leasing = searchParams.get("leasing") === "1";
  const soloDisponibles = searchParams.get("disponibles") === "1";
  const hasActiveFilters =
    selectedCategories.length > 0 || compra || leasing || soloDisponibles || searchParams.get("q");

  function pushParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggleCategory(category: AndroidCategory) {
    pushParams((params) => {
      const current = params.getAll("categoria");
      params.delete("categoria");
      const next = current.includes(category)
        ? current.filter((value) => value !== category)
        : [...current, category];
      next.forEach((value) => params.append("categoria", value));
    });
  }

  function toggleFlag(key: "compra" | "leasing" | "disponibles", value: boolean) {
    pushParams((params) => {
      if (value) {
        params.set(key, "1");
      } else {
        params.delete(key);
      }
    });
  }

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-3 font-display text-sm font-black uppercase tracking-tight">
          <span className="h-4 w-1 bg-brand-red" />
          Filtros
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="text-xs font-bold uppercase tracking-wide text-brand-red hover:underline"
          >
            Limpiar todo
          </button>
        )}
      </div>

      <FilterGroup title="Categoría">
        {CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category];
          const checked = selectedCategories.includes(category);
          return (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleCategory(category)}
                className="size-4 accent-brand-red"
              />
              <Icon className="size-4 text-neutral-400" />
              {ANDROID_CATEGORY_LABELS[category]}
            </label>
          );
        })}
      </FilterGroup>

      <FilterGroup title="Modalidad">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={compra}
            onChange={(event) => toggleFlag("compra", event.target.checked)}
            className="size-4 accent-brand-red"
          />
          Compra
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={leasing}
            onChange={(event) => toggleFlag("leasing", event.target.checked)}
            className="size-4 accent-brand-red"
          />
          Leasing
        </label>
      </FilterGroup>

      <FilterGroup title="Disponibilidad">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={soloDisponibles}
            onChange={(event) => toggleFlag("disponibles", event.target.checked)}
            className="size-4 accent-brand-red"
          />
          Solo disponibles ahora
        </label>
      </FilterGroup>
    </aside>
  );
}
