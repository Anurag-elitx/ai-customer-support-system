"use client";

import { useAuth } from "@/contexts/AuthContext";
import { 
  Code, 
  Copy, 
  Check, 
  Globe,
  Sparkles,
  LogOut,
  Zap,
  Activity,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const embedCode = `<!-- SupportAI Widget -->
<script 
  src="http://localhost:3000/widget.js" 
  data-user-id="${user?.uid || 'YOUR_USER_ID'}"
  async
></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-slate-400 mt-1">Configure your widget and get your installation code.</p>
      </div>

      {/* Installation Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Code size={20} className="text-indigo-400" />
          Installation
        </h2>
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
          <p className="text-sm text-slate-400">
            Copy and paste this script tag into your website's <code className="text-indigo-300 font-mono">&lt;head&gt;</code> or <code className="text-indigo-300 font-mono">&lt;body&gt;</code> to deploy your AI agent.
          </p>
          <div className="relative group">
            <pre className="bg-black/40 border border-white/10 rounded-xl p-6 text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              {embedCode}
            </pre>
            <button 
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-all border border-slate-700"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </section>

      {/* Meaningful Contextual Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI Architecture Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles size={20} className="text-indigo-400" />
            AI Architecture
          </h2>
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Agent Persona</label>
              <div className="grid grid-cols-3 gap-2">
                {["Professional", "Friendly", "Technical"].map((tone) => (
                  <button 
                    key={tone}
                    className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                      tone === "Professional" 
                        ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400" 
                        : "bg-white/5 border-white/5 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Response Verbosity</label>
              <div className="h-1.5 w-full bg-white/5 rounded-full relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-gradient-to-r from-indigo-600 to-purple-500" />
              </div>
              <div className="flex justify-between text-[9px] font-bold text-slate-600 uppercase tracking-tighter">
                <span>Concise</span>
                <span className="text-indigo-400">Balanced</span>
                <span>Detailed</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg"><Check size={14} className="text-emerald-400" /></div>
                  <span className="text-xs font-medium text-slate-300">Auto-Correction</span>
               </div>
               <div className="w-8 h-4 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
               </div>
            </div>
          </div>
        </div>

        {/* Security & Access Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe size={20} className="text-indigo-400" />
            Security & Access
          </h2>
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Authorized Domains</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="https://*.yourdomain.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Usage Limit (Tokens/Mo)</label>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-medium text-white font-heading">500,000</span>
                <span className="text-[10px] font-bold text-indigo-400 mb-1">INCREASE LIMIT</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full">
                <div className="h-full w-1/4 bg-indigo-500 rounded-full" />
              </div>
            </div>

            <div className="pt-2">
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <LogOut size={14} />
                Rotate API Keys
              </button>
            </div>
          </div>
        </div>

        {/* Integrations & Hubs Section */}
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap size={20} className="text-indigo-400" />
            Integrations & Hubs
          </h2>
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4 group hover:border-indigo-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-[#4A154B]/10 rounded-xl border border-[#4A154B]/20"><Activity size={20} className="text-[#4A154B]" /></div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">CONNECTED</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Slack Pulse</p>
                  <p className="text-[10px] text-slate-500 mt-1">Real-time alerts for unhandled AI queries.</p>
                </div>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4 group hover:border-indigo-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-[#5865F2]/10 rounded-xl border border-[#5865F2]/20"><Zap size={20} className="text-[#5865F2]" /></div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-500/10 text-slate-500 border border-white/5">DISCONNECTED</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Discord Nexus</p>
                  <p className="text-[10px] text-slate-500 mt-1">Direct bridge for community-driven support.</p>
                </div>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4 group hover:border-indigo-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20"><ShieldCheck size={20} className="text-indigo-400" /></div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">WEBHOOKS: 2</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Integrations Hub</p>
                  <p className="text-[10px] text-slate-500 mt-1">Manage external triggers & data pipelines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
