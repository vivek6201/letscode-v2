"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CustomIcon from "@/components/ui/custom-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FullTutorialContent } from "@/db/tutorials";
import { tutorialSidebarAtom } from "@/store/sidebarStore";
import { Newspaper, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Separator } from "@/components/ui/separator";

export default function TutorialPageLayout({
  tutorialsId,
  tutorialContent,
  children,
}: {
  tutorialsId: number;
  tutorialContent: FullTutorialContent[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [tutorialSidebar, setTutoriaSidebar] =
    useRecoilState(tutorialSidebarAtom);

  const findPath = (
    contents: FullTutorialContent[],
    targetId: number,
    currentPath: number[] = []
  ): number[] | null => {
    for (let content of contents) {
      const newPath = [...currentPath, content.id];
      if (content.id === targetId) return newPath;
      if (content.children) {
        const childPath = findPath(content.children, targetId, newPath);
        if (childPath) return childPath;
      }
    }

    return null;
  };

  const navigateToPath = (contentId: number) => {
    const pathArray = findPath(tutorialContent, contentId);
    if (pathArray) {
      const path = `/tutorials/${tutorialsId}/${pathArray.join("/")}`;
      return path;
    }
    return null;
  };

  const renderContentList = (
    contents: FullTutorialContent[]
  ): React.ReactNode => {
    return contents.map((content) => {
      if (content.children && content.children.length > 0) {
        return (
          <AccordionItem
            value={`content-${content.id}`}
            className="hover:bg-neutral-900/85"
            key={content.id}
          >
            <AccordionTrigger className="px-5 text-base">
              {content.title}
            </AccordionTrigger>
            <AccordionContent>
              {renderContentList(content.children ?? [])}
            </AccordionContent>
          </AccordionItem>
        );
      }

      return (
        <div key={content.id}>
          <Link href={navigateToPath(content.id) || ""}>
            <div className="flex items-center gap-5 px-5 py-2">
              {content.type === "Content" ? (
                <CustomIcon iconName={Newspaper} />
              ) : null}
              <p className="text-sm">{content.title}</p>
            </div>
          </Link>
          <Separator />
        </div>
      );
    });
  };

  return (
    <div
      className={`p-5 grid ${
        tutorialSidebar ? "grid-cols-[320px_1fr]" : "grid-cols-1"
      } gap-5 md:gap-10 h-[calc(100%-4rem)] overflow-hidden`}
    >
      {/* sidebar */}
      <div
        className={`${
          !tutorialSidebar && "hidden"
        } border rounded-md h-full overflow-hidden`}
      >
        <div className="border-b px-5 h-16 flex items-center justify-between">
          <p className="text-lg">Contents</p>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setTutoriaSidebar(false)}
          >
            <X />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100%-4rem)]">
          <Accordion type="single" className="w-full" collapsible>
            {renderContentList(tutorialContent)}
          </Accordion>
        </ScrollArea>
      </div>
      {/* children pages */}
      {children}
    </div>
  );
}
