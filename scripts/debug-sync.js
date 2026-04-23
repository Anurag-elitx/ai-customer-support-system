const { Pinecone } = require("@pinecone-database/pinecone");
const { HfInference } = require("@huggingface/inference");
require("dotenv").config({ path: ".env.local" });

async function test() {
  console.log("PINECONE_API_KEY:", process.env.PINECONE_API_KEY ? "Defined" : "Not Defined");
  console.log("HF_TOKEN:", process.env.HF_TOKEN ? "Defined" : "Not Defined");
  console.log("PINECONE_INDEX_NAME:", process.env.PINECONE_INDEX_NAME);

  try {
    const hf = new HfInference(process.env.HF_TOKEN);
    const embedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: "Hello world",
    });
    console.log("HF Embedding successful, length:", embedding.length);

    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME || "support-ai-index");
    
    // Test upsert with various formats if needed, but let's try the suspected one first
    console.log("Testing Pinecone upsert with exact format used in code...");
    const testVector = {
      id: "test-" + Date.now(),
      values: new Array(384).fill(0.1),
      metadata: { text: "test content", userId: "test-user" }
    };

    try {
      // Trying the format used in src/lib/ingest.ts: index.upsert({ records: vectors })
      await index.upsert({ records: [testVector] });
      console.log("Upsert with { records: [v] } suceeded!");
    } catch (e) {
      console.log("Upsert with { records: [v] } FAILED:", e.message);
      try {
        // Trying the standard format: index.upsert([v])
        await index.upsert([testVector]);
        console.log("Upsert with standard [v] succeeded!");
      } catch (e2) {
        console.log("Standard upsert also failed:", e2.message);
      }
    }
    
  } catch (err) {
    console.error("Test failed:", err);
  }
}

test();
