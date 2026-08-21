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
        // Get URL params
        const params = new URLSearchParams(window.location.search);
        const error_description = params.get("error_description");

        if (error_description) {
          console.error("[Auth Callback] Error from provider:", error_description);
          setError(error_description);
          setTimeout(() => navigate({ to: "/auth" }), 3000);
          return;
        }

        console.log("[Auth Callback] Processing OAuth callback...");
        
        // Import Supabase
        const { supabase } = await import("@/integrations/supabase/client");
        
        // Wait a bit for Supabase to process the OAuth exchange
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get the current session
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("[Auth Callback] Session error:", sessionError);
          throw sessionError;
        }

        console.log("[Auth Callback] Session data:", data);

        if (data?.session?.user) {
          console.log("[Auth Callback] User authenticated:", data.session.user.email);
          
          // Extract user info from Google OAuth
          const user = data.session.user;
          const firstName = user.user_metadata?.name?.split(' ')[0] || user.email?.split('@')[0] || 'User';
          const googleAvatar = user.user_metadata?.avatar_url;
          
          console.log("[Auth Callback] User name:", firstName);
          console.log("[Auth Callback] Google avatar:", googleAvatar);
          
          // Store profile info in local state (will sync to Supabase in profile component)
          if (typeof window !== 'undefined') {
            localStorage.setItem('user_first_name', firstName);
            if (googleAvatar) {
              localStorage.setItem('user_avatar_url', googleAvatar);
            }
          }
          
          // Navigate to learn page
          navigate({ to: "/learn" });
        } else {
          console.error("[Auth Callback] No session found after OAuth");
          setError("Authentication failed. No session found.");
          setTimeout(() => navigate({ to: "/auth" }), 3000);
        }
      } catch (err) {
        console.error("[Auth Callback] Error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed. Please try again.");
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
