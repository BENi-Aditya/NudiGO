import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

import {
  goals,
  levels,
  situations,
  goalLabel,
  type Option,
} from "@/data/onboarding";
import { useProgress } from "@/lib/progress";
import { NBButton, NBCard, NBProgress, Sticker } from "@/lib/nb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const TOTAL_STEPS = 5;

function Onboarding() {
  const navigate = useNavigate();
  const { hydrated, state, completeOnboarding } = useProgress();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  // Already onboarded? Skip straight to the path.
  useEffect(() => {
    if (hydrated && state.profile.onboardingDone) {
      void navigate({ to: "/learn" });
    }
  }, [hydrated, state.profile.onboardingDone, navigate]);

  const back = () => setStep((s) => Math.max(0, s - 1));
  const next = () => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));

  const toggleSituation = (id: string) =>
    setPicked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const finish = () => {
    completeOnboarding({
      displayName: name.trim(),
      goal,
      level,
      situations: picked,
    });
    void navigate({ to: "/learn" });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-paper px-5 py-6">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            aria-label="Back"
            className="nb-border nb-shadow-sm nb-press inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
        ) : (
          <span className="h-10 w-10" />
        )}
        <div className="flex-1">
          <NBProgress value={((step + 1) / TOTAL_STEPS) * 100} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center py-8">
        {step === 0 && (
          <div className="animate-nb-pop space-y-5 text-center">
            <div className="text-6xl">👋</div>
            <h1 className="text-4xl">Welcome to Bengaluru.</h1>
            <p className="text-lg font-semibold text-ink/80">
              Let's teach you the Kannada you'll actually use.
            </p>
            <div className="mx-auto max-w-xs pt-2 text-left">
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-extrabold uppercase"
              >
                What should we call you?{" "}
                <span className="text-ink/50">(optional)</span>
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="nb-border w-full rounded-xl bg-card px-4 py-3 font-bold outline-none"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <StepPicker
            title="Why are you learning Kannada?"
            options={goals}
            selected={goal}
            onSelect={setGoal}
          />
        )}

        {step === 2 && (
          <StepPicker
            title="How much Kannada do you know?"
            options={levels}
            selected={level}
            onSelect={setLevel}
            single
          />
        )}

        {step === 3 && (
          <div className="animate-nb-pop">
            <h1 className="text-3xl">What do you want to handle first?</h1>
            <p className="mt-2 font-semibold text-ink/70">
              Pick a few - you can change this later.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {situations.map((s) => {
                const active = picked.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSituation(s.id)}
                    className={cn(
                      "nb-border nb-shadow-sm nb-press inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-extrabold",
                      active ? "bg-primary text-primary-foreground" : "bg-card",
                    )}
                  >
                    <span aria-hidden>{s.emoji}</span>
                    {s.label}
                    {active && (
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-nb-pop space-y-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center">
              <Sparkles className="h-14 w-14 text-primary" aria-hidden />
            </div>
            <h1 className="text-4xl">Your path is ready.</h1>
            <NBCard tone="yellow" className="mx-auto max-w-xs text-left">
              <Sticker tone="white">{goalLabel(goal)}</Sticker>
              <p className="mt-3 text-xl font-black">Bengaluru Beginner</p>
              <p className="mt-1 font-semibold text-ink/75">
                You'll start with greetings, ordering food, and getting around.
              </p>
            </NBCard>
          </div>
        )}
      </div>

      {/* Footer action */}
      <div className="pt-2">
        {step === 0 && (
          <NBButton full size="lg" onClick={next}>
            Start
          </NBButton>
        )}
        {step === 1 && (
          <NBButton full size="lg" disabled={!goal} onClick={next}>
            Continue
          </NBButton>
        )}
        {step === 2 && (
          <NBButton full size="lg" disabled={!level} onClick={next}>
            Continue
          </NBButton>
        )}
        {step === 3 && (
          <NBButton
            full
            size="lg"
            disabled={picked.length === 0}
            onClick={next}
          >
            Continue
          </NBButton>
        )}
        {step === 4 && (
          <NBButton full size="lg" tone="primary" onClick={finish}>
            Let's go!
          </NBButton>
        )}
      </div>
    </div>
  );
}

function StepPicker({
  title,
  options,
  selected,
  onSelect,
  single,
}: {
  title: string;
  options: Option[];
  selected: string;
  onSelect: (id: string) => void;
  single?: boolean;
}) {
  return (
    <div className="animate-nb-pop">
      <h1 className="text-3xl">{title}</h1>
      <div
        className={cn(
          "mt-6 grid gap-3",
          single ? "grid-cols-1" : "grid-cols-2",
        )}
      >
        {options.map((o) => {
          const active = selected === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onSelect(o.id)}
              className={cn(
                "nb-border nb-shadow-sm nb-press flex items-center gap-3 rounded-xl p-4 text-left font-extrabold",
                active ? "bg-primary text-primary-foreground" : "bg-card",
              )}
            >
              <span className="text-2xl" aria-hidden>
                {o.emoji}
              </span>
              <span className="flex-1">
                {o.label}
                {o.hint && (
                  <span
                    className={cn(
                      "mt-0.5 block text-xs font-semibold",
                      active ? "text-primary-foreground/80" : "text-ink/60",
                    )}
                  >
                    {o.hint}
                  </span>
                )}
              </span>
              {active && (
                <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
