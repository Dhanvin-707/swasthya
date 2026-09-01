import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SwasthyaProvider, useSwasthya } from "@/context/SwasthyaContext";
import { BookingDialog, type BookingTarget } from "./BookingDialog";
import { useEffect } from "react";
import type { Appointment } from "@/types";
import { todayISO } from "@/lib/formatters";

const TARGET: BookingTarget = {
  providerId: "fac-sehore-district",
  providerName: "Sehore District Civil Hospital",
  service: "OPD Consultation",
  facilityName: "Sehore District Civil Hospital",
};

function Spy({ onAppointments }: { onAppointments: (a: Appointment[]) => void }) {
  const { appointments } = useSwasthya();
  useEffect(() => onAppointments(appointments), [appointments, onAppointments]);
  return null;
}

function renderDialog(onAppointments: (a: Appointment[]) => void) {
  return render(
    <SwasthyaProvider>
      <Spy onAppointments={onAppointments} />
      <BookingDialog target={TARGET} onClose={() => {}} />
    </SwasthyaProvider>,
  );
}

describe("BookingDialog", () => {
  beforeEach(() => localStorage.clear());

  it("prevents past dates via the date input min constraint", () => {
    renderDialog(() => {});
    const date = screen.getByLabelText("Date") as HTMLInputElement;
    expect(date.min).toBe(todayISO());
  });

  it("requires a time slot", async () => {
    const user = userEvent.setup();
    renderDialog(() => {});
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2099-01-01" } });
    await user.click(screen.getByRole("button", { name: /Confirm & Add to ABHA Profile/ }));
    expect(await screen.findByText("Choose a time slot.")).toBeInTheDocument();
  });

  it("confirms booking and stores a demo appointment via addAppointment", async () => {
    const user = userEvent.setup();
    let latest: Appointment[] = [];
    renderDialog((a) => {
      latest = a;
    });
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2099-01-15" } });
    await user.selectOptions(screen.getByLabelText("Time slot"), "09:00 – 11:00");
    await user.click(screen.getByRole("button", { name: /Confirm & Add to ABHA Profile/ }));

    expect(await screen.findByText(/Demo appointment added locally/)).toBeInTheDocument();
    expect(latest).toHaveLength(1);
    const appt = latest[0];
    expect(appt).toMatchObject({
      providerId: "fac-sehore-district",
      service: "OPD Consultation",
      status: "confirmed",
      isDemo: true,
    });
    expect(appt.reference).toMatch(/^SWAS-[A-Z2-9]{6}$/);
    // form replaced by confirmation: duplicate submit impossible
    expect(
      screen.queryByRole("button", { name: /Confirm & Add to ABHA Profile/ }),
    ).not.toBeInTheDocument();
  });
});
