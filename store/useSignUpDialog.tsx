import { create } from 'zustand';

interface SignUpDialog {
  isOpen: boolean;
  openSignUp: () => void;
  closeSignUp: () => void;
}

const useSignUpDialog = create<SignUpDialog>((set) => ({
  isOpen: false,
  user: null,
  openSignUp: () => set({ isOpen: true }),
  closeSignUp: () => set({ isOpen: false }),
}));

export default useSignUpDialog;
