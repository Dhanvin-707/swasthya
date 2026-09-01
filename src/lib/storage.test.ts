import { describe, expect, it } from "vitest";
import { storage, storageKeys } from "./storage";

describe("storage", () => {
  it("writes and reads language", () => {
    storage.writeLanguage("hi");
    expect(storage.readLanguage()).toBe("hi");
  });

  it("clears all demo data", () => {
    storage.writeLanguage("hi");
    storage.writeMessages([{ id: "m1", text: "hi", timestamp: "x", sender: "user" }]);
    storage.clearDemo();
    expect(storage.readLanguage()).toBeNull();
    expect(storage.readMessages()).toBeNull();
  });

  it("defines stable keys", () => {
    expect(Object.values(storageKeys).length).toBeGreaterThan(0);
  });
});
