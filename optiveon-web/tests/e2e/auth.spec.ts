import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should display login page", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("should display register page", async ({ page }) => {
    await page.goto("/register");

    await expect(page.getByRole("heading", { name: /create an account/i })).toBeVisible();
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByLabel(/confirm password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
  });

  test("should display forgot password page", async ({ page }) => {
    await page.goto("/forgot-password");

    await expect(page.getByRole("heading", { name: /forgot your password/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /send reset link/i })).toBeVisible();
  });

  test("should show validation errors on login", async ({ page }) => {
    await page.goto("/login");

    // Submit empty form
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check for errors
    await expect(page.getByText(/please enter a valid email/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test("should show validation errors on register", async ({ page }) => {
    await page.goto("/register");

    // Submit empty form
    await page.getByRole("button", { name: /create account/i }).click();

    // Check for errors
    await expect(page.getByText(/name must be at least/i)).toBeVisible();
    await expect(page.getByText(/please enter a valid email/i)).toBeVisible();
  });

  test("should have link between login and register", async ({ page }) => {
    await page.goto("/login");

    // Click sign up link
    await page.getByRole("link", { name: /sign up/i }).click();
    await expect(page).toHaveURL("/register");

    // Click sign in link
    await page.getByRole("link", { name: /sign in/i }).click();
    await expect(page).toHaveURL("/login");
  });

  test("should have forgot password link on login page", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("link", { name: /forgot password/i }).click();
    await expect(page).toHaveURL("/forgot-password");
  });

  test("should show Google sign-in option", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("button", { name: /google/i })).toBeVisible();
  });
});

test.describe("Protected Routes", () => {
  test("should redirect unauthenticated users from dashboard", async ({ page }) => {
    await page.goto("/dashboard");

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test("should redirect unauthenticated users from account page", async ({ page }) => {
    await page.goto("/dashboard/account");

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test("should redirect unauthenticated users from billing page", async ({ page }) => {
    await page.goto("/dashboard/billing");

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test("should redirect unauthenticated users from API keys page", async ({ page }) => {
    await page.goto("/dashboard/api-keys");

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });
});
