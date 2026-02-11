import { NextResponse } from "next/server"
import { contactSchema } from "@/registry/new-york/blocks/contact-form/contact-schema"
import { env } from "@/lib/env"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input"
      return NextResponse.json({ message: firstError }, { status: 400 })
    }

    const { name, email, phone, subject, message, honeypot } = parsed.data

    // Honeypot check — silently accept bot submissions
    if (honeypot) {
      return NextResponse.json({ message: "ok" })
    }

    const emailPayload = {
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      subject: `[Contact Form] ${subject} — ${name}`,
      reply_to: email,
      html: `
        <h2>New Contact Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:560px">
          <tr>
            <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;width:100px">Name</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">Email</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee">${email}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">Phone</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee">${phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">Subject</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee">${subject}</td>
          </tr>
        </table>
        <h3 style="margin-top:24px">Message</h3>
        <p style="white-space:pre-wrap;line-height:1.6">${message}</p>
      `.trim(),
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    if (!resendRes.ok) {
      const errorBody = await resendRes.text()
      console.error("Resend error:", errorBody)
      return NextResponse.json(
        { message: "Failed to send email. Please try again later." },
        { status: 502 },
      )
    }

    return NextResponse.json({ message: "ok" })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 },
    )
  }
}
