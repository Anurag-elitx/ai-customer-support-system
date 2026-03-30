import Groq from "groq-sdk";
import { HfInference } from "@huggingface/inference";

if (!process.env.GROQ_API_KEY) {
  console.warn("GROQ_API_KEY is not defined");
}

if (!process.env.HF_TOKEN) {
  console.warn("HF_TOKEN is not defined");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Only if needed for client-side, but usually done in API routes
});

export const hf = new HfInference(process.env.HF_TOKEN);

// Helper for embeddings (Hugging Face)
export async function getEmbeddings(text: string) {
  try {
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });
    return response as number[];
  } catch (error: any) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}
