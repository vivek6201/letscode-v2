import CustomIcon from "@/components/ui/custom-icon";
import { ItemListType } from "@/types/ItemListType";
import {
  Album,
  Blocks,
  NotepadText,
  Phone,
  ScrollText,
  UserPen,
} from "lucide-react";

export const homeSidebarList: ItemListType[] = [
  {
    name: "Blogs",
    icon: <CustomIcon iconName={Album} />,
    link: "/blogs",
  },
  {
    name: "Tutorials",
    icon: <CustomIcon iconName={NotepadText} />,
    link: "/tutorials",
  },
  {
    name: "Courses",
    icon: <CustomIcon iconName={ScrollText} />,
    link: "/courses",
  },
  {
    name: "Contact",
    icon: <CustomIcon iconName={Phone} />,
    link: "/contact",
  },
];
export const adminSidebarList: ItemListType[] = [
  {
    name: "Tutorial Builder",
    icon: <CustomIcon iconName={Blocks} />,
    link: "/admin/tutorial-builder",
  },
  {
    name: "Manage Roles",
    icon: <CustomIcon iconName={UserPen} />,
    link: "/admin/manage-roles",
  },
];
