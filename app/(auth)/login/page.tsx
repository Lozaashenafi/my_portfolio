"use client";
import { useState } from "react";
import { signIn } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push("/admin");
          router.refresh();
        },
        onError: (ctx) => alert(ctx.error.message),
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white shadow-md rounded-lg flex flex-col gap-4 w-96"
      >
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
