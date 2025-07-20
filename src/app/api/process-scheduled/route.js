import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db('support_channel').collection('scheduledEmails');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

export async function GET() {
  try {
    const collection = await connectToDatabase();
    const now = new Date();
    const dueEmails = await collection.find({ scheduleTime: { $lte: now.toISOString() }, status: 'pending' }).toArray();

    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_SERVER,
      port: Number(process.env.BREVO_SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    for (const email of dueEmails) {
      try {
        for (const recipient of email.emails) {
          await transporter.sendMail({
            from: process.env.BREVO_SENDER_EMAIL,
            to: recipient,
            subject: email.subject,
            text: email.message,
            html: `<p>${email.message.replace(/\n/g, '<br>')}</p>`,
          });
        }
        await collection.updateOne(
          { id: email.id },
          { $set: { status: 'sent', sentAt: new Date().toISOString() } }
        );
      } catch (error) {
        await collection.updateOne(
          { id: email.id },
          { $set: { status: 'failed', error: error.message, failedAt: new Date().toISOString() } }
        );
      }
    }

    return NextResponse.json({ success: true, processed: dueEmails.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}