import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SwasthyaProvider } from "@/context/SwasthyaContext";
import DoctorPage from "./DoctorPage";

function renderPage() {
  return render(
    <SwasthyaProvider>
      <DoctorPage />
    </SwasthyaProvider>,
  );
}

describe("DoctorPage", () => {
  beforeEach(() => localStorage.clear());

  it("greets the active patient by name", () => {
    renderPage();
    expect(screen.getByText(/Namaste Kamla Devi!/)).toBeInTheDocument();
  });

  it("replies to a typed symptom message", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(
      screen.getByLabelText("Describe your symptoms or ask a health question"),
      "I have high fever and joint pain",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText(/seasonal viral fever or dengue/)).toBeInTheDocument();
  });

  it("replies to a quick test prompt", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(
      screen.getByRole("button", { name: "Explain Fasting Blood Sugar result of 142 mg/dL" }),
    );

    expect(await screen.findByText(/Fasting Blood Sugar: 142 mg\/dL/)).toBeInTheDocument();
  });

  it("shows seeded documents in the Health Vault", () => {
    renderPage();
    expect(screen.getByText("Chest X-Ray — PA View")).toBeInTheDocument();
    expect(screen.getByText("Brain MRI — T1/T2/FLAIR")).toBeInTheDocument();
    expect(screen.getByText("Tele-consultation summary")).toBeInTheDocument();
  });
});
