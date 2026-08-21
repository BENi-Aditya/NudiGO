import { useState } from "react";
import { Volume2 } from "lucide-react";
import { NBButton, NBCard, Kannada } from "@/lib/nb";
import { speak } from "@/lib/speech";
import { translateKannada } from "@/lib/ai";

export function AITeacherTranslator() {
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState<"english" | "kannada">(
    "english"
  );
  const [outputText, setOutputText] = useState("");
  const [kannada, setKannada] = useState("");
  const [transliteration, setTransliteration] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setOutputText("");
    setKannada("");
    setTransliteration("");

    try {
      let fullResponse = "";
      for await (const chunk of translateKannada({
        text: inputText,
        targetLanguage: sourceLanguage === "english" ? "kannada" : "english",
      })) {
        fullResponse += chunk;
        setOutputText(fullResponse);
      }

      // Parse the response
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
    <div className="space-y-4">
      {/* Input Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold uppercase text-ink/60">
            {sourceLanguage === "english" ? "English" : "Kannada"}
          </label>
          <button
            type="button"
            onClick={() => {
              setSourceLanguage(sourceLanguage === "english" ? "kannada" : "english");
              setInputText("");
              setOutputText("");
              setKannada("");
              setTransliteration("");
            }}
            className="text-xs font-bold text-primary underline hover:text-primary/80"
          >
            ↔ Switch
          </button>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            sourceLanguage === "english"
              ? "Enter English text..."
              : "Enter Kannada text..."
          }
          className="nb-border h-24 w-full rounded-xl bg-card p-3 font-semibold outline-none"
          disabled={isLoading}
        />
      </div>

      {/* Translate Button */}
      <NBButton
        full
        onClick={handleTranslate}
        disabled={!inputText.trim() || isLoading}
      >
        {isLoading ? "Translating..." : "Translate"}
      </NBButton>

      {/* Output Section */}
      {outputText && (
        <NBCard className="space-y-3 bg-secondary">
          {sourceLanguage === "english" && kannada && (
            <>
              <div>
                <p className="text-xs font-extrabold uppercase text-ink/60">
                  Kannada
                </p>
                <div className="flex items-center justify-between gap-2">
                  <Kannada className="text-3xl">{kannada}</Kannada>
                  <button
                    type="button"
                    onClick={() => speak(kannada)}
                    className="nb-border nb-shadow-sm nb-press inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                    aria-label="Play audio"
                  >
                    <Volume2 className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </div>

              {transliteration && (
                <div>
                  <p className="text-xs font-extrabold uppercase text-ink/60">
                    Transliteration
                  </p>
                  <p className="text-lg font-semibold">{transliteration}</p>
                </div>
              )}
            </>
          )}

          {sourceLanguage === "kannada" && (
            <div>
              <p className="text-xs font-extrabold uppercase text-ink/60">
                English
              </p>
              <p className="text-lg font-semibold">{outputText}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(kannada || outputText);
            }}
            className="text-xs font-bold text-primary underline"
          >
            Copy
          </button>
        </NBCard>
      )}
    </div>
  );
}
