import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import siteConfig from "@/lib/siteConfig";

const { navLinks } = siteConfig;

export default async function MainNav({ className }: { className?: string }) {
  return (
    <nav className={cn("flex flex-col gap-4", className)}>
      <ul className="flex items-center gap-8 text-lg font-bold">
        <NavLinks links={navLinks} />
      </ul>
    </nav>
  );
}
