import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn, LogOut, RotateCcw, Upload, Bell } from "lucide-react";
import { toast } from "sonner";

import { achievements as allAchievements } from "@/data/achievements";
import { goals, levels, situations } from "@/data/onboarding";
import { AppShell } from "@/components/app-shell";
import { ContributionChart } from "@/components/contribution-chart";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/lib/progress";
import { NBButton, NBCard, Sticker } from "@/lib/nb";
import { cn } from "@/lib/utils";
import { pushAvatarUrl } from "@/lib/sync";

export const Route = createFileRoute("/profile_original")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { hydrated, state, totals, levelName, setDisplayName, resetProgress } =
    useProgress();
  const { configured, user, signOut } = useAuth();

  const [nameDraft, setNameDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("notifications_enabled") !== "false"
      : true
  );
  const [dailyReminder, setDailyReminder] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("daily_reminder_time") || "09:00"
      : "09:00"
  );

  useEffect(() => {
    if (hydrated && !state.profile.onboardingDone) {
      void navigate({ to: "/onboarding" });
    }
  }, [hydrated, state.profile.onboardingDone, navigate]);

  // Load avatar from localStorage or Google
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const customAvatar = localStorage.getItem('user_avatar_url');
      if (customAvatar) {
        setAvatarUrl(customAvatar);
      } else if (user?.user_metadata?.avatar_url) {
        setAvatarUrl(user.user_metadata.avatar_url);
      }
    }
  }, [user]);

  const name = state.profile.displayName || user?.user_metadata?.name || "Learner";
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

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      localStorage.setItem("user_avatar_url", dataUrl);
      setAvatarUrl(dataUrl);

      // Save to Supabase if logged in
      if (user?.id) {
        void pushAvatarUrl(user.id, dataUrl);
      }

      toast.success("Profile picture updated");
    };
    reader.readAsDataURL(file);
  };

  const handleNotificationsToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem("notifications_enabled", String(newValue));
    toast.success(newValue ? "Notifications enabled" : "Notifications disabled");
  };

  const handleReminderTimeChange = (time: string) => {
    setDailyReminder(time);
    localStorage.setItem("daily_reminder_time", time);
    toast.success(`Daily reminder set to ${time}`);
  };

  const stats = [
    { label: "Streak", value: `${totals.streak}`, color: "bg-red-400" },
    { label: "Total XP", value: `${totals.xp}`, color: "bg-yellow-400" },
    {
      label: "Lessons",
      value: `${totals.lessonsCompleted}/${totals.totalLessons}`,
      color: "bg-blue-400",
    },
    { label: "Conversations", value: `${totals.conversations}`, color: "bg-purple-400" },
    { label: "Missions", value: `${totals.missionsCompleted}`, color: "bg-green-400" },
    { label: "Mastered", value: `${totals.mastered}`, color: "bg-indigo-400" },
  ];

  return (
    <AppShell active="profile">
      {/* Identity */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative mb-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="nb-border nb-shadow h-32 w-32 rounded-full object-cover ring-4 ring-primary/20"
            />
          ) : (
            <div className="nb-border nb-shadow inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-secondary text-6xl font-black text-white">
              {initial}
            </div>
          )}
          <label className="absolute bottom-2 right-2 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
            <div className="nb-border nb-shadow-sm nb-press inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <Upload className="h-5 w-5" />
            </div>
          </label>
        </div>
        <h1 className="text-3xl font-black text-center">{name}</h1>
        <Sticker tone="yellow" className="mt-2">
          {levelName}
        </Sticker>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "nb-border nb-shadow rounded-2xl p-4 text-center font-black text-white",
              stat.color
            )}
          >
            <p className="text-xs font-bold opacity-90">{stat.label}</p>
            <p className="mt-2 text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Name Edit */}
      {editing ? (
        <NBCard className="mt-6 space-y-3">
          <label className="text-xs font-bold uppercase text-ink/60">
            Your name
          </label>
          <input
            type="text"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="Enter your name"
            className="nb-border h-12 w-full rounded-xl bg-card px-4 font-bold outline-none"
            onKeyDown={(e) => e.key === "Enter" && saveName()}
          />
          <div className="flex gap-2">
            <NBButton
              full
              onClick={saveName}
              tone="primary"
            >
              Save
            </NBButton>
            <NBButton
              full
              onClick={() => setEditing(false)}
              tone="secondary"
            >
              Cancel
            </NBButton>
          </div>
        </NBCard>
      ) : (
        <NBCard className="mt-6">
          <button
            onClick={() => {
              setNameDraft(name);
              setEditing(true);
            }}
            className="text-left"
          >
            <p className="text-xs font-bold uppercase text-ink/60">
              Your name
            </p>
            <p className="mt-2 font-bold">{name}</p>
          </button>
        </NBCard>
      )}

      {/* Email */}
      {user?.email && (
        <NBCard className="mt-3">
          <p className="text-xs font-bold uppercase text-ink/60">Email</p>
          <p className="mt-2 font-bold">{user.email}</p>
        </NBCard>
      )}

      {/* Contribution Chart */}
      <div className="mt-8 rounded-2xl bg-ink/5 p-4">
        <ContributionChart state={state} />
      </div>

      {/* Achievements */}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-black text-primary">
          ✨ Achievements
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {allAchievements.map((achievement) => {
            const earned = Boolean(state.achievements[achievement.id]);
            const thresholdDisplay = achievement.threshold === 1 ? "🌟" : `${achievement.threshold}x`;
            const colors = [
              "bg-red-400",
              "bg-blue-400",
              "bg-purple-400",
              "bg-green-400",
              "bg-yellow-400",
              "bg-indigo-400",
              "bg-pink-400",
              "bg-orange-400",
            ];
            const colorIdx = allAchievements.indexOf(achievement) % colors.length;

            return (
              <div
                key={achievement.id}
                className={cn(
                  "nb-border nb-shadow rounded-2xl p-4 transition-all",
                  earned
                    ? `${colors[colorIdx]} text-white`
                    : "bg-ink/5 opacity-50 grayscale"
                )}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className={cn(
                  "text-sm font-black",
                  earned ? "text-white" : "text-ink/40"
                )}>
                  {achievement.name}
                </p>
                <p className={cn(
                  "mt-2 text-xs font-bold",
                  earned ? "text-white/90" : "text-ink/40"
                )}>
                  {thresholdDisplay}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-2">
        <NBButton
          full
          tone="secondary"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Bell className="h-4 w-4" />
          {showSettings ? "Hide settings" : "Preferences"}
        </NBButton>

        {showSettings && (
          <div className="mt-4 space-y-3">
            <NBCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Notifications</p>
                  <p className="text-xs text-ink/60">Get reminders and updates</p>
                </div>
                <button
                  onClick={handleNotificationsToggle}
                  className={cn(
                    "h-6 w-10 rounded-full transition-colors",
                    notificationsEnabled ? "bg-primary" : "bg-ink/20"
                  )}
                >
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full bg-white transition-transform",
                      notificationsEnabled ? "translate-x-4.5" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>
            </NBCard>

            {notificationsEnabled && (
              <NBCard>
                <label className="text-xs font-bold uppercase text-ink/60">
                  Daily reminder
                </label>
                <input
                  type="time"
                  value={dailyReminder}
                  onChange={(e) => handleReminderTimeChange(e.target.value)}
                  className="nb-border mt-2 h-10 w-full rounded-lg bg-card px-3 font-bold outline-none"
                />
              </NBCard>
            )}
          </div>
        )}

        <NBButton full tone="secondary" onClick={doReset}>
          <RotateCcw className="h-4 w-4" />
          Reset progress
        </NBButton>
        {configured && (
          <NBButton
            full
            tone="secondary"
            onClick={async () => {
              await signOut();
              navigate({ to: "/" });
              toast("Signed out");
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </NBButton>
        )}
        {!configured && (
          <Link to="/auth">
            <NBButton full tone="secondary" className="w-full">
              <LogIn className="h-4 w-4" />
              Sign in
            </NBButton>
          </Link>
        )}
      </div>
    </AppShell>
  );
}
