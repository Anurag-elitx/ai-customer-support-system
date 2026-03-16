"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
    {
        quote:
            "We reduced our support tickets by 73% in the first month. The AI handles complex product questions better than our FAQs ever did.",
        name: "Priya Sharma",
        role: "CTO, CloudStack",
        rating: 5,
    },
    {
        quote:
            "Setup took literally 10 minutes. I pasted our URL, added some policies, and our AI agent was handling real customer conversations.",
        name: "James Mitchell",
        role: "Founder, ShipFast",
        rating: 5,
    },
    {
        quote:
            "The confidence scoring is brilliant. When the AI isn't sure, it gracefully routes to our team. Customers don't even notice the handoff.",
        name: "Aisha Patel",
        role: "Head of Support, NovaTech",
        rating: 5,
    },
    {
        quote:
            "We're an e-commerce store with 500+ products. The AI trained on all of them and answers sizing, shipping, and return questions perfectly.",
        name: "Carlos Rivera",
        role: "E-commerce Manager, StyleHouse",
        rating: 5,
    },
];

export default function Testimonials() {
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
            scrollRef.current.scrollBy({
                left: direction === "left" ? -380 : 380,
                behavior: "smooth",
            });
            setTimeout(checkScroll, 400);
        }
    };

    return (
        <section className="relative py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-end justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium font-[family-name:var(--font-heading)]">
                            Trusted By Teams
                            <br />
                            Worldwide
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

                {/* Testimonial Cards */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="min-w-[340px] md:min-w-[360px] snap-start bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-2xl p-7 flex flex-col shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-5">
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star
                                        key={j}
                                        className="w-4 h-4 fill-amber-400 text-amber-400"
                                    />
                                ))}
                            </div>
                            {/* Quote */}
                            <p className="text-sm text-white/70 leading-relaxed flex-1 mb-6">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center text-white text-sm font-medium">
                                    {t.name.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-medium text-white m-0">{t.name}</h4>
                                    <p className="text-xs text-white/40 m-0">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
