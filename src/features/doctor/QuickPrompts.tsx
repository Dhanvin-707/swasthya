import { chatPrompts } from "../../data/chatReplies";
import { useTranslation } from "../../hooks/useTranslation";
import { useSwasthya } from "../../context/SwasthyaContext";
import "./doctor.css";

export function QuickPrompts() {
  const { t } = useTranslation();
  const { addChatMessage } = useSwasthya();

  return (
    <section className="quick-prompts" aria-label={t("doctor.prompts")}>
      <h3 className="quick-prompts__title">{t("doctor.prompts")}</h3>
      <div className="quick-prompts__list">
        {chatPrompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            className="quick-prompts__prompt"
            onClick={() => addChatMessage(prompt.label)}
          >
            {prompt.label}
          </button>
        ))}
      </div>
    </section>
  );
}
