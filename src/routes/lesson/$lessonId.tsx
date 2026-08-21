import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, X, PartyPopper, Target } from "lucide-react";

import { getConcept, getLesson, lessonConcepts } from "@/data/curriculum";
import { generateExercises, isGraded } from "@/data/exercises";
import { missionForUnit } from "@/data/missions";
import { ExerciseView, feedbackText } from "@/components/exercise-views";
import { SpeakButton } from "@/components/speak-button";
import { useProgress } from "@/lib/progress";
import { NBButton, NBCard, NBProgress, Sticker, Kannada } from "@/lib/nb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPage,
});

type Phase = "play" | "done" | "mission";

function LessonPage() {
  const { lessonId } = Route.useParams();
  const navigate = useNavigate();
  const { recordExercise, completeLesson } = useProgress();

  const lesson = getLesson(Number(lessonId));
  const exercises = useMemo(
    () => (lesson ? generateExercises(lesson) : []),
    [lesson],
  );

  const [phase, setPhase] = useState<Phase>("play");
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<{ correct: boolean } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [gradedCount, setGradedCount] = useState(0);

  if (!lesson || exercises.length === 0) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl">Lesson not found</h1>
        <NBButton onClick={() => navigate({ to: "/learn" })}>
          Back to path
        </NBButton>
      </div>
    );
  }

  const current = exercises[idx]!;
  const total = exercises.length;

  const handleAnswer = (correct: boolean) => {
    if (answered) return;
    setAnswered({ correct });
    if (isGraded(current)) {
      setGradedCount((g) => g + 1);
      if (correct) setCorrectCount((c) => c + 1);
      recordExercise(current.conceptId, correct);
    }
  };

  const advance = () => {
    if (idx < total - 1) {
      setIdx((i) => i + 1);
      setAnswered(null);
    } else {
      const accuracy = gradedCount > 0 ? correctCount / gradedCount : 1;
      completeLesson(lesson.id, accuracy);
      setPhase("done");
    }
  };

  if (phase === "done") {
    return (
      <CompletePane
        conceptsPracticed={lessonConcepts(lesson).map((c) => c.english)}
        accuracy={gradedCount > 0 ? correctCount / gradedCount : 1}
        onContinue={() => setPhase("mission")}
      />
    );
  }

  if (phase === "mission") {
    return (
      <MissionPane
        unitId={lesson.unitId}
        onDone={() => navigate({ to: "/learn" })}
      />
    );
  }

  const showContinue = current.type === "intro" || answered !== null;

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-paper lg:max-w-3xl">
      {/* Top bar: close + progress */}
      <div className="flex items-center gap-3 px-4 pt-5 lg:px-8 lg:pt-8">
        <button
          type="button"
          aria-label="Exit lesson"
          onClick={() => navigate({ to: "/learn" })}
          className="nb-border nb-shadow-sm nb-press inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex-1">
          <NBProgress value={(idx / total) * 100} />
        </div>
      </div>

      {/* Exercise */}
      <div className="flex-1 overflow-y-auto px-5 py-6 lg:px-8 lg:py-8">
        <ExerciseView
          key={current.id}
          exercise={current}
          disabled={answered !== null}
          onAnswer={handleAnswer}
        />
      </div>

      {/* Feedback + action */}
      <div
        className={cn(
          "border-t-[3px] border-ink px-5 py-4 lg:px-8 lg:py-6",
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
        {showContinue ? (
          <NBButton full size="lg" onClick={advance}>
            {idx < total - 1 ? "Continue" : "Finish"}
          </NBButton>
        ) : (
          <p className="text-center text-sm font-bold text-ink/50">
            Choose your answer above
          </p>
        )}
      </div>
    </div>
  );
}

function CompletePane({
  conceptsPracticed,
  accuracy,
  onContinue,
}: {
  conceptsPracticed: string[];
  accuracy: number;
  onContinue: () => void;
}) {
  const { totals } = useProgress();
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-5 px-6 py-10 text-center">
      <div className="animate-nb-pop">
        <PartyPopper className="mx-auto h-16 w-16 text-primary" aria-hidden />
      </div>
      <h1 className="text-4xl">Great work!</h1>
      <NBCard tone="yellow" className="w-full">
        <div className="flex items-center justify-around">
          <div>
            <p className="text-3xl font-black">+20</p>
            <p className="text-xs font-extrabold uppercase text-ink/60">XP</p>
          </div>
          <div>
            <p className="text-3xl font-black">{Math.round(accuracy * 100)}%</p>
            <p className="text-xs font-extrabold uppercase text-ink/60">
              Accuracy
            </p>
          </div>
          <div>
            <p className="text-3xl font-black">🔥 {totals.streak}</p>
            <p className="text-xs font-extrabold uppercase text-ink/60">
              Streak
            </p>
          </div>
        </div>
      </NBCard>

      {conceptsPracticed.length > 0 && (
        <div className="w-full">
          <p className="mb-2 text-sm font-extrabold uppercase text-ink/60">
            You practiced
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {conceptsPracticed.map((c) => (
              <Sticker key={c} tone="white">
                {c}
              </Sticker>
            ))}
          </div>
        </div>
      )}

      <NBButton full size="lg" onClick={onContinue}>
        Continue
      </NBButton>
    </div>
  );
}

function MissionPane({
  unitId,
  onDone,
}: {
  unitId: number;
  onDone: () => void;
}) {
  const mission = missionForUnit(unitId);
  const concept = mission ? getConcept(mission.conceptId) : undefined;

  if (!mission || !concept) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="text-3xl">Back to your path</h1>
        <NBButton full size="lg" onClick={onDone}>
          Continue
        </NBButton>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-5 px-6 py-10 text-center">
      <Target className="h-14 w-14 text-primary" aria-hidden />
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-ink/60">
          Real-world mission
        </p>
        <h1 className="mt-1 text-3xl">{mission.title}</h1>
      </div>
      <p className="font-semibold text-ink/80">{mission.objective}</p>

      <NBCard tone="pink" className="w-full">
        <Kannada className="block text-4xl">{concept.kannada}</Kannada>
        <p className="mt-2 text-xl font-black">{concept.transliteration}</p>
        <p className="text-sm font-semibold text-ink/70">{concept.english}</p>
        <div className="mt-3 flex justify-center">
          <SpeakButton text={concept.kannada} />
        </div>
      </NBCard>

      <Sticker tone="yellow">Reward: +{mission.reward} XP</Sticker>
      {mission.safetyNote && (
        <p className="max-w-xs text-xs font-semibold text-ink/55">
          {mission.safetyNote}
        </p>
      )}

      <div className="w-full space-y-2">
        <NBButton full size="lg" onClick={onDone}>
          I'll try it
        </NBButton>
        <button
          type="button"
          onClick={onDone}
          className="w-full text-sm font-extrabold uppercase tracking-wide text-ink/50"
        >
          Back to path
        </button>
      </div>
    </div>
  );
}
