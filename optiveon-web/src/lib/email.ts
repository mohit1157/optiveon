import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailOptions) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, FROM_EMAIL } =
    process.env;

  // Mock for development if SMTP is not configured
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      console.log("-----------------------------------------");
      console.log(`[MOCK EMAIL] To: ${to}`);
      console.log(`[MOCK EMAIL] Subject: ${subject}`);
      console.log(`[MOCK EMAIL] From: ${FROM_EMAIL || "noreply@optiveon.com"}`);
      if (replyTo) console.log(`[MOCK EMAIL] Reply-To: ${replyTo}`);
      console.log(`[MOCK EMAIL] Content: (see below)`);
      console.log(html);
      console.log("-----------------------------------------");
      return { success: true, data: { messageId: "mock-email-id" } };
    }
    console.error(
      "SMTP configuration missing (SMTP_HOST, SMTP_USER, SMTP_PASSWORD)"
    );
    return { success: false, error: "Email configuration missing" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log(`[Email] Attempting to send email from ${SMTP_USER} to ${to}`);

    const info = await transporter.sendMail({
      from: `"Optiveon" <${SMTP_USER}>`, // Force sender to be the authenticated user
      to,
      replyTo: replyTo || to, // Default replyTo
      subject,
      html,
    });

    console.log(`[Email] Sent successfully. MessageID: ${info.messageId}`);

    return { success: true, data: info };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export function generateVerificationEmail(name: string, verifyUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c1221; color: #f8fafc; padding: 40px 20px;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #111827; border-radius: 12px; padding: 40px; border: 1px solid rgba(148, 163, 184, 0.1);">
          <h1 style="color: #c9a227; font-size: 24px; margin-bottom: 24px;">Verify Your Email</h1>
          <p style="color: #94a3b8; line-height: 1.6; margin-bottom: 16px;">Hi ${name || "there"},</p>
          <p style="color: #94a3b8; line-height: 1.6; margin-bottom: 24px;">Welcome to Optiveon! Please verify your email address by clicking the button below:</p>
          <a href="${verifyUrl}" style="display: inline-block; background: linear-gradient(135deg, #c9a227 0%, #d4b54a 100%); color: #0c1221; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin-bottom: 24px;">Verify Email</a>
          <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-top: 24px;">If you didn't create an account with Optiveon, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid rgba(148, 163, 184, 0.1); margin: 24px 0;">
          <p style="color: #64748b; font-size: 12px;">Optiveon LLC<br>5900 Balcones Drive, Suite 100<br>Austin, TX 78731</p>
        </div>
      </body>
    </html>
  `;
}

export function generatePasswordResetEmail(name: string, resetUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c1221; color: #f8fafc; padding: 40px 20px;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #111827; border-radius: 12px; padding: 40px; border: 1px solid rgba(148, 163, 184, 0.1);">
          <h1 style="color: #c9a227; font-size: 24px; margin-bottom: 24px;">Reset Your Password</h1>
          <p style="color: #94a3b8; line-height: 1.6; margin-bottom: 16px;">Hi ${name || "there"},</p>
          <p style="color: #94a3b8; line-height: 1.6; margin-bottom: 24px;">We received a request to reset your password. Click the button below to choose a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #c9a227 0%, #d4b54a 100%); color: #0c1221; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin-bottom: 24px;">Reset Password</a>
          <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-top: 24px;">This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid rgba(148, 163, 184, 0.1); margin: 24px 0;">
          <p style="color: #64748b; font-size: 12px;">Optiveon LLC<br>5900 Balcones Drive, Suite 100<br>Austin, TX 78731</p>
        </div>
      </body>
    </html>
  `;
}

export function generateContactNotificationEmail(
  name: string,
  email: string,
  company: string | null,
  interest: string,
  message: string
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c1221; color: #f8fafc; padding: 40px 20px;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #111827; border-radius: 12px; padding: 40px; border: 1px solid rgba(148, 163, 184, 0.1);">
          <h1 style="color: #c9a227; font-size: 24px; margin-bottom: 24px;">New Contact Form Submission</h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 100px;">Name:</td>
              <td style="padding: 8px 0; color: #f8fafc;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Email:</td>
              <td style="padding: 8px 0; color: #f8fafc;"><a href="mailto:${email}" style="color: #c9a227;">${email}</a></td>
            </tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #64748b;">Company:</td><td style="padding: 8px 0; color: #f8fafc;">${company}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Interest:</td>
              <td style="padding: 8px 0; color: #f8fafc;">${interest}</td>
            </tr>
          </table>
          <div style="background-color: #0c1221; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #64748b; font-size: 12px; margin-bottom: 8px; text-transform: uppercase;">Message:</p>
            <p style="color: #f8fafc; line-height: 1.6; margin: 0;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(148, 163, 184, 0.1); margin: 24px 0;">
          <p style="color: #64748b; font-size: 12px;">This email was sent from the Optiveon website contact form.</p>
        </div>
      </body>
    </html>
  `;
}
