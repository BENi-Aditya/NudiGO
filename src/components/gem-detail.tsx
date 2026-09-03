import { useEffect, useState } from "react";
import {
  Heart,
  Volume2,
  CheckCircle2,
  UtensilsCrossed,
  Trees,
  Palette,
  ShoppingBag,
  Moon,
  Plus,
  Check,
  Tag,
  MessageCircle,
  MapPin,
  Train,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import {
  getPhraseConcept,
  type Category,
  type HiddenGem,
  type Phrase,
} from "@/data/hidden-gems";
import { metroStations } from "@/data/metro-stations";
import { speak } from "@/lib/speech";
import { useProgress } from "@/lib/progress";
import { Sticker } from "@/lib/nb";
import { cn } from "@/lib/utils";

const CATEGORY_META: Record<
  Category,
  {
    Icon: LucideIcon;
    stickerTone: "primary" | "yellow" | "pink" | "success" | "white";
    label: string;
  }
> = {
  food: { Icon: UtensilsCrossed, stickerTone: "yellow", label: "Food" },
  nature: { Icon: Trees, stickerTone: "success", label: "Nature" },
  culture: { Icon: Palette, stickerTone: "pink", label: "Culture" },
  shopping: { Icon: ShoppingBag, stickerTone: "primary", label: "Shopping" },
  nightlife: { Icon: Moon, stickerTone: "white", label: "Nightlife" },
};

function metroDotClass(line: string) {
  if (line === "purple") return "bg-[oklch(0.55_0.25_280)]";
  if (line === "green") return "bg-[oklch(0.65_0.25_145)]";
  return "bg-[oklch(0.55_0.25_240)]";
}

function metroLineLabel(line: string) {
  if (line === "purple") return "Purple Line";
  if (line === "green") return "Green Line";
  return "Blue Line";
}

function MetroMapWidget({ gem }: { gem: HiddenGem }) {
  const stations = metroStations.filter(
    (s) => s.line === gem.location.nearestMetro.line,
  );
  const nearestId = gem.location.nearestMetro.stationId;
  const line = gem.location.nearestMetro.line;
  const nearest = metroStations.find((s) => s.id === nearestId);

  if (stations.length === 0 || !nearest) return null;

  return (
    <section className="nb-card overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "nb-border nb-shadow-sm flex h-10 w-10 items-center justify-center rounded-lg text-white",
              metroDotClass(line),
            )}
          >
            <Train className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-ink/50">
              Nearest Metro
            </p>
            <p className="font-black leading-tight">{nearest.name}</p>
          </div>
        </div>
        <Sticker tone="white">{metroLineLabel(line)}</Sticker>
      </div>

      {/* Map */}
      <div className="rounded-xl border-2 border-dashed border-ink/15 bg-paper/40 p-3">
        <div className="overflow-x-auto">
          <div className="flex min-w-fit items-center gap-0">
            {stations.map((s, idx) => {
              const isNearest = s.id === nearestId;
              const isLast = idx === stations.length - 1;
              return (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "nb-border flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black",
                        isNearest
                          ? `${metroDotClass(line)} text-white ring-2 ring-offset-2 ring-primary`
                          : "bg-card text-ink/50",
                      )}
                    >
                      {isNearest ? "★" : idx + 1}
                    </div>
                    <p
                      className={cn(
                        "mt-1 w-24 text-center text-[10px] font-bold leading-tight",
                        isNearest ? "text-ink" : "text-ink/40",
                      )}
                    >
                      {s.name}
                    </p>
                  </div>
                  {!isLast && (
                    <div
                      className={cn(
                        "-mx-1 h-1.5 w-10 rounded-full",
                        isNearest ? metroDotClass(line) : "bg-ink/15",
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-ink/50">
            Distance
          </p>
          <p className="text-xl font-black">
            {gem.location.nearestMetro.distanceKm}
            <span className="ml-1 text-sm font-bold text-ink/60">km</span>
          </p>
        </div>
        <div className="border-x-2 border-dashed border-ink/15">
          <p className="pl-3 text-[10px] font-extrabold uppercase tracking-wide text-ink/50">
            Walk
          </p>
          <p className="pl-3 text-xl font-black">
            {gem.location.nearestMetro.walkMinutes}
            <span className="ml-1 text-sm font-bold text-ink/60">min</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-ink/50">
            Area
          </p>
          <p className="text-base font-black leading-tight">
            {gem.location.area}
          </p>
        </div>
      </div>

      {gem.location.address && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-secondary/15 p-2.5">
          <MapPin
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
            strokeWidth={2.5}
          />
          <p className="text-xs font-bold text-ink/80">
            {gem.location.address}
          </p>
        </div>
      )}
    </section>
  );
}

function PhraseRow({
  gem,
  phrase,
  isAdded,
  onAdd,
}: {
  gem: HiddenGem;
  phrase: Phrase;
  isAdded: boolean;
  onAdd: () => void;
}) {
  const concept = getPhraseConcept(phrase);
  if (!concept) {
    return (
      <div className="nb-card p-4">
        <p className="text-sm font-semibold text-ink/60">Phrase unavailable.</p>
      </div>
    );
  }

  return (
    <div className="nb-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="break-words text-2xl font-black leading-tight">
            {concept.kannada}
          </p>
          <p className="mt-1 text-sm font-bold text-ink/70">
            {concept.transliteration}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-ink/60">
            {concept.english}
          </p>
        </div>
        <button
          type="button"
          onClick={() => speak(concept.kannada)}
          aria-label="Hear phrase"
          className="nb-border nb-shadow-sm nb-press flex shrink-0 items-center gap-1 rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-bold text-secondary-foreground"
        >
          <Volume2 className="h-3.5 w-3.5" aria-hidden />
          Hear
        </button>
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-xs font-semibold italic text-ink/55">
        <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>{phrase.context}</span>
      </p>

      <button
        type="button"
        onClick={onAdd}
        disabled={isAdded}
        className={cn(
          "nb-border nb-shadow-sm nb-press mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-extrabold uppercase tracking-wide",
          isAdded
            ? "bg-success text-success-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        {isAdded ? (
          <>
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
            Added to missions
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" strokeWidth={3} aria-hidden />
            Add to missions
          </>
        )}
      </button>
    </div>
  );
}

export function GemDetailContent({ gem }: { gem: HiddenGem }) {
  const { state, addPhraseAsMission } = useProgress();

  const [visited, setVisited] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [addedMissions, setAddedMissions] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    if (state.exploredGems) {
      const gemData = state.exploredGems[gem.id];
      setVisited(!!gemData?.visitedAt);
      setFavorited(!!gemData?.favorite);
    }
  }, [gem.id, state.exploredGems]);

  useEffect(() => {
    if (!state.dynamicMissions) return;
    const next: Record<string, boolean> = {};
    for (const phrase of gem.phrases) {
      const id = `gem:${gem.id}:${phrase.conceptId}`;
      if (state.dynamicMissions[id]) next[id] = true;
    }
    setAddedMissions(next);
  }, [gem.id, gem.phrases, state.dynamicMissions]);

  const handleMarkVisited = () => {
    if (!visited) {
      setVisited(true);
      toast.success("Marked as visited (+15 XP)");
    }
  };

  const handleToggleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleAddPhrase = (phrase: Phrase) => {
    const concept = getPhraseConcept(phrase);
    if (!concept) {
      toast.error("Phrase not available");
      return;
    }
    const id = `gem:${gem.id}:${phrase.conceptId}`;
    if (addedMissions[id]) return;
    const title = `Use "${concept.transliteration}" at ${gem.name}`;
    const objective = `Say "${concept.transliteration}" (${concept.english.toLowerCase()}) on your next visit.`;
    const created = addPhraseAsMission({
      gemId: gem.id,
      conceptId: phrase.conceptId,
      title,
      objective,
      context: phrase.context,
    });
    if (created) {
      setAddedMissions((prev) => ({ ...prev, [created]: true }));
      toast.success("Added to missions", {
        description: "Find it on the Missions tab.",
      });
    }
  };

  const meta = CATEGORY_META[gem.category] ?? {
    Icon: MessageCircle,
    stickerTone: "white" as const,
    label: gem.category,
  };
  const CategoryIcon = meta.Icon;

  return (
    <div className="space-y-8 pb-10">
      {/* ───────── TITLE BLOCK ───────── */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Sticker
            tone={meta.stickerTone}
            className="inline-flex items-center gap-1"
          >
            <CategoryIcon
              className="h-3.5 w-3.5"
              strokeWidth={2.5}
              aria-hidden
            />
            {meta.label}
          </Sticker>
          <Sticker tone="white" className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            {gem.location.area}
          </Sticker>
        </div>
        <h1 className="text-4xl font-black leading-[1.05] sm:text-5xl">
          {gem.name}
        </h1>
        <p className="text-xl font-bold text-ink/70">{gem.nameKannada}</p>
      </header>

      {/* ───────── HERO IMAGE — smaller, fixed ───────── */}
      <div className="nb-card nb-shadow-lg overflow-hidden rounded-2xl">
        <img
          src={gem.images.main}
          alt={gem.name}
          className="aspect-[16/10] w-full object-cover sm:aspect-[21/9]"
        />
      </div>

      {/* ───────── WHAT IS THIS PLACE ───────── */}
      <section className="nb-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="nb-border nb-shadow-sm flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CategoryIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          </span>
          <h2 className="text-lg font-black">What is this place?</h2>
        </div>
        <p className="text-base font-semibold leading-relaxed text-ink/85">
          {gem.longDescription || gem.description}
        </p>
        {gem.metadata.curatorNotes && (
          <div className="mt-4 border-t-2 border-dashed border-ink/15 pt-3">
            <p className="text-xs font-extrabold uppercase tracking-wide text-ink/50">
              Local tip
            </p>
            <p className="mt-1 text-sm font-bold italic text-ink/70">
              {gem.metadata.curatorNotes}
            </p>
          </div>
        )}
      </section>

      {/* ───────── HOW TO GET THERE ───────── */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <span className="nb-border nb-shadow-sm flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-paper">
            <Train className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          </span>
          <h2 className="text-lg font-black">How to get there</h2>
        </div>
        <MetroMapWidget gem={gem} />
      </section>

      {/* ───────── PHRASES FOR HERE ───────── */}
      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-black">Phrases for here</h2>
            <p className="text-xs font-semibold text-ink/60">
              Tap <span className="font-extrabold">Add to missions</span>, then
              actually try them on your next visit.
            </p>
          </div>
          <Sticker tone="pink">
            {gem.phrases.length}{" "}
            {gem.phrases.length === 1 ? "phrase" : "phrases"}
          </Sticker>
        </div>

        <div className="space-y-3">
          {gem.phrases.map((phrase) => {
            const id = `gem:${gem.id}:${phrase.conceptId}`;
            return (
              <PhraseRow
                key={phrase.conceptId}
                gem={gem}
                phrase={phrase}
                isAdded={!!addedMissions[id]}
                onAdd={() => handleAddPhrase(phrase)}
              />
            );
          })}
        </div>
      </section>

      {/* ───────── YOUR PROGRESS ───────── */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <span className="nb-border nb-shadow-sm flex h-7 w-7 items-center justify-center rounded-lg bg-success text-success-foreground">
            <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          </span>
          <h2 className="text-lg font-black">Your progress</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleMarkVisited}
            disabled={visited}
            className={cn(
              "nb-border nb-shadow-sm nb-press inline-flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-extrabold uppercase tracking-wide transition",
              visited
                ? "bg-success text-success-foreground"
                : "bg-card hover:bg-card/80",
            )}
          >
            <CheckCircle2 className="h-5 w-5" aria-hidden />
            {visited ? "Visited · +15 XP" : "Mark as visited"}
          </button>
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={cn(
              "nb-border nb-shadow-sm nb-press inline-flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-extrabold uppercase tracking-wide transition",
              favorited
                ? "bg-destructive text-destructive-foreground"
                : "bg-card hover:bg-card/80",
            )}
          >
            <Heart
              className={cn("h-5 w-5", favorited && "fill-current")}
              aria-hidden
            />
            {favorited ? "Favorited" : "Save to favorites"}
          </button>
        </div>
      </section>

      {/* ───────── TAGS ───────── */}
      {gem.metadata.tags.length > 0 && (
        <section>
          <div className="mb-2 flex items-center gap-2">
            <Tag
              className="h-4 w-4 text-ink/50"
              strokeWidth={2.5}
              aria-hidden
            />
            <p className="text-xs font-extrabold uppercase tracking-wide text-ink/50">
              Tags
            </p>
          </div>
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
        </section>
      )}
    </div>
  );
}
