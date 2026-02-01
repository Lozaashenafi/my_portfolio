// components/home/ContactForm.tsx
"use client";

import React, { useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { sendContactMessage } from "../../lib/actions/contact";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);

    try {
      await sendContactMessage(formData);
      toast.success("Message sent successfully!");
      formRef.current?.reset();
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-mono font-bold uppercase text-slate-900 dark:text-soft-white">
          Name
        </label>
        <input
          name="name"
          required
          type="text"
          placeholder="Your name"
          className="w-full bg-soft-white dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary p-4 outline-none focus:border-primary rounded-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-mono font-bold uppercase text-slate-900 dark:text-soft-white">
          Email
        </label>
        <input
          name="email"
          required
          type="email"
          placeholder="your@email.com"
          className="w-full bg-soft-white dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary p-4 outline-none focus:border-primary rounded-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-mono font-bold uppercase text-slate-900 dark:text-soft-white">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Your message..."
          className="w-full bg-soft-white dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary p-4 outline-none focus:border-primary rounded-sm resize-none"
        ></textarea>
      </div>

      <button
        disabled={isPending}
        className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 px-8 rounded-sm flex items-center justify-center gap-3 transition-all disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <Send size={18} />
        )}
        {isPending ? "SENDING..." : "SEND MESSAGE"}
      </button>
    </form>
  );
}
