"use client";
import { useState } from "react";
import { signIn } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await signIn.email(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Welcome back! Redirecting...");
          router.push("/admin");
          router.refresh();
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "Invalid email or password");
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light dark:bg-dark-primary px-6 transition-colors duration-300">
      <form
        onSubmit={handleLogin}
        className="p-8 md:p-12 bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/5 shadow-2xl flex flex-col gap-6 w-full max-w-md rounded-sm"
      >
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-soft-white leading-none">
            ADMIN{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px #b91c1c" }}
            >
              LOGIN
            </span>
          </h1>
          <p className="text-dark-secondary dark:text-gray-500 text-sm mt-2 uppercase tracking-widest font-mono">
            Welcome back
          </p>
        </div>

        <div className="space-y-4">
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
          className="bg-primary hover:bg-secondary text-soft-white py-4 font-bold rounded-sm shadow-lg flex items-center justify-center gap-2 group transition-all"
        >
          <LogIn size={18} />
          SIGN IN
        </button>

        <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
          <span className="hover:text-primary cursor-pointer transition-colors">
            FORGOT PASSWORD?
          </span>
          <span
            className="hover:text-primary cursor-pointer transition-colors"
            onClick={() => router.push("/register")}
          >
            CREATE ACCOUNT
          </span>
        </div>
      </form>
    </div>
  );
}
