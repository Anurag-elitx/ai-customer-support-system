"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { VoiceOrb } from "../voice/VoiceOrb";
import { SupportCard } from "@/components/ui/SupportCard";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Visual */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-visual.png')" }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-medium tracking-widest uppercase text-indigo-400">
              Protocol v2.0 Active
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-normal tracking-tighter leading-[1] mb-8 font-heading"
          >
            Human Support. <br />
            <span className="text-gradient-support font-medium">AI Precision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-sans font-normal"
          >
            The most sophisticated AI customer support infrastructure ever built. 
            Deploy autonomous agents that learn from your entire digital presence 
            to deliver instant, human-grade resolutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link
              href="/register"
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-400 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all active:scale-95 text-lg"
            >
              Initiate Protocol
            </Link>
            <a
              href="#"
              className="group flex items-center gap-2 text-sm font-medium text-white p-2"
            >
              View Demonstration
              <ArrowUpRight className="w-4 h-4 text-indigo-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
