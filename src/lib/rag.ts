import { pinecone, indexName } from "./pinecone";
import { getEmbeddings } from "./ai";
import { db } from "./firebase";
import { collection, query, where, orderBy, limit, getDocs, addDoc, serverTimestamp, doc, setDoc, updateDoc } from "firebase/firestore";

/**
 * Retrieves relevant context chunks from Pinecone.
 */
export async function getRelevantContext(queryText: string, userId: string, topK: number = 3) {
  const embedding = await getEmbeddings(queryText);
  const index = pinecone.Index(indexName);

  const queryResponse = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
    filter: { userId: userId } // Ensure we only get context for the specific business
  });

  const context = queryResponse.matches
    .map((match) => (match.metadata as any).text)
    .filter(Boolean)
    .join("\n\n---\n\n");

  return context;
}

/**
 * Fetches the recent chat history for a conversation from Firestore.
 */
export async function getChatHistory(conversationId: string, maxMessages: number = 5) {
  const historyRef = collection(db, "conversations", conversationId, "messages");
  const q = query(historyRef, orderBy("createdAt", "desc"), limit(maxMessages));
  
  const querySnapshot = await getDocs(q);
  const messages = querySnapshot.docs.map(doc => doc.data()).reverse();
  
  return messages.map(m => ({
    role: m.role,
    content: m.content
  }));
}

/**
 * Saves a message to a conversation in Firestore.
 * Also updates the parent conversation's metadata for sorting.
 */
export async function saveMessage(conversationId: string, role: string, content: string, userId: string) {
  const convRef = doc(db, "conversations", conversationId);
  const historyRef = collection(convRef, "messages");
  
  // Update parent doc for list sorting and security
  await setDoc(convRef, {
    userId,
    updatedAt: serverTimestamp(),
    lastMessage: content.substring(0, 100)
  }, { merge: true });

  await addDoc(historyRef, {
    role,
    content,
    createdAt: serverTimestamp()
  });
}
