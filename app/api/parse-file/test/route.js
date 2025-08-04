import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'File parsing API is working',
    timestamp: new Date().toISOString()
  });
} 