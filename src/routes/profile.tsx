import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn, LogOut, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { achievements as allAchievements } from "@/data/achievements";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/lib/progress";
import { NBButton, NBCard, Sticker } from "@/lib/nb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { hydrated, state, totals, levelName, setDisplayName, resetProgress } =
    useProgress();
  const { configured, user, signOut } = useAuth();

  const [nameDraft, setNameDraft] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (hydrated && !state.profile.onboardingDone) {
      void navigate({ to: "/onboarding" });
    }
  }, [hydrated, state.profile.onboardingDone, navigate]);

  const name = state.profile.displayName || "Learner";
  const initial = name.charAt(0).toUpperCase();

  const saveName = () => {
    setDisplayName(nameDraft.trim() || "Learner");
    setEditing(false);
    toast.success("Name updated");
  };

  const doReset = () => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Reset all progress? This can't be undone.")
    ) {
      resetProgress();
      toast("Progress reset");
      void navigate({ to: "/onboarding" });
    }
  };

  const stats = [
    { label: "Streak", value: `🔥 ${totals.streak}` },
    { label: "Total XP", value: `${totals.xp}` },
    {
      label: "Lessons",
      value: `${totals.lessonsCompleted}/${totals.totalLessons}`,
    },
    { label: "Conversations", value: `${totals.conversations}` },
    { label: "Missions", value: `${totals.missionsCompleted}` },
    { label: "Mastered", value: `${totals.mastered}` },
  ];

  return (
    <AppShell active="profile">
      {/* Identity */}
      <div className="mb-6 flex items-center gap-4">
        <div className="nb-border nb-shadow inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-3xl font-black">
          {initial}
        </div>
        <div>
          <h1 className="text-2xl leading-tight">{name}</h1>
          <Sticker tone="yellow" className="mt-1">
            {levelName}
          </Sticker>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="nb-card p-3 text-center">
            <p className="text-xl font-black leading-tight">{s.value}</p>
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-ink/60">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="mb-3 mt-7 text-xl">Achievements</h2>
      <div className="grid grid-cols-2 gap-2">
        {allAchievements.map((a) => {
          const earned = Boolean(state.achievements[a.id]);
          return (
            <div
              key={a.id}
              className={cn(
                "nb-card flex items-center gap-2 p-3",
                !earned && "opacity-45",
              )}
            >
              <span className="text-2xl" aria-hidden>
                {a.emoji}
              </span>
              <div>
                <p className="text-sm font-black leading-tight">{a.title}</p>
                <p className="text-[11px] font-semibold text-ink/60">
                  {a.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Settings */}
      <h2 className="mb-3 mt-7 text-xl">Settings</h2>
      <NBCard className="space-y-4">
        {/* Name */}
        <div>
          <p className="mb-1 text-xs font-extrabold uppercase text-ink/60">
            Display name
          </p>
          {editing ? (
            <div className="flex gap-2">
              <input
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                className="nb-border h-10 flex-1 rounded-xl bg-paper px-3 font-bold outline-none"
                placeholder="Your name"
              />
              <NBButton size="sm" onClick={saveName}>
                Save
              </NBButton>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="font-bold">{name}</span>
              <button
                type="button"
                onClick={() => {
                  setNameDraft(name);
                  setEditing(true);
                }}
                className="text-sm font-extrabold uppercase text-primary underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Account */}
        <div className="border-t-2 border-ink/10 pt-4">
          <p className="mb-1 text-xs font-extrabold uppercase text-ink/60">
            Account
          </p>
          {configured && user ? (
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold">
                {user.email ?? "Signed in"}
              </span>
              <NBButton
                size="sm"
                tone="white"
                onClick={async () => {
                  await signOut();
                  toast("Signed out");
                }}
              >
                <LogOut className="h-4 w-4" aria-hidden /> Log out
              </NBButton>
            </div>
          ) : configured ? (
            <Link to="/auth">
              <NBButton size="sm" tone="white" full>
                <LogIn className="h-4 w-4" aria-hidden /> Log in / Sign up to
                sync
              </NBButton>
            </Link>
          ) : (
            <p className="text-sm font-semibold text-ink/60">
              Cloud sync isn't set up. Your progress is saved on this device.
            </p>
          )}
        </div>

        {/* Danger */}
        <div className="border-t-2 border-ink/10 pt-4">
          <button
            type="button"
            onClick={doReset}
            className="inline-flex items-center gap-2 text-sm font-extrabold uppercase text-destructive underline"
          >
            <RotateCcw className="h-4 w-4" aria-hidden /> Reset progress
          </button>
        </div>
      </NBCard>
    </AppShell>
  );
}
