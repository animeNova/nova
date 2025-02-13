import { create } from 'zustand';

interface LoginStore {
  isOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  isOpen: false,
  user: null,
  openLogin: () => set({ isOpen: true }),
  closeLogin: () => set({ isOpen: false }),
}));

export default useLoginStore;
