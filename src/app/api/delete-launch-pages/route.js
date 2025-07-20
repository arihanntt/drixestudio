import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import LaunchPage from '../../../models/LaunchPage';

export async function POST(request) {
  try {
    await dbConnect();
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
    }

    const result = await LaunchPage.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'No launch pages found to delete' }, { status: 404 });
    }

    return NextResponse.json({ message: `${result.deletedCount} launch pages deleted` });
  } catch (error) {
    console.error('Error deleting launch pages:', error);
    return NextResponse.json({ error: 'Failed to delete launch pages' }, { status: 500 });
  }
}