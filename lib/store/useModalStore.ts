import { create } from 'zustand';

interface ModalState {
  isEditProfileOpen: boolean;
  openEditProfile: () => void;
  closeEditProfile: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isEditProfileOpen: true,
  openEditProfile: () => set({ isEditProfileOpen: true }),
  closeEditProfile: () => set({ isEditProfileOpen: false }),
}));
