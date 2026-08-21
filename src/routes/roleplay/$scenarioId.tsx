import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Lightbulb, Mic, Send } from "lucide-react";

import { getScenario, type Line } from "@/data/scenarios";
import { SpeakButton } from "@/components/speak-button";
import { matchesStep } from "@/lib/roleplay";
import { useProgress } from "@/lib/progress";
import { canListen, listenOnce } from "@/lib/speech";
import { NBButton, NBCard, Sticker, Kannada } from "@/lib/nb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/roleplay/$scenarioId")({
  component: RoleplayPage,
});

type Msg =
  | { role: "npc"; line: Line }
  | { role: "user"; text: string }
  | { role: "system"; text: string };

function RoleplayPage() {
  const { scenarioId } = Route.useParams();
  const navigate = useNavigate();
  const { recordConversation } = useProgress();
  const scenario = getScenario(scenarioId);

  const [msgs, setMsgs] = useState<Msg[]>(
    scenario ? [{ role: "npc", line: scenario.opening }] : [],
  );
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [recording, setRecording] = useState(false);
  const [micReady, setMicReady] = useState(false);
  useEffect(() => setMicReady(canListen()), []);

  if (!scenario) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl">Scenario not found</h1>
        <NBButton onClick={() => navigate({ to: "/practice" })}>Back</NBButton>
      </div>
    );
  }

  const send = (raw: string) => {
    const text = raw.trim();
    const s = scenario.steps[step];
    if (!text || !s || done) return;

    setInput("");
    setShowHint(false);

    if (matchesStep(text, s.keywords)) {
      const isLast = step >= scenario.steps.length - 1;
      setMsgs((m) => {
        const nextMsgs: Msg[] = [
          ...m,
          { role: "user", text },
          { role: "npc", line: s.ack },
        ];
        if (!isLast) {
          const nextStep = scenario.steps[step + 1];
          if (nextStep) nextMsgs.push({ role: "npc", line: nextStep.npc });
        } else {
          nextMsgs.push({ role: "system", text: scenario.success });
        }
        return nextMsgs;
      });
      if (isLast) {
        setDone(true);
        recordConversation();
      } else {
        setStep((n) => n + 1);
        setAttempts(0);
      }
    } else {
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);
      setMsgs((m) => [
        ...m,
        { role: "user", text },
        {
          role: "system",
          text:
            nextAttempt >= 2
              ? "Not quite - tap the hint below."
              : "Hmm, try again.",
        },
      ]);
      if (nextAttempt >= 2) setShowHint(true);
    }
  };

  const record = async () => {
    if (recording) return;
    setRecording(true);
    const { promise } = listenOnce();
    const { transcript } = await promise;
    setRecording(false);
    if (transcript) send(transcript);
  };

  const currentStep = scenario.steps[step];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-paper">
      {/* Header */}
      <div className="flex items-center gap-3 border-b-[3px] border-ink px-4 py-4">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate({ to: "/practice" })}
          className="nb-border nb-shadow-sm nb-press inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            {scenario.emoji}
          </span>
          <div>
            <p className="font-black leading-tight">{scenario.role}</p>
            <p className="text-xs font-semibold text-ink/60">
              {scenario.title}
            </p>
          </div>
        </div>
      </div>

      {/* Context */}
      <div className="px-5 pt-4">
        <NBCard tone="yellow" className="text-sm font-semibold">
          {scenario.context}
        </NBCard>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {msgs.map((m, i) =>
          m.role === "npc" ? (
            <div key={i} className="max-w-[85%]">
              <NBCard className="bg-card">
                <Kannada className="block text-2xl leading-snug">
                  {m.line.kannada}
                </Kannada>
                <p className="mt-1 font-extrabold">{m.line.translit}</p>
                <p className="text-sm font-semibold text-ink/60">
                  {m.line.english}
                </p>
                <div className="mt-2">
                  <SpeakButton text={m.line.kannada} />
                </div>
              </NBCard>
            </div>
          ) : m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="nb-border nb-shadow-sm max-w-[85%] rounded-xl bg-primary px-4 py-2.5 font-bold text-primary-foreground">
                {m.text}
              </div>
            </div>
          ) : (
            <p key={i} className="text-center text-sm font-bold text-ink/60">
              {m.text}
            </p>
          ),
        )}

        {showHint && currentStep && !done && (
          <div className="max-w-[85%]">
            <button
              type="button"
              onClick={() => setInput(currentStep.hint.translit)}
              className="nb-border nb-shadow-sm nb-press w-full rounded-xl bg-accent p-3 text-left"
            >
              <span className="text-xs font-extrabold uppercase">
                Hint - tap to use
              </span>
              <Kannada className="mt-1 block text-lg">
                {currentStep.hint.kannada}
              </Kannada>
              <span className="font-extrabold">
                {currentStep.hint.translit}
              </span>
              <span className="block text-sm font-semibold text-ink/60">
                {currentStep.hint.english}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Input / done */}
      {done ? (
        <div className="space-y-2 border-t-[3px] border-ink bg-success/20 px-5 py-4">
          <Sticker tone="white">+10 XP · Conversation practiced</Sticker>
          <div className="flex gap-2 pt-1">
            <NBButton
              className="flex-1"
              tone="white"
              onClick={() => {
                setMsgs([{ role: "npc", line: scenario.opening }]);
                setStep(0);
                setAttempts(0);
                setShowHint(false);
                setDone(false);
              }}
            >
              Again
            </NBButton>
            <NBButton
              className="flex-1"
              onClick={() => navigate({ to: "/practice" })}
            >
              Done
            </NBButton>
          </div>
        </div>
      ) : (
        <div className="border-t-[3px] border-ink px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Show hint"
              onClick={() => setShowHint(true)}
              className="nb-border nb-shadow-sm nb-press inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary"
            >
              <Lightbulb className="h-5 w-5" aria-hidden />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send(input);
              }}
              placeholder="Type in Kannada (roman is fine)…"
              className="nb-border h-11 flex-1 rounded-xl bg-card px-3 font-bold outline-none"
            />
            {micReady && (
              <button
                type="button"
                aria-label="Speak"
                onClick={record}
                className={cn(
                  "nb-border nb-shadow-sm nb-press inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  recording
                    ? "animate-nb-ring bg-primary text-primary-foreground"
                    : "bg-card",
                )}
              >
                <Mic className="h-5 w-5" aria-hidden />
              </button>
            )}
            <button
              type="button"
              aria-label="Send"
              onClick={() => send(input)}
              className="nb-border nb-shadow-sm nb-press inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"
            >
              <Send className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
