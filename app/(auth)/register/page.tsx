"use client";
import { useState } from "react";
import { signUp } from "../../../lib/auth-client";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner"; // Import toast
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await signUp.email(
      { email, password, name, callbackURL: "/admin" },
      {
        onSuccess: () => {
          setLoading(false);
          setIsSent(true);
          toast.success("Account created! Please check your email.");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "Registration failed");
        },
      },
    );
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-light dark:bg-dark-primary px-6">
        <div className="p-10 bg-white dark:bg-[#1a1a1a] border border-slate-100 dark:border-white/5 rounded-sm text-center max-w-md shadow-2xl">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-soft-white mb-4">
            Check your email!
          </h1>
          <p className="text-dark-secondary dark:text-gray-400 leading-relaxed">
            We sent a verification link to{" "}
            <span className="text-primary font-bold">{email}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light dark:bg-dark-primary px-6 transition-colors duration-300">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-0"></div>

      <form
        onSubmit={handleRegister}
        className="relative z-10 p-8 md:p-12 bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/5 shadow-2xl flex flex-col gap-6 w-full max-w-md"
      >
        <div className="mb-4">
          <h1 className="text-4xl font-black text-slate-900 dark:text-soft-white leading-none">
            CREATE{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px #b91c1c" }}
            >
              ADMIN
            </span>
          </h1>
          <p className="text-dark-secondary dark:text-gray-500 text-sm mt-2 uppercase tracking-widest font-mono">
            Join the dashboard
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-slate-50 dark:bg-dark-primary border border-slate-200 dark:border-white/10 p-3 pl-10 text-black dark:text-soft-white rounded-sm focus:border-primary outline-none transition-all"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-slate-50 dark:bg-dark-primary border border-slate-200 dark:border-white/10 p-3 pl-10 text-black dark:text-soft-white rounded-sm focus:border-primary outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-slate-50 dark:bg-dark-primary border border-slate-200 dark:border-white/10 p-3 pl-10 text-black dark:text-soft-white rounded-sm focus:border-primary outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-secondary disabled:opacity-50 text-soft-white py-4 font-bold rounded-sm shadow-lg flex items-center justify-center gap-2 group transition-all"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            "REGISTER ACCOUNT"
          )}
          {!loading && (
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          )}
        </button>

        <p className="text-center text-xs text-gray-500 uppercase tracking-tighter">
          Secure Administrator Access Only
        </p>
      </form>
    </div>
  );
}
