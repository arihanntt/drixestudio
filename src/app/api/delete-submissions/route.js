import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient && cachedClient.topology.isConnected()) {
    return cachedClient;
  }
  cachedClient = await MongoClient.connect(process.env.MONGODB_URI);
  return cachedClient;
}

export async function POST(request) {
  try {
    const authToken = request.headers.get('x-admin-token');
    if (authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { ids } = await request.json();
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty ID array' },
        { status: 400 }
      );
    }

    if (!ids.every(id => typeof id === 'string')) {
      return NextResponse.json(
        { error: 'All IDs must be valid strings' },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    try {
      const db = client.db('support_channel');
      const result = await db.collection('contacts').deleteMany({
        _id: { $in: ids.map(id => {
          try {
            return new ObjectId(id);
          } catch (e) {
            throw new Error(`Invalid ObjectId: ${id}`);
          }
        }) }
      });

      return NextResponse.json({
        success: true,
        deletedCount: result.deletedCount,
        message: `Successfully deleted ${result.deletedCount} submission(s)`
      });
    } finally {
      // Only close if not reusing connection
      // await client.close();
    }
  } catch (error) {
    console.error('Delete error:', error);
    if (error.message.includes('Invalid ObjectId')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const authToken = request.headers.get('x-admin-token');
    if (authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const client = await connectToDatabase();
    try {
      const db = client.db('support_channel');
      const submissions = await db.collection('contacts').find({}).limit(100).toArray();
      return NextResponse.json(submissions);
    } finally {
      // Only close if not reusing connection
      // await client.close();
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}