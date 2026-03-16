"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SupportCard } from "@/components/ui/SupportCard";

export default function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SupportCard className="p-12 md:p-20 text-center border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.1)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8"
          >
            <div className="w-1 h-1 rounded-full bg-indigo-400" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-indigo-400">
              Ready for Deployment
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-medium tracking-tighter mb-8 font-heading leading-[1.1]"
          >
            Expand Your <br />
            <span className="text-gradient-support">Digital Frontier.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Join the elite organizations deploying Support AI to redefine the 
            standard of autonomous customer engagement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/register"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-slate-950 font-medium hover:bg-slate-200 transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              suppressHydrationWarning
            >
              Get Started for Free
            </Link>
            <a
              href="#"
              className="group flex items-center gap-2 text-sm font-medium text-white transition-colors"
              suppressHydrationWarning
            >
              Consult an Architect
              <ArrowUpRight className="w-4 h-4 text-indigo-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </SupportCard>
      </div>
    </section>
  );
}
