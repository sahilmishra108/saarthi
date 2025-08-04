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

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = '';

    try {
      if (file.type === 'text/plain') {
        // Parse text files - this should always work
        text = buffer.toString('utf-8');
        console.log('Text file parsed successfully');
      } else if (file.type === 'application/pdf') {
        // Try to parse PDF with better error handling
        try {
          // Use require instead of dynamic import for better compatibility
          const pdfParse = require('pdf-parse');
          const pdfData = await pdfParse(buffer);
          text = pdfData.text;
          console.log('PDF parsed successfully, text length:', text.length);
        } catch (pdfError) {
          console.error('PDF parsing failed:', pdfError);
          
          // Try alternative PDF parsing method
          try {
            const pdfParse = await import('pdf-parse');
            const pdfData = await pdfParse.default(buffer);
            text = pdfData.text;
            console.log('PDF parsed successfully with dynamic import');
          } catch (altPdfError) {
            console.error('Alternative PDF parsing also failed:', altPdfError);
            return NextResponse.json(
              { 
                error: 'PDF parsing is not available. Please convert your PDF to text format or use a text file. You can copy the text from your PDF and paste it directly.',
                details: 'PDF parsing libraries may not be compatible with this environment.'
              },
              { status: 400 }
            );
          }
        }
      } else if (file.type.includes('word') || file.type.includes('document')) {
        // Try to parse Word documents
        try {
          const mammoth = await import('mammoth');
          const result = await mammoth.default.extractRawText({ buffer });
          text = result.value;
          console.log('Word document parsed successfully');
        } catch (wordError) {
          console.error('Word document parsing failed:', wordError);
          return NextResponse.json(
            { 
              error: 'Word document parsing is not available. Please convert to text format or use a text file.',
              details: 'You can copy the text from your Word document and paste it directly.'
            },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { 
            error: `Unsupported file type: ${file.type}. Please use TXT, PDF, or Word documents.`,
            details: 'For best compatibility, we recommend using text (.txt) files.'
          },
          { status: 400 }
        );
      }
    } catch (parseError) {
      console.error('File parsing error:', parseError);
      return NextResponse.json(
        { 
          error: `Failed to parse file: ${parseError.message}`,
          details: 'Please try converting your file to text format or paste the content directly.'
        },
        { status: 500 }
      );
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'No text content found in the file',
          details: 'The file appears to be empty or contains no readable text.'
        },
        { status: 400 }
      );
    }

    console.log('File parsed successfully, text length:', text.length);

    return NextResponse.json({
      success: true,
      text: text,
      fileName: file.name,
      fileSize: file.size,
      parsedLength: text.length
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        error: `Server error: ${error.message}`,
        details: 'Please try again or contact support if the issue persists.'
      },
      { status: 500 }
    );
  }
} 