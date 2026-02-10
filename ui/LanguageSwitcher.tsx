"use client";

import { Locale, locales, localizePath } from "@/lib/i18n";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ar: "العربية",
};

export default function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pathWithoutLocale = pathname.replace(/^\/(en|es|ar)/, "") || "/";
  const query = searchParams.toString();

  return (
    <div className="flex items-center gap-2 text-sm" aria-label={label}>
      <span className="text-muted-foreground">{label}:</span>
      <div className="flex items-center rounded-md border overflow-hidden">
        {locales.map((targetLocale) => {
          const href = localizePath(targetLocale, pathWithoutLocale);
          const localizedHref = query ? `${href}?${query}` : href;

          return (
            <Link
              key={targetLocale}
              href={localizedHref}
              className={
                targetLocale === locale
                  ? "px-2 py-1 bg-primary text-primary-foreground font-semibold"
                  : "px-2 py-1 text-muted-foreground hover:text-foreground"
              }
              lang={targetLocale}
            >
              {localeLabels[targetLocale]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
