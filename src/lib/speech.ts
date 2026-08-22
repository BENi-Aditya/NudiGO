/** Browser speech helpers: Record audio and send to backend for STT */

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
          resolvePromise({ transcript: "", error: "No audio recorded - speak louder" });
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64String = (reader.result as string).split(",")[1];
          console.log("[STT] Sending to backend...");

          const { transcribeAudio } = await import("./transcribe.server");
          const result = await transcribeAudio(base64String);

          console.log("[STT] Got result:", result);

          if (result.error) {
            throw new Error(result.error);
          }

          if (resolvePromise && !settled) {
            settled = true;
            resolvePromise({ transcript: result.transcript || "" });
          }
        } catch (err) {
          console.error("[STT] Error:", err);
          if (resolvePromise && !settled) {
            settled = true;
            resolvePromise({ transcript: "", error: String(err) });
          }
        }
      };

      reader.onerror = () => {
        if (resolvePromise && !settled) {
          settled = true;
          resolvePromise({ transcript: "", error: "Failed to read audio" });
        }
      };

      reader.readAsDataURL(audioBlob);
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
