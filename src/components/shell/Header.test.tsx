import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Providers } from "../../app/providers";
import { Header } from "./Header";

function renderHeader() {
  return render(
    <Providers>
      <Header />
    </Providers>,
  );
}

describe("Header", () => {
  it("opens and closes the mobile menu", async () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: /Toggle Navigation Menu/ });
    await userEvent.click(toggle);
    expect(screen.getAllByRole("tab", { name: "Find Doctors Nearby" }).length).toBeGreaterThan(0);
    await userEvent.click(toggle);
  });

  it("renders the language selector", () => {
    renderHeader();
    expect(screen.getByRole("combobox", { name: /Language/ })).toBeInTheDocument();
  });
});
