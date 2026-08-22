import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/brand";
import { useAuth } from "@/lib/auth";
import { NBCard, NBLinkButton, Sticker, Kannada } from "@/lib/nb";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (user) {
    navigate({ to: "/learn" });
    return null;
  }

  return (
    <div className="min-h-screen bg-paper overflow-hidden">
      {/* Header */}
      <header className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="NudiGO" className="h-10 w-10 rounded-lg nb-border nb-shadow-sm" />
          <Wordmark className="text-2xl" />
        </div>
        <NBLinkButton to="/auth" tone="white" size="sm">
          <LogIn className="h-4 w-4" aria-hidden />
          Log in
        </NBLinkButton>
      </header>

      {/* Hero - Bold Asymmetric Layout */}
      <section className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
        {/* Floating animated elements */}
        <div
          className="absolute right-10 top-20 hidden md:block"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <Sticker tone="pink" className="text-lg rotate-12 animate-pulse">ಕನ್ನಡ</Sticker>
        </div>
        <div
          className="absolute left-10 top-40 hidden md:block"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <Sticker tone="primary" className="text-lg -rotate-6">Bengaluru</Sticker>
        </div>

        <div className="relative">
          {/* Main headline - curved text effect with CSS */}
          <div className="text-center md:text-left">
            <div className="inline-block">
              <h1 className="text-6xl leading-[0.95] md:text-8xl font-black relative">
                <span className="block text-primary">Talk</span>
                <span className="block text-ink -ml-4 md:-ml-8">like a</span>
                <span className="block text-accent -ml-8 md:-ml-16">Local</span>
              </h1>
              {/* Curved underline decoration */}
              <svg className="w-full h-12 -mt-4" viewBox="0 0 300 50" preserveAspectRatio="none">
                <path
                  d="M 10 40 Q 150 10 290 40"
                  stroke="#FF3B30"
                  strokeWidth="4"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>

          {/* Subtext - punchy and real */}
          <p className="mt-8 text-xl md:text-2xl font-bold text-ink/80 max-w-lg">
            From <span className="text-primary">"meter haki"</span> to ordering filter coffee.
            <br />
            Real Kannada. Zero cringe.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <NBLinkButton to="/auth" tone="primary" size="lg" className="text-lg px-8">
              Start free
            </NBLinkButton>
            <div className="flex items-center gap-2 font-bold text-sm text-ink/60">
              <span className="nb-border inline-flex h-8 w-8 items-center justify-center rounded-lg bg-card text-xs">5</span>
              <span>min first lesson</span>
            </div>
          </div>
        </div>

        {/* Animated phrase showcase - diagonal layout */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NBCard
            tone="white"
            className="nb-shadow-lg transform md:-rotate-2 hover:rotate-0 transition-transform cursor-default"
          >
            <Kannada className="text-4xl">ನಮಸ್ಕಾರ</Kannada>
            <p className="mt-2 text-lg font-black">Namaskara</p>
            <p className="text-sm font-bold text-ink/60">Hello</p>
          </NBCard>

          <NBCard
            tone="pink"
            className="nb-shadow-lg transform md:rotate-1 hover:rotate-0 transition-transform cursor-default md:mt-8"
          >
            <Kannada className="text-4xl">ಎಷ್ಟು?</Kannada>
            <p className="mt-2 text-lg font-black">Eshtu?</p>
            <p className="text-sm font-bold text-ink/60">How much?</p>
          </NBCard>

          <NBCard
            tone="white"
            className="nb-shadow-lg transform md:-rotate-1 hover:rotate-0 transition-transform cursor-default"
          >
            <Kannada className="text-4xl">ಮೀಟರ್ ಹಾಕಿ</Kannada>
            <p className="mt-2 text-lg font-black">Meter haki</p>
            <p className="text-sm font-bold text-ink/60">Use the meter</p>
          </NBCard>
        </div>
      </section>

      {/* How it works - Cards with icons */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Learn. Practice. <span className="text-primary">Go.</span>
          </h2>
          <p className="text-center text-lg font-bold text-ink/70 mb-12">3 steps. Zero bullshit.</p>

          <div className="grid md:grid-cols-3 gap-6">
            <NBCard tone="white" className="text-center p-8">
              <div className="nb-border nb-shadow-sm inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-3xl font-black mb-4">
                1
              </div>
              <h3 className="text-2xl font-black mb-2">5-min lessons</h3>
              <p className="font-semibold text-ink/75">Real phrases. No grammar torture.</p>
            </NBCard>

            <NBCard tone="pink" className="text-center p-8">
              <div className="nb-border nb-shadow-sm inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground text-3xl font-black mb-4">
                2
              </div>
              <h3 className="text-2xl font-black mb-2">Practice out loud</h3>
              <p className="font-semibold text-ink/75">AI listens. You get instant feedback.</p>
            </NBCard>

            <NBCard tone="white" className="text-center p-8">
              <div className="nb-border nb-shadow-sm inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-success text-success-foreground text-3xl font-black mb-4">
                3
              </div>
              <h3 className="text-2xl font-black mb-2">Use it IRL</h3>
              <p className="font-semibold text-ink/75">Real missions. Actual conversations.</p>
            </NBCard>
          </div>
        </div>
      </section>

      {/* Social proof / Why section - Asymmetric */}
      <section className="py-20 relative overflow-hidden">
        <div className="nb-dots absolute inset-0 opacity-10" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Why NudiGO hits different
              </h2>
              <div className="space-y-4">
                {[
                  "Built for Bengaluru (not textbook Kannada)",
                  "Speak from day 1 (no grammar rabbit holes)",
                  "AI tutor that actually helps",
                  "Missions that get you off the app",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="nb-border nb-shadow-sm inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm">
                      ✓
                    </span>
                    <span className="font-bold text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <NBCard className="nb-shadow-xl bg-secondary p-8 transform md:rotate-2">
                <div className="nb-dots absolute inset-0 opacity-20" aria-hidden />
                <div className="relative">
                  <img
                    src="/logo.jpg"
                    alt="Auto driver"
                    className="h-32 w-32 mx-auto rounded-2xl nb-border nb-shadow-lg"
                  />
                  <p className="mt-6 text-2xl font-black text-center">
                    "Finally, someone gets it."
                  </p>
                  <p className="mt-2 text-center font-bold text-ink/70">
                    - Every non-Kannadiga in Bengaluru
                  </p>
                </div>
              </NBCard>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Bold and simple */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-primary-foreground mb-6">
            Ready?
          </h2>
          <p className="text-xl md:text-2xl font-bold text-primary-foreground/90 mb-10">
            Your first "Kannada gothilla" is 5 minutes away. 😏
          </p>
          <NBLinkButton to="/auth" tone="white" size="lg" className="text-xl px-12">
            Let's go
          </NBLinkButton>
          <p className="mt-6 text-sm font-bold text-primary-foreground/70">
            No credit card. No download. Just start.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <Wordmark className="text-lg" />
          <p className="font-bold text-ink/60">
            Made with ❤️ in Bengaluru
          </p>
        </div>
      </footer>
    </div>
  );
}
