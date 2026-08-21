import { Flame, Star } from "lucide-react";

import { Sticker } from "@/lib/nb";
import { cn } from "@/lib/utils";

export function StreakPill({
  streak,
  className,
}: {
  streak: number;
  className?: string;
}) {
  return (
    <Sticker
      tone={streak > 0 ? "primary" : "white"}
      className={cn("gap-1", className)}
    >
      <span className="inline-flex items-center gap-1">
        <Flame className="h-3.5 w-3.5" aria-hidden />
        {streak} day{streak === 1 ? "" : "s"}
      </span>
    </Sticker>
  );
}

export function XpPill({ xp, className }: { xp: number; className?: string }) {
  return (
    <Sticker tone="yellow" className={cn("gap-1", className)}>
      <span className="inline-flex items-center gap-1">
        <Star className="h-3.5 w-3.5" aria-hidden />
        {xp} XP
      </span>
    </Sticker>
  );
}
