import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { assessText, GlmError } from "@/lib/glm";

// We use Node runtime (not edge) because the Z.ai API call may take 8-15s
// and we want generous default timeouts during dev.
export const runtime = "nodejs";
export const maxDuration = 60;

const RequestSchema = z.object({
  screenText: z.string().min(5).max(4000),
  language: z.enum(["en", "zh"]).default("en"),
});

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Bad request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const assessment = await assessText(parsed.data.screenText, parsed.data.language);
    return NextResponse.json({ ok: true, assessment });
  } catch (err) {
    const e = err as GlmError;
    console.error("[/api/check] GLM error:", e.message, e.body);
    return NextResponse.json(
      { ok: false, error: e.message, status: e.status ?? 500 },
      { status: 500 },
    );
  }
}
