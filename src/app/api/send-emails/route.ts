import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { message, emails, subject } = await req.json();

    if (!message || !emails || !Array.isArray(emails) || emails.length > 50 || !subject?.trim()) {
      return NextResponse.json(
        { error: 'Invalid input, missing subject, or too many emails (max 50)' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter((email: string) => !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { error: `Invalid email addresses: ${invalidEmails.join(', ')}` },
        { status: 400 }
      );
    }

    if (!process.env.BREVO_SMTP_SERVER || !process.env.BREVO_SMTP_PORT || 
        !process.env.BREVO_SMTP_LOGIN || !process.env.BREVO_SMTP_PASSWORD || 
        !process.env.BREVO_SENDER_EMAIL) {
      console.error('Missing Brevo environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Missing SMTP credentials' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_SERVER,
      port: Number(process.env.BREVO_SMTP_PORT) || 2525,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    await transporter.verify();
    console.log('SMTP connection verified for subject:', subject.trim());

    for (const email of emails) {
      await transporter.sendMail({
        from: process.env.BREVO_SENDER_EMAIL,
        to: email,
        subject: subject.trim(),
        text: message,
        html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
      });
      console.log(`Email sent to ${email} with subject: ${subject.trim()}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending emails:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      errno: error.errno
    });
    return NextResponse.json(
      { error: `Failed to send emails: ${error.message}` },
      { status: 500 }
    );
  }
}