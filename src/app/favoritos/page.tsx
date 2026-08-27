import { getAllAndroids } from "@/lib/data/androids";
import { FavoritesList } from "@/components/favorites/favorites-list";

export const metadata = {
  title: "Favoritos — DOMÉSTIKA",
};

export default async function FavoritosPage() {
  const androids = await getAllAndroids();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-display text-3xl font-black uppercase tracking-tight">Favoritos</h1>
        <p className="text-neutral-500">Androides que guardaste para consultar más tarde.</p>
      </div>

      <FavoritesList androids={androids} />
    </div>
  );
}
