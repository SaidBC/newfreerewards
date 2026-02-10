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
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";

import MenuToggle from "@/components/MenuToggle";

export default function MobileNav({
  className,
  locale,
}: {
  className?: string;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const t = getDictionary(locale);

  const navLinks = [
    { href: localizePath(locale, "/"), title: t.nav.home },
    { href: localizePath(locale, "/#list"), title: t.nav.allRewards },
    { href: localizePath(locale, "/games"), title: t.nav.games },
    { href: localizePath(locale, "/contact"), title: t.nav.contact },
    { href: localizePath(locale, "/#faq"), title: t.nav.faq },
  ];

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
