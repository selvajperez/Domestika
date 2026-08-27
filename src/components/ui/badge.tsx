import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-none px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        red: "bg-brand-red text-white",
        outline: "border border-current/40 text-current",
        muted: "bg-neutral-200 text-neutral-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
