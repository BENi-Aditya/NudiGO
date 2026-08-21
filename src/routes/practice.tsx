import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Check,
  X,
  Lock,
  MessagesSquare,
  Mic,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import {
  type Concept,
  concepts as allConcepts,
  getConcept,
} from "@/data/curriculum";
import {
  type Exercise,
  isGraded,
  reviewExercises,
  speakExercises,
} from "@/data/exercises";
import { scenarios } from "@/data/scenarios";
import { AppShell } from "@/components/app-shell";
import { ExerciseView, feedbackText } from "@/components/exercise-views";
import { useProgress } from "@/lib/progress";
import { NBButton, NBCard, NBProgress, Sticker } from "@/lib/nb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practice")({
  component: PracticePage,
});

type Mode = "hub" | "review" | "speak";

function PracticePage() {
  const navigate = useNavigate();
  const { hydrated, state, dueConcepts, unitCompletedCount } = useProgress();
  const [mode, setMode] = useState<Mode>("hub");

  useEffect(() => {
    if (hydrated && !state.profile.onboardingDone) {
      void navigate({ to: "/onboarding" });
    }
  }, [hydrated, state.profile.onboardingDone, navigate]);

  const due = dueConcepts();

  // Concepts to drill in speaking practice: ones the learner has seen, else the openers.
  const speakConcepts = useMemo<Concept[]>(() => {
    const seen = Object.keys(state.conceptStats)
      .map((id) => getConcept(id))
      .filter((c): c is Concept => Boolean(c));
    const source = seen.length > 0 ? seen : allConcepts;
    return source.slice(0, 6);
  }, [state.conceptStats]);

  if (mode === "review") {
    return (
      <QuickSession
        title="Review"
        exercises={reviewExercises(due)}
        onExit={() => {
          setMode("hub");
          toast.success("Review done - nicely kept up.");
        }}
      />
    );
  }

  if (mode === "speak") {
    return (
      <QuickSession
        title="Speaking"
        exercises={speakExercises(speakConcepts)}
        onExit={() => {
          setMode("hub");
          toast.success("Speaking practice done!");
        }}
      />
    );
  }

  return (
    <AppShell active="practice">
      <h1 className="mb-1 text-3xl">Practice</h1>
      <p className="mb-5 font-semibold text-ink/70">Sharpen what you know.</p>

      {/* Review */}
      <NBCard className="mb-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" aria-hidden />
          <p className="font-black">Review due</p>
        </div>
        {due.length > 0 ? (
          <>
            <p className="mt-1 text-sm font-semibold text-ink/70">
              {due.length} concept{due.length === 1 ? "" : "s"} ready to
              refresh.
            </p>
            <NBButton className="mt-3" full onClick={() => setMode("review")}>
              Start review
            </NBButton>
          </>
        ) : (
          <p className="mt-1 text-sm font-semibold text-ink/70">
            You're caught up. Nice work. ✨
          </p>
        )}
      </NBCard>

      {/* AI conversations */}
      <NBCard className="mb-4">
        <div className="flex items-center gap-2">
          <MessagesSquare className="h-5 w-5 text-primary" aria-hidden />
          <p className="font-black">AI conversations</p>
        </div>
        <p className="mt-1 text-sm font-semibold text-ink/70">
          Roleplay a real Bengaluru moment.
        </p>
        <div className="mt-3 space-y-2">
          {scenarios.map((s) => {
            const unlocked = unitCompletedCount(s.requiresUnit) >= 1;
            const inner = (
              <div
                className={cn(
                  "flex items-center gap-3 rounded-xl border-2 border-ink p-3",
                  unlocked ? "nb-press bg-card" : "bg-muted opacity-60",
                )}
              >
                <span className="text-2xl" aria-hidden>
                  {s.emoji}
                </span>
                <div className="flex-1">
                  <p className="font-black">{s.title}</p>
                  <p className="text-xs font-semibold text-ink/60">{s.role}</p>
                </div>
                {unlocked ? (
                  <ChevronRight className="h-5 w-5" aria-hidden />
                ) : (
                  <Lock className="h-4 w-4" aria-hidden />
                )}
              </div>
            );
            return unlocked ? (
              <Link
                key={s.id}
                to="/roleplay/$scenarioId"
                params={{ scenarioId: s.id }}
              >
                {inner}
              </Link>
            ) : (
              <div key={s.id}>{inner}</div>
            );
          })}
        </div>
      </NBCard>

      {/* Speaking */}
      <NBCard>
        <div className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" aria-hidden />
          <p className="font-black">Speaking practice</p>
        </div>
        <p className="mt-1 text-sm font-semibold text-ink/70">
          Say your phrases out loud.
        </p>
        <NBButton
          className="mt-3"
          full
          tone="pink"
          onClick={() => setMode("speak")}
        >
          Start speaking
        </NBButton>
      </NBCard>
    </AppShell>
  );
}

/** A lightweight exercise runner reused for Review and Speaking practice. */
function QuickSession({
  title,
  exercises,
  onExit,
}: {
  title: string;
  exercises: Exercise[];
  onExit: () => void;
}) {
  const { recordExercise } = useProgress();
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<{ correct: boolean } | null>(null);

  if (exercises.length === 0) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl">Nothing to practice yet</h1>
        <p className="font-semibold text-ink/70">
          Finish a lesson first, then come back.
        </p>
        <NBButton onClick={onExit}>Back</NBButton>
      </div>
    );
  }

  const current = exercises[idx]!;
  const total = exercises.length;

  const handleAnswer = (correct: boolean) => {
    if (answered) return;
    setAnswered({ correct });
    if (isGraded(current)) recordExercise(current.conceptId, correct);
  };

  const advance = () => {
    if (idx < total - 1) {
      setIdx((i) => i + 1);
      setAnswered(null);
    } else {
      onExit();
    }
  };

  const showContinue = current.type === "intro" || answered !== null;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-paper">
      <div className="flex items-center gap-3 px-4 pt-5">
        <button
          type="button"
          aria-label="Exit"
          onClick={onExit}
          className="nb-border nb-shadow-sm nb-press inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex-1">
          <NBProgress value={(idx / total) * 100} label={title} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <ExerciseView
          key={current.id}
          exercise={current}
          disabled={answered !== null}
          onAnswer={handleAnswer}
        />
      </div>

      <div
        className={cn(
          "border-t-[3px] border-ink px-5 py-4",
          answered
            ? answered.correct
              ? "bg-success/25"
              : "bg-destructive/15"
            : "bg-paper",
        )}
      >
        {answered && (
          <div className="mb-3 flex items-start gap-2">
            <span
              className={cn(
                "nb-border mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                answered.correct
                  ? "bg-success text-success-foreground"
                  : "bg-destructive text-destructive-foreground",
              )}
            >
              {answered.correct ? (
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
              ) : (
                <X className="h-4 w-4" strokeWidth={3} aria-hidden />
              )}
            </span>
            <p className="font-bold">
              {feedbackText(current, answered.correct)}
            </p>
          </div>
        )}
        {showContinue && (
          <NBButton full size="lg" onClick={advance}>
            {idx < total - 1 ? "Continue" : "Done"}
          </NBButton>
        )}
      </div>
    </div>
  );
}
