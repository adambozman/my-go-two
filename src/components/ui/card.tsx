import * as React from "react";

import { cn } from "@/lib/utils";

type CardVariant = "glass" | "ai" | "overlay-teal" | "overlay-coral" | "overlay-white";
type GlobalCardVariant = "login" | "teal" | "sand";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant | GlobalCardVariant;
}

const cardVariants: Record<CardVariant | GlobalCardVariant, string> = {
  login: "card-design-login",
  teal: "card-design-teal",
  sand: "card-design-sand",
  glass: "card-design-sand",
  ai: "card-design-teal",
  "overlay-teal": "card-design-teal",
  "overlay-coral": "card-design-sand",
  "overlay-white": "card-design-login",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant = "sand", ...props }, ref) => (
  <div ref={ref} className={cn(cardVariants[variant], "text-card-foreground", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
