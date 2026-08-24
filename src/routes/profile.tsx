import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/language-context";
import { NBButton } from "@/lib/nb";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, signOut } = useAuth();
  const { currentLanguage, switchLanguage } = useLanguage();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const customAvatar = localStorage.getItem("user_avatar_url");
      if (customAvatar) {
        setAvatarUrl(customAvatar);
      } else if (user?.user_metadata?.avatar_url) {
        setAvatarUrl(user.user_metadata.avatar_url);
      }
    }
  }, [user]);

  useEffect(() => {
    const name = user?.user_metadata?.name || user?.email?.split("@")[0] || "User";
    setUserName(name);
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        if (typeof window !== "undefined") {
          localStorage.setItem("user_avatar_url", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const initial = userName.charAt(0).toUpperCase() || "U";

  return (
    <AppShell active="profile">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        
        {/* LANGUAGE SWITCHER - BIG AND PROMINENT */}
        <div className="rounded-3xl bg-gradient-to-r from-primary to-accent p-2 nb-shadow-xl">
          <div className="rounded-2xl bg-card p-8 space-y-6">
            <h2 className="text-3xl font-black text-center">Choose Your Language</h2>
            <p className="text-center font-bold text-ink/70">Switch between Kannada and Kashmiri</p>

            <div className="grid grid-cols-2 gap-4">
              {/* Kannada Button */}
              <button
                onClick={() => switchLanguage("kannada")}
                className={`rounded-2xl p-8 nb-border transition transform hover:scale-110 ${
                  currentLanguage === "kannada"
                    ? "nb-shadow-lg bg-primary text-primary-foreground ring-4 ring-primary/50"
                    : "bg-white hover:bg-slate-50 text-ink"
                }`}
              >
                <div className="text-6xl mb-3">🚗</div>
                <h3 className="text-2xl font-black">Kannada</h3>
                <p className="text-sm font-bold mt-2">
                  {currentLanguage === "kannada" ? "✓ Active" : "Switch"}
                </p>
              </button>

              {/* Kashmiri Button */}
              <button
                onClick={() => switchLanguage("kashmiri")}
                className={`rounded-2xl p-8 nb-border transition transform hover:scale-110 ${
                  currentLanguage === "kashmiri"
                    ? "nb-shadow-lg bg-accent text-white ring-4 ring-accent/50"
                    : "bg-white hover:bg-slate-50 text-ink"
                }`}
              >
                <div className="text-6xl mb-3">🏔️</div>
                <h3 className="text-2xl font-black">Kashmiri</h3>
                <p className="text-sm font-bold mt-2">
                  {currentLanguage === "kashmiri" ? "✓ Active" : "Switch"}
                </p>
              </button>
            </div>

            <div className="text-center font-bold text-lg text-primary">
              Currently Learning: {currentLanguage === "kannada" ? "Kannada 🇮🇳" : "Kashmiri 🏔️"}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl bg-card p-8 nb-border text-center">
          <div className="mb-6 flex justify-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="h-32 w-32 rounded-full nb-border nb-shadow-lg object-cover"
              />
            ) : (
              <div className="nb-border inline-flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground text-5xl font-black nb-shadow-lg">
                {initial}
              </div>
            )}
          </div>
          <h1 className="text-4xl font-black">{userName}</h1>
          <p className="mt-2 font-semibold text-ink/60">{user?.email}</p>

          <div className="mt-8">
            <label className="nb-border nb-shadow-sm nb-press inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-bold cursor-pointer hover:bg-secondary/80 transition">
              📸 Change Avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={() => signOut()}
          className="w-full rounded-lg border-2 border-primary bg-white px-4 py-4 font-bold text-primary hover:bg-primary/5 transition nb-border"
        >
          Sign Out
        </button>
      </div>
    </AppShell>
  );
}
