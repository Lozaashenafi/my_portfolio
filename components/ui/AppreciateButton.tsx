"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { incrementStars } from "../../lib/actions/blog";

export default function AppreciateButton({
  id,
  initialStars,
}: {
  id: string;
  initialStars: number;
}) {
  const [stars, setStars] = useState(initialStars);
  const [voted, setVoted] = useState(false);

  const handleAppreciate = async () => {
    if (voted) return;
    setVoted(true);
    setStars((prev) => prev + 1);
    await incrementStars(id);
  };

  return (
    <button
      onClick={handleAppreciate}
      disabled={voted}
      className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all shadow-lg 
        ${
          voted
            ? "bg-primary text-white scale-105"
            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105"
        }`}
    >
      <Star size={20} fill={voted ? "white" : "none"} />
      {voted ? "Appreciated!" : "Appreciate"} ({stars})
    </button>
  );
}
