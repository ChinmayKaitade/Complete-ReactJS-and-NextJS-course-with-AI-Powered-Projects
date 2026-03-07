import { create } from "zustand";

export const useAppStore = create((set) => ({
  // Auth Slice
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),

  // UI Slice
  theme: "light",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
