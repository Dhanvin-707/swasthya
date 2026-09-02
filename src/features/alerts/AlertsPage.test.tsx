import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SwasthyaProvider } from "@/context/SwasthyaContext";
import { EmergencySosDispatchedDialog } from "@/components/shell/EmergencySos";
import AlertsPage from "./AlertsPage";

function renderPage() {
  return render(
    <SwasthyaProvider>
      <AlertsPage />
      <EmergencySosDispatchedDialog />
    </SwasthyaProvider>,
  );
}

describe("AlertsPage", () => {
  beforeEach(() => localStorage.clear());

  it("renders the three alert cards", () => {
    renderPage();
    expect(screen.getByText("Polio immunization drive")).toBeInTheDocument();
    expect(screen.getByText("IV Iron Sucrose camp for pregnant mothers")).toBeInTheDocument();
    expect(screen.getByText("ABHA card linkage drive")).toBeInTheDocument();
  });

  it("requires confirmation before dispatching the SOS unit", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "Call 108 Ambulance Now" }));

    expect(await screen.findByText("Confirm 108 Emergency SOS")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm Dispatch" }));

    expect(await screen.findByText("Order Dispatched")).toBeInTheDocument();
    expect(screen.getByText(/#MP-04-1082/)).toBeInTheDocument();
  });

  it("marks an alert as read", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getAllByRole("button", { name: "Mark as Read" })[0]);

    expect(screen.getByRole("button", { name: "Read" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Mark as Read" })).toHaveLength(2);
  });
});
