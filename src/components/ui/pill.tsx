import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pillVariants = cva(
  "surface-pill inline-flex items-center justify-center whitespace-nowrap rounded-full border text-[11px] uppercase tracking-[0.12em] transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        default: "text-[var(--swatch-antique-coin)] border-white/80",
        active: "bg-[var(--swatch-teal)] text-white border-[var(--swatch-teal)] shadow-[0_10px_22px_rgba(var(--swatch-viridian-odyssey-rgb),0.18)]",
        teal: "text-[var(--swatch-teal)] border-[rgba(var(--swatch-teal-rgb),0.16)]",
        coral: "text-[var(--swatch-cedar-grove)] border-[rgba(var(--swatch-cedar-grove-rgb),0.16)]",
        subtle: "bg-white/55 text-[var(--swatch-antique-coin)] border-white/70 shadow-none",
      },
      size: {
        sm: "px-3 py-1.5 text-[10px]",
        default: "px-4 py-2",
        lg: "px-4.5 py-2.5 text-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div ref={ref} className={cn(pillVariants({ variant, size, className }))} {...props} />
  ),
);

Pill.displayName = "Pill";

export { Pill, pillVariants };
