import { NextResponse } from "next/server";

function findInObject(obj: any, target: string): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const targetLower = target.trim().toLowerCase();
  for (const [k, v] of Object.entries(obj)) {
    if (k.trim().toLowerCase() === targetLower && v !== undefined && v !== null) {
      const strVal = String(v).trim().replace(/^["']|["']$/g, "");
      if (strVal) return strVal;
    }
  }
  return undefined;
}

async function resolveEnv(key: string): Promise<string | undefined> {
  // 1. Direct process.env check
  if (typeof process !== "undefined" && process.env) {
    const val = findInObject(process.env, key);
    if (val) return val;
  }

  // 2. Cloudflare Worker bindings & secrets via @opennextjs/cloudflare
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const cf = await getCloudflareContext({ async: true });
    if (cf?.env) {
      const val = findInObject(cf.env, key);
      if (val) return val;
    }
  } catch {
    // Fall back if async context not ready
  }

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const cfSync = getCloudflareContext();
    if (cfSync?.env) {
      const val = findInObject(cfSync.env, key);
      if (val) return val;
    }
  } catch {
    // Ignore
  }

  // 3. Global scope check
  if (typeof globalThis !== "undefined") {
    const val = findInObject(globalThis, key);
    if (val) return val;
  }

  return undefined;
}

async function getAvailableKeyNames(): Promise<string[]> {
  const keys = new Set<string>();
  if (typeof process !== "undefined" && process.env) {
    Object.keys(process.env).forEach((k) => keys.add(k));
  }
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const cf = await getCloudflareContext({ async: true });
    if (cf?.env) {
      Object.keys(cf.env).forEach((k) => keys.add(k));
    }
  } catch {}
  return Array.from(keys);
}

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const { fullName, email, phone, company, message } = body || {};

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Please provide Full Name, Email, Phone Number, and Message." },
        { status: 400 }
      );
    }

    const rawPhoneDigits = String(phone).replace(/\D/g, "");
    const tenDigits =
      rawPhoneDigits.length === 12 && rawPhoneDigits.startsWith("91")
        ? rawPhoneDigits.slice(2)
        : rawPhoneDigits;

    if (tenDigits.length !== 10) {
      return NextResponse.json(
        { error: "Phone number must be strictly 10 numeric digits." },
        { status: 400 }
      );
    }

    const formattedPhone = `+91 ${tenDigits}`;

    const rawApiKey = (await resolveEnv("RESEND_API_KEY")) || process.env.RESEND_API_KEY;
    const resendApiKey = rawApiKey
      ? String(rawApiKey).trim().replace(/^["']|["']$/g, "")
      : null;

    if (!resendApiKey) {
      const keys = await getAvailableKeyNames();
      console.error(
        "[Resend] RESEND_API_KEY is missing. Detected environment keys:",
        keys
      );
      return NextResponse.json(
        {
          error: `RESEND_API_KEY was not found in Cloudflare Worker environment. Detected keys: [${keys.join(", ") || "none"}]. Please re-add RESEND_API_KEY in Cloudflare Worker Settings > Variables and Secrets and click Deploy.`,
        },
        { status: 500 }
      );
    }

    // Default recipient is devsyntix@gmail.com, configurable via CONTACT_TO_EMAIL
    const configuredToEmail = await resolveEnv("CONTACT_TO_EMAIL");
    let finalRecipient = (
      configuredToEmail?.trim() || "devsyntix@gmail.com"
    ).toLowerCase();

    const configuredFromEmail = await resolveEnv("RESEND_FROM_EMAIL");
    const senderFrom =
      configuredFromEmail?.trim() ||
      "DevSyntix <onboarding@resend.dev>";

    console.log(
      `[Resend] Preparing email delivery to ${finalRecipient} from ${senderFrom}`
    );

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0e14; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px;">
          <h2 style="color: #29d8ff; margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
            New Project Inquiry — DevSyntix
          </h2>
          <p style="margin: 0; color: #86868b; font-size: 13px;">
            Received from the Let's Talk consultation form on devsyntix.com
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #86868b; width: 140px; font-size: 13px;">Full Name:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: 600; font-size: 15px;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #86868b; font-size: 13px;">Email Address:</td>
            <td style="padding: 8px 0; color: #29d8ff; font-size: 15px;">
              <a href="mailto:${email}" style="color: #29d8ff; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #86868b; font-size: 13px;">Company / Org:</td>
            <td style="padding: 8px 0; color: #ffffff; font-size: 15px;">${company || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #86868b; font-size: 13px;">Phone Number:</td>
            <td style="padding: 8px 0; color: #29d8ff; font-weight: 600; font-size: 15px;">
              <a href="tel:+91${tenDigits}" style="color: #29d8ff; text-decoration: none;">${formattedPhone}</a>
            </td>
          </tr>
        </table>

        <div style="background: rgba(255,255,255,0.04); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); padding: 20px; margin-bottom: 24px;">
          <div style="color: #86868b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 10px;">
            Project Details & Scope:
          </div>
          <div style="color: #f5f5f7; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #86868b;">
            To reply directly to this client, simply reply to this email.
          </p>
        </div>
      </div>
    `;

    // Attempt delivery to the intended recipient
    let resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderFrom,
        to: [finalRecipient],
        reply_to: email,
        subject: `🚀 New DevSyntix Inquiry from ${fullName} (${formattedPhone})`,
        html: emailHtml,
      }),
    });

    let resData = await resendRes.json();
    console.log("[Resend] Initial API response:", resendRes.status, resData);

    // If Resend rejects due to sandbox restriction:
    // e.g. "You can only send testing emails to your own email address (owner@domain.com)..."
    // Automatically catch the authorized account owner email from the error message and retry!
    if (!resendRes.ok && typeof resData?.message === "string") {
      const emailMatch = resData.message.match(
        /\(([^@\s]+@[^@\s]+\.[^@\s]+)\)/
      );
      if (emailMatch && emailMatch[1]) {
        const allowedEmail = emailMatch[1].trim().toLowerCase();
        console.log(
          `[Resend] Free tier restriction detected. Auto-recovering by delivering to account owner email: ${allowedEmail}`
        );
        finalRecipient = allowedEmail;

        resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: senderFrom,
            to: [finalRecipient],
            reply_to: email,
            subject: `🚀 New DevSyntix Inquiry from ${fullName} (${formattedPhone})`,
            html: emailHtml,
          }),
        });

        resData = await resendRes.json();
        console.log("[Resend] Retry response:", resendRes.status, resData);
      }
    }

    if (!resendRes.ok) {
      console.error("[Resend] Final API error details:", resData);
      return NextResponse.json(
        {
          error:
            resData?.message ||
            "Resend could not deliver the email. Please verify your Resend configuration.",
        },
        { status: resendRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      id: resData.id,
      deliveredTo: finalRecipient,
    });
  } catch (error: any) {
    console.error("[Resend] Contact API error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
