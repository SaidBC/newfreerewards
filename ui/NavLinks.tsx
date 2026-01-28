"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  title: string;
};

export default function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={cn(
              "font-concert-one hover:text-green-300",
              pathname === link.href && "text-green-400"
            )}
            href={link.href}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </>
  );
}
