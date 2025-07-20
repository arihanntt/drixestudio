// app/api/submissions/route.js
import { MongoClient } from 'mongodb';

export async function GET() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const submissions = await client.db()
    .collection('contacts')
    .find()
    .sort({ createdAt: -1 }) // Newest first
    .toArray();
  
  return Response.json(submissions);
}