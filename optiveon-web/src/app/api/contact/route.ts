import { NextResponse } from "next/server";

// This endpoint has been deprecated in favor of client-side Web3Forms integration.
// See src/components/forms/contact-form.tsx for the current implementation.
export async function POST() {
  return NextResponse.json(
    {
      error: "This endpoint is deprecated. Please use the contact form on the website.",
    },
    { status: 410 }
  );
}
