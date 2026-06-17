import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-green text-black hover:bg-green-deep hover:text-white",
  secondary: "border border-green text-green hover:bg-green hover:text-black",
  outline: "border border-line text-ink hover:border-ink hover:bg-surface-1",
  ghost: "text-ink hover:bg-surface-2",
  subtle: "bg-surface-2 text-ink hover:bg-surface-1 border border-line",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
} as const;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(
    "inline-flex select-none items-center justify-center gap-2 rounded-[10px] font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
