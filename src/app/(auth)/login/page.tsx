"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Lock, Chrome, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Google login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface-primary bg-grid-pattern p-4 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-cyan/10 rounded-full blur-[120px]" />

      <Card className="w-full max-w-md glass-card border-white/10 relative z-10 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="inline-flex items-center justify-center mb-6 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <LogIn className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold font-heading text-white">SupportAI</span>
          </Link>
          <CardTitle className="text-2xl font-heading text-white">Welcome Back</CardTitle>
          <CardDescription className="text-slate-400">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleEmailLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-brand-500 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <Link href="#" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-brand-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {error && <p className="text-xs text-red-400 bg-red-400/10 p-2 rounded border border-red-400/20">{error}</p>}

            <Button 
              type="submit" 
              className="w-full bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/20 transition-all active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Sign In"}
              {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-secondary px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full bg-transparent border-white/10 hover:bg-white/5 text-slate-200 hover:text-white transition-all active:scale-[0.98]"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Chrome className="mr-2 h-4 w-4" />}
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors underline underline-offset-4">
            Sign up now
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
