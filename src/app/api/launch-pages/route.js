import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import LaunchPage from '../../../models/LaunchPage';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();
    const { owner, discord, features, password } = await request.json();

    // Validate input
    if (!owner || !discord || !features || !Array.isArray(features) || features.length === 0) {
      return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
    }

    // Generate unique pageId
    const pageId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Hash password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : '';

    // Save to MongoDB
    const launchPage = new LaunchPage({
      owner,
      discord,
      features,
      password: hashedPassword,
      pageId,
    });
    await launchPage.save();

    return NextResponse.json({ pageId });
  } catch (error) {
    console.error('Error creating launch page:', error);
    return NextResponse.json({ error: 'Failed to create launch page' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const pages = await LaunchPage.find({}).lean();
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching launch pages:', error);
    return NextResponse.json({ error: 'Failed to fetch launch pages' }, { status: 500 });
  }
}