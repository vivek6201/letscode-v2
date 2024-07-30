import { ItemListType } from "@/components/HomeDashboard/HomeDashboardSidebar";
import CustomIcon from "@/components/ui/custom-icon";
import { Album, NotepadText, Phone, ScrollText } from "lucide-react";

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
