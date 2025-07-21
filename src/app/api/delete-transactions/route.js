import dbConnect from '../../../lib/mongodb';
import Transaction from '../../../models/transaction';

export async function POST(request) {
  try {
    const { ids } = await request.json();
    const token = request.headers.get('x-admin-token');

    if (token !== process.env.ADMIN_TOKEN) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid or empty IDs' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();
    const result = await Transaction.deleteMany({ _id: { $in: ids } });

    return new Response(JSON.stringify({ message: 'Transactions deleted', deletedCount: result.deletedCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting transactions:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete transactions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}