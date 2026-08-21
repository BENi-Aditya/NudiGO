import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn, LogOut, RotateCcw, Upload } from "lucide-react";
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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

    setUploading(true);
    try {
      // Convert to data URL for local storage
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        localStorage.setItem('user_avatar_url', dataUrl);
        setAvatarUrl(dataUrl);
        toast.success("Profile picture updated");
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error("Failed to upload image");
      console.error(err);
    } finally {
      setUploading(false);
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
      <div className="mb-6 flex items-end gap-4">
        <div className="relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="nb-border nb-shadow h-16 w-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="nb-border nb-shadow inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-3xl font-black">
              {initial}
            </div>
          )}
          <label className="absolute bottom-0 right-0 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploading}
              className="hidden"
            />
            <div className="nb-border nb-shadow-sm nb-press inline-flex h-7 w-7 items-center justify-center rounded-lg bg-card">
              <Upload className="h-4 w-4" />
            </div>
          </label>
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
        {stats.map((stat) => (
          <NBCard key={stat.label} className="text-center">
            <p className="text-sm font-bold text-ink/60">{stat.label}</p>
            <p className="mt-1 text-lg font-black">{stat.value}</p>
          </NBCard>
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

      {/* Achievements */}
      <div className="mt-6">
        <h2 className="mb-3 text-lg font-black">Achievements</h2>
        <div className="grid grid-cols-2 gap-2">
          {allAchievements.map((achievement) => {
            const earned = state.progress.achievements.includes(achievement.id);
            return (
              <NBCard
                key={achievement.id}
                className={cn(
                  "text-center transition-opacity",
                  !earned && "opacity-50"
                )}
              >
                <div className="text-3xl">{achievement.icon}</div>
                <p className="mt-1 text-xs font-bold">{achievement.name}</p>
              </NBCard>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-2">
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
