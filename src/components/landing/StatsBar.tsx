"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface StatItemProps {
    label: string;
    value: string;
    suffix: string;
}

function AnimatedStat({ label, value, suffix }: StatItemProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const numericValue = parseInt(value);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const increment = numericValue / (duration / 16);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= numericValue) {
                            setCount(numericValue);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [numericValue]);

    return (
        <div ref={ref} className="text-left px-4">
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1">
                {label}
            </p>
            <p className="text-2xl md:text-3xl font-medium text-white font-heading">
                <span className={cn(
                  label === "Avg Response Time" ? "text-indigo-400" : 
                  label === "Resolution Rate" ? "text-purple-400" : "text-white"
                )}>
                  {count.toLocaleString()}
                </span>
                {suffix}
            </p>
        </div>
    );
}

const stats = [
    { label: "Queries Resolved", value: "500000", suffix: "+" },
    { label: "Avg Response Time", value: "1", suffix: ".2s" },
    { label: "Resolution Rate", value: "89", suffix: "%" },
];

export default function StatsBar() {
    return (
        <section className="relative py-12">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="support-card p-4 rounded-full border-white/20 flex items-center justify-around divide-x divide-white/10 backdrop-blur-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                >
                    {stats.map((stat, i) => (
                        <motion.div 
                          key={stat.label}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex-1"
                        >
                          <AnimatedStat {...stat} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
