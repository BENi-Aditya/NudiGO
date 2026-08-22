/** Browser speech helpers using Deepgram free tier OR fallback capture */

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

  // Detect if text contains Kannada characters
  const kannadaRegex = /[ಀ-೿]/g;
  const hasKannada = kannadaRegex.test(text);

  const utterance = new SpeechSynthesisUtterance(text);

  if (hasKannada) {
    // Use Kannada voice for Kannada text
    utterance.lang = "kn-IN";
    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find((v) => v.lang?.toLowerCase().startsWith("kn"));
    if (kannadaVoice) utterance.voice = kannadaVoice;
  } else {
    // Use English voice for English text
    utterance.lang = "en-IN";
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang?.toLowerCase().startsWith("en-in")) ??
                    voices.find((v) => v.lang?.toLowerCase().startsWith("en"));
    if (enVoice) utterance.voice = enVoice;
  }

  utterance.rate = opts.slow ? 0.6 : 0.9;
  window.speechSynthesis.speak(utterance);
}

export function canListen() {
  return typeof window !== "undefined" && navigator?.mediaDevices?.getUserMedia;
}

let globalMediaRecorder: MediaRecorder | null = null;
let globalStream: MediaStream | null = null;
let globalAudioChunks: Blob[] = [];
let globalIsRecording = false;

export function listenOnce(): {
  promise: Promise<{ transcript: string; error?: string }>;
  stop: () => void;
  isRecording: () => boolean;
  toggleRecording: () => Promise<void>;
} {
  if (!canListen()) {
    console.log("[STT] Audio recording not supported");
    return {
      promise: Promise.resolve({ transcript: "", error: "Audio recording not supported" }),
      stop: () => {},
      isRecording: () => false,
      toggleRecording: async () => {},
    };
  }

  let settled = false;
  let resolvePromise: ((value: { transcript: string; error?: string }) => void) | null = null;

  const promise = new Promise<{ transcript: string; error?: string }>(async (resolve) => {
    resolvePromise = resolve;
  });

  const startRecording = async () => {
    try {
      console.log("[STT] Requesting microphone...");
      globalStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      console.log("[STT] Microphone granted, starting recording...");

      globalAudioChunks = [];

      let mimeType = "audio/webm;codecs=opus";
      try {
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = "audio/webm";
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = "audio/mp4";
            if (!MediaRecorder.isTypeSupported(mimeType)) {
              mimeType = "";
            }
          }
        }
      } catch (e) {
        mimeType = "";
      }

      const recorderOpts = mimeType ? { mimeType } : {};
      globalMediaRecorder = new MediaRecorder(globalStream, recorderOpts);

      globalMediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          globalAudioChunks.push(event.data);
        }
      };

      globalMediaRecorder.onerror = (event) => {
        console.error("[STT] Recording error:", event.error);
        if (resolvePromise && !settled) {
          settled = true;
          resolvePromise({ transcript: "", error: event.error });
        }
      };

      globalMediaRecorder.start(100);
      globalIsRecording = true;
      console.log("[STT] Recording started");
    } catch (err) {
      console.error("[STT] Init error:", err);
      if (resolvePromise && !settled) {
        settled = true;
        resolvePromise({ transcript: "", error: `Microphone error: ${String(err)}` });
      }
    }
  };

  const stopRecording = async () => {
    if (!globalMediaRecorder || !globalIsRecording) return;

    console.log("[STT] Stopping recording...");
    globalMediaRecorder.stop();
    globalIsRecording = false;

    await new Promise(resolve => {
      const onStopHandler = () => {
        globalMediaRecorder?.removeEventListener("stop", onStopHandler);
        resolve(null);
      };
      globalMediaRecorder?.addEventListener("stop", onStopHandler);

      setTimeout(() => {
        globalMediaRecorder?.removeEventListener("stop", onStopHandler);
        resolve(null);
      }, 500);
    });

    try {
      const audioBlob = new Blob(globalAudioChunks, { type: "audio/webm" });
      console.log("[STT] Audio blob size:", audioBlob.size);

      if (audioBlob.size < 500) {
        if (resolvePromise && !settled) {
          settled = true;
          resolvePromise({ transcript: "", error: "No audio recorded - speak louder or longer" });
        }
        return;
      }

      // Send to Google Cloud Speech-to-Text API
      try {
        const base64Audio = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1] || result);
          };
          reader.readAsDataURL(audioBlob);
        });

        console.log("[STT] Sending to Google Speech API...");

        const apiKey = import.meta.env.VITE_GOOGLE_SPEECH_API_KEY;
        if (!apiKey) {
          throw new Error("Google Speech API key not configured");
        }

        const response = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            config: {
              encoding: "WEBM_OPUS",
              languageCode: "kn-IN",
              model: "default",
            },
            audio: {
              content: base64Audio,
            },
          }),
        });

        if (response.ok) {
          const result = await response.json() as any;
          const transcript = result.results?.[0]?.alternatives?.[0]?.transcript || "";
          console.log("[STT] Google transcript:", transcript);

          if (resolvePromise && !settled) {
            settled = true;
            resolvePromise({ transcript: transcript.trim() || "" });
          }
          return;
        } else {
          const errorText = await response.text();
          console.error("[STT] Google API error:", response.status, errorText);
        }
      } catch (err) {
        console.error("[STT] Google API call failed:", err);
      }

      // Fallback: Tell user to type instead
      if (resolvePromise && !settled) {
        settled = true;
        resolvePromise({ transcript: "", error: "Speech service unavailable - please type instead or try again" });
      }
    } catch (err) {
      console.error("[STT] Processing error:", err);
      if (resolvePromise && !settled) {
        settled = true;
        resolvePromise({ transcript: "", error: String(err) });
      }
    } finally {
      globalStream?.getTracks().forEach((track) => track.stop());
      globalStream = null;
      globalMediaRecorder = null;
      globalAudioChunks = [];
    }
  };

  startRecording();

  return {
    promise,
    stop: stopRecording,
    isRecording: () => globalIsRecording,
    toggleRecording: async () => {
      if (globalIsRecording) {
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
