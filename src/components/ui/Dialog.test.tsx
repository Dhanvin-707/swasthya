import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("renders when open and hides when closed", () => {
    const { rerender } = render(
      <Dialog open onClose={() => {}} title="Test dialog">
        <p>Body</p>
      </Dialog>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    rerender(
      <Dialog open={false} onClose={() => {}} title="Test dialog">
        <p>Body</p>
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} title="Test dialog">
        <p>Body</p>
      </Dialog>,
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("closes on backdrop click", async () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} title="Test dialog">
        <p>Body</p>
      </Dialog>,
    );
    await userEvent.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).toHaveBeenCalled();
  });
});
