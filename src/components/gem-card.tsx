import { Link } from "@tanstack/react-router";
import { MapPin, Heart, CheckCircle2 } from "lucide-react";
import type { HiddenGem } from "@/data/hidden-gems";
import { Sticker } from "@/lib/nb";

type GemCardProps = {
  gem: HiddenGem;
  visited?: boolean;
  favorited?: boolean;
};

const categoryColors: Record<string, string> = {
  food: "yellow",
  nature: "green",
  culture: "pink",
  shopping: "blue",
  nightlife: "purple",
};

const categoryEmojis: Record<string, string> = {
  food: "🍕",
  nature: "🌳",
  culture: "🎨",
  shopping: "🛍️",
  nightlife: "🌙",
};

export function GemCard({ gem, visited = false, favorited = false }: GemCardProps) {
  const categoryColor = categoryColors[gem.category] || "yellow";
  const categoryEmoji = categoryEmojis[gem.category] || "💎";

  return (
    <Link
      to="/explore/$gemId"
      params={{ gemId: gem.id }}
      className="nb-card nb-shadow-lg nb-press block overflow-hidden rounded-xl transition-transform hover:scale-[1.02]"
    >
      {/* Image */}
      <div className="gem-image-aspect relative overflow-hidden">
        <img
          src={gem.images.main}
          alt={gem.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* Status badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {visited && (
            <div className="nb-border nb-shadow-sm flex h-8 w-8 items-center justify-center rounded-full bg-success">
              <CheckCircle2 className="h-5 w-5 text-success-foreground" />
            </div>
          )}
          {favorited && (
            <div className="nb-border nb-shadow-sm flex h-8 w-8 items-center justify-center rounded-full bg-destructive">
              <Heart className="h-5 w-5 fill-current text-destructive-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Category badge */}
        <div>
          <Sticker tone={categoryColor as any} className="inline-block text-xs">
            {categoryEmoji} {gem.category.charAt(0).toUpperCase() + gem.category.slice(1)}
          </Sticker>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg font-black leading-tight">{gem.name}</h3>
          <p className="text-sm font-bold text-ink/70">{gem.nameKannada}</p>
        </div>

        {/* Description */}
        <p className="text-sm font-semibold text-ink/60 line-clamp-2">
          {gem.description}
        </p>

        {/* Metro info */}
        <div className="nb-border rounded-lg bg-secondary/20 p-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-extrabold">
                {gem.location.nearestMetro.station}
              </p>
              <p className="text-xs font-bold text-ink/60">
                {gem.location.nearestMetro.distanceKm} km • {gem.location.nearestMetro.walkMinutes} min walk
              </p>
            </div>
            <div
              className={`h-6 w-1 shrink-0 rounded-full ${
                gem.location.nearestMetro.line === "purple"
                  ? "metro-purple"
                  : gem.location.nearestMetro.line === "green"
                    ? "metro-green"
                    : "metro-blue"
              }`}
            />
          </div>
        </div>

        {/* Kannada learning tip */}
        <div className="nb-border rounded-lg bg-accent/10 p-2">
          <p className="text-xs font-extrabold uppercase tracking-wide text-ink/50">
            💬 Learn
          </p>
          <p className="mt-1 text-sm font-bold">{gem.kannadaLearning.usefulPhrase}</p>
          <p className="text-xs font-semibold text-ink/60">
            {gem.kannadaLearning.transliteration}
          </p>
        </div>
      </div>
    </Link>
  );
}
