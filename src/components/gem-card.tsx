import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Heart,
  CheckCircle2,
  UtensilsCrossed,
  Trees,
  Palette,
  ShoppingBag,
  Moon,
  Sparkles,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import type { HiddenGem, Category } from "@/data/hidden-gems";
import { Sticker } from "@/lib/nb";

type GemCardProps = {
  gem: HiddenGem;
  visited?: boolean;
  favorited?: boolean;
};

type CategoryTheme = {
  Icon: LucideIcon;
  stickerTone: "primary" | "yellow" | "pink" | "success" | "white";
  label: string;
};

const CATEGORY_THEME: Record<Category, CategoryTheme> = {
  food: { Icon: UtensilsCrossed, stickerTone: "yellow", label: "Food" },
  nature: { Icon: Trees, stickerTone: "success", label: "Nature" },
  culture: { Icon: Palette, stickerTone: "pink", label: "Culture" },
  shopping: { Icon: ShoppingBag, stickerTone: "primary", label: "Shopping" },
  nightlife: { Icon: Moon, stickerTone: "white", label: "Nightlife" },
};

function metroLineClass(line: string) {
  if (line === "purple") return "metro-purple";
  if (line === "green") return "metro-green";
  return "metro-blue";
}

export function GemCard({
  gem,
  visited = false,
  favorited = false,
}: GemCardProps) {
  const theme = CATEGORY_THEME[gem.category] ?? {
    Icon: Sparkles,
    stickerTone: "white" as const,
    label: gem.category.charAt(0).toUpperCase() + gem.category.slice(1),
  };
  const CategoryIcon = theme.Icon;
  const line = gem.location.nearestMetro.line;

  return (
    <Link
      to="/explore/$gemId"
      params={{ gemId: gem.id }}
      className="group block cursor-pointer rounded-xl focus:outline-none"
    >
      <div className="nb-card nb-shadow-sm flex h-full flex-col overflow-hidden rounded-xl transition-transform group-hover:-translate-y-0.5">
        <div className="gem-image-aspect relative overflow-hidden">
          <img
            src={gem.images.main}
            alt={gem.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {visited && (
              <div className="nb-border nb-shadow-sm flex h-8 w-8 items-center justify-center rounded-full bg-success">
                <CheckCircle2
                  className="h-5 w-5 text-success-foreground"
                  strokeWidth={2.5}
                />
              </div>
            )}
            {favorited && (
              <div className="nb-border nb-shadow-sm flex h-8 w-8 items-center justify-center rounded-full bg-destructive">
                <Heart className="h-5 w-5 fill-current text-destructive-foreground" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <Sticker
              tone={theme.stickerTone}
              className="inline-flex items-center gap-1"
            >
              <CategoryIcon
                className="h-3.5 w-3.5"
                strokeWidth={2.5}
                aria-hidden
              />
              {theme.label}
            </Sticker>
          </div>

          <div>
            <h3 className="text-lg font-black leading-tight">{gem.name}</h3>
            <p className="text-sm font-bold text-ink/70">{gem.nameKannada}</p>
          </div>

          <p className="text-sm font-semibold text-ink/60 line-clamp-2">
            {gem.description}
          </p>

          <div className="nb-border rounded-lg bg-secondary/20 p-2">
            <div className="flex items-center gap-2">
              <MapPin
                className="h-4 w-4 shrink-0 text-primary"
                strokeWidth={2.5}
              />
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-xs font-extrabold">
                  {gem.location.nearestMetro.station}
                </p>
                <p className="text-xs font-bold text-ink/60">
                  {gem.location.nearestMetro.distanceKm} km ·{" "}
                  {gem.location.nearestMetro.walkMinutes} min walk
                </p>
              </div>
              <div
                className={`h-6 w-1 shrink-0 rounded-full ${metroLineClass(line)}`}
              />
            </div>
          </div>

          <div className="nb-border mt-auto rounded-lg bg-accent/10 p-2">
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5 text-ink/50" aria-hidden />
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-ink/50">
                Try this phrase
              </p>
            </div>
            <p className="mt-1 text-sm font-bold leading-snug">
              {gem.kannadaLearning.usefulPhrase}
            </p>
            <p className="text-xs font-semibold text-ink/60">
              {gem.kannadaLearning.transliteration}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
