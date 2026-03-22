import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pillVariants = cva(
  "surface-pill inline-flex items-center justify-center whitespace-nowrap rounded-full border transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        default: "pill-asset-ivory",
        title: "pill-asset-title font-['Cormorant_Garamond'] font-bold text-[var(--logo-two-color)] leading-[0.9]",
        ivory: "pill-asset-ivory font-['Jost'] font-medium text-[var(--logo-two-color)] leading-none",
        coral: "pill-asset-coral font-['Jost'] font-semibold text-white leading-none",
        active: "bg-[var(--swatch-teal)] text-white border-[var(--swatch-teal)] shadow-[0_10px_22px_rgba(var(--swatch-viridian-odyssey-rgb),0.18)] font-['Jost'] font-medium leading-none",
        teal: "text-[var(--swatch-teal)] border-[rgba(var(--swatch-teal-rgb),0.16)] font-['Jost'] font-medium leading-none",
        subtle: "bg-white/55 text-[var(--swatch-antique-coin)] border-white/70 shadow-none font-['Jost'] font-medium leading-none",
      },
      size: {
        sm: "px-3 py-1.5 text-[clamp(13px,3.5vw,16px)]",
        default: "px-4 py-2 text-[clamp(16px,4vw,20px)]",
        lg: "px-6 py-2.5 text-[clamp(18px,4.5vw,24px)]",
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
