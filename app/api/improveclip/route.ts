import { NextRequest } from "next/server";
import OpenAI from "openai";
import { extractCode } from "../_utils/extractJson";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  timeout: 300_000, // 5 minutes — free-tier models can be slow
});

export const maxDuration = 300; // seconds

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No code content provided." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const prompt = `
You are an expert developer. Improve the following code by refactoring, optimizing, and enhancing readability and performance, but preserve its functionality.
Return ONLY the improved code content , no explanations and no language identifiers with backticks.

CODE:
${content}
`;

    const chatResponse = await openai.chat.completions.create({
      model: "z-ai/glm-4.5-air:free",
      messages: [
        { role: "system", content: "You are a senior code assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const improvedCode = extractCode(chatResponse.choices[0]?.message.content);

    return new Response(JSON.stringify({ improvedCode }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI Improve Error:", error);
    return new Response(JSON.stringify({ error: "Failed to improve code" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
