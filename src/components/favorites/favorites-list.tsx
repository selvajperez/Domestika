"use client";

import Link from "next/link";
import { HeartOff } from "lucide-react";

import type { Android } from "@/types/android";
import { useFavoritesStore } from "@/store/favorites-store";
import { RobotCard } from "@/components/product/robot-card";
import { Button } from "@/components/ui/button";

export function FavoritesList({ androids }: { androids: Android[] }) {
  const favoriteIds = useFavoritesStore((state) => state.androidIds);
  const favorites = androids.filter((android) => favoriteIds.includes(android.id));

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-black/15 py-24 text-center">
        <HeartOff className="size-10 text-neutral-300" />
        <div>
          <p className="font-display text-lg font-black uppercase">
            Todavía no guardaste androides
          </p>
          <p className="text-sm text-neutral-500">
            Marcá el corazón en cualquier androide del catálogo para guardarlo acá.
          </p>
        </div>
        <Button asChild>
          <Link href="/androides">Ver catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {favorites.map((android) => (
        <RobotCard key={android.id} android={android} />
      ))}
    </div>
  );
}
