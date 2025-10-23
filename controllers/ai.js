import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIFallback = async (req, res) => {
  const {
    sanitizedBody: { messages },
  } = req;

  res.writeHead(200, {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
  });

  try {
    const userMessage = messages[messages.length - 1]?.content || "No message";

    const systemPrompt = `
You are **BÄR BUDDY**, a friendly Berlin innovation assistant.
Your task is to provide concise, locally relevant information, advice, or suggestions based on the user's input.

Focus on topics related to:
- Berlin's innovation ecosystem
- Tech, startups, jobs
- Events and meetups
- Integration and community
- Creative and cultural scene

Do not give generic fallback messages like "there wasn't a message". 
Always use the user input to give useful or inspiring information relevant to Berlin.
`;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      temperature: 0.7,
      max_tokens: 120,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("BÄR BUDDY Fallback Error:", err);
    res.status(500).end();
  }
};
