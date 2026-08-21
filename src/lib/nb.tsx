import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "primary" | "yellow" | "pink" | "white" | "ink" | "success";

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary text-primary-foreground",
  yellow: "bg-secondary text-secondary-foreground",
  pink: "bg-accent text-accent-foreground",
  white: "bg-card text-card-foreground",
  ink: "bg-ink text-paper",
  success: "bg-success text-success-foreground",
};

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-6 py-4 text-lg",
} as const;

type ButtonProps = {
  tone?: Tone;
  size?: keyof typeof sizeClasses;
  full?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function NBButton({
  tone = "primary",
  size = "md",
  full,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "nb-border nb-shadow nb-press inline-flex items-center justify-center gap-2 rounded-xl font-extrabold uppercase tracking-wide disabled:opacity-50 disabled:shadow-none",
        toneClasses[tone],
        sizeClasses[size],
        full && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function NBLinkButton({
  tone = "primary",
  size = "md",
  full,
  className,
  children,
  to,
  params,
}: {
  tone?: Tone;
  size?: keyof typeof sizeClasses;
  full?: boolean;
  className?: string;
  children: ReactNode;
  to: string;
  params?: Record<string, string>;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params={params as any}
      className={cn(
        "nb-border nb-shadow nb-press inline-flex items-center justify-center gap-2 rounded-xl font-extrabold uppercase tracking-wide",
        toneClasses[tone],
        sizeClasses[size],
        full && "w-full",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function NBCard({
  className,
  children,
  tone = "white",
}: {
  className?: string;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <div className={cn("nb-card p-4", toneClasses[tone], className)}>{children}</div>
  );
}

export function Sticker({
  children,
  tone = "pink",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "nb-border nb-shadow-sm inline-block rounded-lg px-2 py-1 text-xs font-extrabold uppercase",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function NBProgress({ value, label }: { value: number; label?: string }) {
  return (
    <div className="w-full">
      {label ? (
        <div className="mb-1 flex justify-between text-xs font-extrabold uppercase">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      ) : null}
      <div className="nb-border h-5 w-full overflow-hidden rounded-full bg-card">
        <div
          className="h-full bg-primary transition-[width] duration-300"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export function Kannada({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("nb-kannada", className)}>{children}</span>;
}
