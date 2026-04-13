import { NextRequest, NextResponse } from "next/server";
import { runIngestion } from "@/lib/ingest";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { url, userId } = await req.json();

    if (!url || !userId) {
      return NextResponse.json(
        { error: "Missing url or userId" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const jobId = uuidv4();
    const jobRef = doc(collection(db, "ingestions"), jobId);

    // Initialize job document in Firestore
    await setDoc(jobRef, {
      id: jobId,
      userId,
      url,
      status: "starting",
      progress: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Start ingestion in "background"
    // Note: In some serverless environments, this might be interrupted if not awaited.
    // However, for MVP/Vercel, we'll trigger it and return the jobId.
    // If more reliability is needed, we'd use a queue (e.g., Upstash QStash).
    runIngestion(jobId, userId, url).catch((err) =>
      console.error("Delayed ingestion error:", err)
    );

    return NextResponse.json({
      message: "Ingestion started",
      jobId,
    });
  } catch (error: any) {
    console.error("API Ingest error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
