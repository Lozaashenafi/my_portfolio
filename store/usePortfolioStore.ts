import { create } from "zustand";

interface PortfolioState {
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  filterCategory: "All",
  setFilterCategory: (category) => set({ filterCategory: category }),
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));
