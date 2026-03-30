import { db } from "./firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { pinecone, indexName } from "./pinecone";
import { getEmbeddings } from "./ai";
import { crawlWebsite, ScrapedPage } from "./scraper";
import { chunkText } from "./utils";
import { v4 as uuidv4 } from "uuid";

export interface IngestionJob {
  id: string;
  userId: string;
  url: string;
  status: "starting" | "scraping" | "embedding" | "storing" | "completed" | "error";
  progress: number; // 0 to 100
  totalChunks?: number;
  processedChunks?: number;
  error?: string;
  createdAt: any;
  updatedAt: any;
}

/**
 * Main ingestion orchestration function.
 */
export async function runIngestion(jobId: string, userId: string, url: string) {
  const jobRef = doc(db, "ingestions", jobId);
  
  try {
    // 1. Scraping
    await updateDoc(jobRef, { status: "scraping", progress: 10, updatedAt: serverTimestamp() });
    const scrapedPages = await crawlWebsite(url, 15, 2); // Limit to 15 pages for safety

    if (scrapedPages.length === 0) {
      throw new Error("No pages found to scrape");
    }

    // 2. Chunking
    await updateDoc(jobRef, { status: "embedding", progress: 30, updatedAt: serverTimestamp() });
    const chunks: { text: string; source: string; title: string }[] = [];
    for (const page of scrapedPages) {
      const pageChunks = chunkText(page.content, 500);
      pageChunks.forEach(text => {
        chunks.push({ text, source: page.url, title: page.title });
      });
    }

    // 3. Embedding and Storing in Pinecone
    await updateDoc(jobRef, { 
      status: "storing", 
      progress: 50, 
      totalChunks: chunks.length,
      processedChunks: 0,
      updatedAt: serverTimestamp() 
    });

    const index = pinecone.Index(indexName);
    const batchSize = 10; // Batching for performance and rate limits
    
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      
      const vectors = await Promise.all(
        batch.map(async (chunk) => {
          const values = await getEmbeddings(chunk.text);
          return {
            id: uuidv4(),
            values,
            metadata: {
              text: chunk.text,
              source: chunk.source,
              title: chunk.title,
              userId: userId,
              ingestedAt: new Date().toISOString()
            }
          };
        })
      );

      // Upsert to Pinecone
      // Note: Reverted to { records: vectors } as the SDK type definition requires it in this version.
      await index.upsert({ records: vectors });
      
      const processed = i + batch.length;
      await updateDoc(jobRef, { 
          processedChunks: processed,
          progress: Math.min(99, 50 + Math.floor((processed / chunks.length) * 45)),
          updatedAt: serverTimestamp() 
      });
    }

    // 4. Finalizing
    await updateDoc(jobRef, { 
      status: "completed", 
      progress: 100, 
      updatedAt: serverTimestamp() 
    });

  } catch (error: any) {
    console.error(`Ingestion error for job ${jobId}:`, error);
    await updateDoc(jobRef, { 
      status: "error", 
      error: error.message || "Unknown error", 
      updatedAt: serverTimestamp() 
    });
  }
}

/**
 * Manual context ingestion helper.
 */
export async function ingestManualContext(userId: string, text: string, label: string = "Manual Entry") {
  const chunks = chunkText(text, 500);
  const index = pinecone.Index(indexName);
  
  console.log(`Ingesting manual context: ${chunks.length} chunks`);
  const vectors = await Promise.all(
    chunks.map(async (content) => {
      const values = await getEmbeddings(content);
      return {
        id: uuidv4(),
        values,
        metadata: {
          text: content,
          source: "manual",
          title: label,
          userId: userId,
          ingestedAt: new Date().toISOString()
        }
      };
    })
  );

  await index.upsert({ records: vectors });
  return chunks.length;
}
