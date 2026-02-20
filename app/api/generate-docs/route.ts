import { NextRequest } from "next/server";
import OpenAI from "openai";
import { extractJson } from "../_utils/extractJson";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  timeout: 60_000, // 1 minute — free-tier models can be slow
});

export const maxDuration = 60; // seconds

export async function POST(req: NextRequest) {
  try {
    const { content, language, fileName, format } = await req.json();

    const prompt = `
You are a professional documentation expert. Analyze and create documentation for the following ${language} code.
Output the result as JSON like below without the json identifier backticks at the start and end:
{
  "overview": "short summary of the codebase",
  "functions": [
    { 
      "name": "function name",
      "description": "what it does",
      "parameters": [{ "name": "", "type": "", "description": "" }],
      "returns": { "type": "", "description": "" },
      "example": "optional code usage"
    }
  ],
  "components": [
    {
      "name": "",
      "description": "",
      "props": [{ "name": "", "type": "", "required": true/false, "description": "" }],
      "usage": "component usage example"
    }
  ],
  "classes": [
    {
      "name": "",
      "description": "",
      "methods": [{ "name": "", "description": "", "parameters": [] }],
      "properties": [{ "name": "", "type": "", "description": "" }]
    }
  ],
  "jsDoc": "Full JSDoc comment block for this file",
  "markdown": "Full markdown documentation for this file",
  "apiDocs": "API-like structured JSON for code reference"
}
CODE:
${content}
`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "z-ai/glm-4.5-air:free",
      messages: [
        {
          role: "system",
          content: "You are a senior code documentation assistant.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 4000,
      temperature: 0.1,
    });

    const rawContent = extractJson(response.choices[0]?.message.content);

    // DEBUG: Log to ensure actual content
    if (!rawContent) {
      console.error("AI returned empty content.");
      return new Response(
        JSON.stringify({ error: "AI returned empty documentation." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    let documentation = {};
    try {
      documentation = JSON.parse(rawContent);
    } catch (e) {
      // Optional: Write the content to console for further inspection
      console.error("Failed to parse JSON from AI:\n", rawContent);
      return new Response(
        JSON.stringify({
          error: "Failed to parse documentation JSON from AI output.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ documentation }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Documentation Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate documentation" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
