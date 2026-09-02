import type { ImagingReport, Prescription, TimelineRecord } from "@/types";

export const imagingReports: ImagingReport[] = [
  {
    id: "xray",
    type: "Digital X-Ray (PA View)",
    region: "Chest / Thoracic Cavity",
    finding: "Clear lung fields bilaterally. Costophrenic angles sharp. No bony lesion detected.",
    impression:
      "Chest X-Ray PA View: Lungs clear, no active infiltrates, consolidation or pleural effusion. Normal cardiac silhouette.",
    radiologist: "Dr. R. K. Saxena (Consultant Radiologist)",
    image: "/xray.jpg",
  },
  {
    id: "mri-brain",
    type: "MRI Brain (T1/T2/FLAIR)",
    region: "Brain & Cranial Cavity",
    finding: "No focal lesion or midline shift. Gray-white matter differentiation preserved.",
    impression:
      "Normal cerebral parenchyma and ventricular size. No acute ischemic infarct or intracranial hemorrhage.",
    radiologist: "Dr. Meena Deshmukh (Consultant Neuroradiologist)",
    image: "/mri-brain.jpg",
  },
  {
    id: "mri-spine",
    type: "MRI Lumbar Spine",
    region: "Spine (L1-S1)",
    finding: "Mild disc desiccation at L4-L5 level.",
    impression:
      "L4-L5 mild disc bulge without nerve root compression. Degenerative spondylotic changes.",
    radiologist: "Dr. Meena Deshmukh (Consultant Neuroradiologist)",
    image: "/mri-spine.jpg",
  },
];

export const prescriptions: Prescription[] = [
  { id: "p1", medication: "Paracetamol 500mg", dosage: "1 tablet 3 times a day", price: "₹5.50 (10 Tabs)" },
  { id: "p2", medication: "Cetirizine 10mg", dosage: "1 tablet at bedtime", price: "₹6.00 (10 Tabs)" },
  { id: "p3", medication: "Amlodipine 5mg", dosage: "1 tablet morning", price: "₹8.00 (10 Tabs)" },
  { id: "p4", medication: "Metformin 500mg", dosage: "1 tablet after breakfast & dinner", price: "—" },
  { id: "p5", medication: "Pregabalin 75mg", dosage: "1 capsule at bedtime", price: "—" },
];

export const diagnoses = [
  "Type-2 Diabetes Mellitus & Essential Hypertension",
  "Mild Lumbar Spondylosis",
  "Mild Seasonal Respiratory Infection & Fatigue",
];

export const timeline: TimelineRecord[] = [
  {
    id: "t1",
    date: "2026-08-14",
    doctor: "Dr. Rajesh Sharma",
    diagnosis: "Mild Seasonal Respiratory Infection & Fatigue",
    imagingReport: "Chest X-Ray PA View",
    prescription: "Paracetamol 500mg, Cetirizine 10mg",
  },
  {
    id: "t2",
    date: "2026-06-20",
    doctor: "Dr. Meena Deshmukh",
    diagnosis: "Mild Lumbar Spondylosis",
    imagingReport: "MRI Lumbar Spine",
    prescription: "Pregabalin 75mg",
  },
  {
    id: "t3",
    date: "2025-11-03",
    doctor: "Dr. V. K. Gupta",
    diagnosis: "Type-2 Diabetes Mellitus & Essential Hypertension",
    prescription: "Amlodipine 5mg, Metformin 500mg",
  },
];

export const vaccinations = [
  {
    id: "v1",
    vaccine: "Annual Seasonal Influenza Vaccination",
    date: "2025-10-12",
    doctor: "Dr. Ananya Verma",
    status: "Completed",
  },
  {
    id: "v2",
    vaccine: "COVID-19 Precautionary Booster",
    date: "2024-08-20",
    doctor: "Dr. Rajesh Sharma",
    status: "Completed",
  },
];
