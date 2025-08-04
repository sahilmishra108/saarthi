import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported for conversion' },
        { status: 400 }
      );
    }

    console.log('PDF conversion requested for:', file.name);

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = '';

    try {
      // Try to parse PDF
      const pdfParse = require('pdf-parse');
      const pdfData = await pdfParse(buffer);
      text = pdfData.text;
      console.log('PDF converted successfully, text length:', text.length);
    } catch (pdfError) {
      console.error('PDF conversion failed:', pdfError);
      return NextResponse.json(
        { 
          error: 'Failed to convert PDF to text. The PDF might be corrupted or password-protected.',
          details: 'Please try a different PDF file or copy the text manually.'
        },
        { status: 400 }
      );
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'No text content found in the PDF',
          details: 'The PDF might be image-based or contain no readable text.'
        },
        { status: 400 }
      );
    }

    // Create a text file name based on the original PDF name
    const originalName = file.name.replace(/\.pdf$/i, '');
    const textFileName = `${originalName}_converted.txt`;

    return NextResponse.json({
      success: true,
      text: text,
      originalFileName: file.name,
      textFileName: textFileName,
      textLength: text.length,
      downloadUrl: `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
    });

  } catch (error) {
    console.error('PDF conversion API error:', error);
    return NextResponse.json(
      { 
        error: `Conversion failed: ${error.message}`,
        details: 'Please try again or contact support if the issue persists.'
      },
      { status: 500 }
    );
  }
} 