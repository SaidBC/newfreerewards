"use client";

import { Locale, locales, localizePath } from "@/lib/i18n";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
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

const localeCodes: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  ar: "AR",
};

export default function LanguageSwitcher({
  locale,
  label,
  variant = "desktop",
}: {
  locale: Locale;
  label: string;
  variant?: "desktop" | "mobile";
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pathWithoutLocale = pathname.replace(/^\/(en|es|ar)/, "") || "/";
  const query = searchParams.toString();

  const localizedLinks = locales.map((targetLocale) => {
    const href = localizePath(targetLocale, pathWithoutLocale);

    return {
      locale: targetLocale,
      href: query ? `${href}?${query}` : href,
    };
  });

  if (variant === "mobile") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" aria-label={label}>
            <Globe className="size-4" />
            <span>{localeCodes[locale]}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="end">
          <nav className="flex flex-col">
            {localizedLinks.map(({ locale: targetLocale, href }) => (
              <Link
                key={targetLocale}
                href={href}
                className={
                  targetLocale === locale
                    ? "rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
                    : "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                }
                lang={targetLocale}
              >
                {localeLabels[targetLocale]}
              </Link>
            ))}
          </nav>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm" aria-label={label}>
      <span className="text-muted-foreground">{label}:</span>
      <div className="flex items-center rounded-md border overflow-hidden">
        {localizedLinks.map(({ locale: targetLocale, href }) => {
          return (
            <Link
              key={targetLocale}
              href={href}
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
