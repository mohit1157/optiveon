# Optiveon Web Platform

The web application for the Optiveon algorithmic trading platform.

## Tech Stack

-   **Framework**: Next.js 14
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Authentication**: NextAuth.js
-   **Styling**: Tailwind CSS + Shadcn UI
-   **Payment**: Stripe

## Prerequisites

-   Node.js 18+
-   PostgreSQL database

## Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Copy the example environment file:
    ```bash
    cp .env.example .env.local
    ```
    Update `.env.local` with your database credentials and API keys.

3.  **Database Seeding**:
    ```bash
    npm run db:push
    npm run db:seed
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Scripts

-   `npm run dev`: Start development server
-   `npm run build`: Build for production
-   `npm run lint`: Run ESLint
-   `npm run test`: Run unit tests
-   `npm run test:e2e`: Run Playwright E2E tests
