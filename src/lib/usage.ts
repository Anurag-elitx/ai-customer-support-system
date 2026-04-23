import { db } from "./firebase";
import { collection, doc, setDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export interface UserRequestLog {
  id: string;
  business_id: string;
  website_url: string | null;
  request_timestamp: any;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  model_used: string;
  status: "success" | "failed" | "pending";
  error_message?: string | null;
}

/**
 * Non-blocking helper to log token usage into Firestore.
 */
export async function logTokenUsage(data: Omit<UserRequestLog, "id" | "request_timestamp" | "website_url">) {
  try {
    const id = uuidv4();
    const logRef = doc(collection(db, "user_request_logs"), id);

    // Attempt to fetch the business's latest website_url from ingestions
    let website_url = null;
    try {
      const ingestionsRef = collection(db, "ingestions");
      const q = query(
        ingestionsRef,
        where("userId", "==", data.business_id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Sort in memory to avoid needing a composite index in Firestore right away
        const docs = querySnapshot.docs.map(d => d.data());
        docs.sort((a, b) => {
          const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return bTime - aTime;
        });
        website_url = docs[0].url || null;
      }
    } catch (e) {
      console.warn("Could not fetch website_url for token log:", e);
    }

    await setDoc(logRef, {
      id,
      ...data,
      website_url,
      request_timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to log token usage:", err);
  }
}
