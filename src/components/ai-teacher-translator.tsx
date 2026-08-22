import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { NBButton, Kannada } from "@/lib/nb";
import { speak } from "@/lib/speech";
import { listenOnce } from "@/lib/speech";
import { translateKannada } from "@/lib/ai";

export function AITeacherTranslator() {
  const [isListening, setIsListening] = useState(false);
  const [mascotSize, setMascotSize] = useState(100);
  const [sourceLanguage, setSourceLanguage] = useState<"english" | "kannada">("english");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [kannada, setKannada] = useState("");
  const [transliteration, setTransliteration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listener, setListener] = useState<ReturnType<typeof listenOnce> | null>(null);

  const handleStartListening = async () => {
    setIsListening(true);
    setMascotSize(100);

    const newListener = listenOnce();
    setListener(newListener);

    const handleAudioLevel = setInterval(() => {
      setMascotSize((prev) => {
        const newSize = Math.min(140, prev + Math.random() * 10);
        return newSize;
      });
    }, 100);

    try {
      const result = await newListener.promise;
      clearInterval(handleAudioLevel);

      if (result.transcript) {
        setInputText(result.transcript);
        await handleTranslate(result.transcript);
      } else if (result.error) {
        console.error("[Translator] Error:", result.error);
      }
    } catch (err) {
      console.error("[Translator] Error:", err);
      clearInterval(handleAudioLevel);
    } finally {
      setIsListening(false);
      setMascotSize(100);
      setListener(null);
    }
  };

  const handleStopListening = () => {
    if (listener) {
      listener.stop();
      setIsListening(false);
      setMascotSize(100);
      setListener(null);
    }
  };

  const handleTranslate = async (textToTranslate?: string) => {
    const textInput = textToTranslate || inputText;
    if (!textInput.trim()) return;

    setIsLoading(true);
    setOutputText("");
    setKannada("");
    setTransliteration("");

    try {
      let fullResponse = "";
      for await (const chunk of translateKannada({
        text: textInput,
        targetLanguage: sourceLanguage === "english" ? "kannada" : "english",
      })) {
        fullResponse += chunk;
        setOutputText(fullResponse);
      }

      if (sourceLanguage === "english") {
        const kannadaMatch = fullResponse.match(/KANNADA:\s*([^\n]+)/);
        const translitMatch = fullResponse.match(/TRANSLITERATION:\s*([^\n]+)/);
        if (kannadaMatch) setKannada(kannadaMatch[1].trim());
        if (translitMatch) setTransliteration(translitMatch[1].trim());
      } else {
        const englishMatch = fullResponse.match(/ENGLISH:\s*([^\n]+)/);
        if (englishMatch) setOutputText(englishMatch[1].trim());
      }
    } catch (err) {
      console.error("[Translator] Error:", err);
      setOutputText("Error: Failed to translate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mascot Section */}
      <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 p-8 nb-border">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-ink/60 mb-2">
            {sourceLanguage === "english" ? "Speak English" : "Speak Kannada"}
          </p>
          <img
            src="/logo.jpg"
            alt="NudiGO mascot"
            className="mx-auto rounded-2xl nb-border nb-shadow-lg transition-all duration-100"
            style={{
              width: `${mascotSize}px`,
              height: `${mascotSize}px`,
              objectFit: "cover",
            }}
          />
        </div>

        {/* Recording indicator */}
        {isListening && (
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
            <div className="animation-delay-200 h-2 w-2 animate-bounce rounded-full bg-primary" />
            <div className="animation-delay-400 h-2 w-2 animate-bounce rounded-full bg-primary" />
          </div>
        )}

        {/* Voice buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          {!isListening ? (
            <NBButton
              onClick={handleStartListening}
              disabled={isLoading}
              className="px-6"
            >
              🎤 Speak
            </NBButton>
          ) : (
            <NBButton
              onClick={handleStopListening}
              tone="primary"
              className="px-6"
            >
              ⏹ Stop
            </NBButton>
          )}

          <button
            type="button"
            onClick={() => {
              setSourceLanguage(sourceLanguage === "english" ? "kannada" : "english");
              setInputText("");
              setOutputText("");
              setKannada("");
              setTransliteration("");
            }}
            className="nb-border nb-shadow-sm nb-press px-4 py-2 rounded-lg bg-card font-bold text-sm"
          >
            ↔ Switch
          </button>
        </div>
      </div>

      {/* Results */}
      {(kannada || outputText) && (
        <div className="rounded-2xl bg-card p-6 nb-border space-y-4">
          {sourceLanguage === "english" && kannada && (
            <>
              <div>
                <p className="text-xs font-bold uppercase text-ink/60 mb-2">
                  Kannada Translation
                </p>
                <div className="flex items-center justify-between gap-2">
                  <Kannada className="text-4xl font-black">{kannada}</Kannada>
                  <button
                    type="button"
                    onClick={() => speak(kannada)}
                    className="nb-border nb-shadow-sm nb-press inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                    aria-label="Play Kannada audio"
                  >
                    <Volume2 className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </div>

              {transliteration && (
                <div>
                  <p className="text-xs font-bold uppercase text-ink/60 mb-1">
                    Transliteration
                  </p>
                  <p className="text-lg font-semibold">{transliteration}</p>
                </div>
              )}
            </>
          )}

          {sourceLanguage === "kannada" && outputText && (
            <div>
              <p className="text-xs font-bold uppercase text-ink/60 mb-2">
                English Translation
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-lg font-semibold flex-1">{outputText}</p>
                <button
                  type="button"
                  onClick={() => speak(outputText)}
                  className="nb-border nb-shadow-sm nb-press inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label="Play English audio"
                >
                  <Volume2 className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
            <div className="animation-delay-200 h-2 w-2 animate-bounce rounded-full bg-primary" />
            <div className="animation-delay-400 h-2 w-2 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      )}
    </div>
  );
}
