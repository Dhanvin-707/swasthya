import type { UploadedDocument } from "@/types";

export const seededDocuments: UploadedDocument[] = [
  {
    id: "doc-xray-01",
    title: "Chest X-Ray — PA View",
    facility: "Sehore District Hospital Radiology Department",
    date: "2026-08-14",
    type: "RADIOLOGY_XRAY",
  },
  {
    id: "doc-mri-01",
    title: "Brain MRI — T1/T2/FLAIR",
    facility: "AIIMS Bhopal Advanced Neuro-Imaging Centre",
    date: "2026-06-20",
    type: "RADIOLOGY_MRI",
  },
  {
    id: "doc-tele-01",
    title: "Tele-consultation summary",
    facility: "Rampur Model PHC Unit",
    date: "2026-08-10",
    type: "TELE_CONSULTATION",
  },
];
