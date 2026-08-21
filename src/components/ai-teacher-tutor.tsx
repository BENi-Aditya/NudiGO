import { useState, useEffect, useRef } from "react";
import { Send, Trash2 } from "lucide-react";
import { NBButton, Kannada } from "@/lib/nb";
import { speak } from "@/lib/speech";
import { tutorKannada, type ConversationTurn } from "@/lib/ai";

export function AITeacherTutor() {
  const [messages, setMessages] = useState<ConversationTurn[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ConversationTurn = {
      role: "user",
      content: inputText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      let assistantResponse = "";
      for await (const chunk of tutorKannada({
        message: inputText,
        conversationHistory: messages,
        currentLevel,
      })) {
        assistantResponse += chunk;
        // Update last message in real-time
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.role === "assistant") {
            updated[updated.length - 1].content = assistantResponse;
          } else {
            updated.push({
              role: "assistant",
              content: assistantResponse,
            });
          }
          return updated;
        });
      }

      // Final update to ensure we have the complete response
      setMessages((prev) => {
        const updated = [...prev];
        if (updated[updated.length - 1]?.role === "assistant") {
          updated[updated.length - 1].content = assistantResponse;
        }
        return updated;
      });
    } catch (err) {
      console.error("[Tutor] Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
    setInputText("");
  };

  return (
    <div className="flex h-[600px] flex-col gap-4">
      {/* Level selector */}
      <div className="flex gap-2">
        {(["beginner", "intermediate", "advanced"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setCurrentLevel(level)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold uppercase transition ${
              currentLevel === level
                ? "nb-border nb-shadow bg-primary text-primary-foreground"
                : "nb-border bg-card text-ink hover:bg-card/80"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Messages area */}
      <div className="flex-1 space-y-3 overflow-y-auto rounded-lg border-2 border-ink/10 bg-paper p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-sm font-semibold text-ink/50">
              Ask me anything about Kannada! I'm here to help you learn.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs rounded-xl px-4 py-2 ${
                    msg.role === "user"
                      ? "nb-border nb-shadow bg-primary text-primary-foreground"
                      : "nb-border bg-card"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-sm font-semibold">
                    {msg.content}
                  </p>
                  {msg.role === "assistant" && (
                    <button
                      type="button"
                      onClick={() => speak(msg.content)}
                      className="mt-2 text-xs font-bold text-primary underline"
                    >
                      🔊 Hear it
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="nb-border space-y-1 rounded-xl bg-card px-4 py-2">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-ink" />
                    <div className="animation-delay-200 h-2 w-2 animate-bounce rounded-full bg-ink" />
                    <div className="animation-delay-400 h-2 w-2 animate-bounce rounded-full bg-ink" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask a question about Kannada..."
          className="nb-border flex-1 rounded-lg bg-card px-3 py-2 text-sm font-semibold outline-none"
          disabled={isLoading}
        />
        <NBButton
          onClick={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
          className="px-3"
        >
          <Send className="h-4 w-4" aria-hidden />
        </NBButton>
        <button
          type="button"
          onClick={handleClearHistory}
          className="nb-border nb-shadow-sm nb-press inline-flex h-10 w-10 items-center justify-center rounded-lg bg-card text-ink hover:bg-card/80"
          aria-label="Clear history"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
