import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, BookOpen } from "lucide-react";
import { NBCard } from "@/lib/nb";
import { AITeacherTranslator } from "@/components/ai-teacher-translator";
import { AITeacherTutor } from "@/components/ai-teacher-tutor";

export const Route = createFileRoute("/ai-teacher")({
  component: AITeacherPage,
});

function AITeacherPage() {
  const [activeTab, setActiveTab] = useState<"translator" | "tutor">("translator");

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Brain className="h-6 w-6" aria-hidden />
        </div>
        <h1 className="text-4xl font-black">AI Teacher</h1>
        <p className="mt-2 text-lg font-semibold text-ink/70">
          Learn Kannada with personalized AI guidance
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("translator")}
          className={`flex-1 rounded-xl px-4 py-3 font-bold uppercase transition ${
            activeTab === "translator"
              ? "nb-border nb-shadow bg-primary text-primary-foreground"
              : "nb-border bg-card text-ink hover:bg-card/80"
          }`}
        >
          🔄 Translator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tutor")}
          className={`flex-1 rounded-xl px-4 py-3 font-bold uppercase transition ${
            activeTab === "tutor"
              ? "nb-border nb-shadow bg-primary text-primary-foreground"
              : "nb-border bg-card text-ink hover:bg-card/80"
          }`}
        >
          👨‍🏫 Tutor
        </button>
      </div>

      {/* Tab Content */}
      <NBCard className="space-y-4 p-6">
        {activeTab === "translator" && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" aria-hidden />
              <h2 className="text-xl font-black">Kannada ↔ English Translator</h2>
            </div>
            <p className="mb-4 text-sm font-semibold text-ink/70">
              Translate between English and Kannada. Get pronunciations and hear native pronunciation.
            </p>
            <AITeacherTranslator />
          </div>
        )}

        {activeTab === "tutor" && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5" aria-hidden />
              <h2 className="text-xl font-black">Conversational Tutor</h2>
            </div>
            <p className="mb-4 text-sm font-semibold text-ink/70">
              Ask questions and learn from an AI tutor who adapts to your level.
            </p>
            <AITeacherTutor />
          </div>
        )}
      </NBCard>

      {/* Tips */}
      <NBCard tone="white" className="p-4 text-sm">
        <p className="font-bold text-ink">💡 Tips:</p>
        <ul className="mt-2 space-y-1 text-xs font-semibold text-ink/70">
          <li>• Use the translator for quick word/phrase lookups</li>
          <li>• Ask the tutor for explanations and examples</li>
          <li>• Click "Hear it" to listen to pronunciations</li>
          <li>• Choose your learning level for personalized responses</li>
        </ul>
      </NBCard>
    </div>
  );
}
