"use client";

import { motion } from "framer-motion";
import { useAudioLevel } from "@/hooks/useAudioLevel";

interface VoiceOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
}

export function VoiceOrb({ isListening, isSpeaking }: VoiceOrbProps) {
  // Get real-time audio level when listening
  const audioLevel = useAudioLevel(isListening);

  // Define scale and glow based on state and audio level
  const baseScale = isListening ? 1.1 + audioLevel * 0.4 : isSpeaking ? 1.2 : 1;
  const glowIntensity = isListening ? 10 + audioLevel * 20 : isSpeaking ? 30 : 5;

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* Background Glow Layers */}
      <motion.div
        animate={{
          scale: [baseScale, baseScale * 1.1, baseScale],
          opacity: isListening || isSpeaking ? 0.6 : 0.4,
        }}
        transition={{
          repeat: Infinity,
          duration: isListening ? 1 : 2,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(236, 72, 153, 0.2) 100%)",
          filter: `blur(${glowIntensity}px)`,
        }}
      />
 
      {/* The Main Orb */}
      <motion.div
        animate={{
          scale: baseScale,
          borderRadius: ["45% 55% 50% 50% / 50% 50% 45% 55%", "50% 50% 55% 45% / 45% 55% 50% 50%", "45% 55% 50% 50% / 50% 50% 45% 55%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        className="relative w-48 h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(168,85,247,0.5)] flex items-center justify-center overflow-hidden"
        style={{
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Internal Light Blob */}
        <motion.div
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -20, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
          className="absolute w-24 h-24 bg-white/20 blur-xl rounded-full"
        />
        
        {/* Waveform Effect (only when listening) */}
        {isListening && (
           <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-50">
             {[...Array(5)].map((_, i) => (
               <motion.div
                 key={i}
                 animate={{ height: [10, 40 * (audioLevel + 0.5), 10] }}
                 transition={{ repeat: Infinity, duration: 0.2 + i * 0.1 }}
                 className="w-1 bg-white rounded-full"
               />
             ))}
           </div>
        )}
      </motion.div>

      {/* Floating Particles Around Orb */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              x: [0, (i % 2 === 0 ? 80 : -80) * Math.random()],
              y: [0, (i % 3 === 0 ? 80 : -80) * Math.random()],
              scale: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: i * 0.5,
              ease: "circOut",
            }}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-indigo-300/40 blur-[1px]"
          />
        ))}
      </div>
    </div>
  );
}
