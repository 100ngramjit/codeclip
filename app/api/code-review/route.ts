import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

export async function POST(req: NextRequest) {
  try {
    const { content, language, fileName } = await req.json();

    const prompt = `
You are an expert code reviewer. Analyze the following ${language} code and provide a comprehensive review.
Return your analysis in JSON format with the following structure:

{
  "score": number (0-100),
  "issues": [
    {
      "type": "error|warning|info|suggestion",
      "severity": "high|medium|low",
      "line": number (optional),
      "message": "string",
      "rule": "string (optional)",
      "category": "string"
    }
  ],
  "suggestions": ["string"],
  "complexity": {
    "cyclomatic": number,
    "cognitive": number
  },
  "metrics": {
    "linesOfCode": number,
    "duplicateLines": number,
    "testCoverage": number (optional)
  }
}

CODE:
${content}
`;

    const response = await openai.chat.completions.create({
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "You are a senior code reviewer with expertise in best practices, performance, and maintainability.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 3000,
      temperature: 0.1,
    });

    const reviewResult = JSON.parse(
      response.choices[0]?.message.content ?? "{}"
    );

    return new Response(JSON.stringify({ reviewResult }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Code Review Error:", error);
    return new Response(JSON.stringify({ error: "Failed to review code" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
