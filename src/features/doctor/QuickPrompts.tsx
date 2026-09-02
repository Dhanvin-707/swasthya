import { chatPrompts } from "@/data/chatReplies";

export function QuickPrompts({ onSend }: { onSend: (text: string) => void }) {
  return (
    <section aria-label="Quick test prompts" className="flex flex-col gap-2">
      <h2 className="text-base font-bold text-fg">Quick Test Prompts</h2>
      <div className="flex flex-wrap gap-2">
        {chatPrompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            onClick={() => onSend(prompt.label)}
            className="min-h-11 rounded-lg border border-line bg-card px-3 py-2 text-left text-sm text-fg hover:bg-primary-soft"
          >
            {prompt.label}
          </button>
        ))}
      </div>
    </section>
  );
}
