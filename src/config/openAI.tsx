import OpenAI from "openai";
import useProductService from "../services/useProductService";
import { ProductType } from "../types/product.type";

const openai = new OpenAI({
  apiKey:
    "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",
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
