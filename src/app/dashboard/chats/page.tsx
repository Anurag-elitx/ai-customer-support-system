"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { 
  MessageSquare, 
  Search, 
  User, 
  Bot, 
  Clock, 
  ChevronRight,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatsPage() {
  const { user } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // Fetch conversations
  const [convosValue, loadingConvos] = useCollection(
    user ? query(
      collection(db, "conversations"),
      orderBy("updatedAt", "desc"),
      limit(50)
    ) : null
  );

  // Filter conversations: Show if it belongs to the user OR if it has no owner (legacy)
  const convos = convosValue?.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter((convo: any) => !convo.userId || convo.userId === user?.uid) || [];

  return (
    <div className="flex h-[calc(100vh-160px)] gap-6 overflow-hidden">
      {/* List Sidebar */}
      <div className="w-1/3 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Conversations</h1>
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-500 cursor-pointer hover:text-slate-300">
            <Filter size={16} />
          </div>
        </div>

        <div className="relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
          {loadingConvos ? (
            <div className="flex justify-center p-8"><Clock className="animate-spin text-slate-800" /></div>
          ) : convos.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 text-slate-600">
                <p className="text-sm">No conversations found.</p>
            </div>
          ) : (
            convos.map((convo: any) => (
              <button
                key={convo.id}
                onClick={() => setSelectedChatId(convo.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all border backdrop-blur-md shadow-lg ${
                  selectedChatId === convo.id 
                    ? "bg-indigo-600/30 border-indigo-500/50 shadow-indigo-500/10 ring-1 ring-white/10" 
                    : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{convo.id.substring(0, 8)}</span>
                  <span className="text-[10px] text-slate-600">{convo.updatedAt?.toDate()?.toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  Last active: {convo.updatedAt?.toDate()?.toLocaleTimeString()}
                </p>
                <div className="mt-2 flex items-center justify-between">
                   <div className="flex -space-x-1">
                      <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[8px]"><User size={10}/></div>
                      <div className="w-5 h-5 rounded-full bg-indigo-900 border-2 border-slate-900 flex items-center justify-center text-[8px]"><Bot size={10}/></div>
                   </div>
                   <ChevronRight size={14} className={selectedChatId === convo.id ? "text-indigo-400" : "text-slate-700"} />
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-black/50">
        <AnimatePresence mode="wait">
          {selectedChatId ? (
            <ChatTranscript key={selectedChatId} chatId={selectedChatId} />
          ) : (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4"
            >
               <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-700 mb-2">
                  <MessageSquare size={32} />
               </div>
               <h3 className="text-lg font-bold text-slate-300">Select a conversation</h3>
               <p className="text-sm text-slate-600 max-w-xs">
                  Choose a chat from the sidebar to view the full transcript and AI interactions.
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ChatTranscript({ chatId }: { chatId: string }) {
  const [messagesValue, loading] = useCollection(
    query(collection(db, "conversations", chatId, "messages"), orderBy("createdAt", "asc"))
  );

  const messages = messagesValue?.docs.map(doc => doc.data()) || [];

  return (
    <div className="flex flex-col h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900/20 via-transparent to-transparent">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <h2 className="font-bold text-slate-200">Transcript: <span className="text-indigo-400 font-mono text-sm">{chatId}</span></h2>
            <div className="flex gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 uppercase tracking-tighter">Live Session</span>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {loading ? (
                <div className="h-full flex items-center justify-center"><Clock size={24} className="animate-spin text-slate-700" /></div>
            ) : messages.length === 0 ? (
                <p className="text-center text-slate-600 italic py-12">No messages in this conversation.</p>
            ) : (
                messages.map((m, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`flex gap-4 max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                            <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg ${
                                m.role === "user" ? "bg-slate-800 border border-slate-700" : "bg-indigo-600 shadow-indigo-500/10"
                            }`}>
                                {m.role === "user" ? <User size={20} className="text-slate-400" /> : <Bot size={20} className="text-white" />}
                            </div>
                            <div className={`space-y-1 ${m.role === "user" ? "text-right" : "text-left"}`}>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-1">
                                    {m.role === "user" ? "User" : "Assistant"}
                                </p>
                                <div className={`p-4 rounded-3xl text-sm leading-relaxed backdrop-blur-xl ${
                                    m.role === "user" 
                                        ? "bg-indigo-600/40 text-indigo-50 text-shadow-sm border border-white/20 rounded-tr-none px-5 shadow-[0_4px_15px_rgba(79,70,229,0.2)]" 
                                        : "bg-white/[0.08] text-white border border-white/20 rounded-tl-none px-5 shadow-xl shadow-black/20"
                                }`}>
                                    {m.content}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    </div>
  );
}
