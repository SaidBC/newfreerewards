import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";

export default async function MainNav({
  className,
  locale,
}: {
  className?: string;
  locale: Locale;
}) {
  const t = getDictionary(locale);

  const navLinks = [
    { href: localizePath(locale, "/"), title: t.nav.home },
    { href: localizePath(locale, "/#list"), title: t.nav.allRewards },
    { href: localizePath(locale, "/games"), title: t.nav.games },
    { href: localizePath(locale, "/contact"), title: t.nav.contact },
    { href: localizePath(locale, "/#faq"), title: t.nav.faq },
  ];

  return (
    <nav className={cn("flex flex-col gap-4", className)}>
      <ul className="flex items-center gap-8 text-lg font-bold">
        <NavLinks links={navLinks} />
      </ul>
    </nav>
  );
}
