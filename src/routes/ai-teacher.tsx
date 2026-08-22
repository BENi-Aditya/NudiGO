import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AITeacherTranslator } from "@/components/ai-teacher-translator";
import { AITeacherTutor } from "@/components/ai-teacher-tutor";

export const Route = createFileRoute("/ai-teacher")({
  component: AITeacherPage,
});

function AITeacherPage() {
  const [activeTab, setActiveTab] = useState<"translator" | "tutor">("translator");

  return (
    <AppShell active="ai">
      <div className="mx-auto w-full max-w-4xl space-y-6">
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
        {activeTab === "translator" && <AITeacherTranslator />}
        {activeTab === "tutor" && <AITeacherTutor />}
      </div>
    </AppShell>
  );
}
