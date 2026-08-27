"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState, useTransition } from "react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [, startTransition] = useTransition();

  function updateQuery(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set("q", next);
    } else {
      params.delete("q");
    }
    params.delete("page");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        updateQuery(value);
      }}
      className="relative flex-1"
    >
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={() => updateQuery(value)}
        placeholder="Buscar androides, funciones, categorías..."
        className="h-12 w-full border border-black/15 bg-white pl-11 pr-10 text-sm outline-none focus:border-black"
      />
      {value && (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          onClick={() => {
            setValue("");
            updateQuery("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
        >
          <X className="size-4" />
        </button>
      )}
    </form>
  );
}
