import { NextRequest, NextResponse } from "next/server";
import { ingestManualContext } from "@/lib/ingest";

export async function POST(req: NextRequest) {
  try {
    const { text, userId, label } = await req.json();

    if (!text || !userId) {
      return NextResponse.json(
        { error: "Missing text or userId" },
        { status: 400 }
      );
    }

    const chunkCount = await ingestManualContext(userId, text, label || "Manual Entry");

    return NextResponse.json({
      message: "Manual context ingested successfully",
      chunks: chunkCount,
    });
  } catch (error: any) {
    console.error("API Context error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
