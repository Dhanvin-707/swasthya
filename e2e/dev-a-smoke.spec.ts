import { expect, test } from "@playwright/test";

test("onboarding flow reaches the doctor page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Welcome to Swasthya Digital Health Stack")).toBeVisible();

  await page.getByRole("button", { name: /Kamla Devi/ }).click();
  await page.getByRole("button", { name: /Next: Choose Preferred Language/ }).click();

  await page.getByRole("button", { name: /Continue to Swasthya Portal/ }).click();

  await expect(
    page.getByRole("heading", { name: "Swasthya AI Doctor" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Medical Reports" })).toBeVisible();
  await expect(page.getByText("Attached Medical Documents:")).toBeVisible();
});

test("emergency helpline links are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /108 Ambulance/ })).toHaveAttribute(
    "href",
    "tel:108",
  );
  await expect(page.getByRole("link", { name: /112 National Emergency/ })).toHaveAttribute(
    "href",
    "tel:112",
  );
});
