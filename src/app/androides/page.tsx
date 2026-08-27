import { Suspense } from "react";

import { getAllAndroids } from "@/lib/data/androids";
import {
  filterAndroids,
  sortAndroids,
  paginate,
  type CatalogSort,
} from "@/lib/business-rules/catalog";
import type { AndroidCategory } from "@/types/android";
import { SearchBar } from "@/components/catalog/search-bar";
import { SortSelect } from "@/components/catalog/sort-select";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { CatalogPagination } from "@/components/catalog/pagination";
import { RobotCard } from "@/components/product/robot-card";

type SearchParams = { [key: string]: string | string[] | undefined };

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function toStringParam(value: string | string[] | undefined): string {
  if (!value) return "";
  return Array.isArray(value) ? (value[0] ?? "") : value;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const androids = await getAllAndroids();

  const filters = {
    q: toStringParam(params.q),
    categories: toArray(params.categoria) as AndroidCategory[],
    compra: toStringParam(params.compra) === "1",
    leasing: toStringParam(params.leasing) === "1",
    soloDisponibles: toStringParam(params.disponibles) === "1",
    sort: (toStringParam(params.sort) || "populares") as CatalogSort,
  };

  const filtered = filterAndroids(androids, filters);
  const sorted = sortAndroids(filtered, filters.sort);
  const page = Number(toStringParam(params.page)) || 1;
  const { items, page: currentPage, totalPages, total } = paginate(sorted, page);

  const searchParamsForLinks = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === "page") continue;
    for (const entry of toArray(value)) searchParamsForLinks.append(key, entry);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-display text-3xl font-black uppercase tracking-tight">
          Catálogo de androides
        </h1>
        <p className="text-neutral-500">
          Explorá todos nuestros modelos y encontrá el androide ideal para vos.
        </p>
      </div>

      <Suspense fallback={<div className="mb-8 h-12 border border-black/15 bg-white" />}>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar />
          <SortSelect />
        </div>
      </Suspense>

      <div className="flex flex-col gap-10 lg:flex-row">
        <Suspense>
          <FilterSidebar />
        </Suspense>

        <div className="flex-1">
          <p className="mb-4 text-sm text-neutral-500">
            {total} {total === 1 ? "modelo disponible" : "modelos disponibles"}
          </p>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-black/15 py-24 text-center">
              <p className="font-display text-lg font-black uppercase">
                No encontramos androides con esos filtros
              </p>
              <p className="text-sm text-neutral-500">
                Probá con otra búsqueda o limpiá los filtros aplicados.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((android) => (
                <RobotCard key={android.id} android={android} />
              ))}
            </div>
          )}

          <CatalogPagination
            page={currentPage}
            totalPages={totalPages}
            searchParams={searchParamsForLinks}
          />
        </div>
      </div>
    </div>
  );
}
