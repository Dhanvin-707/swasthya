import { useState } from "react";
import { Send } from "lucide-react";
import { useSwasthya } from "@/context/SwasthyaContext";
import { emergencyDisclaimer } from "@/data/chatReplies";
import { Button } from "@/components/ui/button";
import type { ChatMessage } from "@/types";

function Bubble({ message }: { message: ChatMessage }) {
  const mine = message.sender === "user";
  return (
    <div className={mine ? "self-end" : "self-start"}>
      <p
        className={
          mine
            ? "rounded-lg bg-primary px-3 py-2 text-sm text-white"
            : "rounded-lg bg-primary-soft px-3 py-2 text-sm text-fg"
        }
      >
        {message.text}
      </p>
    </div>
  );
}

export function ChatPanel({
  onSend,
  typing,
}: {
  onSend: (text: string) => void;
  typing: boolean;
}) {
  const { activePatient, chatMessages } = useSwasthya();
  const [draft, setDraft] = useState("");
  const messages = chatMessages[activePatient.id] ?? [];

  const greeting = `Namaste ${activePatient.name}! I am Swasthya AI Doctor. I can review your medical history, analyze lab reports, check drug interactions, and guide you to nearby specialists. How are you feeling today?`;

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    onSend(text);
  };

  return (
    <section aria-label="AI Doctor chat" className="flex flex-col rounded-xl border border-line bg-card">
      <div className="flex max-h-96 flex-col gap-3 overflow-y-auto p-4" role="log" aria-live="polite">
        <Bubble message={{ id: "greeting", text: greeting, timestamp: "", sender: "ai" }} />
        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
        {typing && (
          <p className="self-start rounded-lg bg-primary-soft px-3 py-2 text-sm text-primary">
            AI Doctor is typing…
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-line p-3">
        <label htmlFor="chat-input" className="sr-only">
          Describe your symptoms or ask a health question
        </label>
        <input
          id="chat-input"
          className="min-h-11 w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-fg"
          placeholder="Describe your symptoms or ask a health question..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
        />
        <Button onClick={submit} aria-label="Send message">
          <Send aria-hidden size={16} />
        </Button>
      </div>
      <p className="border-t border-line px-4 py-2 text-xs text-muted">{emergencyDisclaimer}</p>
    </section>
  );
}
