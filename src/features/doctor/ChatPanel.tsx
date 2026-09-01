import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useSwasthya } from "../../context/SwasthyaContext";
import { chatPrompts } from "../../data/chatReplies";
import { Button } from "../../components/ui/Button";
import { Send } from "lucide-react";
import "./doctor.css";

export function ChatPanel() {
  const { t } = useTranslation();
  const { messages, addChatMessage, activePatient } = useSwasthya();
  const [draft, setDraft] = useState("");

  const greeting = activePatient
    ? t("doctor.greeting", { name: activePatient.name })
    : t("doctor.greeting", { name: "patient" });

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    addChatMessage(text);
    setDraft("");
  };

  return (
    <section className="chat-panel">
      <div className="chat-panel__messages" role="log" aria-live="polite">
        <div className="chat-panel__message chat-panel__message--ai">
          <p className="chat-panel__bubble">{greeting}</p>
          <span className="chat-panel__meta">{t("doctor.disclaimer")}</span>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-panel__message chat-panel__message--${message.sender}`}
          >
            <p className="chat-panel__bubble">
              {message.attachedDoc ? `Analyze attached document: ${message.attachedDoc}` : message.text}
            </p>
            {message.sender === "user" && message.attachedDoc ? (
              <p className="chat-panel__bubble chat-panel__bubble--attached">
                {message.text}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="chat-panel__composer">
        <label className="sr-only" htmlFor="chat-input">
          {t("doctor.placeholder")}
        </label>
        <input
          id="chat-input"
          className="chat-panel__input"
          placeholder={t("doctor.placeholder")}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send();
            }
          }}
        />
        <Button onClick={send} aria-label={t("doctor.send")}>
          <Send aria-hidden="true" size={16} />
        </Button>
      </div>
    </section>
  );
}
