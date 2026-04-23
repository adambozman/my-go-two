/**
 * Shared Google AI (Gemini) client for Go Two edge functions.
 * Replaces the Lovable AI gateway entirely.
 *
 * Uses the native Google AI REST API:
 *   https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
 *
 * Supports:
 *   - Plain text prompts  → callGemini(model, messages)
 *   - Function calling   → callGeminiWithTool(model, messages, toolDef, toolName)
 *   - Image generation   → callGeminiForImage(model, messages)
 */

const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// Model name mapping — stable GA models (updated April 2026)
export const MODELS = {
  // Used for: vibe derivation, rec engine, autofill, style-chat
  FLASH:       "gemini-2.5-flash",
  // Used for: card fields, quizzes, trending-feed
  FLASH_LITE:  "gemini-2.5-flash-lite",
  // Used for: image generation (multimodal output)
  FLASH_IMAGE: "gemini-2.5-flash-image",
} as const;

export type GeminiModel = typeof MODELS[keyof typeof MODELS];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GeminiMessage {
  role: "user" | "model";
  content: string;
}

export interface GeminiToolDef {
  name: string;
  description: string;
  parameters: Record<string, unknown>; // JSON Schema object
}

interface GeminiPart {
  text?: string;
  functionCall?: { name: string; args: Record<string, unknown> };
  inlineData?: { mimeType: string; data: string };
}

interface GeminiCandidate {
  content?: { parts?: GeminiPart[] };
  finishReason?: string;
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: { message: string; code: number };
}

// ─── Core fetch ───────────────────────────────────────────────────────────────

// Resolve key at runtime from edge-function environment.
// Gemini auth source of truth: Supabase secret GEMINI_API_KEY.
function getApiKey(): string {
  const apiKey = Deno.env.get("GEMINI_API_KEY")?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return apiKey;
}

async function geminiPost(
  model: string,
  body: Record<string, unknown>,
): Promise<GeminiResponse> {
  const key = getApiKey();
  const url = `${BASE}/${model}:generateContent?key=${key}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }
  return res.json() as Promise<GeminiResponse>;
}

// ─── Plain text call ──────────────────────────────────────────────────────────
// Returns the model's text reply, or null on empty response.

export async function callGemini(
  model: GeminiModel,
  messages: GeminiMessage[],
  systemPrompt?: string,
): Promise<string | null> {
  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const body: Record<string, unknown> = { contents };
  if (systemPrompt) {
    body.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  const data = await geminiPost(model, body);
  const part = data.candidates?.[0]?.content?.parts?.[0];
  return part?.text ?? null;
}

// ─── Function-calling call ────────────────────────────────────────────────────
// Returns the parsed args object from the function call, or null.

export async function callGeminiWithTool<T = Record<string, unknown>>(
  model: GeminiModel,
  messages: GeminiMessage[],
  toolDef: GeminiToolDef,
  systemPrompt?: string,
): Promise<T | null> {
  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const body: Record<string, unknown> = {
    contents,
    tools: [{
      functionDeclarations: [{
        name: toolDef.name,
        description: toolDef.description,
        parameters: toolDef.parameters,
      }],
    }],
    toolConfig: {
      functionCallingConfig: {
        mode: "ANY",
        allowedFunctionNames: [toolDef.name],
      },
    },
  };

  if (systemPrompt) {
    body.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  const data = await geminiPost(model, body);
  const parts = data.candidates?.[0]?.content?.parts ?? [];

  for (const part of parts) {
    if (part.functionCall?.name === toolDef.name) {
      return part.functionCall.args as T;
    }
  }
  return null;
}

// ─── Image generation call ────────────────────────────────────────────────────
// Returns base64 image data string (PNG), or null.

export async function callGeminiForImage(
  prompt: string,
): Promise<string | null> {
  const key = getApiKey();
  const model = MODELS.FLASH_IMAGE;
  const url = `${BASE}/${model}:generateContent?key=${key}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini image API error ${res.status}: ${err}`);
  }

  const data = await res.json() as GeminiResponse;
  const parts = data.candidates?.[0]?.content?.parts ?? [];

  for (const part of parts) {
    if (part.inlineData?.mimeType?.startsWith("image/")) {
      return part.inlineData.data; // base64 string
    }
  }
  return null;
}

