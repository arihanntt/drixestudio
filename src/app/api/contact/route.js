// app/api/contact/route.js
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('support_channel');
  
  cachedClient = client;
  cachedDb = db;
  
  return { client, db };
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    // Validation
    const requiredFields = ['name', 'contactMethod', 'contactInfo', 'message'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Connect to DB
    const { db } = await connectToDatabase();
    const result = await db.collection('contacts').insertOne({
      ...data,
      createdAt: new Date()
    });

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is working' },
    { status: 200 }
  );
}