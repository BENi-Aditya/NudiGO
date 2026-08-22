import { Link } from "@tanstack/react-router";
import { Home, MessageSquareText, Target, User, Brain } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { LogoMark, Wordmark } from "@/components/brand";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

type Tab = "learn" | "practice" | "missions" | "profile" | "ai";

const tabs: Array<{ key: Tab; to: string; label: string; Icon: typeof Home }> = [
  { key: "learn", to: "/learn", label: "Learn", Icon: Home },
  { key: "practice", to: "/practice", label: "Practice", Icon: MessageSquareText },
  { key: "missions", to: "/missions", label: "Missions", Icon: Target },
  { key: "ai", to: "/ai-teacher", label: "AI", Icon: Brain },
  { key: "profile", to: "/profile", label: "Profile", Icon: User },
];

/**
 * App shell. Mobile: content column + neo-brutalist bottom nav. Desktop (lg+):
 * a fixed left sidebar and a wider content area, so it reads like a real
 * desktop web app rather than a blown-up phone screen.
 */
export function AppShell({ children, active }: { children: ReactNode; active: Tab }) {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || '';
  const initial = userName.charAt(0).toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-paper">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r-[3px] border-ink bg-card p-5 lg:flex">
        <Link to="/learn" className="mb-9 flex items-center gap-2">
          <img src="/logo.jpg" alt="NudiGO" className="h-10 w-10 rounded-lg" />
          <Wordmark className="text-2xl" />
        </Link>
        <nav className="flex flex-col gap-2">
          {tabs.map(({ key, to, label, Icon }) => {
            const isActive = key === active;
            const isProfileTab = key === 'profile';
            return (
              <Link
                key={key}
                to={to}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "nb-press flex items-center gap-3 rounded-xl px-4 py-3 font-extrabold",
                  isActive
                    ? "nb-border nb-shadow-sm bg-primary text-primary-foreground"
                    : "text-ink/70 hover:bg-muted hover:text-ink",
                )}
              >
                {isProfileTab && avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={userName}
                    className="h-5 w-5 rounded-lg object-cover"
                  />
                ) : isProfileTab && userName ? (
                  <div className="nb-border inline-flex h-5 w-5 items-center justify-center rounded-lg bg-accent text-xs font-black">
                    {initial}
                  </div>
                ) : (
                  <Icon className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                )}
                {label}
              </Link>
            );
          })}
        </nav>
        <p className="mt-auto text-xs font-extrabold uppercase tracking-wide text-ink/40">
          Learn. Speak. Go.
        </p>
      </aside>

      {/* Content */}
      <div className="lg:pl-64">
        <main className="mx-auto w-full max-w-md px-4 pb-28 pt-5 lg:max-w-4xl lg:px-10 lg:pb-14 lg:pt-10">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 lg:hidden">
        <div className="mx-auto max-w-md px-3 pb-3">
          <div className="nb-border nb-shadow flex items-stretch justify-between gap-1 rounded-2xl bg-card p-1.5">
            {tabs.map(({ key, to, label, Icon }) => {
              const isActive = key === active;
              const isProfileTab = key === 'profile';
              return (
                <Link
                  key={key}
                  to={to}
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "nb-press flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-extrabold uppercase tracking-wide",
                    isActive
                      ? "nb-border bg-primary text-primary-foreground"
                      : "text-ink/70 hover:text-ink",
                  )}
                >
                  {isProfileTab && avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={userName}
                      className="h-5 w-5 rounded-lg object-cover"
                    />
                  ) : isProfileTab && userName ? (
                    <div className="nb-border inline-flex h-5 w-5 items-center justify-center rounded-lg bg-accent text-[8px] font-black">
                      {initial}
                    </div>
                  ) : (
                    <Icon className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                  )}
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
