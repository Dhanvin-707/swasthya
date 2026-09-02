import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SwasthyaProvider } from "@/context/SwasthyaContext";
import DiseaseMapPage from "./DiseaseMapPage";

vi.mock("react-leaflet", () => ({
  MapContainer: () => null,
  TileLayer: () => null,
  Circle: () => null,
  Popup: () => null,
}));

function renderPage() {
  return render(
    <SwasthyaProvider>
      <DiseaseMapPage />
    </SwasthyaProvider>,
  );
}

describe("DiseaseMapPage", () => {
  it("lists all four outbreak facilities in the telemetry desk", () => {
    renderPage();
    expect(screen.getByText("AIIMS Bhopal")).toBeInTheDocument();
    expect(screen.getByText("Sehore District Civil Hospital")).toBeInTheDocument();
    expect(screen.getByText("Rampur Community Health Centre (CHC)")).toBeInTheDocument();
    expect(screen.getByText("Devgarh Model Health & Wellness Centre")).toBeInTheDocument();
  });

  it("filters the telemetry desk by condition", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "Routine Malaria Surveillance" }));

    expect(screen.getByText("Devgarh Model Health & Wellness Centre")).toBeInTheDocument();
    expect(screen.queryByText("AIIMS Bhopal")).not.toBeInTheDocument();
  });

  it("offers a report-case action", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "Report Case in Hospital Locality" })).toBeInTheDocument();
  });
});
