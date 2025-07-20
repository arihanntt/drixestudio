import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, email, amount, razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('support_channel');
    await db.collection('donations').insertOne({
      name,
      email,
      amount: parseFloat(amount),
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      createdAt: new Date(),
    });
    await client.close();
    return NextResponse.json({ message: 'Donation saved' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save donation' }, { status: 500 });
  }
}