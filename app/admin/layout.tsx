"use client";

import { authClient } from "../../lib/auth-client";
import { useAdminStore } from "../../store/useAdminStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  // 1. Better-Auth Session
  const { data: session, isPending } = authClient.useSession();

  // 2. Zustand State
  const { currentTab, setTab, isSidebarOpen, toggleSidebar } = useAdminStore();

  // 3. Prevent Hydration Error: Wait until the component has mounted on the client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 4. Protection Logic
  // Inside AdminLayout.tsx
  useEffect(() => {
    if (!isPending && !session && hasMounted) {
      router.push("/login");
    } else if (
      !isPending &&
      session &&
      (session.user as any).role !== "admin" &&
      hasMounted
    ) {
      router.push("/");
    }
  }, [session, isPending, router, hasMounted]);

  // Handle Sign Out
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  if (!hasMounted || isPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white text-black">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
          <p className="text-sm animate-pulse">Verifying Session...</p>
        </div>
      </div>
    );
  }

  // Final render - only happens on the client
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-black">
      {/* Sidebar Managed by Zustand */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-0 -ml-64"
        } bg-slate-950 text-white transition-all duration-300 ease-in-out flex flex-col border-r border-slate-800`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">Admin Console</h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setTab("overview")}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
              currentTab === "overview"
                ? "bg-white text-black"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setTab("projects")}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
              currentTab === "projects"
                ? "bg-white text-black"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            Manage Projects
          </button>

          <button
            onClick={() => setTab("blog")}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
              currentTab === "blog"
                ? "bg-white text-black"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            Blog Posts
          </button>

          <button
            onClick={() => setTab("messages")}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
              currentTab === "messages"
                ? "bg-white text-black"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            Messages
          </button>
        </nav>

        {/* User Profile & Sign Out at Bottom */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              {session?.user.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate text-white">
                {session?.user.name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {session?.user.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-md transition-colors border border-red-500/20"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors text-black"
            >
              {isSidebarOpen ? "Close Menu" : "Open Menu"}
            </button>
            <h1 className="text-lg font-semibold text-gray-800 capitalize">
              {currentTab}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
              Live
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 text-black bg-gray-50">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
