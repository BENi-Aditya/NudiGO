/** Browser speech recognition with MediaRecorder fallback for STT */

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
  return typeof window !== "undefined" && navigator?.mediaDevices?.getUserMedia;
}

/** Records audio using MediaRecorder and sends to backend for STT */
export function listenOnce(): {
  promise: Promise<{ transcript: string; error?: string }>;
  stop: () => void;
} {
  if (!canListen()) {
    console.log("[STT] Audio recording not supported");
    return {
      promise: Promise.resolve({ transcript: "", error: "Audio recording not supported" }),
      stop: () => {},
    };
  }

  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];
  let settled = false;

  const promise = new Promise<{ transcript: string; error?: string }>(async (resolve) => {
    try {
      console.log("[STT] Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("[STT] Microphone access granted, starting recording...");

      mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        if (settled) return;
        console.log("[STT] Recording stopped, processing audio...");

        try {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          console.log("[STT] Audio blob created, size:", audioBlob.size);

          // Send to backend for STT processing
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");

          const response = await fetch("/api/speech-to-text", {
            method: "POST",
            body: formData,
          });

          console.log("[STT] Backend response status:", response.status);

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}`);
          }

          const data = await response.json();
          const transcript = data.transcript || "";
          console.log("[STT] Got transcript:", transcript);

          settled = true;
          resolve({ transcript: transcript.trim() });
        } catch (err) {
          console.error("[STT] Processing error:", err);
          settled = true;
          resolve({ transcript: "", error: String(err) });
        }
      };

      mediaRecorder.onerror = (event) => {
        if (settled) return;
        console.error("[STT] Recording error:", event.error);
        settled = true;
        resolve({ transcript: "", error: event.error });
      };

      mediaRecorder.start();
      console.log("[STT] Recording started");

      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
          console.log("[STT] Auto-stopping recording after 10 seconds");
          mediaRecorder.stop();
          stream.getTracks().forEach((track) => track.stop());
        }
      }, 10000);
    } catch (err) {
      console.error("[STT] Initialization error:", err);
      settled = true;
      const errorMsg = err instanceof DOMException ? err.name : String(err);
      resolve({ transcript: "", error: errorMsg });
    }
  });

  return {
    promise,
    stop: () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        console.log("[STT] Stopping recording");
        mediaRecorder.stop();
      }
      settled = true;
    },
  };
}
