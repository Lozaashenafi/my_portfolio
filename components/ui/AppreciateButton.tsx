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
      className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all  
        ${
          voted
            ? "bg-primary text-light  scale-105"
            : "bg-dark-tertiary dark:bg-dark-tertiary text-white dark:text-soft-white hover:scale-105"
        }`}
    >
      <Star size={20} fill={voted ? "white" : "none"} />
      {voted ? "Appreciated!" : "Appreciate"} ({stars})
    </button>
  );
}
