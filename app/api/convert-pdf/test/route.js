import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'PDF conversion API is working',
    timestamp: new Date().toISOString(),
    features: [
      'Convert PDF to text',
      'Download as .txt file',
      'Use converted text for ATS analysis'
    ]
  });
} 