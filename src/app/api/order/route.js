import Razorpay from 'razorpay';
import { v4 as uuid } from 'uuid';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { amount, currency } = await req.json();
    
    const options = {
      amount: amount, // Already converted to smallest unit in frontend
      currency,
      receipt: uuid(),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}