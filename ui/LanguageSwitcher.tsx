"use client";

import { Locale, locales, localizePath } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, "") || "/";

  return (
    <div className="flex items-center gap-2 text-sm">
      <span>{label}:</span>
      {locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={localizePath(targetLocale, pathWithoutLocale)}
          className={targetLocale === locale ? "font-bold text-primary" : "text-muted-foreground"}
        >
          {targetLocale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
