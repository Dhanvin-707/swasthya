import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SwasthyaProvider } from "@/context/SwasthyaContext";
import { todayISO } from "@/lib/formatters";
import { ServiceBookingDialog, type ServiceTarget } from "./ServiceBookingDialog";

const TARGET: ServiceTarget = {
  serviceId: "test-cbc",
  serviceName: "Complete Blood Count (CBC)",
  kind: "blood-test",
};

function renderDialog() {
  return render(
    <SwasthyaProvider>
      <ServiceBookingDialog target={TARGET} onClose={() => {}} />
    </SwasthyaProvider>,
  );
}

describe("ServiceBookingDialog", () => {
  beforeEach(() => localStorage.clear());

  it("requires collection address only for home sample collection", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.selectOptions(screen.getByLabelText("Service mode"), "home-sample");
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2099-02-01" } });
    await user.selectOptions(screen.getByLabelText("Time slot"), "11:00 – 13:00");
    await user.click(screen.getByRole("button", { name: /Confirm Appointment & Add to ABHA/ }));
    expect(
      await screen.findByText("Collection address is required for home sample collection."),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText("Collection address"), "House 12, Village Rampur, near CHC");
    await user.click(screen.getByRole("button", { name: /Confirm Appointment & Add to ABHA/ }));
    expect(await screen.findByText(/Demo appointment added locally/)).toBeInTheDocument();
  });

  it("hides the address field in visit-lab mode", () => {
    renderDialog();
    expect(screen.queryByLabelText("Collection address")).not.toBeInTheDocument();
  });

  it("shows a generated priority token", () => {
    renderDialog();
    const token = screen.getByLabelText("Priority token") as HTMLInputElement;
    expect(token.value).toMatch(/^P-\d{3}$/);
  });

  it("prevents past dates via the date input min constraint", () => {
    renderDialog();
    const date = screen.getByLabelText("Date") as HTMLInputElement;
    expect(date.min).toBe(todayISO());
  });
});
