import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlaceholderPortrait } from "@/components/product/placeholder-portrait";

export function CtaBand() {
  return (
    <section className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-between">
        <div className="w-28 shrink-0 md:w-36">
          <PlaceholderPortrait label="SS" code="SS-2087" className="aspect-square" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
            El futuro ya está en <span className="text-brand-red">tu hogar</span>.
            <span className="block text-base font-medium normal-case tracking-normal text-neutral-500">
              Elegí el androide ideal para vos.
            </span>
          </h2>
          <Button asChild size="lg" variant="primary">
            <Link href="/androides">Explorar catálogo →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
