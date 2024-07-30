import { atom } from "recoil";

export const homeDashSidebarAtom = atom<boolean>({
  key: "homeDashSidebarAtom",
  default: false,
});
