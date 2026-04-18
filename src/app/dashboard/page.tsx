"use client";

import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  MessageCircle, 
  Zap, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import { SupportCard } from "@/components/ui/SupportCard";

const stats = [
  { name: "Total Conversations", value: "24", icon: MessageCircle, trend: "+12%", color: "text-indigo-400" },
  { name: "Avg. Response Time", value: "1.2s", icon: Clock, trend: "-0.4s", color: "text-purple-400" },
  { name: "Resolution Rate", value: "88%", icon: Zap, trend: "+5%", color: "text-pink-400" },
  { name: "Active Users", value: "156", icon: Users, trend: "+18%", color: "text-blue-400" },
];

export default function OverviewPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-400">
              System Operational
            </span>
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tighter font-heading italic uppercase">
            Overview<span className="text-purple-500">_</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-md leading-relaxed">
            Welcome back, Command. Neural pathways are stable. <span className="text-slate-300 font-bold">{user?.displayName || "Agent"}</span> is monitoring all active streams.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="h-10 px-4 flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Protocol v2.4
          </div>
        </div>
      </div>

      {/* Stats Grid - Asymmetric Depth */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SupportCard className="h-full border-white/20 group hover:border-white/40 transition-all duration-300 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={18} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${
                  stat.trend.startsWith('+') 
                    ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                    : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                }`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{stat.name}</p>
              <p className="text-3xl font-medium text-white mt-2 leading-none font-heading">{stat.value}</p>
              
              {/* Decorative Sparkline (Faked for Aesthetic) */}
              <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "60%" }}
                   transition={{ duration: 1.5, delay: i * 0.2 }}
                   className={`h-full bg-gradient-to-r from-transparent to-indigo-500`} 
                />
              </div>
            </SupportCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2">
          <SupportCard className="h-[450px] border-white/20 flex flex-col p-0 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Activity Analytics</h3>
                <p className="text-[10px] text-slate-500 mt-1 uppercase">Neural Stream Volume (last 24h)</p>
              </div>
              <BarChart3 className="text-indigo-400 w-5 h-5" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-indigo-500/10 blur-[40px] rounded-full scale-150 animate-pulse" />
                <div className="relative w-20 h-20 rounded-full border border-indigo-500/10 flex items-center justify-center bg-black">
                  <Sparkles className="text-indigo-500 w-8 h-8" />
                </div>
              </div>
              <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-2">Analyzing Data Structure...</p>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                The neural engine is currently processing high-fidelity metrics. 
                Full visualization protocols will be online shortly.
              </p>
            </div>
          </SupportCard>
        </div>

        {/* Status Panels */}
        <div className="space-y-6">
          <SupportCard className="border-indigo-500/20 bg-indigo-500/5">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
              INTEGRATION_STATUS
            </h3>
            <div className="space-y-6">
              {[
                { label: "Neural Widget", status: "Active", delay: 0 },
                { label: "Vector Search", status: "Stable", delay: 1 },
                { label: "Neural Engine", status: "Synchronized", delay: 2 }
              ].map((item, idx) => (
                <div key={item.label} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                    <span className="text-[9px] font-black text-purple-400 uppercase tracking-tighter transition-all group-hover:text-white">
                      {item.status}
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 + (idx * 0.2) }}
                      className="h-full bg-purple-500 origin-left" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </SupportCard>

          <SupportCard className="border-white/5">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6 italic">Quick_Operations</h3>
            <div className="space-y-3">
              {[
                "Neural Knowledge Sync",
                "Calibrate AI Resonance",
                "Review Neural Conversations"
              ].map((action, i) => (
                <button 
                  key={action}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10 group active:scale-95"
                >
                  <span className="uppercase tracking-widest">{action}</span>
                  <ChevronRight size={14} className="text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </SupportCard>
        </div>
      </div>
    </div>
  );
}
