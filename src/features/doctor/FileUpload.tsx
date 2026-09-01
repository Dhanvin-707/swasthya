import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { useSwasthya } from "../../context/SwasthyaContext";
import { validateUpload } from "../../services/fileValidation";
import { makeId } from "../../lib/formatters";
import type { MedicalDocumentType } from "../../types/report";
import "./doctor.css";

export function FileUpload() {
  const { t } = useTranslation();
  const { addDocument } = useSwasthya();
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
      setError(result.error === "type" ? t("errors.fileType") : t("errors.fileSize"));
      return;
    }

    setProcessing(true);
    window.setTimeout(() => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const type: MedicalDocumentType =
        ext === "png" || ext === "jpg" || ext === "jpeg"
          ? "RADIOLOGY_XRAY"
          : ext === "pdf"
            ? "TELE_CONSULTATION"
            : "RADIOLOGY_MRI";

      addDocument({
        id: makeId("doc"),
        title: file.name,
        facility: "Uploaded demo document",
        date: new Date().toISOString().slice(0, 10),
        type,
      });
      setProcessing(false);
    }, 500);
  };

  return (
    <div
      className={`file-upload ${dragging ? "file-upload--dragging" : ""}`}
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
      <Upload aria-hidden="true" size={28} />
      <p className="file-upload__text">{t("doctor.dropzone")}</p>
      <p className="file-upload__hint">{t("doctor.supports")}</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        className="file-upload__browse"
        onClick={() => inputRef.current?.click()}
      >
        {t("doctor.browse")}
      </button>
      {processing ? <p className="file-upload__state">{t("common.loading")}</p> : null}
      {error ? (
        <p className="file-upload__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
