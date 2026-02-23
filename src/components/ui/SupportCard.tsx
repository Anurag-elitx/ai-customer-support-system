"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SupportCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function SupportCard({ 
  children, 
  className, 
  hoverEffect = true,
  ...props 
}: SupportCardProps) {
  return (
    <motion.div
      className={cn(
        "support-card rounded-2xl overflow-hidden",
        hoverEffect && "support-card-hover",
        className
      )}
      {...props}
    >
      {/* Crystalline Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/5 blur-[60px] pointer-events-none" />
      
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
}
