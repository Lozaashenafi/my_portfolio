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
  Briefcase, // For Experience
  Cpu, // For Skills
  Layers, // For Categories
  FileText, // For CV
  User as UserIcon,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const { currentTab, setTab, isSidebarOpen, toggleSidebar } = useAdminStore();

  useEffect(() => {
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

          <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
            {/* Main Section */}
            <div>
              <p className="px-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-4">
                Main
              </p>
              <div className="space-y-1">
                <AdminNavLink
                  active={currentTab === "overview"}
                  onClick={() => setTab("overview")}
                  icon={<LayoutDashboard size={18} />}
                  label="Dashboard"
                />
              </div>
            </div>

            {/* Content Section */}
            <div>
              <p className="px-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-4">
                Content
              </p>
              <div className="space-y-1">
                <AdminNavLink
                  active={currentTab === "projects"}
                  onClick={() => setTab("projects")}
                  icon={<FolderKanban size={18} />}
                  label="Projects"
                />
                <AdminNavLink
                  active={currentTab === "blog"}
                  onClick={() => setTab("blog")}
                  icon={<PenTool size={18} />}
                  label="Blog Posts"
                />
              </div>
            </div>

            {/* Career Section */}
            <div>
              <p className="px-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-4">
                Career
              </p>
              <div className="space-y-1">
                <AdminNavLink
                  active={currentTab === "experience"}
                  onClick={() => setTab("experience")}
                  icon={<Briefcase size={18} />}
                  label="Experience"
                />
                <AdminNavLink
                  active={currentTab === "cv"}
                  onClick={() => setTab("cv")}
                  icon={<FileText size={18} />}
                  label="CV / Resume"
                />
              </div>
            </div>

            {/* System Section */}
            <div>
              <p className="px-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-4">
                Taxonomy
              </p>
              <div className="space-y-1">
                <AdminNavLink
                  active={currentTab === "skills"}
                  onClick={() => setTab("skills")}
                  icon={<Cpu size={18} />}
                  label="Skills"
                />
              </div>
            </div>

            {/* Communication Section */}
            <div>
              <p className="px-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-4">
                Inbox
              </p>
              <div className="space-y-1">
                <AdminNavLink
                  active={currentTab === "messages"}
                  onClick={() => setTab("messages")}
                  icon={<MessageSquare size={18} />}
                  label="Messages"
                />
              </div>
            </div>
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

const AdminNavLink = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all group whitespace-nowrap ${
      active
        ? "bg-primary text-white shadow-lg shadow-primary/20 translate-x-1"
        : "text-gray-400 hover:bg-dark-tertiary hover:text-soft-white"
    }`}
  >
    <span
      className={`${active ? "text-white" : "group-hover:text-primary"} transition-colors`}
    >
      {icon}
    </span>
    <span className="text-xs font-mono font-bold uppercase tracking-widest">
      {label}
    </span>
  </button>
);
