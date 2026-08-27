import { cn } from "@/lib/utils";

interface PlaceholderPortraitProps {
  label: string;
  code: string;
  className?: string;
  dark?: boolean;
}

// Panel técnico usado mientras no hay assets de imagen definitivos.
// Se reemplaza por <Image /> cuando estén disponibles, sin tocar el layout.
export function PlaceholderPortrait({
  label,
  code,
  className,
  dark = false,
}: PlaceholderPortraitProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden border",
        dark
          ? "border-white/15 bg-neutral-900"
          : "border-black/10 bg-brand-panel",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-40",
          dark
            ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]",
        )}
        style={{ backgroundSize: "24px 24px" }}
      />
      <span
        className={cn(
          "absolute left-3 top-3 text-[10px] font-bold uppercase tracking-widest",
          dark ? "text-white/30" : "text-black/30",
        )}
      >
        {code}
      </span>
      <span
        className={cn(
          "font-display text-5xl font-black",
          dark ? "text-white/15" : "text-black/10",
        )}
      >
        {label.slice(0, 2).toUpperCase()}
      </span>
      <span
        className={cn(
          "absolute bottom-3 right-3 text-[9px] font-medium uppercase tracking-widest",
          dark ? "text-white/25" : "text-black/25",
        )}
      >
        Imagen próximamente
      </span>
    </div>
  );
}
