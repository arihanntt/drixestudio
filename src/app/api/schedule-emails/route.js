import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

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
    const scheduledEmails = await collection.find({}).toArray();
    return NextResponse.json({ scheduledEmails });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const collection = await connectToDatabase();
    const result = await collection.insertOne({
      ...data,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function DELETE(request) {
  try {
    const { id, all } = await request.json();
    const collection = await connectToDatabase();
    if (all) {
      await collection.deleteMany({});
      return NextResponse.json({ success: true });
    }
    const result = await collection.deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Scheduled email not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}