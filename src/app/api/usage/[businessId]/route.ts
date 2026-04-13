import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(
  req: NextRequest,
  { params }: { params: any }
) {
  try {
    // Next.js 15+ handles params as a Promise, so we await it to be safe
    const resolvedParams = await params;
    const businessId = resolvedParams.businessId;

    if (!businessId) {
      return NextResponse.json(
        { error: "Missing businessId" },
        { status: 400 }
      );
    }

    const logsRef = collection(db, "user_request_logs");
    const q = query(logsRef, where("business_id", "==", businessId));
    const querySnapshot = await getDocs(q);

    let totalRequests = 0;
    let totalPromptTokens = 0;
    let totalCompletionTokens = 0;
    let successCount = 0;
    let failedCount = 0;
    let firstRequestTime = Infinity;
    let lastRequestTime = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalRequests++;
      
      if (data.status === "success") {
        successCount++;
      } else if (data.status === "failed") {
        failedCount++;
      }

      totalPromptTokens += data.prompt_tokens || 0;
      totalCompletionTokens += data.completion_tokens || 0;

      const ts = data.request_timestamp?.toMillis ? data.request_timestamp.toMillis() : 0;
      if (ts > 0) {
        if (ts < firstRequestTime) firstRequestTime = ts;
        if (ts > lastRequestTime) lastRequestTime = ts;
      }
    });

    const totalTokens = totalPromptTokens + totalCompletionTokens;

    return NextResponse.json({
      business_id: businessId,
      total_requests: totalRequests,
      total_tokens: totalTokens,
      tokens_breakdown: {
        prompt: totalPromptTokens,
        completion: totalCompletionTokens,
      },
      status_counts: {
        success: successCount,
        failed: failedCount,
      },
      first_request_date: firstRequestTime === Infinity ? null : new Date(firstRequestTime).toISOString(),
      most_recent_request_date: lastRequestTime === 0 ? null : new Date(lastRequestTime).toISOString(),
    });
  } catch (error: any) {
    console.error("API Usage GET error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
