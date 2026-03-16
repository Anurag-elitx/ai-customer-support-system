"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { VoiceOrb } from "../voice/VoiceOrb";
import { SupportCard } from "@/components/ui/SupportCard";

export default function VoiceAgent() {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Block (Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Decorative Rings */}
              <div className="absolute inset-x-[-50%] inset-y-[-50%] border border-indigo-500/10 rounded-full scale-[1.5] animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-x-[-50%] inset-y-[-50%] border border-purple-500/10 rounded-full scale-[2] animate-[spin_30s_linear_infinite_reverse]" />
              
              <div className="p-12 support-card rounded-full border-indigo-500/20 bg-slate-900/40 relative z-20 shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                <VoiceOrb isListening={true} isSpeaking={false} />
              </div>
              
              {/* Floating Status Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 px-4 py-3 support-card rounded-2xl border-indigo-500/30 z-30 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse" />
                <span className="text-[10px] font-medium uppercase tracking-tighter">Live Response</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 px-4 py-3 support-card rounded-2xl border-purple-500/30 z-30 flex items-center gap-3"
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-[10px] font-medium uppercase tracking-tighter">98% Accuracy</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Block (Right) */}
          <div className="text-left order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-medium tracking-widest uppercase text-indigo-400">
                Voice Protocol v1.0
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1.1] mb-8 font-heading"
            >
              Autonomous <br />
              <span className="text-gradient-support font-normal">Voice Support.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed font-sans"
            >
              Beyond text. Deploy voice agents that understand tone, context, and 
              intent. Support AI delivers human-grade vocal interactions for a 
              truly unified customer experience.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
