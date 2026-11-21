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

  // 4. Built-in cloudflare:workers runtime module
  try {
    // @ts-ignore
    const cfWorkers = await import("cloudflare:workers");
    if (cfWorkers?.env) {
      const val = findInObject(cfWorkers.env, key);
      if (val) return val;
    }
  } catch {
    // Not running on workerd or module not available
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
  try {
    // @ts-ignore
    const cfWorkers = await import("cloudflare:workers");
    if (cfWorkers?.env) {
      Object.keys(cfWorkers.env).forEach((k) => keys.add(k));
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

    // Default recipient is info@devsyntix.com, configurable via CONTACT_TO_EMAIL
    const configuredToEmail = await resolveEnv("CONTACT_TO_EMAIL");
    let targetRecipient = (
      configuredToEmail?.trim() || "info@devsyntix.com"
    ).toLowerCase();

    const configuredFromEmail = await resolveEnv("RESEND_FROM_EMAIL");
    const senderCandidates: string[] = Array.from(
      new Set(
        [
          configuredFromEmail?.trim(),
          "DevSyntix <info@devsyntix.com>",
          "DevSyntix <contact@devsyntix.com>",
          "DevSyntix <onboarding@resend.dev>",
        ].filter(Boolean) as string[]
      )
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

    let resData: any = null;
    let deliveredRecipient = targetRecipient;
    let success = false;
    let lastErrorMsg = "";

    // Iterate through senders (info@devsyntix.com first for custom domain, onboarding@resend.dev as fallback)
    for (const sender of senderCandidates) {
      console.log(
        `[Resend] Attempting email delivery to ${deliveredRecipient} from ${sender}`
      );

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: sender,
          to: [deliveredRecipient],
          reply_to: email,
          subject: `🚀 New DevSyntix Inquiry from ${fullName} (${formattedPhone})`,
          html: emailHtml,
        }),
      });

      resData = await resendRes.json();
      console.log(`[Resend] Attempt with from="${sender}":`, resendRes.status, resData);

      if (resendRes.ok) {
        success = true;
        break;
      }

      lastErrorMsg = resData?.message || "Delivery failed";

      // If testing sandbox restriction (can only send to verified account owner)
      if (typeof resData?.message === "string") {
        const emailMatch = resData.message.match(
          /\(([^@\s]+@[^@\s]+\.[^@\s]+)\)/
        );
        if (emailMatch && emailMatch[1]) {
          const allowedEmail = emailMatch[1].trim().toLowerCase();
          console.log(
            `[Resend] Retrying delivery to sandbox authorized owner: ${allowedEmail}`
          );
          deliveredRecipient = allowedEmail;

          const retryRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: sender,
              to: [deliveredRecipient],
              reply_to: email,
              subject: `🚀 New DevSyntix Inquiry from ${fullName} (${formattedPhone})`,
              html: emailHtml,
            }),
          });

          const retryData = await retryRes.json();
          if (retryRes.ok) {
            resData = retryData;
            success = true;
            break;
          }
        }
      }
    }

    if (!success) {
      console.error("[Resend] Final delivery error:", resData);
      return NextResponse.json(
        {
          error:
            lastErrorMsg ||
            "Resend could not deliver the email. Please check your domain verification in Resend.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: resData?.id,
      deliveredTo: deliveredRecipient,
    });
  } catch (error: any) {
    console.error("[Resend] Contact API error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
