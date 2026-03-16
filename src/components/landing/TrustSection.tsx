"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Server } from "lucide-react";

const trustItems = [
    {
        icon: ShieldCheck,
        title: "Enterprise-Grade Security",
        description:
            "256-bit encryption on all data in transit and at rest. Your customer data stays protected.",
    },
    {
        icon: Lock,
        title: "SOC-2 Ready Architecture",
        description:
            "Built with compliance-first design patterns. Infrastructure that meets institutional standards.",
    },
    {
        icon: Eye,
        title: "Full Transparency",
        description:
            "Every AI response is traceable. See exactly what data was used to generate each answer.",
    },
    {
        icon: Server,
        title: "99.9% Uptime Guarantee",
        description:
            "Deployed on globally distributed infrastructure. Your AI agent is always on, always ready.",
    },
];

export default function TrustSection() {
    return (
        <section className="relative py-24 md:py-32">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-5">
                        Security
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-5 font-[family-name:var(--font-heading)]">
                        Built On Trust
                    </h2>
                    <p className="text-lg text-white/45 max-w-2xl mx-auto">
                        Infrastructure designed with enterprise standards so businesses of
                        every size can deploy with confidence.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {trustItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative glass-card glass-card-hover rounded-2xl p-7 text-center transition-all duration-300 group overflow-hidden"
                        >
                            {/* Glow orb */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-brand-500/5 blur-3xl group-hover:bg-brand-500/10 transition-all duration-500" />

                            <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-violet/10 border border-white/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform">
                                    <item.icon className="w-7 h-7 text-brand-400" />
                                </div>
                                <h3 className="text-base font-medium text-white mb-2 font-[family-name:var(--font-heading)]">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-white/40 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
