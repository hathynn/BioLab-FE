import OpenAI from "openai";
import { ProductType } from "../types/product.type";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI,
  dangerouslyAllowBrowser: true,
});

export async function sendMsgToOpenAI(
  message: string,
  products: ProductType[],
  onChunkReceived: (chunk: string) => void
) {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Bạn là một chuyên gia tư vấn dược phẩm. Dựa trên danh sách thuốc bên dưới, hãy giúp người dùng tìm sản phẩm phù hợp với triệu chứng của họ. 
      Danh sách thuốc: ${JSON.stringify(products)}`,
      },
      { role: "user", content: message },
    ],
    store: true,
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || "";
    onChunkReceived(text);
  }
}
