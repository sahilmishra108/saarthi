import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test if pdf-parse is available
    let pdfParseAvailable = false;
    let pdfParseError = null;
    
    try {
      const pdfParse = require('pdf-parse');
      pdfParseAvailable = true;
      console.log('pdf-parse is available');
    } catch (error) {
      pdfParseError = error.message;
      console.error('pdf-parse require failed:', error);
    }

    // Test if mammoth is available
    let mammothAvailable = false;
    let mammothError = null;
    
    try {
      const mammoth = require('mammoth');
      mammothAvailable = true;
      console.log('mammoth is available');
    } catch (error) {
      mammothError = error.message;
      console.error('mammoth require failed:', error);
    }

    return NextResponse.json({
      message: 'Debug information for file parsing',
      timestamp: new Date().toISOString(),
      libraries: {
        pdfParse: {
          available: pdfParseAvailable,
          error: pdfParseError
        },
        mammoth: {
          available: mammothAvailable,
          error: mammothError
        }
      },
      nodeVersion: process.version,
      platform: process.platform
    });

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { error: `Debug error: ${error.message}` },
      { status: 500 }
    );
  }
} 