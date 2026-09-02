export interface DrugInteraction {
  drug: string;
  advice: string;
}

export const drugInteractions: DrugInteraction[] = [
  {
    drug: "Metformin 500mg",
    advice:
      "Avoid excessive alcohol. Take with food to reduce stomach upset. Inform your doctor before any contrast scan.",
  },
  {
    drug: "Amlodipine 5mg",
    advice:
      "Avoid grapefruit juice. Report swollen ankles, dizziness, or irregular heartbeat to your doctor.",
  },
  {
    drug: "Paracetamol 500mg",
    advice:
      "Do not exceed the prescribed dose. Avoid additional paracetamol-containing medicines.",
  },
  {
    drug: "Cetirizine 10mg",
    advice: "May cause drowsiness. Avoid driving or operating machinery until you know how it affects you.",
  },
];
