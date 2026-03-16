"use client";

import { motion } from "framer-motion";
import { Zap, Brain, Clock } from "lucide-react";

const cards = [
    {
        icon: Zap,
        title: "Instant Deployment",
        description:
            "Go live in under 15 minutes. Enter your URL, train your AI, and embed the widget — that's it.",
    },
    {
        icon: Brain,
        title: "Context-Aware AI",
        description:
            "Your AI agent understands your business deeply. Trained on your website content and custom context.",
    },
    {
        icon: Clock,
        title: "24/7 Autonomous Support",
        description:
            "Never miss a customer query. AI handles support around the clock with human-level accuracy.",
    },
];

export default function ValueProposition() {
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
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-5 font-[family-name:var(--font-heading)]">
                        Smart Support, Zero Hassle.
                    </h2>
                    <p className="text-lg text-white/45 max-w-2xl mx-auto">
                        Transform your customer support with AI that learns your business and
                        grows with you — no complex setup required.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-6 group-hover:bg-brand-500/20 transition-colors">
                                <card.icon className="w-6 h-6 text-brand-400" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-3 font-[family-name:var(--font-heading)]">
                                {card.title}
                            </h3>
                            <p className="text-sm text-white/45 leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
