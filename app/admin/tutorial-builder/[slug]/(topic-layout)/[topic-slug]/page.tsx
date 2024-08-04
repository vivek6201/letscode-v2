import TopicForm from "@/components/AdminDashboard/TutorialBuilder/Topic/TopicForm";
import TopicNavbar from "@/components/AdminDashboard/TutorialBuilder/Topic/TopicNavbar";
import { Button } from "@/components/ui/button";
import CustomIcon from "@/components/ui/custom-icon";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { Ellipsis } from "lucide-react";
import React from "react";

// modify this
export default function page() {
  return (
    <div className="h-full flex flex-col justify-between">
      <TopicNavbar edit={true} />
      <TopicForm edit={true} />
      <div className="border-t flex justify-between items-center px-5 py-2">
        <p className="text-sm">Published on 11 Jun</p>
        <div className="flex items-center gap-2">
          <Button>Publish</Button>
          <CustomTooltip
            trigger={
              <Button variant={"ghost"} size={"icon"}>
                <CustomIcon iconName={Ellipsis} />
              </Button>
            }
            text="Actions"
          />
        </div>
      </div>
    </div>
  );
}
