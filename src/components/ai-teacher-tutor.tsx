import { useState, useEffect, useRef } from "react";
import { Volume2 } from "lucide-react";
import { NBButton } from "@/lib/nb";
import { speak } from "@/lib/speech";
import { listenOnce } from "@/lib/speech";
import { tutorKannada, type ConversationTurn } from "@/lib/ai";

export function AITeacherTutor() {
  const [isListening, setIsListening] = useState(false);
  const [mascotSize, setMascotSize] = useState(120);
  const [messages, setMessages] = useState<ConversationTurn[]>([]);
  const [currentLevel, setCurrentLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [isLoading, setIsLoading] = useState(false);
  const [listener, setListener] = useState<ReturnType<typeof listenOnce> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartListening = async () => {
    setIsListening(true);
    setMascotSize(120);

    const newListener = listenOnce();
    setListener(newListener);

    const handleAudioLevel = setInterval(() => {
      setMascotSize((prev) => {
        const newSize = Math.min(160, prev + Math.random() * 12);
        return newSize;
      });
    }, 100);

    try {
      const result = await newListener.promise;
      clearInterval(handleAudioLevel);

      if (result.transcript) {
        await handleSendMessage(result.transcript);
      } else if (result.error) {
        console.error("[Tutor] Error:", result.error);
      }
    } catch (err) {
      console.error("[Tutor] Error:", err);
      clearInterval(handleAudioLevel);
    } finally {
      setIsListening(false);
      setMascotSize(120);
      setListener(null);
    }
  };

  const handleStopListening = () => {
    if (listener) {
      listener.stop();
      setIsListening(false);
      setMascotSize(120);
      setListener(null);
    }
  };

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMessage: ConversationTurn = {
      role: "user",
      content: userInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let assistantResponse = "";
      for await (const chunk of tutorKannada({
        message: userInput,
        conversationHistory: messages,
        currentLevel,
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

      // Auto-speak the assistant response
      await speak(assistantResponse);
    } catch (err) {
      console.error("[Tutor] Error:", err);
      const errorMessage: ConversationTurn = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  return (
    <div className="space-y-6">
      {/* Mascot Section */}
      <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 p-8 nb-border">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-ink/60 mb-4">
            Conversational Tutor
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

        {isLoading && (
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            <div className="animation-delay-200 h-2 w-2 animate-pulse rounded-full bg-accent" />
            <div className="animation-delay-400 h-2 w-2 animate-pulse rounded-full bg-accent" />
          </div>
        )}

        {/* Controls */}
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
            onClick={handleClearHistory}
            className="nb-border nb-shadow-sm nb-press px-4 py-2 rounded-lg bg-card font-bold text-sm"
          >
            🔄 Clear
          </button>
        </div>

        {/* Level selector */}
        <div className="flex gap-2 flex-wrap justify-center">
          {(["beginner", "intermediate", "advanced"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setCurrentLevel(level)}
              className={`px-3 py-1 text-xs font-bold uppercase rounded-lg transition ${
                currentLevel === level
                  ? "nb-border nb-shadow bg-primary text-primary-foreground"
                  : "nb-border bg-card text-ink hover:bg-card/80"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div className="rounded-2xl bg-paper p-6 nb-border min-h-64 max-h-96 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-sm font-semibold text-ink/50">
              Click the microphone to start speaking with your Kannada tutor!
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
                  className={`max-w-xs rounded-2xl px-4 py-3 nb-border ${
                    msg.role === "user"
                      ? "nb-shadow bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-sm font-semibold">
                    {msg.content}
                  </p>
                  {msg.role === "assistant" && (
                    <button
                      type="button"
                      onClick={() => speak(msg.content)}
                      className="mt-2 text-xs font-bold underline flex items-center gap-1"
                    >
                      <Volume2 className="h-3 w-3" aria-hidden />
                      Replay
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-2">
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
