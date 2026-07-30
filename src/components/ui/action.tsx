"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const actionVariants = cva(
  "group relative inline-flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-claret focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        solid:
          "bg-wine text-paper hover:bg-claret [&_svg]:transition-transform hover:[&_svg]:translate-x-1",
        claret:
          "bg-claret text-paper hover:bg-wine [&_svg]:transition-transform hover:[&_svg]:translate-x-1",
        outline:
          "border border-foreground/25 text-foreground hover:border-claret hover:bg-claret hover:text-paper",
        ghost:
          "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-wine",
        link: "px-0 text-foreground underline-offset-[6px] hover:text-claret hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-12 px-7",
        lg: "h-14 px-9",
        none: "",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export interface ActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionVariants> {
  href?: string;
}

export const Action = React.forwardRef<HTMLButtonElement, ActionProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const classes = cn(actionVariants({ variant, size }), className);

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          onClick={
            props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
          }
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);
Action.displayName = "Action";
