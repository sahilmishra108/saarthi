import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    console.log("Test API called");
    
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not found in environment variables");
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Testing Gemini API...");
    const result = await model.generateContent("Say 'Hello from Saarthi!' in one sentence.");
    const response = await result.response;
    const text = response.text();
    console.log("Test response:", text);

    return Response.json({
      success: true,
      message: text,
      apiKeyConfigured: !!process.env.GEMINI_API_KEY
    });

  } catch (error) {
    console.error("Test API Error:", error);
    return Response.json(
      { 
        error: error.message,
        apiKeyConfigured: !!process.env.GEMINI_API_KEY
      },
      { status: 500 }
    );
  }
} 