import { useState, useEffect, useRef } from "react";
import { X, Send, Brain } from "lucide-react";
import { NBButton } from "@/lib/nb";
import { answerDoubt, type ConversationTurn } from "@/lib/ai";

interface AIDoubtAssistantProps {
  lessonId: number;
  lessonTitle: string;
  concepts: string[];
  masteredConcepts?: string[];
}


export function AIDoubtAssistant({
  lessonId,
  lessonTitle,
  concepts,
  masteredConcepts = [],
}: AIDoubtAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ConversationTurn[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prevLessonId, setPrevLessonId] = useState(lessonId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset messages when lesson changes
  useEffect(() => {
    if (lessonId !== prevLessonId) {
      setMessages([]);
      setInputText("");
      setPrevLessonId(lessonId);
    }
  }, [lessonId, prevLessonId]);

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
      for await (const chunk of answerDoubt({
        doubt: inputText,
        currentLessonTitle: lessonTitle,
        concepts,
        masteredConcepts,
      })) {
        assistantResponse += chunk;
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

      setMessages((prev) => {
        const updated = [...prev];
        if (updated[updated.length - 1]?.role === "assistant") {
          updated[updated.length - 1].content = assistantResponse;
        }
        return updated;
      });
    } catch (err) {
      console.error("[Doubt Assistant] Error:", err);
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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="nb-border nb-shadow-sm nb-press fixed bottom-20 right-4 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-110 lg:bottom-4"
        aria-label="Open AI doubt assistant"
        title="Ask a doubt"
      >
        <Brain className="h-6 w-6" aria-hidden />
      </button>
    );
  }

  return (
    <div className="nb-border nb-shadow fixed bottom-20 right-4 z-30 flex w-80 flex-col rounded-xl bg-card lg:bottom-4 lg:right-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-ink/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5" aria-hidden />
          <h3 className="font-bold">Ask a Doubt</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="nb-press rounded-lg p-1 text-ink/70 hover:text-ink"
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {/* Messages */}
      <div className="h-64 space-y-2 overflow-y-auto p-3">
        {messages.length === 0 ? (
          <p className="flex h-full items-center justify-center text-center text-xs font-semibold text-ink/50">
            Ask about {lessonTitle}
          </p>
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
                  className={`max-w-xs rounded-lg px-3 py-2 text-xs ${
                    msg.role === "user"
                      ? "nb-border bg-primary text-primary-foreground"
                      : "nb-border bg-secondary"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words font-semibold">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="nb-border rounded-lg bg-secondary px-3 py-2">
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

      {/* Input */}
      <div className="border-t-2 border-ink/10 p-3">
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
            placeholder="Ask..."
            className="nb-border flex-1 rounded-lg bg-paper px-2 py-1 text-xs font-semibold outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="nb-border nb-press rounded-lg bg-primary px-2 py-1 text-primary-foreground disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
