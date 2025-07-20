import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import LaunchPage from '../../../models/LaunchPage';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();
    const { pageId, password } = await request.json();

    const page = await LaunchPage.findOne({ pageId }).lean();
    if (!page) {
      return NextResponse.json({ error: 'Launch page not found' }, { status: 404 });
    }

    if (!page.password) {
      return NextResponse.json({ isValid: true });
    }

    const isMatch = await bcrypt.compare(password, page.password);
    return NextResponse.json({ isValid: isMatch });
  } catch (error) {
    console.error('Error validating password:', error);
    return NextResponse.json({ error: 'Failed to validate password' }, { status: 500 });
  }
}