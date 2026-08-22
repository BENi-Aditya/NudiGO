/** Browser speech helpers using Google Web Speech API */

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

export function canListen() {
  if (typeof window === "undefined") return false;
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  return !!SpeechRecognition;
}

export function listenOnce(): {
  promise: Promise<{ transcript: string; error?: string }>;
  stop: () => void;
  isRecording: () => boolean;
  toggleRecording: () => Promise<void>;
} {
  if (!canListen()) {
    console.log("[STT] Web Speech API not supported");
    return {
      promise: Promise.resolve({ transcript: "", error: "Speech recognition not supported" }),
      stop: () => {},
      isRecording: () => false,
      toggleRecording: async () => {},
    };
  }

  let settled = false;
  let resolvePromise: ((value: { transcript: string; error?: string }) => void) | null = null;
  let recognition: any = null;
  let isListening = false;

  const promise = new Promise<{ transcript: string; error?: string }>(async (resolve) => {
    resolvePromise = resolve;
  });

  const startRecording = async () => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      console.log("[STT] Starting Web Speech API...");
      recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "kn-IN";

      recognition.onstart = () => {
        isListening = true;
        console.log("[STT] Listening started");
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i][0].transcript;
          transcript += result;
        }

        console.log("[STT] Got transcript:", transcript);
        isListening = false;

        if (resolvePromise && !settled) {
          settled = true;
          resolvePromise({ transcript: transcript.trim() || "" });
        }
      };

      recognition.onerror = (event: any) => {
        console.error("[STT] Error:", event.error);
        isListening = false;

        if (resolvePromise && !settled) {
          settled = true;
          resolvePromise({ transcript: "", error: `Speech error: ${event.error}` });
        }
      };

      recognition.onend = () => {
        console.log("[STT] Listening ended");
        isListening = false;
      };

      recognition.start();
    } catch (err) {
      console.error("[STT] Init error:", err);
      isListening = false;
      if (resolvePromise && !settled) {
        settled = true;
        resolvePromise({ transcript: "", error: `Error: ${String(err)}` });
      }
    }
  };

  const stopRecording = async () => {
    if (recognition) {
      console.log("[STT] Stopping listening...");
      recognition.stop();
      isListening = false;
    }
  };

  startRecording();

  return {
    promise,
    stop: stopRecording,
    isRecording: () => isListening,
    toggleRecording: async () => {
      if (isListening) {
        await stopRecording();
      } else {
        await startRecording();
      }
    },
  };
}

export function listenContinuous(): {
  results: { interim: string; final: string };
  stop: () => void;
  onchange?: (results: { interim: string; final: string }) => void;
} {
  const results = { interim: "", final: "" };
  return {
    results,
    stop: () => {},
  };
}
