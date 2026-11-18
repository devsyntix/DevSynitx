import { NextResponse } from "next/server";

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

    const { fullName, email, company, projectType, message } = body || {};

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Please provide Full Name, Email, and Message." },
        { status: 400 }
      );
    }

    const rawApiKey = process.env.RESEND_API_KEY;
    const resendApiKey = rawApiKey
      ? rawApiKey.trim().replace(/^["']|["']$/g, "")
      : null;

    if (!resendApiKey) {
      console.error(
        "[Resend] RESEND_API_KEY is missing from environment variables. If you just added it in Vercel, remember to trigger a Redeploy so Vercel can inject it into the active serverless function."
      );
      return NextResponse.json(
        {
          error:
            "RESEND_API_KEY is not active on this deployment. If you just added it in Vercel Project Settings, please go to Deployments > Redeploy so the new environment variable takes effect.",
        },
        { status: 500 }
      );
    }

    // Default recipient is devsyntix@gmail.com, configurable via CONTACT_TO_EMAIL
    let finalRecipient = (
      process.env.CONTACT_TO_EMAIL?.trim() || "devsyntix@gmail.com"
    ).toLowerCase();

    const senderFrom =
      process.env.RESEND_FROM_EMAIL?.trim() ||
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
            <td style="padding: 8px 0; color: #86868b; font-size: 13px;">Project Type:</td>
            <td style="padding: 8px 0; color: #af52de; font-weight: 600; font-size: 15px;">${projectType || "General Inquiry"}</td>
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
        subject: `🚀 New DevSyntix Inquiry from ${fullName} (${projectType || "General"})`,
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
            subject: `🚀 New DevSyntix Inquiry from ${fullName} (${projectType || "General"})`,
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
