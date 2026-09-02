import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useSwasthya } from "@/context/SwasthyaContext";
import { validateUpload } from "@/services/fileValidation";
import { makeId } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function FileUpload() {
  const { activePatient, addUploadedDocument } = useSwasthya();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFiles = (files: FileList | null) => {
    setError(null);
    if (!files || files.length === 0) return;
    const file = files[0];
    const result = validateUpload(file);
    if (!result.valid) {
      setError(
        result.error === "type"
          ? "Unsupported file type. Use PDF, JPG or PNG."
          : "File is too large (max 10 MB).",
      );
      return;
    }
    setProcessing(true);
    window.setTimeout(() => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      addUploadedDocument(activePatient.id, {
        id: makeId("doc"),
        title: file.name,
        facility: "Uploaded demo document",
        date: new Date().toISOString().slice(0, 10),
        type: ext === "pdf" ? "TELE_CONSULTATION" : "RADIOLOGY_XRAY",
      });
      setProcessing(false);
    }, 500);
  };

  return (
    <div
      className={cn(
        "mt-3 flex flex-col items-center gap-2 rounded-lg border border-dashed border-line p-4 text-center",
        dragging && "border-primary bg-primary-soft",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <Upload aria-hidden size={24} className="text-primary" />
      <p className="text-sm text-fg">Drag and drop your medical reports here</p>
      <p className="text-xs text-muted">Supports PDF, JPG, PNG files</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        aria-label="Upload medical report"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="min-h-11 rounded-lg border border-line px-3 text-sm font-semibold text-fg hover:bg-primary-soft"
      >
        Browse Files
      </button>
      {processing && (
        <p role="status" className="text-xs text-muted">
          Processing…
        </p>
      )}
      {error && (
        <p role="alert" className="text-xs font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
