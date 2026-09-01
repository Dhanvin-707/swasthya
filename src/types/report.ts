export type MedicalDocumentType =
  | "RADIOLOGY_XRAY"
  | "RADIOLOGY_MRI"
  | "TELE_CONSULTATION";

export interface MedicalDocument {
  id: string;
  title: string;
  facility: string;
  date: string;
  type: MedicalDocumentType;
  attached?: boolean;
}

export interface DrugInteraction {
  drug: string;
  advice: string;
}

export interface ChatPrompt {
  id: string;
  label: string;
  reply: string;
  detail?: string;
}
