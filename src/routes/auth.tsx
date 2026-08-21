import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Chrome } from "lucide-react";
import { toast } from "sonner";

import { LogoMark, Wordmark } from "@/components/brand";
import { useAuth } from "@/lib/auth";
import { NBButton, NBCard } from "@/lib/nb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { configured, user, signIn, signUp, signOut } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup" | "mock">("signin");
  const [email, setEmail] = useState("aditya@gmail.com");
  const [password, setPassword] = useState("1234");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mockLogin = async () => {
    setBusy(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 800));

    if (email === "aditya@gmail.com" && password === "1234") {
      toast.success("Mock login successful! Welcome to NudiGO");
      localStorage.setItem(
        "nudigogo_mock_user",
        JSON.stringify({
          email,
          name: name || "Aditya",
          id: "mock_" + Date.now(),
        }),
      );
      setTimeout(() => {
        window.location.href = "/learn";
      }, 100);
    } else {
      setError('Mock mode: Use email "aditya@gmail.com" and password "1234"');
    }
    setBusy(false);
  };

  const handleGoogleAuth = () => {
    toast.info("Google OAuth placeholder. Add VITE_GOOGLE_CLIENT_ID to .env");
  };

  const submit = async () => {
    setError(null);
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    setBusy(true);

    if (mode === "signup") {
      const { error: err } = await signUp(
        email,
        password,
        name.trim() || undefined,
      );
      setBusy(false);
      if (err) {
        setError(err);
        return;
      }
      toast.success("Account created — you can log in now.");
      setMode("signin");
      return;
    }

    const { error: err } = await signIn(email, password);
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    toast.success("Welcome back!");
    void navigate({ to: "/learn" });
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
            <h1 className="text-2xl">You are signed in</h1>
            <p className="font-semibold text-ink/70">{user.email ?? "Signed in"}</p>
            <NBButton full onClick={() => navigate({ to: "/learn" })}>
              Continue learning
            </NBButton>
            <button
              type="button"
              onClick={async () => {
                await signOut();
                toast("Signed out");
                localStorage.removeItem("nudigogo_mock_user");
              }}
              className="text-sm font-extrabold uppercase text-ink/60 underline"
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

      <div className="flex flex-1 flex-col justify-center py-8">
        {!configured ? (
          <div className="space-y-6">
            <NBCard tone="yellow" className="space-y-3">
              <h1 className="text-2xl">Try Mock Login</h1>
              <p className="font-semibold text-ink/80">
                For development, use:
              </p>
              <div className="space-y-2 rounded-lg bg-white/50 p-3 font-mono text-sm">
                <p>
                  Email: <span className="font-bold">aditya@gmail.com</span>
                </p>
                <p>
                  Password: <span className="font-bold">1234</span>
                </p>
              </div>
              <p className="text-xs font-semibold text-ink/60">
                Real authentication will work when you add Supabase and Google OAuth keys to .env
              </p>
            </NBCard>

            <div className="space-y-3">
              <h2 className="text-lg font-bold">Quick Start</h2>

              <button
                type="button"
                onClick={handleGoogleAuth}
                className="nb-border nb-shadow-sm nb-press w-full flex items-center justify-center gap-2 rounded-xl bg-card px-4 py-3 font-extrabold uppercase hover:bg-card/80"
              >
                <Chrome className="h-5 w-5" aria-hidden />
                Sign in with Google
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode("mock");
                    setError(null);
                  }}
                  className={cn(
                    "flex-1 rounded-xl px-4 py-3 font-extrabold uppercase",
                    mode === "mock"
                      ? "nb-border nb-shadow bg-primary text-primary-foreground"
                      : "nb-border bg-card text-ink hover:bg-card/80",
                  )}
                >
                  Mock Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setError(null);
                  }}
                  className={cn(
                    "flex-1 rounded-xl px-4 py-3 font-extrabold uppercase",
                    mode === "signin"
                      ? "nb-border nb-shadow bg-primary text-primary-foreground"
                      : "nb-border bg-card text-ink hover:bg-card/80",
                  )}
                >
                  Email Login
                </button>
              </div>

              {mode === "mock" || mode === "signin" ? (
                <div className="space-y-3">
                  <Field
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    type="email"
                  />
                  <Field
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="••••••••"
                    type="password"
                    onEnter={mode === "mock" ? mockLogin : submit}
                  />

                  {error && (
                    <p className="rounded-lg bg-destructive/15 px-3 py-2 text-sm font-bold text-destructive">
                      {error}
                    </p>
                  )}

                  <NBButton
                    full
                    size="lg"
                    disabled={busy}
                    onClick={mode === "mock" ? mockLogin : submit}
                  >
                    {busy
                      ? "Please wait..."
                      : mode === "mock"
                        ? "Mock Login"
                        : "Sign in"}
                  </NBButton>
                </div>
              ) : null}
            </div>

            <p className="text-center text-xs font-semibold text-ink/50">
              Your progress is saved on this device automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-3xl">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="font-semibold text-ink/70">
              Sync your streak and progress everywhere.
            </p>

            <div className="space-y-3">
              {mode === "signup" && (
                <Field
                  label="Name (optional)"
                  value={name}
                  onChange={setName}
                  placeholder="Your name"
                />
              )}
              <Field
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                type="email"
              />
              <Field
                label="Password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                type="password"
                onEnter={submit}
              />
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/15 px-3 py-2 text-sm font-bold text-destructive">
                {error}
              </p>
            )}

            <NBButton
              full
              size="lg"
              disabled={busy}
              onClick={submit}
            >
              {busy ? "Please wait..." : mode === "signin" ? "Log in" : "Sign up"}
            </NBButton>

            <button
              type="button"
              onClick={() => {
                setMode((m) => (m === "signin" ? "signup" : "signin"));
                setError(null);
              }}
              className="w-full text-sm font-extrabold uppercase text-ink/70 underline"
            >
              {mode === "signin"
                ? "New here? Create an account"
                : "Have an account? Log in"}
            </button>

            <button
              type="button"
              onClick={() => navigate({ to: "/learn" })}
              className="w-full text-sm font-bold text-ink/50"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  onEnter,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  onEnter?: () => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-extrabold uppercase text-ink/60">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) onEnter();
        }}
        className={cn(
          "nb-border h-12 w-full rounded-xl bg-card px-4 font-bold outline-none",
        )}
      />
    </label>
  );
}
