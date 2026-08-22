import { useEffect, useState } from "react";
import { Check, Mic, X } from "lucide-react";

import type { Exercise } from "@/data/exercises";
import { normalizeAnswer } from "@/data/exercises";
import { SpeakButton } from "@/components/speak-button";
import { Kannada } from "@/lib/nb";
import { canListen, listenOnce } from "@/lib/speech";
import { cn } from "@/lib/utils";

type ViewProps<T extends Exercise> = {
  exercise: T;
  disabled: boolean;
  onAnswer: (correct: boolean) => void;
};

/** Renders the question area for one exercise. The bottom feedback + Continue
 * bar lives in the lesson shell; this only surfaces the answer via onAnswer. */
export function ExerciseView({
  exercise,
  disabled,
  onAnswer,
}: {
  exercise: Exercise;
  disabled: boolean;
  onAnswer: (correct: boolean) => void;
}) {
  switch (exercise.type) {
    case "intro":
      return <IntroView exercise={exercise} />;
    case "mcq":
      return (
        <McqView exercise={exercise} disabled={disabled} onAnswer={onAnswer} />
      );
    case "listening":
      return (
        <ListeningView
          exercise={exercise}
          disabled={disabled}
          onAnswer={onAnswer}
        />
      );
    case "wordbank":
      return (
        <WordBankView
          exercise={exercise}
          disabled={disabled}
          onAnswer={onAnswer}
        />
      );
    case "speak":
      return (
        <SpeakView
          exercise={exercise}
          disabled={disabled}
          onAnswer={onAnswer}
        />
      );
  }
}

function IntroView({
  exercise,
}: {
  exercise: Extract<Exercise, { type: "intro" }>;
}) {
  const c = exercise.concept;
  return (
    <div className="animate-nb-pop text-center">
      <p className="text-xs font-extrabold uppercase tracking-wide text-ink/50">
        New word
      </p>
      <Kannada className="mt-4 block text-6xl leading-tight">
        {c.kannada}
      </Kannada>
      <p className="mt-3 text-2xl font-black">{c.transliteration}</p>
      <p className="mt-1 text-lg font-semibold text-ink/70">{c.english}</p>
      <div className="mt-5 flex justify-center gap-2">
        <SpeakButton text={c.kannada} />
        <SpeakButton text={c.kannada} slow />
      </div>
      {c.note && (
        <div className="nb-card mt-6 bg-secondary p-4 text-left text-sm font-semibold">
          {c.note}
        </div>
      )}
    </div>
  );
}

function optionState(chosen: string | null, option: string, answer: string) {
  if (!chosen) return "idle" as const;
  if (option === answer) return "correct" as const;
  if (option === chosen) return "wrong" as const;
  return "idle" as const;
}

function OptionButton({
  state,
  disabled,
  onClick,
  children,
}: {
  state: "idle" | "correct" | "wrong";
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "nb-border nb-shadow-sm nb-press flex items-center justify-between gap-2 rounded-xl px-4 py-4 text-left text-lg font-extrabold disabled:opacity-100",
        state === "idle" && "bg-card",
        state === "correct" && "bg-success text-success-foreground",
        state === "wrong" && "bg-destructive text-destructive-foreground",
      )}
    >
      <span>{children}</span>
      {state === "correct" && (
        <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
      )}
      {state === "wrong" && (
        <X className="h-5 w-5" strokeWidth={3} aria-hidden />
      )}
    </button>
  );
}

