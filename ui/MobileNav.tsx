"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TextLogo from "@/components/TextLogo";
import NavLinks from "./NavLinks";
import MenuToggle from "@/components/MenuToggle";
import siteConfig from "@/lib/siteConfig";

const { navLinks } = siteConfig;

export default function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={className}>
          <Button variant={"ghost"}>
            <MenuToggle open={open} />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("mt-4 w-screen ml-2 rounded-r-none", className)}
      >
        <nav className="flex flex-col gap-4">
          <div className="self-center">
            <TextLogo />
          </div>
          <ul className="flex flex-col gap-4 text-lg font-bold">
            <NavLinks links={navLinks} />
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
