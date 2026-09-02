import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";

import { hiddenGems, searchGems, getGemsByCategory, type Category } from "@/data/hidden-gems";
import { AppShell } from "@/components/app-shell";
import { GemCard } from "@/components/gem-card";
import { GemFilters } from "@/components/gem-filters";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/explore")({
  component: ExplorePage,
});

function ExplorePage() {
  const navigate = useNavigate();
  const { hydrated, state } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (hydrated && !state.profile.onboardingDone) {
      void navigate({ to: "/onboarding" });
    }
  }, [hydrated, state.profile.onboardingDone, navigate]);

  // Filter gems based on category and search
  const filteredGems = useMemo(() => {
    let gems = selectedCategory === "all"
      ? hiddenGems
      : getGemsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      gems = searchGems(searchQuery);
    }

    return gems;
  }, [selectedCategory, searchQuery]);

  // Get visited and favorited gems from progress state
  const visitedGems = state.exploredGems || {};

  return (
    <AppShell active="explore">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-1 text-3xl">🗺️ Hidden Gems</h1>
        <p className="font-semibold text-ink/70">
          Discover local favorites & practice Kannada
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            placeholder="Search gems, areas, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="nb-border nb-shadow-sm w-full rounded-xl bg-card py-3 pl-10 pr-4 font-bold text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category filters */}
        <GemFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm font-bold text-ink/60">
          {filteredGems.length} {filteredGems.length === 1 ? "gem" : "gems"} found
        </p>
      </div>

      {/* Gems grid */}
      {filteredGems.length === 0 ? (
        <div className="nb-card p-8 text-center">
          <p className="text-lg font-bold text-ink/60">
            No gems found matching your search
          </p>
          <p className="mt-2 text-sm font-semibold text-ink/50">
            Try different keywords or browse all categories
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredGems.map((gem) => (
            <GemCard
              key={gem.id}
              gem={gem}
              visited={!!visitedGems[gem.id]?.visitedAt}
              favorited={!!visitedGems[gem.id]?.favorite}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
