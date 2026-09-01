import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Providers } from "../app/providers";
import { useSwasthya } from "./SwasthyaContext";

function Probe() {
  const {
    activePatient,
    language,
    completeOnboarding,
    resetDemo,
    appointments,
    addAppointment,
  } = useSwasthya();
  return (
    <div>
      <span data-testid="patient">{activePatient?.name ?? "none"}</span>
      <span data-testid="language">{language}</span>
      <span data-testid="appointments">{appointments.length}</span>
      <button
        onClick={() =>
          completeOnboarding(
            {
              id: "citizen-kamla",
              name: "Kamla Devi",
              age: 26,
              gender: "female",
              aadhaarNo: "982610495831",
              mobile: "9826104958",
              abhaId: "91-9826-1049",
              dob: "1998-04-12",
              bloodGroup: "B+",
              emergencyContact: "Ramesh",
              address: "Chandanpur",
              primaryPhc: "Rampur PHC",
              attendingDoctor: "Dr. Rajesh Sharma",
              immunizationStatus: "Done",
            },
            "hi",
          )
        }
      >
        onboard
      </button>
      <button
        onClick={() =>
          addAppointment({
            id: "a1",
            reference: "REF-1",
            patientId: "citizen-kamla",
            service: "Blood test",
            providerId: "p1",
            providerName: "Dr. Rajesh Sharma",
            mode: "visit-lab",
            date: "2026-09-10",
            timeSlot: "10:00",
            status: "confirmed",
            createdAt: "2026-09-01",
            isDemo: true,
          })
        }
      >
        add
      </button>
      <button onClick={resetDemo}>reset</button>
    </div>
  );
}

describe("SwasthyaContext", () => {
  it("completes onboarding and resets demo state", async () => {
    render(
      <Providers>
        <Probe />
      </Providers>,
    );

    expect(screen.getByTestId("patient")).toHaveTextContent("none");

    await userEvent.click(screen.getByRole("button", { name: "onboard" }));
    expect(screen.getByTestId("patient")).toHaveTextContent("Kamla Devi");
    expect(screen.getByTestId("language")).toHaveTextContent("hi");

    await userEvent.click(screen.getByRole("button", { name: "add" }));
    expect(screen.getByTestId("appointments")).toHaveTextContent("1");

    await userEvent.click(screen.getByRole("button", { name: "reset" }));
    expect(screen.getByTestId("patient")).toHaveTextContent("none");
    expect(screen.getByTestId("language")).toHaveTextContent("en");
    expect(screen.getByTestId("appointments")).toHaveTextContent("0");
  });
});
