import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Providers } from "../../app/providers";
import { Onboarding } from "./Onboarding";

function renderOnboarding() {
  return render(
    <Providers>
      <Onboarding />
    </Providers>,
  );
}

describe("Onboarding", () => {
  it("shows validation errors for empty fields", async () => {
    renderOnboarding();
    await userEvent.click(screen.getByRole("button", { name: /Next/ }));
    expect(screen.getByText(/Please enter your Aadhaar and Mobile Number/i)).toBeInTheDocument();
  });

  it("prefills a demo citizen", async () => {
    renderOnboarding();
    await userEvent.click(screen.getByRole("button", { name: /Kamla Devi/ }));
    expect(screen.getByDisplayValue("982610495831")).toBeInTheDocument();
    expect(screen.getByDisplayValue("9826104958")).toBeInTheDocument();
  });
});
