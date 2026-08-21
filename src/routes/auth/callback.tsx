import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from URL params
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const error_description = params.get("error_description");

        if (error_description) {
          setError(error_description);
          setTimeout(() => navigate({ to: "/auth" }), 3000);
          return;
        }

        if (!code) {
          setError("No authorization code received");
          setTimeout(() => navigate({ to: "/auth" }), 3000);
          return;
        }

        // Supabase handles the OAuth callback automatically
        // Just redirect to learn if we got here
        const { supabase } = await import("@/integrations/supabase/client");
        const { data } = await supabase.auth.getSession();

        if (data?.session?.user) {
          // User is authenticated
          navigate({ to: "/learn" });
        } else {
          // Not yet authenticated, redirect to auth
          navigate({ to: "/auth" });
        }
      } catch (err) {
        console.error("[Auth Callback] Error:", err);
        setError("Authentication failed. Please try again.");
        setTimeout(() => navigate({ to: "/auth" }), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-paper px-5">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-ink/20 border-t-primary" />
        <h1 className="text-2xl font-black">Signing you in...</h1>
        {error && (
          <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>
        )}
        <p className="mt-2 text-sm font-semibold text-ink/60">
          {error ? "Redirecting..." : "Please wait"}
        </p>
      </div>
    </div>
  );
}
