import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Providers } from "../../app/providers";
import { QuickPrompts } from "./QuickPrompts";
import { DrugInteractionPanel } from "./DrugInteractionPanel";

describe("QuickPrompts and DrugInteractionPanel", () => {
  it("renders the four quick prompts", () => {
    render(
      <Providers>
        <QuickPrompts />
      </Providers>,
    );
    expect(screen.getByRole("button", { name: /CBC lab report/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /high fever/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Fasting Blood Sugar/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /seasonal dengue/ })).toBeInTheDocument();
  });

  it("clicking a prompt sends a chat message", async () => {
    render(
      <Providers>
        <QuickPrompts />
      </Providers>,
    );
    await userEvent.click(screen.getByRole("button", { name: /CBC lab report/ }));
  });

  it("renders drug interactions", () => {
    render(
      <Providers>
        <DrugInteractionPanel />
      </Providers>,
    );
    expect(screen.getByText(/Metformin 500mg/)).toBeInTheDocument();
  });
});
