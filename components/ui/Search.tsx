"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // We debounce the search to avoid hitting the database on every single keystroke
  const handleSearch = useDebouncedCallback((term: string) => {
    // Create a new URLSearchParams object from the current ones
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Update the URL without a full page reload
    // scroll: false prevents the page from jumping to the top
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full bg-soft-white dark:bg-dark-tertiary border border-slate-200 dark:border-gray-700 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-800 dark:text-gray-200"
        placeholder="Search articles..."
        onChange={(e) => handleSearch(e.target.value)}
        // Use defaultValue so the input doesn't clear when the page refreshes
        defaultValue={searchParams.get("query")?.toString()}
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
