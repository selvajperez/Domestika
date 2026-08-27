"use client";

import { Heart } from "lucide-react";

import { useFavoritesStore } from "@/store/favorites-store";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  androidId,
  className,
}: {
  androidId: string;
  className?: string;
}) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(androidId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(androidId)}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
      className={cn(
        "flex items-center justify-center border border-black/15 transition-colors hover:border-black",
        className,
      )}
    >
      <Heart className={cn("size-5", isFavorite && "fill-brand-red text-brand-red")} />
    </button>
  );
}
