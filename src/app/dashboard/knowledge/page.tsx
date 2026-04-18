"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, limit } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { 
  Globe, 
  FileText, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BarChart3,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function KnowledgePage() {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [manualText, setManualText] = useState("");
  const [isIngesting, setIsIngesting] = useState(false);
  const [activeTab, setActiveTab] = useState<"auto" | "manual">("auto");

  // Fetch recent ingestion jobs
  const [jobsValue, loadingJobs] = useCollection(
    user ? query(
      collection(db, "ingestions"),
      where("userId", "==", user.uid),
      limit(5)
    ) : null
  );

  const handleAutoIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || isIngesting) return;

    setIsIngesting(true);
    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, userId: user?.uid }),
      });
      if (!res.ok) throw new Error("Failed to start ingestion");
      setUrl("");
    } catch (err) {
      console.error(err);
      alert("Error starting ingestion");
    } finally {
      setIsIngesting(false);
    }
  };

  const handleManualIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText || isIngesting) return;

    setIsIngesting(true);
    try {
      const res = await fetch("/api/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: manualText, userId: user?.uid, label: "Manual Entry" }),
      });
      if (!res.ok) throw new Error("Failed to save context");
      setManualText("");
      alert("Context saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving context");
    } finally {
      setIsIngesting(false);
    }
  };

  const jobs = jobsValue?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Knowledge Base</h1>
        <p className="text-slate-400 mt-1">Train your AI agent by providing website URLs or manual documentation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab("auto")}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === "auto" ? "text-indigo-400 border-b-2 border-indigo-400 bg-indigo-400/5" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Website Sync
              </button>
              <button 
                onClick={() => setActiveTab("manual")}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === "manual" ? "text-indigo-400 border-b-2 border-indigo-400 bg-indigo-400/5" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Manual Entry
              </button>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === "auto" ? (
                  <motion.form 
                    key="auto"
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleAutoIngest} 
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Site URL</label>
                      <div className="relative group">
                        <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input 
                          type="url" 
                          placeholder="https://yourbusiness.com" 
                          required
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-600 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500">The agent will crawl up to 15 pages from this domain.</p>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isIngesting}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2"
                    >
                      {isIngesting ? <Clock size={18} className="animate-spin" /> : <Plus size={18} />}
                      Start Ingestion
                    </button>
                  </motion.form>
                ) : (
                  <motion.form 
                    key="manual"
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleManualIngest}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Context Content</label>
                      <textarea 
                        placeholder="Paste FAQs, text documentation, or business policies here..." 
                        rows={10}
                        required
                        value={manualText}
                        onChange={(e) => setManualText(e.target.value)}
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl p-4 text-sm focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-600 resize-none shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isIngesting}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2"
                    >
                      {isIngesting ? <Clock size={18} className="animate-spin" /> : <FileText size={18} />}
                      Save Manual Context
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
              <Clock size={16} className="text-indigo-400" />
              Recent Syncs
            </h3>
            
            <div className="space-y-4">
              {loadingJobs ? (
                 <div className="flex justify-center p-4"><Clock className="animate-spin text-slate-700" /></div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-600 italic">No syncs yet.</p>
                </div>
              ) : (
                jobs.map((job: any) => (
                  <div key={job.id} className="p-4 bg-white/[0.05] rounded-xl border border-white/10 space-y-3 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-200 truncate">{job.url}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-wider font-semibold">
                          {job.status}
                        </p>
                      </div>
                      {job.status === "completed" ? (
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      ) : job.status === "error" ? (
                        <AlertCircle size={16} className="text-rose-500 flex-shrink-0" />
                      ) : (
                        <Clock size={16} className="text-indigo-400 animate-pulse flex-shrink-0" />
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${job.progress || 0}%` }}
                        className={`h-full ${job.status === "error" ? "bg-rose-500" : "bg-indigo-500"}`}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/20 flex items-center gap-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <BarChart3 size={24} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Storage Status</p>
              <p className="text-sm font-bold text-slate-200">Pinecone Index Warm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
