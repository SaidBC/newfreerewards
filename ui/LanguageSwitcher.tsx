"use client";

import { Locale, locales, localizePath } from "@/lib/i18n";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const getLocalizedHref = (targetLocale: Locale) => {
    const href = localizePath(targetLocale, pathWithoutLocale);
    return query ? `${href}?${query}` : href;
  };

  return (
    <>
      <div className="hidden md:flex items-center gap-2 text-sm" aria-label={label}>
        <span className="text-muted-foreground">{label}:</span>
        <div className="flex items-center rounded-md border overflow-hidden">
          {locales.map((targetLocale) => (
            <Link
              key={targetLocale}
              href={getLocalizedHref(targetLocale)}
              className={
                targetLocale === locale
                  ? "px-2 py-1 bg-primary text-primary-foreground font-semibold"
                  : "px-2 py-1 text-muted-foreground hover:text-foreground"
              }
              lang={targetLocale}
            >
              {localeLabels[targetLocale]}
            </Link>
          ))}
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden flex items-center gap-1"
            aria-label={label}
          >
            <Globe className="size-4" />
            <span>{locale.toUpperCase()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-1 md:hidden" align="end">
          <div className="flex flex-col">
            {locales.map((targetLocale) => (
              <Link
                key={targetLocale}
                href={getLocalizedHref(targetLocale)}
                className={
                  targetLocale === locale
                    ? "rounded px-2 py-1.5 bg-primary text-primary-foreground font-semibold"
                    : "rounded px-2 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
                }
                lang={targetLocale}
              >
                {localeLabels[targetLocale]}
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
