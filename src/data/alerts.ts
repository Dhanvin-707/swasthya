import type { Alert } from "../types";

export const alerts: Alert[] = [
  {
    id: "polio",
    title: "Polio immunization drive",
    status: "Active Today",
    description:
      "Pulse Polio immunization booth at Rampur Model PHC and Sehore District Hospital today.",
    lastUpdated: "2026-09-01T08:00:00",
    read: false,
  },
  {
    id: "iron",
    title: "IV Iron Sucrose camp for pregnant mothers",
    status: "Upcoming",
    description:
      "Camp scheduled at Sehore District Civil Hospital on 05 Sep 2026 for anaemia screening and IV iron sucrose administration.",
    lastUpdated: "2026-08-30T10:00:00",
    read: false,
  },
  {
    id: "abha",
    title: "ABHA card linkage drive",
    status: "Ongoing",
    description:
      "Link your Ayushman Bharat Health Account at any government facility this week for unified digital records.",
    lastUpdated: "2026-08-28T14:00:00",
    read: false,
  },
];
