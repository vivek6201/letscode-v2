import { ChildTutorialContent } from "@/db/tutorials";
import { ContentType } from "@prisma/client";
import React from "react";
import TopicContentForm from "./Forms/TopicContentForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTopicsValidations } from "@/validations/tutorialValidations";
import { z } from "zod";
import { useForm } from "react-hook-form";

export default function AdminContentEditor({
  content,
}: {
  content?: ChildTutorialContent;
}) {
  

  return (
    <div className="p-10">
      <p className="text-2xl">{content ? "Edit Content" : "Add Content"}</p>
      {content ? (
        <TopicContentForm content={content} />
      ) : (
        <TopicContentForm />
      )}
    </div>
  );
}
