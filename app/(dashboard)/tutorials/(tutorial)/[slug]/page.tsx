import TopicRenderer from "@/components/HomeDashboard/tutorials/TopicRenderer";
import React from "react";

export default function page() {
  return (
    <div className="p-10 overflow-y-auto">
      {/* Render Topic here*/}
      <TopicRenderer />
    </div>
  );
}
