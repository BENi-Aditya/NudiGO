/**
 * Auth context. Wraps Supabase Auth when configured; otherwise it's a no-op
 * (user stays null and the app runs anonymously with local progress).
 *
 * SSR-safe: no browser/Supabase access at module load or during render -
 * everything happens in an effect on the client.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { isSupabaseConfigured } from "./supabase-config";

export type AuthResult = { error?: string };

type AuthContextValue = {
  /** True once we've resolved the initial session (or determined there's none). */
  ready: boolean;
  configured: boolean;
  user: User | null;
  signUp: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const NOT_CONFIGURED =
  "Cloud sync isn't set up yet. Add your Supabase keys to .env to enable accounts.";

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured();
  const [ready, setReady] = useState(!configured);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!configured) return;
    let active = true;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        const { data } = await supabase.auth.getSession();
        if (!active) return;
        setUser(data.session?.user ?? null);
        setReady(true);
        const sub = supabase.auth.onAuthStateChange(
          (_event, session: Session | null) => {
            setUser(session?.user ?? null);
          },
        );
        unsubscribe = () => sub.data.subscription.unsubscribe();
      } catch (error) {
        console.error("[auth] init failed", error);
        if (active) setReady(true);
      }
    })();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [configured]);

  const signUp = useCallback<AuthContextValue["signUp"]>(
    async (email, password, displayName) => {
      if (!configured) return { error: NOT_CONFIGURED };
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: displayName ? { data: { display_name: displayName } } : {},
        });
        return error ? { error: error.message } : {};
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Sign up failed",
        };
      }
    },
    [configured],
  );

  const signIn = useCallback<AuthContextValue["signIn"]>(
    async (email, password) => {
      if (!configured) return { error: NOT_CONFIGURED };
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return error ? { error: error.message } : {};
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Sign in failed",
        };
      }
    },
    [configured],
  );

  const signOut = useCallback(async () => {
    if (!configured) return;
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      await supabase.auth.signOut();
    } catch (error) {
      console.error("[auth] sign out failed", error);
    }
  }, [configured]);

  return (
    <AuthContext.Provider
      value={{ ready, configured, user, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
