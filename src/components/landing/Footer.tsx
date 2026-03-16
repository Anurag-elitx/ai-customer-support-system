"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = [
    {
        heading: "Product",
        links: [
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Widget Demo", href: "#" },
            { label: "API Reference", href: "#" },
        ],
    },
    {
        heading: "Solutions",
        links: [
            { label: "E-Commerce", href: "#" },
            { label: "SaaS Platforms", href: "#" },
            { label: "Service Businesses", href: "#" },
            { label: "Startups", href: "#" },
        ],
    },
    {
        heading: "Security & Trust",
        links: [
            { label: "Data Privacy", href: "#" },
            { label: "Compliance", href: "#" },
            { label: "SLA Guarantee", href: "#" },
            { label: "Status Page", href: "#" },
        ],
    },
    {
        heading: "Resources",
        links: [
            { label: "Help Center", href: "#" },
            { label: "FAQ", href: "#faq" },
            { label: "Blog", href: "#" },
            { label: "Contact Us", href: "#" },
            { label: "Terms of Service", href: "#" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5 pt-16 pb-8 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
                    {/* Logo + Description */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-white font-[family-name:var(--font-heading)]">
                                SupportAI
                            </span>
                        </Link>
                        <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
                            AI-powered customer support that trains on your website and deploys
                            in minutes. Built for modern businesses that value speed and
                            quality.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {["X", "LI", "GH"].map((icon) => (
                                <a
                                    key={icon}
                                    href="#"
                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-xs text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerLinks.map((col) => (
                        <div key={col.heading}>
                            <h4 className="text-sm font-semibold text-white mb-4 font-[family-name:var(--font-heading)]">
                                {col.heading}
                            </h4>
                            <ul className="space-y-2.5">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-white/40 hover:text-white/70 transition-colors"
                                                suppressHydrationWarning
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/5 pt-8 text-center">
                        <p className="text-sm text-white/30" suppressHydrationWarning>
                            © {new Date().getFullYear()} SupportAI. All rights reserved.
                        </p>
                    </div>
            </div>

            {/* Giant brand watermark */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
                <div className="text-[12vw] font-medium text-center leading-none tracking-tighter font-[family-name:var(--font-heading)] bg-gradient-to-t from-white/[0.25] to-transparent bg-clip-text text-transparent">
                    SUPPORTAI
                </div>
            </div>
        </footer>
    );
}
