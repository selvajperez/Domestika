import Link from "next/link";

import { getFeaturedAndroids } from "@/data/seed/androids";
import { RobotCard } from "@/components/product/robot-card";

export function FeaturedGrid() {
  const featured = getFeaturedAndroids();

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight">
            <span className="h-5 w-1 bg-brand-red" />
            Androides destacados
          </h2>
          <Link
            href="/androides"
            className="text-xs font-bold uppercase tracking-wide text-white/50 hover:text-white"
          >
            Ver catálogo completo →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((android) => (
            <RobotCard key={android.id} android={android} />
          ))}
        </div>
      </div>
    </section>
  );
}
