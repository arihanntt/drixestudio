import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import LaunchPage from '../../../../models/LaunchPage';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { pageId } = params;

    const page = await LaunchPage.findOne({ pageId }).lean();
    if (!page) {
      return NextResponse.json({ error: 'Launch page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching launch page:', error);
    return NextResponse.json({ error: 'Failed to fetch launch page' }, { status: 500 });
  }
}