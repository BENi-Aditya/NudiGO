/**
 * Supabase presence check. The generated client throws if the env vars are
 * missing, so every optional Supabase feature is gated behind this. When it
 * returns false the app runs fully local-first (progress in localStorage).
 */
export function isSupabaseConfigured(): boolean {
  try {
    return Boolean(
      import.meta.env["VITE_SUPABASE_URL"] &&
      import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"],
    );
  } catch {
    return false;
  }
}
