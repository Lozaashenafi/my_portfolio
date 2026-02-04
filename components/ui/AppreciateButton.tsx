"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { incrementStars } from "../../lib/actions/blog";

export default function AppreciateButton({
  id,
  initialStars,
  disabled, // New prop: from parent's LocalStorage check
  onSuccess, // New prop: callback to update parent state
}: {
  id: string;
  initialStars: number;
  disabled: boolean;
  onSuccess: () => void;
}) {
  const [stars, setStars] = useState(initialStars);
  // Internal state to handle the immediate click animation/UI
  const [hasVoted, setHasVoted] = useState(disabled);

  // Sync internal state if the parent state changes (on load)
  useEffect(() => {
    setHasVoted(disabled);
  }, [disabled]);

  const handleAppreciate = async () => {
    // If already voted (either from local storage or this session), stop.
    if (hasVoted) return;

    // 1. Optimistic UI update (feels faster to the user)
    setHasVoted(true);
    setStars((prev) => prev + 1);

    try {
      // 2. Call Server Action to update Database
      await incrementStars(id);

      // 3. Trigger parent callback to save ID to LocalStorage
      onSuccess();
    } catch (error) {
      // Rollback if the server fails
      setHasVoted(false);
      setStars((prev) => prev - 1);
      console.error("Failed to appreciate:", error);
    }
  };

  return (
    <button
      onClick={handleAppreciate}
      disabled={hasVoted}
      className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all  
        ${
          hasVoted
            ? "bg-primary text-white scale-105 cursor-default"
            : "bg-slate-900 dark:bg-dark-tertiary text-white dark:text-soft-white hover:scale-105 active:scale-95 shadow-lg"
        }`}
    >
      <Star
        size={20}
        fill={hasVoted ? "white" : "none"}
        className={hasVoted ? "animate-pulse" : ""}
      />
      {hasVoted ? "Appreciated!" : "Appreciate"} ({stars})
    </button>
  );
}
