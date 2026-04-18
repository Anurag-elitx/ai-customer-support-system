"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  LogOut,
  User,
  Mic,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { SupportCard } from "@/components/ui/SupportCard";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Conversations", href: "/dashboard/chats", icon: MessageSquare },
  { name: "Knowledge Base", href: "/dashboard/knowledge", icon: BookOpen },
  { name: "Voice AI", href: "/dashboard/voice", icon: Mic },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#020408]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">Neural Pathing...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-[#000000] text-slate-100 font-sans overflow-hidden">
      {/* Background Image Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-[1]"
          style={{ backgroundImage: "url('/hero-visual.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#000000] via-transparent to-[#000000]/60" />
      </div>

      {/* Sidebar - Floating Glass Capsule */}
      <aside className="relative z-20 w-72 p-6 flex flex-col h-full">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="support-card h-full rounded-[2.5rem] border-white/10 flex flex-col overflow-hidden bg-white/[0.03] backdrop-blur-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
        >
          {/* Logo Section */}
          <div className="p-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tighter font-heading italic">
                SUPPORT<span className="text-indigo-400">AI</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 group",
                    isActive 
                      ? "text-white" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl z-0 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    />
                  )}
                  <item.icon size={18} className={cn(
                    "relative z-10 transition-colors",
                    isActive ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-400"
                  )} />
                  <span className="relative z-10 uppercase tracking-widest">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-6 border-t border-white/5 space-y-4">
            <div className="flex items-center gap-3 px-3 py-3 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white uppercase">{user?.email?.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-white truncate uppercase tracking-tighter">
                  {user?.displayName || "System Agent"}
                </p>
                <p className="text-[9px] text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-[10px] font-bold text-slate-500 hover:text-pink-400 transition-all uppercase tracking-widest group"
            >
              <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
              Terminate Protocol
            </button>
          </div>
        </motion.div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-hidden">
        <div className="h-full overflow-y-auto p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
