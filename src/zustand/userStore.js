import { create } from "zustand";

const userStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  selectedMonth: 1,
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));

export default userStore;
