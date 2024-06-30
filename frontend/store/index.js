import { create } from "zustand";

export const useUploadFileModal = create((set) => ({
  isOpen: false,
  data: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, data: null }),
  setData: (data) => set({ data }),
}));


export const useSidebar = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggleMenu: () => set((state) => ({ isOpen:!state.isOpen })),
}))