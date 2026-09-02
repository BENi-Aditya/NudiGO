import { useState } from "react";
import type { Category } from "@/data/hidden-gems";
import { NBButton } from "@/lib/nb";

type GemFiltersProps = {
  selectedCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
};

const categories: Array<{ key: Category | "all"; label: string; emoji: string }> = [
  { key: "all", label: "All", emoji: "💎" },
  { key: "food", label: "Food", emoji: "🍕" },
  { key: "nature", label: "Nature", emoji: "🌳" },
  { key: "culture", label: "Culture", emoji: "🎨" },
  { key: "shopping", label: "Shopping", emoji: "🛍️" },
  { key: "nightlife", label: "Nightlife", emoji: "🌙" },
];

export function GemFilters({ selectedCategory, onCategoryChange }: GemFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={`nb-border nb-shadow-sm nb-press shrink-0 rounded-lg px-4 py-2 text-sm font-extrabold transition ${
            selectedCategory === cat.key
              ? "bg-primary text-primary-foreground"
              : "bg-card text-ink hover:bg-card/80"
          }`}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
}
