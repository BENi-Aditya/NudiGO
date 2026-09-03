import type { Category } from "@/data/hidden-gems";
import {
  UtensilsCrossed,
  Trees,
  Palette,
  ShoppingBag,
  Moon,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type GemFiltersProps = {
  selectedCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
};

type FilterItem = {
  key: Category | "all";
  label: string;
  Icon: LucideIcon;
};

const filters: FilterItem[] = [
  { key: "all", label: "All", Icon: Sparkles },
  { key: "food", label: "Food", Icon: UtensilsCrossed },
  { key: "nature", label: "Nature", Icon: Trees },
  { key: "culture", label: "Culture", Icon: Palette },
  { key: "shopping", label: "Shopping", Icon: ShoppingBag },
  { key: "nightlife", label: "Nightlife", Icon: Moon },
];

export function GemFilters({
  selectedCategory,
  onCategoryChange,
}: GemFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map(({ key, label, Icon }) => {
        const isActive = selectedCategory === key;
        return (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={cn(
              "nb-border nb-shadow-sm nb-press inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-extrabold transition",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-card text-ink hover:bg-card/80",
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
}
