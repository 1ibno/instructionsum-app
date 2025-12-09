import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Convert this text into clear, numbered action steps.

Rules:
- Extract 4-8 actionable steps
- Number each step (1. 2. 3. etc.)
- Each step: 6-12 words, imperative mood
- Start with a verb (Do, Create, Open, Click, etc.)
- No filler, no context, just the action
- No introductory text

Text:
${text}`,
        },
      ],
    });

    const content = message.content[0];
    const summary = content.type === "text" ? content.text : "";

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summarization error:", error);
    return NextResponse.json(
      { error: "Failed to extract points" },
      { status: 500 }
    );
  }
}
