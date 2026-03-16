"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is SupportAI?",
        answer:
            "SupportAI is an AI-powered customer support platform that lets businesses deploy autonomous support agents in minutes. Simply enter your website URL, add any custom business context, and our AI trains itself on your data to answer customer queries via an embeddable chat widget.",
    },
    {
        question: "How does the AI learn my business?",
        answer:
            "When you enter your website URL, our system crawls your public pages, extracts text content, chunks it into meaningful segments, generates vector embeddings, and stores them in a vector database. You can also provide custom FAQs, policies, and tone instructions. The AI uses Retrieval-Augmented Generation (RAG) to search this knowledge base before answering any query.",
    },
    {
        question: "How long does setup take?",
        answer:
            "Most businesses go live in under 15 minutes. Enter your URL, wait for the crawl to complete, add any custom context, then copy the embed code into your website. That's it — your AI agent is live.",
    },
    {
        question: "What happens when the AI doesn't know the answer?",
        answer:
            "Every response includes a confidence score. When the AI's confidence is low, it displays a helpful fallback message and suggests the customer reach out to a human agent. You can view these escalated conversations in your admin dashboard.",
    },
    {
        question: "Can I customize the chat widget's appearance?",
        answer:
            "Yes. You can customize the primary brand color, button position, and welcome message from your dashboard settings. The widget is fully responsive and works beautifully on desktop and mobile.",
    },
    {
        question: "Is my data secure?",
        answer:
            "Absolutely. All data is encrypted in transit and at rest. We enforce HTTPS, rate limiting, and abuse prevention. Your business data is isolated and never used to train models for other customers.",
    },
    {
        question: "What's the pricing?",
        answer:
            "We offer a free trial to get started. Our plans are designed to scale with your business — from startups handling a few conversations a day to enterprises managing thousands. Contact us for custom pricing.",
    },
    {
        question: "Can I integrate with my existing CRM?",
        answer:
            "CRM integrations are on our Phase 2 roadmap. Currently, you can monitor all conversations and export data from the admin dashboard. We're working on integrations with popular CRMs and helpdesk tools.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative py-24 md:py-32">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-5 font-[family-name:var(--font-heading)]">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-white/45">
                        Get answers to the most common questions about SupportAI.
                    </p>
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={faq.question}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <span className="text-sm md:text-base font-medium text-white pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-5 pb-5 text-sm text-white/45 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
