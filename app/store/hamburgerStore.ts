import { create } from "zustand";

type UserState = {
  isOpen: boolean;
  setIsOpen: () => void;
};

export const useHamburgerStore = create<UserState>((set) => ({
  isOpen: false,
  setIsOpen: () => set(state => ({ isOpen: !state.isOpen })),
}));
