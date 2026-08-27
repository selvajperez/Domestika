import { getAllAndroids } from "@/lib/data/androids";
import { CompareView } from "@/components/compare/compare-view";

export const metadata = {
  title: "Comparador — DOMÉSTIKA",
};

export default async function CompararPage() {
  const androids = await getAllAndroids();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-display text-3xl font-black uppercase tracking-tight">
          Comparador de androides
        </h1>
        <p className="text-neutral-500">
          Seleccioná hasta 4 androides para comparar sus características, funciones y planes.
        </p>
      </div>

      <CompareView androids={androids} />
    </div>
  );
}
