import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  BookOpen,
  Check,
  Lock,
  Mic,
  RefreshCw,
  ChevronRight,
  Target,
} from "lucide-react";

import {
  type Lesson,
  getUnit,
  lessonsForUnit,
  sections,
  unitsForSection,
} from "@/data/curriculum";
import { kannadaLessons, kashmiriLessons } from "@/lib/language-content";
import { AppShell } from "@/components/app-shell";
import { StreakPill, XpPill } from "@/components/stats";
import { useProgress } from "@/lib/progress";
import { useLanguage } from "@/lib/language-context";
import { NBCard, NBLinkButton, Sticker } from "@/lib/nb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn")({
  component: LearnPage,
});

const kindIcon = { lesson: BookOpen, speak: Mic, review: RefreshCw } as const;

function LearnPage() {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const {
    hydrated,
    state,
    totals,
    nextLesson,
    isLessonCompleted,
    isLessonUnlocked,
    activeMission,
    dueConcepts,
  } = useProgress();

  useEffect(() => {
    if (hydrated && !state.profile.onboardingDone) {
      void navigate({ to: "/onboarding" });
    }
  }, [hydrated, state.profile.onboardingDone, navigate]);

  if (!hydrated) {
    return (
      <AppShell active="learn">
        <div className="mt-24 text-center font-extrabold text-ink/50">
          Loading…
        </div>
      </AppShell>
    );
  }

  const next = nextLesson();
  const mission = activeMission();
  const due = dueConcepts();
  const name = state.profile.displayName || "there";

  // Get language-specific lessons
  const languageLessons = currentLanguage === "kashmiri" ? kashmiriLessons : kannadaLessons;

  return (
    <AppShell active="learn">
      {/* Header */}
      <header className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-ink/60">
            Namaskara
          </p>
          <h1 className="text-3xl">{name}! 👋</h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StreakPill streak={totals.streak} />
          <XpPill xp={totals.xp} />
        </div>
      </header>

      {/* Continue / next up */}
      {next ? (
        <NBCard tone="primary" className="mb-4">
          <p className="text-xs font-extrabold uppercase tracking-wide text-primary-foreground/80">
            {isLessonCompleted(next.id) ? "Keep going" : "Next up"}
          </p>
          <h2 className="mt-1 text-2xl text-primary-foreground">
            {next.title}
          </h2>
          <p className="mt-1 font-semibold text-primary-foreground/90">
            {next.objective}
          </p>
          <div className="mt-4">
            <NBLinkButton
              to="/lesson/$lessonId"
              params={{ lessonId: String(next.id) }}
              tone="white"
              full
              size="lg"
            >
              {isLessonCompleted(next.id) ? "Continue" : "Start lesson"}
            </NBLinkButton>
          </div>
        </NBCard>
      ) : (
        <NBCard tone="success" className="mb-4">
          <h2 className="text-2xl">You're all caught up! 🎉</h2>
          <p className="mt-1 font-semibold">
            You've finished every available lesson. More coming soon.
          </p>
        </NBCard>
      )}

      {/* Review prompt */}
      {due.length > 0 && (
        <Link to="/practice" className="mb-4 block">
          <div className="nb-card nb-press flex items-center gap-3 bg-accent p-4">
            <RefreshCw className="h-6 w-6" aria-hidden />
            <div className="flex-1">
              <p className="font-black">
                Review {due.length} concept{due.length === 1 ? "" : "s"}
              </p>
              <p className="text-sm font-semibold text-ink/70">
                Keep them fresh before you forget.
              </p>
            </div>
            <ChevronRight className="h-5 w-5" aria-hidden />
          </div>
        </Link>
      )}

      {/* Active mission */}
      {mission && (
        <Link to="/missions" className="mb-6 block">
          <div className="nb-card nb-press flex items-center gap-3 p-4">
            <Target className="h-6 w-6 text-primary" aria-hidden />
            <div className="flex-1">
              <p className="text-xs font-extrabold uppercase tracking-wide text-ink/60">
                Active mission
              </p>
              <p className="font-black">{mission.title}</p>
            </div>
            <ChevronRight className="h-5 w-5" aria-hidden />
          </div>
        </Link>
      )}

      {/* The path */}
      <h2 className="mb-3 mt-2 text-2xl">Your path</h2>
      {currentLanguage === "kashmiri" ? (
        <div className="space-y-4">
          <div className="nb-card p-4">
            <p className="font-black mb-3">🏔️ Kashmiri Lessons</p>
            <ul className="space-y-2">
              {kashmiriLessons.map((lesson) => (
                <li key={lesson.id} className="nb-border rounded-lg p-3 bg-card hover:bg-card/80 transition">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <p className="font-bold text-sm">{lesson.title}</p>
                      <p className="text-xs text-ink/60">{lesson.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-7">
          {sections.map((section) => (
            <section key={section.id}>
              <div className="mb-3">
                <Sticker tone="yellow">{section.title}</Sticker>
                {section.subtitle && (
                  <p className="mt-1.5 text-sm font-semibold text-ink/60">
                    {section.subtitle}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                {unitsForSection(section.id).map((unit) => (
                  <UnitBlock
                    key={unit.id}
                    unitId={unit.id}
                    next={next}
                    isLessonCompleted={isLessonCompleted}
                    isLessonUnlocked={isLessonUnlocked}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </AppShell>
  );
}

function UnitBlock({
  unitId,
  next,
  isLessonCompleted,
  isLessonUnlocked,
}: {
  unitId: number;
  next: Lesson | undefined;
  isLessonCompleted: (id: number) => boolean;
  isLessonUnlocked: (id: number) => boolean;
}) {
  const unit = getUnit(unitId);
  if (!unit) return null;

  if (!unit.isAvailable) {
    return (
      <div className="nb-card flex items-center gap-3 bg-muted p-4 opacity-70">
        <Lock className="h-5 w-5" aria-hidden />
        <div>
          <p className="font-black">{unit.title}</p>
          <p className="text-sm font-semibold text-ink/60">Coming soon</p>
        </div>
      </div>
    );
  }

  const unitLessons = lessonsForUnit(unit.id);
  return (
    <div className="nb-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-black">{unit.title}</p>
        <span className="text-xs font-extrabold text-ink/60">
          {unitLessons.filter((l) => isLessonCompleted(l.id)).length}/
          {unitLessons.length}
        </span>
      </div>
      <ul className="space-y-2">
        {unitLessons.map((lesson) => (
          <LessonRow
            key={lesson.id}
            lesson={lesson}
            done={isLessonCompleted(lesson.id)}
            unlocked={isLessonUnlocked(lesson.id)}
            current={next?.id === lesson.id}
          />
        ))}
      </ul>
    </div>
  );
}

function LessonRow({
  lesson,
  done,
  unlocked,
  current,
}: {
  lesson: Lesson;
  done: boolean;
  unlocked: boolean;
  current: boolean;
}) {
  const Icon = done ? Check : unlocked ? kindIcon[lesson.kind] : Lock;

  const body = (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border-2 border-ink px-3 py-2.5",
        current && "bg-primary text-primary-foreground",
        done && !current && "bg-success/25",
        !unlocked && "opacity-45",
        unlocked && "nb-press",
      )}
    >
      <span
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-ink",
          done
            ? "bg-success text-success-foreground"
            : current
              ? "bg-card text-ink"
              : "bg-paper",
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={2.75} aria-hidden />
      </span>
      <div className="flex-1">
        <p className="text-sm font-black leading-tight">{lesson.title}</p>
        <p
          className={cn(
            "text-xs font-semibold",
            current ? "text-primary-foreground/85" : "text-ink/60",
          )}
        >
          {lesson.kind === "speak"
            ? "Speaking"
            : lesson.kind === "review"
              ? "Review"
              : lesson.objective}
        </p>
      </div>
      {current && <span className="text-xs font-black uppercase">Start</span>}
    </div>
  );

  if (!unlocked) return <li>{body}</li>;
  return (
    <li>
      <Link to="/lesson/$lessonId" params={{ lessonId: String(lesson.id) }}>
        {body}
      </Link>
    </li>
  );
}
