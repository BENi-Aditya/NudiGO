import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookOpen, Mic, MessagesSquare, Target, Check, LogIn } from "lucide-react";

import { LogoMark, Wordmark } from "@/components/brand";
import { useAuth } from "@/lib/auth";
import { NBCard, NBLinkButton, Sticker, Kannada } from "@/lib/nb";

export const Route = createFileRoute("/")({
  component: Landing,
});

const steps = [
  {
    Icon: BookOpen,
    title: "Learn phrases",
    body: "Start with real Bangalore situations - not grammar drills.",
  },
  {
    Icon: Mic,
    title: "Practice speaking",
    body: "Say it out loud and hear it back. Build confidence early.",
  },
  {
    Icon: MessagesSquare,
    title: "Chat with AI",
    body: "Roleplay an auto driver or cafe server before the real thing.",
  },
  {
    Icon: Target,
    title: "Use it for real",
    body: "Get a real-world mission after every lesson. Actually speak.",
  },
];

const features = [
  "Bangalore-focused - the Kannada you'll actually use",
  "Short 3–7 minute lessons that fit your commute",
  "Speaking practice with instant feedback",
  "AI conversations with a waiter, auto driver & more",
  "Real-world missions that take you off the screen",
  "Streaks, XP and levels to keep you going",
];

function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in, redirect to learn
  if (user) {
    navigate({ to: "/learn" });
    return null;
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <LogoMark />
          <Wordmark className="text-xl" />
        </div>
        <NBLinkButton to="/auth" tone="white" size="sm">
          <LogIn className="h-4 w-4" aria-hidden />
          Log in
        </NBLinkButton>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pb-12 pt-6 md:grid md:grid-cols-2 md:items-center md:gap-10 md:pt-12">
        <div>
          <Sticker tone="pink">Kannada · Bangalore</Sticker>
          <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">
            Learn Kannada.
            <br />
            One conversation
            <br />
            at a time.
          </h1>
          <p className="mt-5 max-w-md text-lg font-semibold text-ink/80">
            Practical Kannada for life in Karnataka. Short lessons, real
            conversations, and the phrases you need from your first coffee order
            to winning the auto conversation.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <NBLinkButton to="/auth" tone="primary" size="lg">
              Start learning - it's free
            </NBLinkButton>
          </div>
          <p className="mt-3 text-sm font-bold text-ink/60">
            No downloads • 5-minute first lesson
          </p>
        </div>

        {/* Visual */}
        <div className="mt-10 md:mt-0">
          <NBCard className="nb-shadow-lg relative overflow-hidden bg-secondary">
            <div className="nb-dots absolute inset-0 opacity-20" aria-hidden />
            <div className="relative space-y-4">
              <div className="text-center">
                <Kannada className="text-6xl">ಒಂದು ಕಾಫಿ ಕೊಡಿ</Kannada>
                <p className="mt-2 text-lg font-extrabold">Ondu kafi kodi</p>
                <p className="text-sm font-bold text-ink/70">
                  give me one coffee
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Sticker tone="white">namaskara</Sticker>
                <Sticker tone="pink">meter haki</Sticker>
                <Sticker tone="primary">eshtu?</Sticker>
                <Sticker tone="white">sari</Sticker>
              </div>
            </div>
          </NBCard>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-3xl md:text-4xl">How NudiGO works</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ Icon, title, body }, i) => (
              <NBCard key={title} tone={i % 2 === 0 ? "white" : "pink"}>
                <div className="nb-border nb-shadow-sm mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-paper">
                  <Icon className="h-6 w-6" strokeWidth={2.5} aria-hidden />
                </div>
                <h3 className="text-lg">
                  {i + 1}. {title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-ink/75">{body}</p>
              </NBCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-3xl md:text-4xl">Why learners love it</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f} className="nb-card flex items-start gap-3 p-4">
              <span className="nb-border mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-success text-success-foreground">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
              </span>
              <span className="font-bold">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center">
          <h2 className="text-3xl text-primary-foreground md:text-4xl">
            Ready to speak Kannada?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-lg font-semibold text-primary-foreground/90">
            Learn it. Speak it. Go. Your first phrase is five minutes away.
          </p>
          <div className="mt-7 flex justify-center">
            <NBLinkButton to="/auth" tone="white" size="lg">
              Start learning
            </NBLinkButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-5 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Wordmark className="text-lg" />
          <p className="text-sm font-bold text-ink/60">
            Made with care in Bengaluru · © 2026 NudiGO
          </p>
        </div>
      </footer>
    </div>
  );
}
