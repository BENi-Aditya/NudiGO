import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, Target, Lock } from "lucide-react";
import { toast } from "sonner";

import { getConcept } from "@/data/curriculum";
import { getMission, missions as allMissions, type Mission } from "@/data/missions";
import { kashmiriMissions } from "@/lib/language-content";
import { AppShell } from "@/components/app-shell";
import { SpeakButton } from "@/components/speak-button";
import { useProgress } from "@/lib/progress";
import { useLanguage } from "@/lib/language-context";
import { NBButton, NBCard, Sticker, Kannada } from "@/lib/nb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/missions")({
  component: MissionsPage,
});

function MissionsPage() {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { hydrated, state, availableMissions, completeMission, unitCompletedCount } = useProgress();

  useEffect(() => {
    if (hydrated && !state.profile.onboardingDone) {
      void navigate({ to: "/onboarding" });
    }
  }, [hydrated, state.profile.onboardingDone, navigate]);

  const unlocked = availableMissions();
  const pending = unlocked.filter((m) => !state.missions[m.id]);
  const completedIds = Object.keys(state.missions);

  const onDid = (mission: Mission) => {
    completeMission(mission.id, mission.reward);
    const langText = currentLanguage === "kashmiri" ? "Kashmiri" : "Kannada";
    toast.success(`Mission complete! +${mission.reward} XP`, {
      description:
        `You used ${langText} in the real world. That's the whole point.`,
    });
  };

  // Show Kashmiri missions when language is Kashmiri
  if (currentLanguage === "kashmiri") {
    return (
      <AppShell active="missions">
        <h1 className="mb-1 text-3xl">Missions</h1>
        <p className="mb-5 font-semibold text-ink/70">
          Take your Kashmiri off the screen.
        </p>

        {kashmiriMissions.length === 0 && (
          <NBCard tone="yellow">
            <p className="font-bold">
              No missions available yet. 🎯
            </p>
          </NBCard>
        )}

        <Sticker tone="pink">Kashmiri Missions</Sticker>
        <div className="mt-3 space-y-4">
          {kashmiriMissions.map((mission) => (
            <NBCard key={mission.id} className="p-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-1" />
                <div className="flex-1">
                  <h3 className="font-black">{mission.title}</h3>
                  <p className="text-sm font-semibold text-ink/70 mt-1">{mission.description}</p>
                  <p className="text-xs text-ink/60 mt-2 italic">{mission.scenario}</p>
                  <div className="mt-3 space-y-1">
                    {mission.objectives.map((obj, idx) => (
                      <p key={idx} className="text-xs font-semibold text-ink/70">• {obj}</p>
                    ))}
                  </div>
                </div>
              </div>
            </NBCard>
          ))}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell active="missions">
      <h1 className="mb-1 text-3xl">Missions</h1>
      <p className="mb-5 font-semibold text-ink/70">
        Take your Kannada off the screen.
      </p>

      {pending.length === 0 && completedIds.length === 0 && (
        <NBCard tone="yellow">
          <p className="font-bold">
            Finish your first lesson to unlock a real-world mission. 🎯
          </p>
        </NBCard>
      )}

      {pending.length > 0 && (
        <>
          <Sticker tone="pink">Active</Sticker>
          <div className="mt-3 space-y-4">
            {pending.map((mission) => (
              <PendingMission
                key={mission.id}
                mission={mission}
                onDid={() => onDid(mission)}
              />
            ))}
          </div>
        </>
      )}

      {completedIds.length > 0 && (
        <div className="mt-8">
          <Sticker tone="white">Completed</Sticker>
          <ul className="mt-3 space-y-2">
            {completedIds
              .map((id) => getMission(id))
              .filter((m): m is Mission => Boolean(m))
              .map((m) => (
                <li
                  key={m.id}
                  className="nb-card flex items-center gap-3 bg-success/20 p-3"
                >
                  <span className="nb-border inline-flex h-7 w-7 items-center justify-center rounded-lg bg-success text-success-foreground">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="flex-1 font-black">{m.title}</span>
                  <span className="text-xs font-extrabold text-ink/60">
                    +{m.reward} XP
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* All missions with unlock status */}
      <div className="mt-8">
        <Sticker tone="blue">All Missions</Sticker>
        <div className="mt-3 space-y-3">
          {allMissions.map((mission) => {
            const isCompleted = Boolean(state.missions[mission.id]);
            const isUnlocked = unlocked.includes(mission);
            const lessonsCompleted = unitCompletedCount(mission.unitId);
            const unlockLevel = `Level ${mission.unlockAfterLessons}`;

            return (
              <NBCard
                key={mission.id}
                className={cn(
                  "transition-all",
                  isCompleted && "bg-success/10",
                  !isUnlocked && "opacity-60"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "mt-1 h-5 w-5 shrink-0",
                    isCompleted ? "text-success" : isUnlocked ? "text-primary" : "text-ink/40"
                  )}>
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : !isUnlocked ? (
                      <Lock className="h-5 w-5" />
                    ) : (
                      <Target className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "font-black",
                      !isUnlocked && "text-ink/50"
                    )}>
                      {mission.title}
                    </p>
                    <p className={cn(
                      "text-xs mt-1",
                      isUnlocked ? "text-ink/70" : "text-ink/40"
                    )}>
                      {mission.objective}
                    </p>
                    <p className={cn(
                      "text-xs mt-1 font-semibold",
                      !isUnlocked && "text-ink/40"
                    )}>
                      Unlocks at: {unlockLevel}
                    </p>
                  </div>
                  <div className="text-right">
                    <Sticker tone={isCompleted ? "green" : "yellow"}>
                      +{mission.reward} XP
                    </Sticker>
                  </div>
                </div>
              </NBCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

function PendingMission({
  mission,
  onDid,
}: {
  mission: Mission;
  onDid: () => void;
}) {
  const concept = getConcept(mission.conceptId);
  return (
    <NBCard>
      <div className="flex items-start gap-2">
        <Target className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div>
          <p className="font-black">{mission.title}</p>
          <p className="text-sm font-semibold text-ink/70">
            {mission.objective}
          </p>
        </div>
      </div>

      {concept && (
        <div className="nb-border mt-3 rounded-xl bg-secondary p-3 text-center">
          <Kannada className="block text-2xl">{concept.kannada}</Kannada>
          <p className="mt-1 font-extrabold">{concept.transliteration}</p>
          <div className="mt-2 flex justify-center">
            <SpeakButton text={concept.kannada} />
          </div>
        </div>
      )}

      {mission.safetyNote && (
        <p className="mt-2 text-xs font-semibold text-ink/55">
          {mission.safetyNote}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <Sticker tone="yellow">+{mission.reward} XP</Sticker>
        <NBButton size="sm" onClick={onDid}>
          I did it!
        </NBButton>
      </div>
    </NBCard>
  );
}
