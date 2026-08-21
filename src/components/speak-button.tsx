import { Volume2, Gauge } from "lucide-react";

import { speak } from "@/lib/speech";
import { cn } from "@/lib/utils";

/**
 * Plays the Kannada audio for a phrase via the browser's speech synthesis.
 * Includes an optional slow-playback control (PRD §14.4 listening UX).
 */
export function SpeakButton({
  text,
  slow = false,
  label = "Play audio",
  className,
}: {
  text: string;
  slow?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={slow ? `${label} (slow)` : label}
      onClick={() => speak(text, { slow })}
      className={cn(
        "nb-border nb-shadow-sm nb-press inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-extrabold uppercase text-secondary-foreground",
        className,
      )}
    >
      {slow ? (
        <Gauge className="h-4 w-4" aria-hidden />
      ) : (
        <Volume2 className="h-5 w-5" aria-hidden />
      )}
      {slow ? "Slow" : "Listen"}
    </button>
  );
}
