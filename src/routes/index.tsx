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

      {/* Hero - Modern asymmetric with animated right section */}
      <section className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Text content */}
          <div className="space-y-6">
            <Sticker tone="pink" className="inline-block">Kannada · Bengaluru</Sticker>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              Stop pretending.
              <br />
              <span className="text-primary">Start speaking.</span>
            </h1>

            <p className="text-lg md:text-xl font-bold text-ink/70">
              Learn the Kannada that actually works—from your first auto ride to your favorite filter coffee haunt. No textbooks. No cringe. Just real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <NBLinkButton to="/auth" tone="primary" size="lg" className="text-lg px-10">
                Start free
              </NBLinkButton>
              <p className="text-sm font-bold text-ink/60 self-center">
                5-min first lesson · No download
              </p>
            </div>
          </div>

          {/* Right: Animated hero element with floating text */}
          <div className="relative h-96 md:h-full min-h-96">
            {/* Yellow tortoise pattern background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-3xl nb-border nb-shadow-xl overflow-hidden">
              {/* Animated pattern overlay */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 left-4 w-24 h-24 rounded-full border-4 border-primary animate-pulse" />
                <div className="absolute bottom-8 right-6 w-32 h-32 rounded-full border-4 border-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
                <div className="absolute top-1/3 right-8 w-16 h-16 rounded-full bg-primary/10" />
              </div>

              {/* Floating animated text elements */}
              <div className="absolute top-12 left-8 animate-bounce" style={{ animationDuration: "3s" }}>
                <p className="text-sm font-black text-primary">ಸುಲಿಗ</p>
                <p className="text-xs font-bold text-ink/60">Speaking</p>
              </div>

              <div className="absolute bottom-16 right-8 animate-bounce" style={{ animationDuration: "4s", animationDelay: "0.5s" }}>
                <p className="text-sm font-black text-accent">ಆತ್ಮವಿಶ್ವಾಸ</p>
                <p className="text-xs font-bold text-ink/60">Confidence</p>
              </div>

              <div className="absolute top-1/2 right-12 animate-pulse" style={{ animationDuration: "2s" }}>
                <p className="text-lg font-black text-primary/70">✓</p>
              </div>

              {/* Center mascot/icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="NudiGO mascot"
                  className="h-40 w-40 rounded-2xl nb-border nb-shadow-lg object-cover animate-pulse"
                  style={{ animationDuration: "3s" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Phrase showcase */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <NBCard tone="white" className="nb-shadow-lg text-center p-6">
            <Kannada className="text-4xl">ನಮಸ್ಕಾರ</Kannada>
            <p className="mt-3 text-lg font-black">Namaskara</p>
            <p className="text-sm font-bold text-ink/60">Hello</p>
          </NBCard>

          <NBCard tone="pink" className="nb-shadow-lg text-center p-6">
            <Kannada className="text-4xl">ಎಷ್ಟು?</Kannada>
            <p className="mt-3 text-lg font-black">Eshtu?</p>
            <p className="text-sm font-bold text-ink/60">How much?</p>
          </NBCard>

          <NBCard tone="white" className="nb-shadow-lg text-center p-6">
            <Kannada className="text-4xl">ಮೀಟರ್ ಹಾಕಿ</Kannada>
            <p className="mt-3 text-lg font-black">Meter haki</p>
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

      {/* Why section - Simple centered */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
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
