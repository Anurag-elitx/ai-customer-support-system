"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Loader2, Mic, MicOff, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { nanoid } from "nanoid";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function WidgetPage() {
  const { userId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
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
      };

      recognition.onerror = (event: any) => {
        if (event.error === "no-speech") {
          // Silently handle no-speech, just stop listening
          console.log("Speech Recognition: No speech detected.");
        } else if (event.error === "network") {
          alert("Network error: Please check your internet connection or try a different browser (Chrome/Edge recommended).");
        } else if (event.error === "not-allowed") {
          alert("Microphone access denied. Please enable it in browser settings.");
        } else {
          console.error("Speech Recognition Error:", event.error);
        }
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        // Auto-enable voice response when user uses the microphone
        if (!isVoiceEnabled) setIsVoiceEnabled(true);
        
        setIsListening(true);
        recognitionRef.current.start();
      } else {
        alert("Speech recognition is not supported in your browser.");
      }
    }
  };

  const speak = (text: string) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    
    // Stop any current speaking
    window.speechSynthesis.cancel();
    
    // Clean text for better speech (remove markdown-like symbols)
    const cleanText = text.replace(/[*_#`]/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    const getAndSetVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Look for a natural sounding English voice
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural'))) || voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = getAndSetVoice;
    } else {
      getAndSetVoice();
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: nanoid(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          userId: userId,
          conversationId: conversationId,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      // Get conversation ID from response header (if new)
      const newConvId = response.headers.get("X-Conversation-Id");
      if (newConvId && !conversationId) setConversationId(newConvId);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      const assistantMessageId = nanoid();
      setMessages((prev) => [...prev, { id: assistantMessageId, role: "assistant", content: "" }]);

      let done = false;
      let accumulatedContent = "";

      while (!done) {
        const { value, done: innerDone } = await reader!.read();
        done = innerDone;
        const chunk = decoder.decode(value);
        accumulatedContent += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId ? { ...m, content: accumulatedContent } : m
          )
        );
      }

      // Voice Output
      if (isVoiceEnabled) {
          speak(accumulatedContent);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { id: nanoid(), role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setConversationId(null);
    setInput("");
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 font-sans text-slate-100 overflow-hidden border-l border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-100">Support Assistant</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-slate-400 font-medium">Always Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewChat}
            className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-all"
            title="Start New Chat"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={() => {
              const newState = !isVoiceEnabled;
              setIsVoiceEnabled(newState);
              if (newState) {
                  // Short welcome sound or confirmation speech
                  speak("Voice mode enabled");
              } else {
                  window.speechSynthesis.cancel();
              }
            }}
            className={`px-3 py-1.5 rounded-xl transition-all border flex items-center gap-2 ${
              isVoiceEnabled 
                ? "bg-indigo-600/10 text-indigo-400 border-indigo-500/20" 
                : "bg-slate-800/50 text-slate-500 border-slate-700 hover:text-slate-400"
            }`}
            title={isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
          >
            {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {isVoiceEnabled ? "Live Voice" : "Muted"}
            </span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="p-4 bg-indigo-500/10 rounded-full">
              <Bot size={40} className="text-indigo-400 opacity-50" />
            </div>
            <div>
              <p className="text-slate-200 font-medium">Hi there! 👋</p>
              <p className="text-sm text-slate-500 max-w-[200px] mx-auto mt-1">
                How can I help you today? Ask me anything about our services.
              </p>
            </div>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  message.role === "user" ? "bg-slate-700" : "bg-indigo-600"
                }`}>
                  {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  message.role === "user" 
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/10" 
                    : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50"
                }`}>
                  {message.content || (isLoading && message.role === "assistant" ? "..." : "")}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900/50 backdrop-blur-md border-t border-slate-800">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={isListening ? "Listening..." : "Type your message..."}
            className="w-full bg-slate-800 border-none rounded-xl py-3 pl-4 pr-24 text-sm text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
          <div className="absolute right-1 flex items-center gap-1">
            <button
              type="button"
              onClick={toggleListening}
              disabled={isLoading}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                isListening ? "text-rose-500 animate-pulse bg-rose-500/10" : "text-slate-500 hover:text-indigo-400"
              }`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-indigo-400 hover:text-indigo-300 disabled:text-slate-600 transition-colors"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </form>
        <p className="text-[10px] text-center text-slate-600 mt-3 font-medium tracking-tight">
          Powered by <span className="text-indigo-500/60">SupportAI</span>
        </p>
      </div>
    </div>
  );
}
