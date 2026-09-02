import { FileText } from "lucide-react";
import { useSwasthya } from "@/context/SwasthyaContext";
import { seededDocuments } from "@/data/medicalReports";
import { FileUpload } from "./FileUpload";

export function HealthVault({
  onAnalyze,
}: {
  onAnalyze: (docId: string, title: string) => void;
}) {
  const { activePatient, uploadedDocs } = useSwasthya();
  const docs = [...seededDocuments, ...(uploadedDocs[activePatient.id] ?? [])];

  return (
    <section aria-label="Health Vault" className="rounded-xl border border-line bg-card p-4">
      <h2 className="text-base font-bold text-fg">Medical Reports</h2>
      <FileUpload />

      <h3 className="mt-4 text-sm font-bold text-fg">Attached Medical Documents</h3>
      <ul className="mt-2 flex flex-col gap-2">
        {docs.map((doc) => (
          <li key={doc.id} className="flex items-center gap-2 rounded-lg border border-line p-2">
            <FileText aria-hidden size={18} className="shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-fg">{doc.title}</p>
              <p className="truncate text-xs text-muted">
                {doc.facility} · {doc.date} · {doc.type}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onAnalyze(doc.id, doc.title)}
              className="min-h-11 shrink-0 rounded-lg border border-line px-2 text-xs font-semibold text-primary hover:bg-primary-soft"
            >
              Analyze
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">
        Analyzing a report attaches it to the AI Doctor chat for review (demo).
      </p>
    </section>
  );
}
