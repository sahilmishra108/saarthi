import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    console.log("Chat API called");
    
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not found in environment variables");
      return Response.json(
        { error: "API key not configured. Please check your environment variables." },
        { status: 500 }
      );
    }

    const { message, conversationHistory } = await request.json();
    console.log("Received message:", message);

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // Create a context-aware system prompt for career guidance
    const systemPrompt = `You are Saarthi, an AI Career Coach assistant. You help users with:

1. **Resume Building**: Tips for creating professional resumes, formatting advice, content suggestions
2. **Interview Preparation**: Common interview questions, behavioral questions, technical interview tips
3. **Cover Letters**: Writing effective cover letters, structure advice, content suggestions
4. **Career Guidance**: Job search strategies, career path advice, skill development
5. **Industry Insights**: Market trends, salary information, job market analysis
6. **Job Application Tracking**: Best practices for tracking applications, follow-up strategies

Keep responses:
- Professional yet friendly
- Concise but informative (2-3 paragraphs max)
- Actionable with specific tips
- Relevant to the user's question
- Encouraging and supportive

If the user asks about something outside career guidance, politely redirect them to career-related topics.`;

    // Prepare conversation context (simplified for better reliability)
    let fullPrompt = `${systemPrompt}\n\nUser: ${message}\nSaarthi:`;
    
    // Add conversation history if available (limit to last 5 messages for stability)
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-5);
      const historyText = recentHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      fullPrompt = `${systemPrompt}\n\nRecent conversation:\n${historyText}\n\nUser: ${message}\nSaarthi:`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Generating response with Gemini...");
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    console.log("Generated response:", text.substring(0, 100) + "...");

    return Response.json({
      message: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    
    // Provide a helpful fallback response
    const fallbackResponses = [
      "I'm here to help with your career questions! Could you please ask me something specific about resume building, interview preparation, cover letters, or career guidance?",
      "I'd be happy to assist with your career development. What would you like to know about job searching, skill development, or professional growth?",
      "Let me help you with your career goals. Feel free to ask about resume tips, interview strategies, or any career-related topics!"
    ];
    
    const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return Response.json(
      { 
        message: randomFallback,
        timestamp: new Date().toISOString(),
        isFallback: true
      },
      { status: 200 } // Return 200 instead of 500 to avoid client-side errors
    );
  }
} 