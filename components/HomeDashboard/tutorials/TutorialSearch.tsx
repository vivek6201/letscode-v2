"use client";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { $Enums } from "@prisma/client";

export default function TutorialSearch({
  tutorials,
}: {
  tutorials: ({
    _count: {
      chapter: number;
    };
  } & {
    id: number;
    title: string;
    description: string;
    slug: string;
    status: $Enums.Status;
    createdAt: Date;
    updatedAt: Date;
  })[];
}) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDialogOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <Button
        variant="outline"
        className="md:pr-2"
        onClick={() => setDialogOpen(true)}
      >
        <div className="md:hidden flex items-center justify-center">
          <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
        </div>
        <div className="md:flex gap-2 items-center hidden">
          <p>Search Tutorials...</p>

          <kbd className="bg-white/15 p-1.5 rounded-sm text-xs leading-3 md:ml-5">
            Ctrl K
          </kbd>
        </div>
      </Button>

      <CommandDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Tutorials">
            {tutorials.map((item) => (
              <CommandItem>{item.title}</CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
