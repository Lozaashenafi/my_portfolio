"use client";

import { authClient } from "../../lib/auth-client";
import { useAdminStore } from "../../store/useAdminStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  PenTool,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Briefcase,
  Cpu,
  FileText,
} from "lucide-react";

const navItems = [
  { section: "overview", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { section: "projects", label: "Projects", icon: <FolderKanban size={18} /> },
  { section: "blog", label: "Blog Posts", icon: <PenTool size={18} /> },
  { section: "experience", label: "Experience", icon: <Briefcase size={18} /> },
  { section: "skills", label: "Skills", icon: <Cpu size={18} /> },
  { section: "messages", label: "Messages", icon: <MessageSquare size={18} /> },
  { section: "cv", label: "CV / Resume", icon: <FileText size={18} /> },
] as const;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const { currentTab, isSidebarOpen, toggleSidebar, setTab } = useAdminStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
  }, []);

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

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const scrollToSection = (sectionId: string) => {
    setTab(sectionId as any);
    if (isSidebarOpen) toggleSidebar();
  };

  if (!hasMounted || isPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-dark-primary text-soft-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
          <p className="text-xs font-mono uppercase tracking-widest animate-pulse">
            Authenticating Admin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-dark-primary overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`
          ${isSidebarOpen ? "w-72" : "w-0"} 
          bg-dark-secondary text-soft-white transition-all duration-300 ease-in-out 
          flex flex-col border-r border-dark-tertiary z-50 overflow-hidden relative
        `}
      >
        <div className="w-72 flex flex-col h-full">
          <div className="p-8 flex items-center justify-between">
            <div className="text-primary font-mono text-xl font-bold tracking-tighter">
              &lt;admin/&gt;
            </div>
            <button onClick={toggleSidebar} className="lg:hidden text-gray-500">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all group whitespace-nowrap ${
                  currentTab === item.section
                    ? "bg-primary text-white shadow-lg shadow-primary/20 translate-x-1"
                    : "text-gray-400 hover:bg-dark-tertiary hover:text-soft-white"
                }`}
              >
                <span
                  className={`${currentTab === item.section ? "text-white" : "group-hover:text-primary"} transition-colors`}
                >
                  {item.icon}
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-6 border-t border-dark-tertiary bg-dark-primary/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 shrink-0 rounded-sm bg-dark-tertiary border border-primary/30 flex items-center justify-center text-primary font-mono font-bold">
                {session?.user.name?.charAt(0) || "A"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate uppercase tracking-tight">
                  {session?.user.name}
                </p>
                <p className="text-[10px] font-mono text-gray-500 truncate">
                  {session?.user.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full py-3 text-xs font-mono font-bold text-primary hover:bg-primary hover:text-white border border-primary/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-dark-primary">
        <header className="h-20 border-b border-dark-tertiary flex items-center justify-between px-8 bg-dark-primary/80 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <button
              onClick={toggleSidebar}
              className="p-2 text-soft-white hover:text-primary transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-[0.2em]">
                Console / v1.0
              </span>
              <h1 className="text-xl font-black text-soft-white uppercase">
                {currentTab}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-dark-tertiary text-soft-white text-xs font-mono uppercase hover:border-primary transition-all"
            >
              View Site <ExternalLink size={12} />
            </a>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-primary uppercase">
                Admin Mode
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
