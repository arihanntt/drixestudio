
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { message, emails } = await req.json();

    if (!message || !emails || !Array.isArray(emails) || emails.length > 50) {
      return NextResponse.json({ error: 'Invalid input or too many emails (max 50)' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter((email: string) => !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { error: `Invalid email addresses: ${invalidEmails.join(', ')}` },
        { status: 400 }
      );
    }

    // Create Nodemailer transporter for Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_SERVER,
      port: Number(process.env.BREVO_SMTP_PORT) || 2525,
      secure: false, // Use TLS
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    // Send email to each recipient
    for (const email of emails) {
      await transporter.sendMail({
        from: process.env.BREVO_SENDER_EMAIL,
        to: email,
        subject: 'Message from Your Website',
        text: message,
        html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending emails:', error.message, error.stack);
    return NextResponse.json({ error: `Failed to send emails: ${error.message}` }, { status: 500 });
  }
}
