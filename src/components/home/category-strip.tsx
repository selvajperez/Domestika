import Link from "next/link";
import {
  HeartPulse,
  Sparkles,
  Leaf,
  ShieldCheck,
  Smile,
  Gamepad2,
  Wrench,
} from "lucide-react";

import { ANDROID_CATEGORY_LABELS, type AndroidCategory } from "@/types/android";

const CATEGORY_ICONS: Record<AndroidCategory, React.ComponentType<{ className?: string }>> = {
  cuidados: HeartPulse,
  limpieza: Sparkles,
  jardineria: Leaf,
  seguridad: ShieldCheck,
  compania: Smile,
  entretenimiento: Gamepad2,
  asistencia: Wrench,
};

export function CategoryStrip() {
  const categories = Object.keys(ANDROID_CATEGORY_LABELS) as AndroidCategory[];

  return (
    <section className="border-b border-black/10 bg-brand-panel">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight">
            <span className="h-5 w-1 bg-brand-red" />
            Explorá por categoría
          </h2>
          <Link
            href="/androides"
            className="text-xs font-bold uppercase tracking-wide text-neutral-500 hover:text-black"
          >
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            return (
              <Link
                key={category}
                href={`/androides?categoria=${category}`}
                className="flex flex-col items-center gap-3 bg-white px-4 py-8 text-center transition-colors hover:bg-black hover:text-white"
              >
                <Icon className="size-6" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  {ANDROID_CATEGORY_LABELS[category]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
