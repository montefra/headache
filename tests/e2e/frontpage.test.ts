import { test, expect } from "@playwright/test";

test.describe("Front page", () => {
  test("should load and display users from database", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();

    await expect(page.getByRole("link", { name: "Alice" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Bob" })).toBeVisible();
  });
});
