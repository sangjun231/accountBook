import { create } from "zustand";

const monthStore = create((set) => ({
  selectedMonth: 1,
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));

export default monthStore;
