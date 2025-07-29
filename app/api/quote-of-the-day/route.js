import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GET() {
  try {
    const prompt = `Generate a motivational quote about success, career growth, or professional achievement. 
    The quote should be inspiring and relevant for professionals. 
    Return the response in this exact JSON format:
    {
      "quote": "The actual quote text here",
      "author": "Author name",
      "category": "success|career|motivation|leadership"
    }
    
    Make sure the quote is original and impactful. Keep the quote under 150 characters.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse the JSON response
    let quoteData;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        quoteData = JSON.parse(jsonMatch[0]);
      } else {
        quoteData = JSON.parse(text);
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      quoteData = {
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success"
      };
    }

    // Validate the response structure
    if (!quoteData.quote || !quoteData.author) {
      throw new Error('Invalid quote data structure');
    }

    return NextResponse.json(quoteData);
  } catch (error) {
    console.error('Error fetching quote:', error);
    
    // Fallback quotes
    const fallbackQuotes = [
      {
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success"
      },
      {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "career"
      },
      {
        quote: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs",
        category: "motivation"
      },
      {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "motivation"
      },
      {
        quote: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau",
        category: "success"
      }
    ];

    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    
    return NextResponse.json(randomQuote);
  }
} 