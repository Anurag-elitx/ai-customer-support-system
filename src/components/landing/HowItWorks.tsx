"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Globe,
    Database,
    Cpu,
    MessageCircle,
    LayoutDashboard,
} from "lucide-react";

const steps = [
    {
        icon: Globe,
        title: "Enter Your Website URL",
        description:
            "Simply paste your website URL. Our crawler automatically extracts all relevant content from your public pages.",
        status: "Step 1",
        progress: 100,
        accent: "from-brand-500 to-brand-600",
    },
    {
        icon: Database,
        title: "AI Learns Your Business",
        description:
            "Content is chunked, embedded, and stored in a vector database. Add custom FAQs, policies, and tone preferences.",
        status: "Step 2",
        progress: 100,
        accent: "from-accent-cyan to-teal-500",
    },
    {
        icon: Cpu,
        title: "AI Agent Generated",
        description:
            "A context-aware AI agent is created with your business knowledge baked in. RAG-powered responses only use your data.",
        status: "Step 3",
        progress: 100,
        accent: "from-accent-violet to-purple-500",
    },
    {
        icon: MessageCircle,
        title: "Embed Chat Widget",
        description:
            "Copy a single script tag and paste it into your website. Your AI support agent goes live instantly.",
        status: "Step 4",
        progress: 85,
        accent: "from-pink-500 to-rose-500",
    },
    {
        icon: LayoutDashboard,
        title: "Monitor & Optimize",
        description:
            "Track conversations, resolution rates, and customer satisfaction from your admin dashboard in real time.",
        status: "Step 5",
        progress: 70,
        accent: "from-amber-500 to-orange-500",
    },
];

export default function HowItWorks() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 340;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
            setTimeout(checkScroll, 400);
        }
    };

    return (
        <section id="how-it-works" className="relative py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-end justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-4">
                            How It Works
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium font-[family-name:var(--font-heading)]">
                            Live in Five Simple Steps.
                        </h2>
                    </motion.div>
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all disabled:opacity-30"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all disabled:opacity-30"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Cards Carousel */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="min-w-[300px] md:min-w-[320px] snap-start bg-white/[0.05] backdrop-blur-xl border border-white/20 hover:border-white/40 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"
                        >
                            {/* Card Header with gradient */}
                            <div className="relative h-40 flex items-center justify-center overflow-hidden">
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-10`}
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="text-xs text-white/50 px-2 py-1 rounded-full bg-white/5">
                                        {step.status}
                                    </span>
                                </div>
                                <step.icon className="w-12 h-12 text-white/80" />
                            </div>
                            {/* Card Body */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-base font-medium text-white mb-2 font-[family-name:var(--font-heading)]">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-white/40 leading-relaxed flex-1">
                                    {step.description}
                                </p>
                                {/* Progress bar */}
                                <div className="mt-4">
                                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full bg-gradient-to-r ${step.accent}`}
                                            style={{ width: `${step.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
