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
You are a world-class static code analysis and auditing tool. 
Scan the provided ${language} code for:
- complexity (cyclomatic, cognitive, halstead),
- maintainability,
- potential code smells and duplications,
- security issues and vulnerabilities,
- performance issues,
- metrics: lines of code, comments, dependencies, technical debt, etc.

Return a complete JSON in this structure without the json identifier backticks at the start and end:
{
  "overall": {
    "score": number,
    "grade": "A|B|C|D|F",
    "maintainabilityIndex": number 
  },
  "complexity": {
    "cyclomatic": number,
    "cognitive": number,
    "halstead": {
      "difficulty": number,
      "effort": number,
      "volume": number
    }
  },
  "quality": {
    "codeSmells": [
      {
        "type": "",
        "severity": "",
        "message": "",
        "line": number,
        "suggestion": ""
      }
    ],
    "duplications": [
      {
        "lines": "",
        "occurrences": number,
        "suggestion": ""
      }
    ],
    "testability": number
  },
  "performance": {
    "potentialIssues": [
      {
        "type": "",
        "impact": "",
        "description": "",
        "suggestion": ""
      }
    ],
    "optimizationOpportunities": [
      "string"
    ]
  },
  "security": {
    "vulnerabilities": [
      {
        "type": "",
        "severity": "",
        "description": "",
        "recommendation": ""
      }
    ],
    "riskScore": number
  },
  "metrics": {
    "linesOfCode": number,
    "linesOfComments": number,
    "commentRatio": number,
    "dependencies": number,
    "technicalDebt": ""
  }
}

CODE:
${content}
`;

    const response = await openai.chat.completions.create({
      model: "sonar",
      messages: [
        { role: "system", content: "You are a senior static analysis bot." },
        { role: "user", content: prompt },
      ],
      max_tokens: 4000,
      temperature: 0.1,
    });

    const analysis = JSON.parse(response.choices[0]?.message.content ?? "{}");

    return new Response(JSON.stringify({ analysis }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analysis Error:", error);
    return new Response(JSON.stringify({ error: "Failed to analyze code" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
