import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart, Volume2, MapPin, CheckCircle2 } from "lucide-react";

import { getGemById } from "@/data/hidden-gems";
import { speak } from "@/lib/speech";
import { useProgress } from "@/lib/progress";
import { NBButton, Sticker } from "@/lib/nb";
import { MetroBadge } from "@/components/metro-badge";

export const Route = createFileRoute("/explore/$gemId")({
  component: GemDetailPage,
});

function GemDetailPage() {
  const { gemId } = Route.useParams();
  const navigate = useNavigate();
  const { state, addXp } = useProgress();
  const gem = getGemById(gemId);

  const [visited, setVisited] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (gem && state.exploredGems) {
      const gemData = state.exploredGems[gem.id];
      setVisited(!!gemData?.visitedAt);
      setFavorited(!!gemData?.favorite);
    }
  }, [gem, state.exploredGems]);

  if (!gem) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl">Gem not found</h1>
        <NBButton onClick={() => navigate({ to: "/explore" })}>
          Back to explore
        </NBButton>
      </div>
    );
  }

  const handleMarkVisited = () => {
    if (!visited) {
      // TODO: Call markGemVisited method when we add it to progress context
      addXp(15); // Award XP for visiting
      setVisited(true);
    }
  };

  const handleToggleFavorite = () => {
    // TODO: Call toggleGemFavorite method when we add it to progress context
    setFavorited(!favorited);
  };

  const categoryEmojis = {
    food: "🍕",
    nature: "🌳",
    culture: "🎨",
    shopping: "🛍️",
    nightlife: "🌙",
  };

  const categoryColors = {
    food: "yellow",
    nature: "green",
    culture: "pink",
    shopping: "blue",
    nightlife: "purple",
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-paper/95 px-4 py-4 backdrop-blur-sm nb-border-b">
        <button
          onClick={() => navigate({ to: "/explore" })}
          className="nb-border nb-shadow-sm nb-press flex items-center gap-2 rounded-lg bg-card px-3 py-2 font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={handleToggleFavorite}
          className={`nb-border nb-shadow-sm nb-press rounded-lg px-3 py-2 ${
            favorited ? "bg-destructive text-destructive-foreground" : "bg-card"
          }`}
        >
          <Heart className={`h-5 w-5 ${favorited ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        {/* Hero Image */}
        <div className="nb-card nb-shadow-lg overflow-hidden rounded-xl">
          <img
            src={gem.images.main}
            alt={gem.name}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Title & Category */}
        <div>
          <Sticker tone={categoryColors[gem.category] as any} className="inline-block mb-2">
            {categoryEmojis[gem.category]} {gem.category.charAt(0).toUpperCase() + gem.category.slice(1)} • {gem.location.area}
          </Sticker>
          <h1 className="text-3xl font-black">{gem.name}</h1>
          <p className="text-xl font-bold text-ink/70 mt-1">{gem.nameKannada}</p>
        </div>

        {/* Description */}
        <div className="nb-card p-4">
          <p className="font-semibold text-ink/80 leading-relaxed">
            {gem.longDescription || gem.description}
          </p>
        </div>

        {/* Metro Info */}
        <div>
          <h2 className="text-lg font-black mb-3">📍 Location & Metro</h2>
          <MetroBadge
            station={gem.location.nearestMetro.station}
            line={gem.location.nearestMetro.line as any}
            distanceKm={gem.location.nearestMetro.distanceKm}
            walkMinutes={gem.location.nearestMetro.walkMinutes}
          />
          {gem.location.address && (
            <div className="mt-3 nb-card p-3">
              <p className="text-sm font-semibold text-ink/60">
                <MapPin className="inline h-4 w-4 mr-1" />
                {gem.location.address}
              </p>
            </div>
          )}
        </div>

        {/* Kannada Learning */}
        <div>
          <h2 className="text-lg font-black mb-3">💬 Kannada Learning Tip</h2>
          <div className="nb-card nb-border-accent bg-accent/10 p-4 space-y-3">
            <div>
              <p className="text-2xl font-black">{gem.kannadaLearning.usefulPhrase}</p>
              <p className="text-lg font-bold text-ink/70 mt-1">
                {gem.kannadaLearning.transliteration}
              </p>
              <p className="text-sm font-semibold text-ink/60 mt-1">
                "{gem.kannadaLearning.english}"
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => speak(gem.kannadaLearning.usefulPhrase)}
                className="nb-border nb-shadow-sm nb-press flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground"
              >
                <Volume2 className="h-4 w-4" />
                Hear it
              </button>
              <button
                onClick={() => speak(gem.kannadaLearning.usefulPhrase, { slow: true })}
                className="nb-border nb-shadow-sm nb-press rounded-lg bg-card px-4 py-2 font-bold"
              >
                🐢 Slow
              </button>
            </div>
            <p className="text-sm font-semibold text-ink/60 italic">
              💡 {gem.kannadaLearning.context}
            </p>
          </div>
        </div>

        {/* Photo Gallery */}
        {gem.images.gallery.length > 0 && (
          <div>
            <h2 className="text-lg font-black mb-3">📸 Photo Gallery</h2>
            <div className="gem-gallery">
              {gem.images.gallery.map((img, idx) => (
                <div key={idx} className="nb-card nb-shadow overflow-hidden rounded-lg">
                  <img src={img} alt={`${gem.name} ${idx + 1}`} className="w-full h-40 object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <h2 className="text-lg font-black">🎯 Take Action</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleMarkVisited}
              disabled={visited}
              className={`nb-border nb-shadow-sm nb-press flex items-center justify-center gap-2 rounded-xl py-4 font-bold transition ${
                visited
                  ? "bg-success text-success-foreground"
                  : "bg-card hover:bg-card/80"
              }`}
            >
              <CheckCircle2 className="h-5 w-5" />
              {visited ? "Visited ✓" : "Mark as Visited"}
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`nb-border nb-shadow-sm nb-press flex items-center justify-center gap-2 rounded-xl py-4 font-bold transition ${
                favorited
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-card hover:bg-card/80"
              }`}
            >
              <Heart className={`h-5 w-5 ${favorited ? "fill-current" : ""}`} />
              {favorited ? "Favorited" : "Favorite"}
            </button>
          </div>
          {visited && (
            <div className="nb-card bg-success/10 p-3 text-center">
              <p className="font-bold text-success-foreground">
                🎉 +15 XP earned for visiting this gem!
              </p>
            </div>
          )}
        </div>

        {/* Tags */}
        {gem.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {gem.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="nb-border rounded-lg bg-secondary/20 px-3 py-1 text-xs font-bold"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
