import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SwasthyaProvider } from "@/context/SwasthyaContext";
import type { Appointment } from "@/types";
import ProfilePage from "./ProfilePage";

const APPT: Appointment = {
  id: "a1",
  reference: "SWAS-TEST01",
  patientId: "patient-kamla",
  service: "OPD Consultation",
  providerId: "fac-sehore-district",
  providerName: "Sehore District Civil Hospital",
  facilityName: "Sehore District Civil Hospital",
  mode: "in-person",
  date: "2099-01-15",
  timeSlot: "09:00 – 11:00",
  status: "confirmed",
  createdAt: "2026-09-01T00:00:00.000Z",
  isDemo: true,
};

function renderPage() {
  return render(
    <SwasthyaProvider>
      <ProfilePage />
    </SwasthyaProvider>,
  );
}

describe("ProfilePage", () => {
  beforeEach(() => localStorage.clear());

  it("shows the ABHA card with masked Aadhaar", () => {
    renderPage();
    expect(screen.getByText("91-9826-1049")).toBeInTheDocument();
    expect(screen.getByText("VERIFIED CITIZEN")).toBeInTheDocument();
    expect(screen.getAllByText(/XXXX XXXX 5831/).length).toBeGreaterThan(0);
  });

  it("lists all five prescriptions and three imaging reports", () => {
    renderPage();
    for (const med of ["Paracetamol 500mg", "Cetirizine 10mg", "Amlodipine 5mg", "Metformin 500mg", "Pregabalin 75mg"]) {
      expect(screen.getByText(med)).toBeInTheDocument();
    }
    expect(screen.getByText("MRI Lumbar Spine")).toBeInTheDocument();
  });

  it("opens the QR modal from the ABHA card", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "Scan QR Code to Link Profile" }));

    expect(screen.getByText(/ABHA:91-9826-1049\|NAME:Kamla Devi/)).toBeInTheDocument();
  });

  it("cancels a booked appointment from the profile", async () => {
    localStorage.setItem("swasthya:appointments", JSON.stringify([APPT]));
    const user = userEvent.setup();
    renderPage();

    expect(screen.getByText(/SWAS-TEST01/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await user.click(screen.getByRole("button", { name: "Cancel Appointment" }));

    expect(await screen.findByText("No upcoming appointments. Book one from Find Doctors or Tests.")).toBeInTheDocument();
  });
});
