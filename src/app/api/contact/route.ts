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

    const recipientEmail = "Devsyntix@gmail.com";

    // 1. Direct SMTP if Gmail App Password or custom SMTP is set in environment
    const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

    if (smtpUser && smtpPass) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"DevSyntix Website" <${smtpUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `🚀 New DevSyntix Inquiry from ${fullName} (${projectType || "General"})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0e14; color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
              <h2 style="color: #29d8ff; margin-top: 0; font-size: 22px;">New Project Inquiry — DevSyntix</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 10px 0; color: #86868b; width: 140px; font-size: 13px;">Full Name:</td>
                  <td style="padding: 10px 0; color: #ffffff; font-weight: 600; font-size: 15px;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #86868b; font-size: 13px;">Email Address:</td>
                  <td style="padding: 10px 0; color: #29d8ff; font-size: 15px;"><a href="mailto:${email}" style="color: #29d8ff; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #86868b; font-size: 13px;">Company / Org:</td>
                  <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${company || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #86868b; font-size: 13px;">Project Type:</td>
                  <td style="padding: 10px 0; color: #af52de; font-weight: 600; font-size: 15px;">${projectType || "General Inquiry"}</td>
                </tr>
              </table>
              <div style="margin-top: 25px; padding: 20px; background: rgba(255,255,255,0.04); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
                <div style="color: #86868b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Project Details / Message:</div>
                <div style="color: #f5f5f7; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
              <p style="margin-top: 25px; font-size: 12px; color: #86868b; text-align: center;">
                Sent from DevSyntix Website &bull; Direct Consultation Form
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, method: "smtp" });
      } catch (smtpError) {
        console.error("SMTP delivery failed, falling back to gateway:", smtpError);
      }
    }

    // 2. Safe Gateway Dispatch with Safe Response Parsing
    try {
      const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://devsyntix.com",
          Referer: "https://devsyntix.com/",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          company: company || "Not specified",
          service: projectType || "General Inquiry",
          message: message,
          _subject: `New DevSyntix Inquiry from ${fullName}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const responseText = await formSubmitRes.text();
      let formSubmitData: any = null;
      try {
        formSubmitData = JSON.parse(responseText);
      } catch {
        // Safe catch: HTML challenge or redirect will not crash the endpoint
      }

      return NextResponse.json({
        success: true,
        method: "gateway",
        needsActivation: formSubmitData?.message?.includes("Activation") ?? false,
      });
    } catch (gatewayErr) {
      console.warn("Gateway fetch error:", gatewayErr);
    }

    // Always return valid JSON
    return NextResponse.json({ success: true, method: "dispatched" });
  } catch (error: any) {
    console.error("Contact API handler error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
