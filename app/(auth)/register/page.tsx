"use client";
import { useState } from "react";
import { signUp } from "../../../lib/auth-client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSent, setIsSent] = useState(false); // New state

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/admin",
      },
      {
        onSuccess: () => {
          setIsSent(true); // Show the success message
        },
        onError: (ctx) => alert(ctx.error.message),
      },
    );
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-8 bg-white shadow-md rounded-lg text-center">
          <h1 className="text-2xl font-bold text-green-600">
            Check your email!
          </h1>
          <p className="text-gray-600 mt-2">
            We sent a verification link to {email}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="p-8 bg-white shadow-md rounded-lg flex flex-col gap-4 w-96"
      >
        <h1 className="text-2xl font-bold text-black">Create Admin Account</h1>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 text-black"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-black text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
