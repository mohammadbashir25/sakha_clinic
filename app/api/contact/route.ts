
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char] ?? char,
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const fullName = String(body.fullName ?? "").trim().slice(0, 120);
    const phone = String(body.phone ?? "").trim().slice(0, 40);
    const serviceOfInterest = String(body.serviceOfInterest ?? "")
      .trim()
      .slice(0, 100);
    const preferredContactMethod = String(
      body.preferredContactMethod ?? "",
    )
      .trim()
      .slice(0, 40);
    const message = String(body.message ?? "").trim().slice(0, 3000);

    if (
      !fullName ||
      !phone ||
      !serviceOfInterest ||
      !["phone", "whatsapp", "either"].includes(preferredContactMethod)
    ) {
      return NextResponse.json(
        { message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.CONTACT_EMAIL;

    if (!apiKey || !from || !to) {
      console.error("Contact email configuration is incomplete.", {
        hasApiKey: Boolean(apiKey),
        hasFrom: Boolean(from),
        hasRecipient: Boolean(to),
      });

      return NextResponse.json(
        {
          message:
            "Email service is not configured yet. Please contact the clinic by phone or WhatsApp.",
        },
        { status: 503 },
      );
    }

    const html = `
      <h2>New appointment request — Sakha</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Service:</strong> ${escapeHtml(serviceOfInterest)}</p>
      <p><strong>Preferred contact:</strong> ${escapeHtml(preferredContactMethod)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message || "No additional message").replace(/\n/g, "<br/>")}</p>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New appointment request — ${fullName}`,
        html,
      }),
      cache: "no-store",
    });

    if (!emailResponse.ok) {
      const details = await emailResponse.text();

      // Server terminal only. Never return API details or secrets to the browser.
      console.error("Resend email delivery failed:", {
        status: emailResponse.status,
        details: details.slice(0, 1000),
      });

      return NextResponse.json(
        {
          message:
            "We could not send your request right now. Please contact the clinic by phone or WhatsApp.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your request has been sent.",
    });
  } catch (error) {
    console.error("POST /api/contact failed:", error);

    return NextResponse.json(
      { message: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
