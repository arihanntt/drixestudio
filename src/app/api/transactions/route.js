import dbConnect from '../../../lib/mongodb';
import Transaction from '../../../models/transaction';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token !== process.env.ADMIN_TOKEN) {
      console.log('Unauthorized access attempt with token:', token);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.log('Attempting to connect to MongoDB...');
    await dbConnect();
    console.log('Fetching transactions...');
    const transactions = await Transaction.find({}).lean();
    console.log('Transactions fetched:', transactions.length);
    return new Response(JSON.stringify(transactions), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch transactions', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}