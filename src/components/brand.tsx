import { cn } from "@/lib/utils";

/** NudiGO wordmark. "Nudi" (ನುಡಿ = word/speech in Kannada) + "GO" (movement). */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline font-black tracking-tight", className)}>
      <span className="text-ink">Nudi</span>
      <span className="text-primary">GO</span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "nb-border nb-shadow-sm inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-black text-primary-foreground",
        className,
      )}
    >
      ನು
    </span>
  );
}
