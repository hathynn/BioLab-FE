import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

export async function sendMsgToOpenAI(
  message: string,
  onChunkReceived: (chunk: string) => void
) {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }],
    store: true,
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || "";
    onChunkReceived(text);
  }
}
