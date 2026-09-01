import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Providers } from "../../app/providers";
import { ChatPanel } from "./ChatPanel";

function renderChat() {
  return render(
    <Providers>
      <ChatPanel />
    </Providers>,
  );
}

describe("ChatPanel", () => {
  it("renders a greeting", () => {
    renderChat();
    expect(screen.getByText(/Swasthya AI Doctor/i)).toBeInTheDocument();
  });

  it("adds a message on send", async () => {
    renderChat();
    await userEvent.type(screen.getByLabelText(/Describe your symptoms/i), "I have a fever");
    await userEvent.click(screen.getByRole("button", { name: /Send/ }));
    expect(screen.getByText("I have a fever")).toBeInTheDocument();
  });

  it("does not add an empty message", async () => {
    renderChat();
    await userEvent.click(screen.getByRole("button", { name: /Send/ }));
    expect(screen.queryByRole("log")).toBeInTheDocument();
  });
});
