"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { VoiceOrb } from "@/components/voice/VoiceOrb";
import { Mic, MicOff, Volume2, VolumeX, ArrowLeft, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { nanoid } from "nanoid";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function VoiceAssistantPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("");
        setInput(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Automatically send if we have input
        if (input.trim()) {
            handleSend();
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [input]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const speak = (text: string) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices[0];
    if (voice) utterance.voice = voice;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: nanoid(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          userId: user?.uid || "u84x4E35vRX5xGtuJW1sJIZDWWi2", // Fallback for demo
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMsg: Message = { id: nanoid(), role: "assistant", content: "" };
      setMessages(prev => [...prev, assistantMsg]);

      let done = false;
      let fullContent = "";
      while (!done) {
        const { value, done: isDone } = await reader!.read();
        done = isDone;
        const chunk = decoder.decode(value);
        fullContent += chunk;
        setMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, content: fullContent } : m));
      }

      speak(fullContent);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Header aligned with other dashboard pages */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Voice Assistant</h1>
          <p className="text-slate-400 mt-1">Real-time neural voice interface for hands-free support.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Live Protocol</span>
          </div>
          <button 
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`p-2 rounded-full transition-all border ${
              isVoiceEnabled 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" 
                : "bg-white/5 text-slate-500 border-white/10"
            }`}
          >
            {isVoiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Main Interaction Area - Full Width */}
        <div className="w-full">
          <div className="relative support-card rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center p-6 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] overflow-hidden">
             {/* Subtle internal gradient */}
             <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

             <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-1">
                <div className="text-center space-y-3">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2"
                  >
                    Neural Engine Active
                  </motion.div>
                  <h2 className="text-2xl font-medium text-white font-heading tracking-tight">
                    {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Voice Interface"}
                  </h2>
                </div>

                {/* The Orb */}
                <div className="py-2">
                  <VoiceOrb isListening={isListening} isSpeaking={isSpeaking} />
                </div>

                {/* Active Transcription Overlay */}
                <div 
                  ref={scrollRef}
                  className="w-full max-w-4xl h-24 overflow-y-auto space-y-3 px-4 scrollbar-hide mask-gradient"
                >
                  <AnimatePresence>
                    {messages.slice(-2).map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`p-4 rounded-2xl text-xs font-medium ${
                            msg.role === 'user' 
                            ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]" 
                            : "bg-white/10 border border-white/10 backdrop-blur-md text-slate-200"
                        }`}>
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer / Controls */}
                <div className="w-full max-w-2xl flex flex-col items-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleListening}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                      isListening 
                      ? "bg-rose-500 shadow-rose-500/40 ring-4 ring-rose-500/20" 
                      : "bg-indigo-600 shadow-indigo-600/40 hover:bg-indigo-500"
                    }`}
                  >
                    {isListening ? <MicOff size={32} className="text-white" /> : <Mic size={32} className="text-white" />}
                  </motion.button>
                  
                  <div className="w-full relative group">
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Or type your message..."
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-6 pr-14 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
                    />
                    <button 
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 disabled:text-slate-800 transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