function McqView({
  exercise,
  disabled,
  onAnswer,
}: ViewProps<Extract<Exercise, { type: "mcq" }>>) {
  const [chosen, setChosen] = useState<string | null>(null);
  const toKannada = exercise.mode === "toKannada";

  return (
    <div>
      <p className="text-sm font-extrabold uppercase tracking-wide text-ink/60">
        {toKannada ? "Pick the Kannada" : "What does this mean?"}
      </p>
      <div className="nb-card my-4 bg-secondary p-5 text-center">
        {toKannada ? (
          <p className="text-2xl font-black">{exercise.promptEnglish}</p>
        ) : (
          <>
            <Kannada className="block text-4xl">
              {exercise.promptKannada}
            </Kannada>
            <p className="mt-2 text-lg font-extrabold">
              {exercise.promptTranslit}
            </p>
            <div className="mt-3 flex justify-center">
              <SpeakButton text={exercise.promptKannada} />
            </div>
          </>
        )}
      </div>
      <div className="grid gap-3">
        {exercise.options.map((opt) => (
          <OptionButton
            key={opt}
            state={optionState(chosen, opt, exercise.answer)}
            disabled={disabled || chosen !== null}
            onClick={() => {
              setChosen(opt);
              onAnswer(opt === exercise.answer);
            }}
          >
            {toKannada ? <Kannada className="text-2xl">{opt}</Kannada> : opt}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

function ListeningView({
  exercise,
  disabled,
  onAnswer,
}: ViewProps<Extract<Exercise, { type: "listening" }>>) {
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <div>
      <p className="text-sm font-extrabold uppercase tracking-wide text-ink/60">
        Listen and pick what you heard
      </p>
      <div className="nb-card my-4 flex flex-col items-center gap-3 bg-accent p-6">
        <SpeakButton text={exercise.audioText} label="Play audio" />
        <SpeakButton text={exercise.audioText} slow />
      </div>
      <div className="grid gap-3">
        {exercise.options.map((opt) => (
          <OptionButton
            key={opt}
            state={optionState(chosen, opt, exercise.answer)}
            disabled={disabled || chosen !== null}
            onClick={() => {
              setChosen(opt);
              onAnswer(opt === exercise.answer);
            }}
          >
            {opt}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

function WordBankView({
  exercise,
  disabled,
  onAnswer,
}: ViewProps<Extract<Exercise, { type: "wordbank" }>>) {
  const [order, setOrder] = useState<number[]>([]);
  const used = new Set(order);
  const correctText = normalizeAnswer(exercise.answerWords.join(" "));

  const check = () => {
    const built = normalizeAnswer(
      order.map((i) => exercise.bankWords[i] ?? "").join(" "),
    );
    onAnswer(built === correctText);
  };

  return (
    <div>
      <p className="text-sm font-extrabold uppercase tracking-wide text-ink/60">
        Build the phrase
      </p>
      <div className="nb-card my-4 bg-secondary p-4 text-center">
        <p className="text-xl font-black">{exercise.english}</p>
        <Kannada className="mt-1 block text-lg text-ink/70">
          {exercise.kannada}
        </Kannada>
      </div>

      <div className="nb-border min-h-16 rounded-xl bg-paper p-3">
        <div className="flex flex-wrap gap-2">
          {order.length === 0 && (
            <span className="text-sm font-bold text-ink/40">
              Tap words below...
            </span>
          )}
          {order.map((i) => (
            <button
              key={`sel-${i}`}
              type="button"
              disabled={disabled}
              onClick={() => setOrder((o) => o.filter((x) => x !== i))}
              className="nb-border nb-press rounded-lg bg-card px-3 py-1.5 font-extrabold"
            >
              {exercise.bankWords[i]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {exercise.bankWords.map((word, i) =>
          used.has(i) ? (
            <span
              key={`bank-${i}`}
              className="rounded-lg border-2 border-dashed border-ink/30 px-3 py-1.5 font-extrabold text-ink/30"
            >
              {word}
            </span>
          ) : (
            <button
              key={`bank-${i}`}
              type="button"
              disabled={disabled}
              onClick={() => setOrder((o) => [...o, i])}
              className="nb-border nb-shadow-sm nb-press rounded-lg bg-card px-3 py-1.5 font-extrabold"
            >
              {word}
            </button>
          ),
        )}
      </div>

      {!disabled && (
        <button
          type="button"
          disabled={order.length === 0}
          onClick={check}
          className="nb-border nb-shadow nb-press mt-6 w-full rounded-xl bg-primary py-3 font-extrabold uppercase text-primary-foreground disabled:opacity-50"
        >
          Check
        </button>
      )}
    </div>
  );
}

function SpeakView({
  exercise,
  disabled,
  onAnswer,
}: ViewProps<Extract<Exercise, { type: "speak" }>>) {
  const [status, setStatus] = useState<"idle" | "listening" | "done" | "error" | "typing">("idle");
  const [heard, setHeard] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [typedAnswer, setTypedAnswer] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [recordingHandle, setRecordingHandle] = useState<any>(null);

  useEffect(() => setMounted(true), []);
  const supported = mounted && canListen();

  const toggleRecording = async () => {
    if (status === "idle" || status === "error") {
      // Start recording (or retry after error)
      setStatus("listening");
      setHeard("");
      setError("");
      console.log("[SpeakView] Starting listening...");

      const handle = listenOnce();
      setRecordingHandle(handle);

      try {
        const { transcript, error: err } = await handle.promise;
        console.log("[SpeakView] Got result:", transcript, "error:", err);

        if (err) {
          setError(err);
          setStatus("error");
          return;
        }

        if (!transcript) {
          setError("No speech detected. Please try again.");
          setStatus("error");
          return;
        }

        setHeard(transcript);
        const norm = normalizeAnswer(transcript);
        const target = normalizeAnswer(exercise.transliteration);
        const kn = normalizeAnswer(exercise.kannada);
        const tokens = target.split(" ").filter(Boolean);
        const overlap = tokens.some((t) => t.length > 1 && norm.includes(t));
        const correct =
          Boolean(norm) && (norm.includes(target) || norm.includes(kn) || overlap);
        setStatus("done");
        onAnswer(correct);
      } catch (err) {
        console.error("[SpeakView] Exception:", err);
        setError(String(err));
        setStatus("error");
      }
    } else if (status === "listening") {
      // Stop recording
      console.log("[SpeakView] Stopping recording...");
      if (recordingHandle) {
        await recordingHandle.stop();
      }
    }
  };

  const submitTypedAnswer = () => {
    if (!typedAnswer.trim()) {
      setError("Please type something");
      return;
    }
    setHeard(typedAnswer);
    const norm = normalizeAnswer(typedAnswer);
    const target = normalizeAnswer(exercise.transliteration);
    const kn = normalizeAnswer(exercise.kannada);
    const tokens = target.split(" ").filter(Boolean);
    const overlap = tokens.some((t) => t.length > 1 && norm.includes(t));
    const correct =
      Boolean(norm) && (norm.includes(target) || norm.includes(kn) || overlap);
    setStatus("done");
    onAnswer(correct);
  };

  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-ink/60">
        Say this out loud
      </p>
      <div className="nb-card my-4 bg-secondary p-6 lg:p-8">
        <Kannada className="block text-4xl lg:text-6xl">{exercise.kannada}</Kannada>
        <p className="mt-2 text-xl font-black lg:text-2xl">{exercise.transliteration}</p>
        <p className="mt-1 font-semibold text-ink/70 lg:text-lg">{exercise.english}</p>
        <div className="mt-4 flex justify-center">
          <SpeakButton text={exercise.kannada} label="Hear it" />
        </div>
      </div>

      {supported ? (
        <div>
          {status !== "typing" ? (
            <>
              <button
                type="button"
                disabled={disabled}
                onClick={toggleRecording}
                className={cn(
                  "nb-border nb-shadow nb-press mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full transition-all lg:h-24 lg:w-24",
                  status === "listening"
                    ? "animate-nb-ring bg-primary text-primary-foreground"
                    : status === "error"
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-card hover:bg-card/80",
                )}
                aria-label={status === "listening" ? "Tap to stop" : "Tap to record"}
              >
                <Mic className="h-8 w-8 lg:h-10 lg:w-10" aria-hidden />
              </button>

              {status === "listening" && (
                <p className="mt-3 font-extrabold text-primary lg:text-lg">
                  Listening... say it now
                </p>
              )}

              {status === "error" && (
                <div>
                  <p className="mt-3 font-extrabold text-destructive lg:text-lg">
                    {error}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => { setStatus("idle"); setError(""); }}
                      className="flex-1 text-sm font-extrabold uppercase text-ink/60 underline"
                    >
                      Type instead
                    </button>
                  </div>
                </div>
              )}

              {status === "done" && heard && (
                <p className="mt-3 text-sm font-semibold text-ink/60 lg:text-base">
                  We heard: <span className="font-bold">"{heard}"</span>
                </p>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="Type the Kannada word..."
                className="nb-border w-full rounded-xl bg-card px-4 py-3 font-bold outline-none"
                onKeyDown={(e) => e.key === "Enter" && submitTypedAnswer()}
              />
              {error && <p className="text-sm font-bold text-destructive">{error}</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="flex-1 text-sm font-extrabold uppercase text-ink/60 underline"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={submitTypedAnswer}
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-extrabold text-white"
                >
                  Check
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-ink/30 bg-paper p-4 lg:p-6">
          <p className="text-sm font-semibold text-ink/60 lg:text-base">
            Speech recognition not available in this browser.
          </p>
          <p className="mt-1 text-xs text-ink/50 lg:text-sm">
            Use the typing option below or say it out loud and tap "I said it".
          </p>
        </div>
      )}

      {!disabled && (
        <button
          type="button"
          onClick={() => onAnswer(true)}
          className="mt-5 block w-full text-sm font-extrabold uppercase tracking-wide text-ink/60 underline hover:text-ink lg:text-base"
        >
          I said it out loud
        </button>
      )}
    </div>
  );
}

export function feedbackText(exercise: Exercise, correct: boolean): string {
  switch (exercise.type) {
    case "mcq":
      return correct ? "Nice." : exercise.explanation;
    case "listening":
      return correct
        ? "Good ear!"
        : `It was "${exercise.transliteration}" - ${exercise.english}.`;
    case "wordbank":
      return correct
        ? "Perfect."
        : `The phrase is "${exercise.transliteration}" - ${exercise.english}.`;
    case "speak":
      return correct
        ? "Sounds good!"
        : "Good effort - try saying it once more next time.";
    case "intro":
      return "";
  }
}
