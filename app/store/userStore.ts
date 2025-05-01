// app/store/userStore.ts
import { create } from "zustand";

type UserState = {
  name: string;
  iconUrl: string | null;
  setName: (name: string) => void;
  setIcon: (iconUrl?: string | null) => void;
};

export const useUserStore = create<UserState>(set => ({
  name: "",
  iconUrl: null,
  setName: (name) => set({ name }),
  setIcon: (iconUrl) => set({iconUrl : iconUrl ?? null})
}));
