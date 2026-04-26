import { RiskAssessment, RiskAssessmentSchema } from "./types";
import { SYSTEM_PROMPT } from "./prompts";

const BASE_URL = process.env.ZAI_BASE_URL ?? "https://api.z.ai/api/paas/v4";
const MODEL = process.env.ZAI_MODEL ?? "glm-4.5";
const VISION_MODEL = process.env.ZAI_VISION_MODEL ?? MODEL;

export class GlmError extends Error {
  constructor(message: string, public status?: number, public body?: unknown) {
    super(message);
    this.name = "GlmError";
  }
}

/**
 * Call GLM-4.5 with a text scenario and return a parsed, validated RiskAssessment.
 * Throws GlmError if the API fails or the response can't be parsed.
 */
export async function assessText(
  screenText: string,
  language: "en" | "zh" = "en",
): Promise<RiskAssessment> {
  const apiKey = process.env.ZAI_API_KEY;
  if (!apiKey) {
    throw new GlmError("ZAI_API_KEY is not set in environment");
  }

  const userMessage = `User language preference: ${language}\n\nScreen content:\n${screenText}`;

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: "json_object" },
      temperature: 0.3,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "<no body>");
    throw new GlmError(`GLM HTTP ${res.status}`, res.status, errBody);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new GlmError("GLM returned no content", 200, data);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    throw new GlmError(`GLM returned non-JSON: ${content.slice(0, 200)}`);
  }

  const result = RiskAssessmentSchema.safeParse(parsed);
  if (!result.success) {
    throw new GlmError(
      `GLM JSON failed schema: ${result.error.message}`,
      200,
      parsed,
    );
  }
  return result.data;
}

/**
 * Call the vision model with a screenshot image and return a parsed RiskAssessment.
 * Uses multimodal content (image_url + text). Same validation as assessText.
 */
export async function assessImage(
  imageDataUrl: string,
  language: "en" | "zh" = "en",
): Promise<RiskAssessment> {
  const apiKey = process.env.ZAI_API_KEY;
  if (!apiKey) {
    throw new GlmError("ZAI_API_KEY is not set in environment");
  }

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: VISION_MODEL,
      response_format: { type: "json_object" },
      temperature: 0.3,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `User language preference: ${language}\n\nAssess this screenshot:`,
            },
            {
              type: "image_url",
              image_url: { url: imageDataUrl },
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "<no body>");
    throw new GlmError(`GLM Vision HTTP ${res.status}`, res.status, errBody);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new GlmError("GLM Vision returned no content", 200, data);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    throw new GlmError(
      `GLM Vision returned non-JSON: ${content.slice(0, 200)}`,
    );
  }

  const result = RiskAssessmentSchema.safeParse(parsed);
  if (!result.success) {
    throw new GlmError(
      `GLM Vision JSON failed schema: ${result.error.message}`,
      200,
      parsed,
    );
  }
  return result.data;
}
