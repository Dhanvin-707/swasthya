import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Providers } from "../../app/providers";
import { HealthVault } from "./HealthVault";

describe("HealthVault", () => {
  it("renders seeded documents", () => {
    render(
      <Providers>
        <HealthVault />
      </Providers>,
    );
    expect(screen.getByText(/Chest X-Ray/)).toBeInTheDocument();
    expect(screen.getByText(/Brain MRI/)).toBeInTheDocument();
  });
});
