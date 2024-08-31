import { atom } from "recoil";

export const homeDashSidebarAtom = atom<boolean>({
  key: "homeDashSidebarAtom",
  default: false,
});

export const adminDashSidebarAtom = atom<boolean>({
  key: "adminDashSidebarAtom",
  default: false,
});

export const tutorialSidebarAtom = atom<boolean>({
  key: "tutorialSidebarAtom",
  default: true,
});