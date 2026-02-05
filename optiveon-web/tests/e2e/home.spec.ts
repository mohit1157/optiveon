import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the hero section", async ({ page }) => {
    // Check hero title
    await expect(
      page.getByRole("heading", { name: /intelligent market research/i })
    ).toBeVisible();

    // Check hero subtitle
    await expect(
      page.getByText(/leverage cutting-edge algorithms/i)
    ).toBeVisible();

    // Check CTA buttons
    await expect(page.getByRole("link", { name: /explore solutions/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /our technology/i })).toBeVisible();

    // Check stats
    await expect(page.getByText("99.9%")).toBeVisible();
    await expect(page.getByText("<10ms")).toBeVisible();
    await expect(page.getByText("24/7")).toBeVisible();
  });

  test("should have a working navigation", async ({ page }) => {
    // Check navbar links
    await expect(page.getByRole("link", { name: /features/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /solutions/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /technology/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /pricing/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /contact/i })).toBeVisible();
  });

  test("should display the features section", async ({ page }) => {
    // Scroll to features
    await page.getByRole("heading", { name: /powerful tools/i }).scrollIntoViewIfNeeded();

    // Check features are visible
    await expect(page.getByText("Real-Time Analytics")).toBeVisible();
    await expect(page.getByText("AI-Powered Insights")).toBeVisible();
    await expect(page.getByText("Multi-Market Coverage")).toBeVisible();
    await expect(page.getByText("Secure Infrastructure")).toBeVisible();
    await expect(page.getByText("Custom Algorithms")).toBeVisible();
    await expect(page.getByText("Smart Alerts")).toBeVisible();
  });

  test("should display the pricing section", async ({ page }) => {
    // Scroll to pricing
    await page.getByRole("heading", { name: /simple, transparent/i }).scrollIntoViewIfNeeded();

    // Check pricing tiers
    await expect(page.getByText("$99")).toBeVisible();
    await expect(page.getByText("$299")).toBeVisible();
    await expect(page.getByText("Custom")).toBeVisible();
  });

  test("should have a footer with legal links", async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer links
    await expect(page.getByRole("link", { name: /privacy policy/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /terms of service/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /risk disclaimer/i })).toBeVisible();
  });
});

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("should display contact form", async ({ page }) => {
    // Check form fields
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByLabel(/company/i)).toBeVisible();
    await expect(page.getByLabel(/area of interest/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /send message/i })).toBeVisible();
  });

  test("should show validation errors for empty form", async ({ page }) => {
    // Click submit without filling form
    await page.getByRole("button", { name: /send message/i }).click();

    // Check for validation errors
    await expect(page.getByText(/name must be at least/i)).toBeVisible();
    await expect(page.getByText(/please enter a valid email/i)).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("should scroll to sections when clicking nav links", async ({ page }) => {
    await page.goto("/");

    // Click features link
    await page.getByRole("link", { name: /features/i }).first().click();

    // Check URL hash
    await expect(page).toHaveURL(/#features/);

    // Check features section is in view
    const featuresSection = page.locator("#features");
    await expect(featuresSection).toBeInViewport();
  });

  test("should navigate to legal pages", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer and click privacy link
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByRole("link", { name: /privacy policy/i }).click();

    // Check navigation
    await expect(page).toHaveURL("/privacy");
    await expect(
      page.getByRole("heading", { name: /privacy policy/i })
    ).toBeVisible();
  });
});

test.describe("Mobile Navigation", () => {
  test("should show mobile menu button on small screens", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check mobile menu button is visible
    await expect(page.getByRole("button", { name: /toggle menu/i })).toBeVisible();
  });

  test("should toggle mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Open mobile menu
    await page.getByRole("button", { name: /toggle menu/i }).click();

    // Check menu items are visible
    await expect(page.getByRole("link", { name: /features/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /solutions/i })).toBeVisible();
  });
});
