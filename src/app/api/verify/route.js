import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export async function POST(req) {
  try {
    const { 
      orderCreationId, 
      razorpayPaymentId, 
      razorpayOrderId, 
      razorpaySignature, 
      planName, 
      amount, 
      currency, 
      message, 
      contactMethod, 
      contactDetails 
    } = await req.json();

    // Verify payment signature
    const sign = orderCreationId + '|' + razorpayPaymentId;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpaySignature !== expectedSign) {
      console.error('Invalid payment signature:', { received: razorpaySignature, expected: expectedSign });
      return NextResponse.json({ isOk: false, message: 'Invalid payment signature' }, { status: 400 });
    }

    // Connect to MongoDB
    await dbConnect();

    // Save transaction to MongoDB
    const transaction = new Transaction({
      planName,
      amount: amount / 100, // Convert back to actual amount (Razorpay uses smallest unit)
      currency,
      message: message || '',
      contactMethod: contactMethod || null,
      contactDetails: contactDetails || null,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    await transaction.save();
    console.log('Transaction saved:', transaction);

    return NextResponse.json({ isOk: true, message: 'Payment verified and transaction saved successfully' });
  } catch (error) {
    console.error('Payment verification or database error:', error.message, error.stack);
    return NextResponse.json({ isOk: false, message: error.message }, { status: 500 });
  }
}