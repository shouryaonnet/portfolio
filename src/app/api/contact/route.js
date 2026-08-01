import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",

      to: ["shouryagupta.work@gmail.com"],

      replyTo: email,

      subject: `Portfolio Message — ${name}`,

      text: `
New message from your portfolio

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}