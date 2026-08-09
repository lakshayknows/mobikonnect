import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/content";

/**
 * Outbound mail over SMTP (Gmail by default).
 *
 * The transport is created lazily for the same reason `getDb()` is: Next
 * evaluates top-level module code at build time, and a transport built from
 * missing credentials would break `next build` on any machine without them.
 *
 * Nothing here ever logs an OTP.
 */

const DEFAULT_HOST = "smtp.gmail.com";
const DEFAULT_PORT = 465; // implicit TLS

export function isMailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_APP_PASSWORD);
}

let cached: Transporter | null = null;

function getTransport(): Transporter {
  if (cached) return cached;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error(
      "SMTP_USER / SMTP_APP_PASSWORD are not set. Run `vercel env pull .env.local --yes`.",
    );
  }

  const port = Number(process.env.SMTP_PORT ?? DEFAULT_PORT);

  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? DEFAULT_HOST,
    port,
    // 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: port === 465,
    auth: { user, pass: pass.replace(/\s+/g, "") },
  });

  return cached;
}

/** Verifies the credentials against the server without sending anything. */
export async function verifyMailConnection() {
  return getTransport().verify();
}

const fromHeader = () => `"${site.name} Admin" <${process.env.SMTP_USER}>`;

/* ─────────────────────────────── OTP email ────────────────────────────────── */

/** Grouped as "123 456" — easier to read off and type without transcription slips. */
const prettyCode = (code: string) => `${code.slice(0, 3)} ${code.slice(3)}`;

function otpHtml(code: string, expiresMinutes: number) {
  // Table layout with inline styles: mail clients strip <style> blocks,
  // external CSS and webfonts. Colours are the brand tokens, hardcoded because
  // Tailwind classes mean nothing in an inbox.
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#1d1d1d;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1d1d1d;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#262626;border:1px solid rgba(248,235,211,0.14);border-radius:16px;">
            <tr>
              <td style="padding:32px 32px 8px 32px;font-family:Helvetica,Arial,sans-serif;">
                <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(248,235,211,0.66);">
                  ${site.name}
                </p>
                <h1 style="margin:12px 0 0 0;font-size:22px;line-height:1.25;color:#F8EBD3;font-weight:700;">
                  Your password reset code
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0 32px;font-family:Helvetica,Arial,sans-serif;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:rgba(248,235,211,0.66);">
                  Enter this code in the blog admin to choose a new password.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0 32px;" align="center">
                <div style="background:#1d1d1d;border:1px solid rgba(248,235,211,0.14);border-radius:12px;padding:20px 16px;font-family:'Courier New',Courier,monospace;font-size:34px;letter-spacing:0.18em;color:#F8EBD3;font-weight:700;">
                  ${prettyCode(code)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0 32px;font-family:Helvetica,Arial,sans-serif;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(248,235,211,0.4);">
                  The code expires in ${expiresMinutes} minutes and can be used once.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px 32px;font-family:Helvetica,Arial,sans-serif;">
                <div style="border-top:1px solid rgba(248,235,211,0.14);padding-top:16px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:#D05E62;">
                    If you didn't ask for this, ignore this email — your password has not changed.
                  </p>
                </div>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:rgba(248,235,211,0.4);">
            ${site.legal}
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function otpText(code: string, expiresMinutes: number) {
  return [
    `${site.name} — password reset code`,
    "",
    `Your code is: ${prettyCode(code)}`,
    "",
    `Enter it in the blog admin to choose a new password.`,
    `It expires in ${expiresMinutes} minutes and can be used once.`,
    "",
    `If you didn't ask for this, ignore this email — your password has not changed.`,
    "",
    site.legal,
  ].join("\n");
}

export async function sendOtpEmail({
  to,
  code,
  expiresMinutes,
}: {
  to: string;
  code: string;
  expiresMinutes: number;
}) {
  await getTransport().sendMail({
    from: fromHeader(),
    to,
    subject: `${prettyCode(code)} is your ${site.name} admin reset code`,
    text: otpText(code, expiresMinutes),
    html: otpHtml(code, expiresMinutes),
  });
}
