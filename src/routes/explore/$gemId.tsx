import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";

import { getGemById } from "@/data/hidden-gems";
import { AppShell } from "@/components/app-shell";
import { GemDetailContent } from "@/components/gem-detail";
import { NBButton } from "@/lib/nb";

export const Route = createFileRoute("/explore/$gemId")({
  component: GemDetailPage,
});

function GemDetailPage() {
  const { gemId } = Route.useParams();
  const navigate = useNavigate();
  const gem = getGemById(gemId);

  if (!gem) {
    return (
      <AppShell active="explore">
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <h1 className="text-2xl font-black">Gem not found</h1>
          <NBButton onClick={() => navigate({ to: "/explore" })}>
            Back to explore
          </NBButton>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell active="explore">
      {/* Sticky top bar with back button */}
      <div className="sticky top-0 z-20 -mx-4 mb-6 flex items-center justify-between border-b-[3px] border-ink bg-paper/95 px-4 py-3 backdrop-blur sm:-mx-10 sm:px-10">
        <button
          type="button"
          onClick={() => navigate({ to: "/explore" })}
          className="nb-border nb-shadow-sm nb-press inline-flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm font-bold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All gems
        </button>
        <button
          type="button"
          aria-label="Favorite"
          className="nb-border nb-shadow-sm nb-press inline-flex items-center justify-center gap-2 rounded-lg bg-card p-2"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <GemDetailContent gem={gem} />
    </AppShell>
  );
}
