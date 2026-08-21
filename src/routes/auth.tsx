import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { LogoMark, Wordmark } from "@/components/brand";
import { useAuth } from "@/lib/auth";
import { NBButton, NBCard } from "@/lib/nb";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { configured, user, signIn, signUp, signOut } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Debug Supabase config
  useEffect(() => {
    console.log("[Auth] Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("[Auth] Supabase configured:", configured);
    if (!import.meta.env.VITE_SUPABASE_URL) {
      console.error(
        "[Auth] VITE_SUPABASE_URL not set in .env - OAuth won't work"
      );
    }
  }, [configured]);

  const handleGoogleAuth = async () => {
    try {
      setBusy(true);
      console.log("[Auth] Starting Google OAuth via Supabase...");

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      console.log("[Auth] Supabase URL from env:", supabaseUrl);

      if (!supabaseUrl) {
        throw new Error(
          "Supabase URL not configured. Add VITE_SUPABASE_URL to .env"
        );
      }

      const { supabase } = await import("@/integrations/supabase/client");
      console.log("[Auth] Supabase client loaded");

      const redirectUrl = `${window.location.origin}/auth/callback`;
      console.log("[Auth] OAuth redirect URL:", redirectUrl);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("[Auth] Google OAuth error:", error);
        toast.error(`Google OAuth failed: ${error.message}`);
        setBusy(false);
        return;
      }

      console.log("[Auth] Google OAuth initiated successfully");
      if (data) {
        console.log("[Auth] OAuth URL:", data);
      }
    } catch (err) {
      console.error("[Auth] Google OAuth exception:", err);
      const message =
        err instanceof Error ? err.message : "Failed to start Google authentication";
      toast.error(message);
      setBusy(false);
    }
  };

  const submit = async () => {
    setError(null);
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    setBusy(true);

    try {
      if (mode === "signup") {
        const { error: err } = await signUp(email, password, name || undefined);
        if (err) {
          setError(err);
          setBusy(false);
          return;
        }
        toast.success("Account created! Sign in to continue.");
        setMode("signin");
        setPassword("");
        setBusy(false);
        return;
      }

      const { error: err } = await signIn(email, password);
      if (err) {
        setError(err);
        setBusy(false);
        return;
      }

      toast.success("Welcome back!");
      navigate({ to: "/learn" });
    } catch (err) {
      setError("An error occurred");
      console.error("[Auth] Error:", err);
    } finally {
      setBusy(false);
    }
  };

  // Already signed in
  if (user) {
    return (
      <div className="mx-auto flex min-h-screen w-full flex-col bg-paper px-5 py-6 lg:max-w-2xl lg:px-8 lg:py-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate({ to: "/" })}
            className="nb-border nb-shadow-sm nb-press inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <div className="flex items-center gap-2">
            <LogoMark className="h-8 w-8" />
            <Wordmark className="text-lg" />
          </div>
          <span className="h-10 w-10" />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <NBCard className="space-y-3 text-center">
            <h1 className="text-2xl font-black">You're signed in</h1>
            <p className="font-semibold text-ink/70">{user.email ?? "Signed in"}</p>
            <NBButton full onClick={() => navigate({ to: "/learn" })}>
              Continue learning
            </NBButton>
            <button
              type="button"
              onClick={async () => {
                await signOut();
                toast("Signed out");
              }}
              className="text-sm font-bold text-ink/60 underline"
            >
              Log out
            </button>
          </NBCard>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-paper px-5 py-6 lg:max-w-2xl lg:px-8 lg:py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate({ to: "/" })}
          className="nb-border nb-shadow-sm nb-press inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          <LogoMark className="h-8 w-8" />
          <Wordmark className="text-lg" />
        </div>
        <span className="h-10 w-10" />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col justify-center py-8">
        <div className="space-y-6">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-black">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h1>
            <p className="mt-2 text-lg font-semibold text-ink/70">
              {mode === "signin"
                ? "Sign in to continue learning"
                : "Start learning Kannada"}
            </p>
          </div>

          {/* Google OAuth */}
          <NBButton
            full
            size="lg"
            onClick={handleGoogleAuth}
            disabled={busy}
            className="flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-50"
          >
            {/* Google Logo SVG */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M23.745 12.27c0-.79-.07-1.54-.187-2.27H12v4.51h6.47c-.29 1.48-.91 2.74-1.88 3.58v2.41h3.04c1.713-1.58 2.703-3.9 2.703-6.66z"
                fill="#4285F4"
              />
              <path
                d="M12 24c2.405 0 4.424-.795 5.896-2.622l-3.04-2.41c-.822.56-1.88.9-2.856.9-2.195 0-4.055-1.487-4.716-3.486H3.926v2.49C5.397 22.524 8.354 24 12 24z"
                fill="#34A853"
              />
              <path
                d="M7.284 14.382c-.18-.56-.28-1.156-.28-1.782s.1-1.222.28-1.782V7.328H3.926A11.986 11.986 0 002 12c0 1.947.474 3.79 1.307 5.41l3.358-2.59z"
                fill="#FBBC04"
              />
              <path
                d="M12 4.75c1.77 0 3.361.608 4.612 1.8l3.458-3.45C16.418.92 14.398 0 12 0 8.354 0 5.397 1.476 3.926 3.91l3.358 2.59c.66-1.99 2.52-3.75 4.716-3.75z"
                fill="#EA4335"
              />
            </svg>
            <span>{busy ? "Signing in..." : "Continue with Google"}</span>
          </NBButton>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-ink/10" />
            <span className="text-xs font-bold uppercase text-ink/50">Or</span>
            <div className="h-px flex-1 bg-ink/10" />
          </div>

          {/* Email Form */}
          <NBCard className="space-y-3">
            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-ink/60">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="nb-border h-12 w-full rounded-xl bg-card px-4 font-bold outline-none"
                />
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-ink/60">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" aria-hidden />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="nb-border h-12 w-full rounded-xl bg-card pl-10 pr-4 font-bold outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submit();
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-ink/60">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" aria-hidden />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="nb-border h-12 w-full rounded-xl bg-card pl-10 pr-10 font-bold outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submit();
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/60"
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg bg-destructive/15 px-3 py-2 text-sm font-bold text-destructive">
                {error}
              </p>
            )}

            {/* Submit */}
            <NBButton full size="lg" onClick={submit} disabled={busy}>
              {busy
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign in with Email"
                  : "Create Account"}
            </NBButton>
          </NBCard>

          {/* Toggle */}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setPassword("");
            }}
            className="w-full text-center text-sm font-bold text-ink/70 underline"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>

          <p className="text-center text-xs font-semibold text-ink/50">
            Progress saved securely to your account.
          </p>
        </div>
      </div>
    </div>
  );
}
