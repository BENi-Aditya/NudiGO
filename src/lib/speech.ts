/** Browser speech helpers: Kannada text-to-speech + speech recognition. */

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith("kn")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("hi")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en-in")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ??
    undefined
  );
}

export function speak(text: string, opts: { slow?: boolean } = {}) {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang ?? "kn-IN";
  utterance.rate = opts.slow ? 0.6 : 0.9;
  window.speechSynthesis.speak(utterance);
}

type RecognitionCtor = new () => SpeechRecognitionLike;

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart?: (() => void) | null;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }>>; resultIndex: number }) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
}

function recognitionCtor(): RecognitionCtor | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function canListen() {
  return Boolean(recognitionCtor());
}

/** Records one utterance and resolves the best transcript (empty string on failure). */
export function listenOnce(): {
  promise: Promise<{ transcript: string; error?: string }>;
  stop: () => void;
} {
  const Ctor = recognitionCtor();
  if (!Ctor) {
    console.log("[STT] Speech recognition not supported");
    return {
      promise: Promise.resolve({ transcript: "", error: "Speech recognition not supported" }),
      stop: () => {},
    };
  }

  const recognition = new Ctor();
  recognition.lang = "kn-IN";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let settled = false;
  let timeoutId: NodeJS.Timeout | null = null;

  const promise = new Promise<{ transcript: string; error?: string }>((resolve) => {
    recognition.onstart = () => {
      console.log("[STT] Recording started, waiting for speech...");
    };

    recognition.onresult = (event) => {
      if (settled) {
        console.log("[STT] Already settled, ignoring result");
        return;
      }

      let best = "";
      let bestConfidence = 0;

      const lastResultIndex = event.results.length - 1;
      const result = event.results[lastResultIndex];

      if (result) {
        for (let i = 0; i < result.length; i++) {
          const alt = result[i];
          if (alt && alt.confidence > bestConfidence) {
            best = alt.transcript;
            bestConfidence = alt.confidence;
          }
        }
      }

      console.log("[STT] Got result:", best, "confidence:", bestConfidence);

      settled = true;
      if (timeoutId) clearTimeout(timeoutId);
      resolve({ transcript: best.trim() });
    };

    recognition.onerror = (event) => {
      if (settled) {
        console.log("[STT] Already settled, ignoring error");
        return;
      }

      const error = event.error ?? "Unknown error";
      console.error("[STT] Error:", error);
      console.error("[STT] Error details:", event);
      console.error("[STT] Is HTTPS?", typeof window !== "undefined" && window.location.protocol === "https:");

      settled = true;
      if (timeoutId) clearTimeout(timeoutId);

      let userMessage = error;
      if (error === "network") {
        userMessage = "Network error - check your internet connection";
        // On localhost, this might be because HTTPS is not enforced. Provide helpful message.
        if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
          if (window.location.protocol !== "https:") {
            userMessage = "Speech recognition requires HTTPS. Try accessing via https://localhost or ngrok.";
          }
        }
      } else if (error === "no-speech") {
        userMessage = "No speech detected - try speaking louder";
      } else if (error === "audio-capture") {
        userMessage = "Microphone not available - check permissions";
      } else if (error === "service-not-allowed") {
        userMessage = "Speech recognition service not allowed";
      } else if (error === "bad-grammar") {
        userMessage = "Grammar issue - try again";
      }

      resolve({ transcript: "", error: userMessage });
    };

    recognition.onend = () => {
      if (!settled) {
        console.log("[STT] Recording ended without result");
        settled = true;
        if (timeoutId) clearTimeout(timeoutId);
        resolve({ transcript: "" });
      }
    };

    try {
      recognition.start();
      console.log("[STT] Started recognition");

      timeoutId = setTimeout(() => {
        if (!settled) {
          console.log("[STT] Timeout - stopping recognition");
          settled = true;
          recognition.stop();
          resolve({ transcript: "", error: "Timeout - no speech detected" });
        }
      }, 15000);
    } catch (err) {
      console.error("[STT] Failed to start:", err);
      settled = true;
      if (timeoutId) clearTimeout(timeoutId);
      resolve({ transcript: "", error: String(err) });
    }
  });

  return {
    promise,
    stop: () => {
      if (!settled) {
        console.log("[STT] Stopping recognition");
        settled = true;
        if (timeoutId) clearTimeout(timeoutId);
        try {
          recognition.abort();
        } catch {}
      }
    },
  };
}

/** Continuous listening with interim results (for live transcription UI). */
export function listenContinuous(): {
  results: { interim: string; final: string };
  stop: () => void;
  onchange?: (results: { interim: string; final: string }) => void;
} {
  const Ctor = recognitionCtor();
  if (!Ctor) {
    return {
      results: { interim: "", final: "" },
      stop: () => {},
    };
  }

  const recognition = new Ctor();
  recognition.lang = "kn-IN";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  const results = { interim: "", final: "" };
  let onchange: ((r: typeof results) => void) | undefined;

  recognition.onresult = (event) => {
    let interim = "";
    let final = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i]?.[0]?.transcript ?? "";
      if (event.results[i]?.isFinal) {
        final += transcript + " ";
      } else {
        interim += transcript;
      }
    }

    results.interim = interim;
    results.final = final.trim();
    onchange?.(results);
  };

  try {
    recognition.start();
  } catch {
    return { results, stop: () => {} };
  }

  return {
    results,
    stop: () => {
      try {
        recognition.stop();
      } catch {}
    },
    onchange,
  };
}
