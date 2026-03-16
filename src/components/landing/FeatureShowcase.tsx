"use client";

import { motion } from "framer-motion";
import {
  Route,
  MessageSquareHeart,
  Code2,
  Sparkles,
  Zap,
  ShieldCheck
} from "lucide-react";
import { SupportCard } from "@/components/ui/SupportCard";

const features = [
  {
    tag: "Intelligence",
    title: "Neural Content Recovery",
    description: "The most advanced RAG pipeline in existence. We don't just search; we understand the deepest semantic relationships in your data.",
    icon: Zap,
    color: "from-indigo-500 to-indigo-400"
  },
  {
    tag: "Emotion",
    title: "Sentient Sentiment Analysis",
    description: "Real-time emotional tracking that detects frustration 300ms before it peaks, allowing for proactive human intervention.",
    icon: MessageSquareHeart,
    color: "from-purple-500 to-purple-400"
  },
  {
    tag: "Deploy",
    title: "Zero-Latency Integration",
    description: "A single line of code that initializes a world-class support infrastructure. Responsive, resilient, and remarkably fast.",
    icon: Code2,
    color: "from-pink-500 to-pink-400"
  }
];

export default function FeatureShowcase() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400">
              Platform Features
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-medium tracking-tight font-heading"
          >
            Engineered for <br />
            <span className="text-gradient-support">Total Autonomy.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                marginTop: i === 1 ? "4rem" : "0", // Asymmetric offset
              }}
            >
              <SupportCard className="h-full border-white/20 group hover:border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} p-[1px]`}>
                    <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="inline-block px-2 py-0.5 rounded-md bg-white/5 border border-white/5 mb-4">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-slate-500">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-medium mb-4 font-heading text-white group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="support-card p-4 rounded-full border-white/5 flex items-center justify-around divide-x divide-white/5">
                  <div className="flex -space-x-1">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="w-5 h-5 rounded-full border border-slate-900 bg-slate-800" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Live System
                  </span>
                </div>
              </SupportCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
