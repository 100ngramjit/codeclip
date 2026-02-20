/**
 * Extracts clean JSON from an AI model response.
 * Handles:
 * - <think>...</think> reasoning blocks
 * - ```json ... ``` markdown code fences
 * - ``` ... ``` generic code fences
 * - Leading/trailing whitespace and text
 */
export function extractJson(raw: string | null | undefined): string {
  if (!raw) return "{}";

  let text = raw;

  // 1. Remove <think>...</think> blocks (reasoning models like DeepSeek R1)
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, "");

  // 2. Trim whitespace
  text = text.trim();

  // 3. Extract from markdown code fences if present
  const codeBlockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
  if (codeBlockMatch) {
    text = codeBlockMatch[1].trim();
  }

  // 4. If still not starting with { or [, try to find the first JSON object
  if (!text.startsWith("{") && !text.startsWith("[")) {
    const jsonStart = text.search(/[{\[]/);
    if (jsonStart !== -1) {
      text = text.slice(jsonStart);
    }
  }

  // 5. If doesn't end with } or ], try to find the last one
  if (!text.endsWith("}") && !text.endsWith("]")) {
    const lastBrace = text.lastIndexOf("}");
    const lastBracket = text.lastIndexOf("]");
    const lastIdx = Math.max(lastBrace, lastBracket);
    if (lastIdx !== -1) {
      text = text.slice(0, lastIdx + 1);
    }
  }

  return text || "{}";
}

/**
 * Extracts clean code (non-JSON) from an AI model response.
 * Strips think tags and code fences but preserves the code content.
 */
export function extractCode(raw: string | null | undefined): string {
  if (!raw) return "";

  let text = raw;

  // 1. Remove <think>...</think> blocks
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, "");

  // 2. Trim whitespace
  text = text.trim();

  // 3. Remove markdown code fences if present
  const codeBlockMatch = text.match(/```(?:\w+)?\s*\n?([\s\S]*?)```/);
  if (codeBlockMatch) {
    text = codeBlockMatch[1].trim();
  }

  return text;
}
