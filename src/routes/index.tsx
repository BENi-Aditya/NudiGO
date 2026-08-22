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
      <section className="relative mx-auto max-w-7xl px-5 py-12 md:py-20">
        {/* Floating animated elements */}
        <div
          className="absolute right-10 top-20 hidden lg:block"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <Sticker tone="pink" className="text-lg rotate-12 animate-pulse">ಕನ್ನಡ</Sticker>
        </div>
        <div
          className="absolute left-[45%] top-10 hidden lg:block"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <Sticker tone="primary" className="text-lg -rotate-6">Bengaluru</Sticker>
        </div>

        <div className="relative">
          {/* Main headline - centered and bold */}
          <div className="text-center mb-16">
            <h1 className="text-7xl leading-[0.92] lg:text-8xl xl:text-9xl font-black relative inline-block">
              <span className="block text-primary">Talk</span>
              <span className="block text-ink -ml-8 lg:-ml-12">like a</span>
              <span className="block text-accent -ml-16 lg:-ml-24">Local</span>
            </h1>
            {/* Curved underline decoration */}
            <svg className="w-full max-w-2xl mx-auto h-12 -mt-6" viewBox="0 0 300 50" preserveAspectRatio="none">
              <path
                d="M 10 40 Q 150 10 290 40"
                stroke="#FF3B30"
                strokeWidth="4"
                fill="none"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Grid layout: mascot on left, phrases on right */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left: Auto driver mascot - smaller and cleaner */}
            <div className="lg:col-span-2">
              <NBCard className="nb-shadow-xl bg-secondary p-6 transform hover:rotate-2 transition-transform">
                <div className="nb-dots absolute inset-0 opacity-10" aria-hidden />
                <div className="relative">
                  <img
                    src="/logo.jpg"
                    alt="Auto driver mascot"
                    className="w-full h-auto rounded-xl nb-border-2 nb-shadow-lg"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-xl font-black">Your Kannada buddy</p>
                    <p className="text-sm font-bold text-ink/70 mt-1">Learn from a local</p>
                  </div>
                </div>
              </NBCard>
            </div>

            {/* Right: Stacked content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Subtext */}
              <div>
                <p className="text-2xl lg:text-3xl font-black text-ink">
                  From <span className="text-primary">"meter haki"</span> to ordering filter coffee.
                </p>
                <p className="text-xl lg:text-2xl font-bold text-ink/70 mt-2">
                  Real Kannada. Zero cringe.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <NBLinkButton to="/auth" tone="primary" size="lg" className="text-xl px-10 py-4">
                  Start free
                </NBLinkButton>
                <div className="flex items-center gap-2 font-bold text-base text-ink/60">
                  <span className="nb-border inline-flex h-10 w-10 items-center justify-center rounded-lg bg-card font-black">5</span>
                  <span>min first lesson<br/>No download needed</span>
                </div>
              </div>

              {/* Quick phrase preview */}
              <div className="grid grid-cols-3 gap-4">
                <NBCard tone="white" className="nb-shadow-md transform hover:-rotate-2 transition-transform">
                  <Kannada className="text-3xl">ನಮಸ್ಕಾರ</Kannada>
                  <p className="text-xs font-bold mt-2 text-ink/70">Hello</p>
                </NBCard>

                <NBCard tone="pink" className="nb-shadow-md transform hover:rotate-2 transition-transform">
                  <Kannada className="text-3xl">ಎಷ್ಟು?</Kannada>
                  <p className="text-xs font-bold mt-2 text-ink/70">How much?</p>
                </NBCard>

                <NBCard tone="white" className="nb-shadow-md transform hover:-rotate-2 transition-transform">
                  <Kannada className="text-3xl">ಸರಿ</Kannada>
                  <p className="text-xs font-bold mt-2 text-ink/70">Okay</p>
                </NBCard>
              </div>
            </div>
          </div>
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
