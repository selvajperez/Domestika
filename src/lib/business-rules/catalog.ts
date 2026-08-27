import type { Android, AndroidCategory } from "@/types/android";
import { ANDROID_CATEGORY_LABELS } from "@/types/android";

export type CatalogSort = "populares" | "precio-asc" | "precio-desc" | "nombre";

export interface CatalogFilters {
  q?: string;
  categories?: AndroidCategory[];
  compra?: boolean;
  leasing?: boolean;
  soloDisponibles?: boolean;
  sort?: CatalogSort;
}

const PAGE_SIZE = 8;

const COMBINING_DIACRITICS = new RegExp("[̀-ͯ]", "g");

function normalize(value: string) {
  return value.normalize("NFD").replace(COMBINING_DIACRITICS, "").toLowerCase();
}

function matchesSearch(android: Android, query: string) {
  const needle = normalize(query.trim());
  if (!needle) return true;

  const haystack = normalize(
    [android.name, android.functionTitle, ANDROID_CATEGORY_LABELS[android.category]].join(" "),
  );
  return haystack.includes(needle);
}

function androidPrice(android: Android) {
  return android.leasingMonthly ?? android.purchasePrice;
}

export function filterAndroids(androids: Android[], filters: CatalogFilters): Android[] {
  return androids.filter((android) => {
    if (!matchesSearch(android, filters.q ?? "")) return false;

    if (filters.categories?.length && !filters.categories.includes(android.category)) {
      return false;
    }

    if (filters.compra && !android.purchaseAvailable) return false;
    if (filters.leasing && !android.leasingAvailable) return false;
    if (filters.soloDisponibles && android.stock <= 0) return false;

    return true;
  });
}

export function sortAndroids(androids: Android[], sort: CatalogSort = "populares"): Android[] {
  const sorted = [...androids];

  switch (sort) {
    case "precio-asc":
      return sorted.sort((a, b) => androidPrice(a) - androidPrice(b));
    case "precio-desc":
      return sorted.sort((a, b) => androidPrice(b) - androidPrice(a));
    case "nombre":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "es"));
    case "populares":
    default:
      // Sin métrica de popularidad real todavía: los destacados primero,
      // después por stock descendente como aproximación razonable.
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.stock - a.stock;
      });
  }
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total: items.length,
  };
}

export { PAGE_SIZE };
