import { create } from "zustand";

// Define what our state looks like
interface AdminState {
  currentTab: "overview" | "projects" | "blog" | "messages";
  isSidebarOpen: boolean;

  // Actions to change the state
  setTab: (tab: "overview" | "projects" | "blog" | "messages") => void;
  toggleSidebar: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  currentTab: "overview",
  isSidebarOpen: true,

  setTab: (tab) => set({ currentTab: tab }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
