import { NextRequest } from "next/server";
import { groq } from "@/lib/ai";
import { getRelevantContext, saveMessage, getChatHistory } from "@/lib/rag";
import { getSystemPrompt } from "@/lib/prompts";
import { nanoid } from "nanoid";
import { logTokenUsage } from "@/lib/usage";

export async function POST(req: NextRequest) {
  try {
    const { message, userId, conversationId } = await req.json();

    if (!message || !userId) {
      return new Response(JSON.stringify({ error: "Missing message or userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const currentConvId = conversationId || nanoid();

    // 1. Get relevant context from Pinecone
    const context = await getRelevantContext(message, userId, 3);

    // 2. Fetch history (if applicable)
    let history: any[] = [];
    try {
      history = conversationId ? await getChatHistory(conversationId, 5) : [];
    } catch (e) {
      console.warn("Failed to fetch chat history (Firestore rules?):", e);
    }

    // 3. Construct prompt
    const systemPrompt = getSystemPrompt(context);
    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ];

    // 4. Call Groq with streaming
    let response;
    try {
      response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messages as any,
        stream: true,
        temperature: 0.1, // Keep it focused on the context
      });
    } catch (err: any) {
      // Fire-and-forget log
      logTokenUsage({
        business_id: userId,
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
        model_used: "llama-3.3-70b-versatile",
        status: "failed",
        error_message: err.message || "Failed to create completion"
      });
      throw err;
    }

    // Save user message to Firestore
    try {
      await saveMessage(currentConvId, "user", message);
    } catch (e) {
      console.warn("Failed to save user message (Firestore rules?):", e);
    }

    // 5. Create a readable stream for the assistant response
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        let finalUsage: any = null;
        
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              fullResponse += content;
              controller.enqueue(new TextEncoder().encode(content));
            }
            
            // Extract usage from the final chunk
            const chunkAny = chunk as any;
            if (chunkAny.x_groq?.usage) {
              finalUsage = chunkAny.x_groq.usage;
            } else if (chunkAny.usage) {
              finalUsage = chunkAny.usage;
            }
          }
          
          // Save assistant response once complete
          try {
            await saveMessage(currentConvId, "assistant", fullResponse);
          } catch (e) {
            console.warn("Failed to save assistant message (Firestore rules?):", e);
          }

          // Log token usage
          if (finalUsage) {
            logTokenUsage({
              business_id: userId,
              prompt_tokens: finalUsage.prompt_tokens || 0,
              completion_tokens: finalUsage.completion_tokens || 0,
              total_tokens: finalUsage.total_tokens || 0,
              model_used: "llama-3.3-70b-versatile",
              status: "success",
              error_message: null
            });
          }
          controller.close();
        } catch (err: any) {
          logTokenUsage({
             business_id: userId,
             prompt_tokens: 0,
             completion_tokens: 0,
             total_tokens: 0,
             model_used: "llama-3.3-70b-versatile",
             status: "failed",
             error_message: err.message || "Streaming error"
          });
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Conversation-Id": currentConvId
      }
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
