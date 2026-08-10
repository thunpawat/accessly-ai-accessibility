import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { analysisSchema, requestSchema } from "@/lib/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = requestSchema.parse(await request.json());
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "AI service is not configured." }, { status: 503 });
    }

    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { object } = await generateObject({
      model: openai(process.env.OPENAI_MODEL || "gpt-4.1-mini"),
      schema: analysisSchema,
      temperature: 0.2,
      system: `You are an accessibility specialist for public-facing marketing communications. Audit content using WCAG 2.2 principles, plain-language guidance, inclusive language, cognitive accessibility, useful link text, heading hierarchy, and image alt-text best practices. Do not claim legal compliance. Keep the author's meaning and avoid inventing facts. Return practical fixes.`,
      prompt: `Audience: ${input.audience}\nLanguage: ${input.language}\nImage attached: ${input.hasImage ? "yes" : "no"}\n\nMarketing content:\n${input.content}`,
    });
    return NextResponse.json(object, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
