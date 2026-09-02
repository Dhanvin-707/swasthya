import { useCallback, useState } from "react";
import { useSwasthya } from "@/context/SwasthyaContext";
import { t } from "@/i18n/translations";
import { getAiReply } from "@/data/chatReplies";
import { makeId } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { EmergencySosTrigger } from "@/components/shell/EmergencySos";
import { ChatPanel } from "./ChatPanel";
import { QuickPrompts } from "./QuickPrompts";
import { DrugInteractionPanel } from "./DrugInteractionPanel";
import { HealthVault } from "./HealthVault";

export default function DoctorPage() {
  const { language, activePatient, addChatMessage, setActiveTab, markDocumentAttached } =
    useSwasthya();
  const [typing, setTyping] = useState(false);

  const send = useCallback(
    (text: string, attachedDoc?: string) => {
      addChatMessage(activePatient.id, {
        id: makeId("msg"),
        text,
        attachedDoc,
        timestamp: new Date().toISOString(),
        sender: "user",
      });
      setTyping(true);
      window.setTimeout(() => {
        addChatMessage(activePatient.id, {
          id: makeId("msg"),
          text: getAiReply(text),
          timestamp: new Date().toISOString(),
          sender: "ai",
        });
        setTyping(false);
      }, 500);
    },
    [activePatient.id, addChatMessage],
  );

  const analyzeDoc = useCallback(
    (docId: string, title: string) => {
      markDocumentAttached(activePatient.id, docId);
      send(`Analyze attached document: ${title}`, title);
    },
    [activePatient.id, markDocumentAttached, send],
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-fg">{t(language, "aiDoctor.title")}</h1>
          <p className="text-sm text-muted">
            Rule-based demo assistant. Describe symptoms, review reports, or check drug interactions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setActiveTab("doctors")}>
            Book Doctor Nearby
          </Button>
          <EmergencySosTrigger label="Call 108 Emergency" />
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <ChatPanel onSend={send} typing={typing} />
          <QuickPrompts onSend={send} />
        </div>
        <div className="flex flex-col gap-4">
          <HealthVault onAnalyze={analyzeDoc} />
          <DrugInteractionPanel />
        </div>
      </div>
    </div>
  );
}
