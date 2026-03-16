import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import TextLogo from "@/components/TextLogo";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localizePath } from "@/lib/i18n";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex w-full h-16 items-center justify-between gap-4">
          <Link href={localizePath(locale, "/")} className="transition-opacity hover:opacity-80">
            <TextLogo size="md" shortOnMobile />
          </Link>
          
          <div className="flex flex-1 items-center justify-end gap-4 uppercase font-concert-one text-sm">
            <MainNav className="hidden lg:flex" locale={locale} />
            
            <div className="h-4 w-px bg-border hidden sm:block" />
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <LanguageSwitcher locale={locale} label={t.common.language} />
              </div>
              <div className="sm:hidden">
                <LanguageSwitcher
                  locale={locale}
                  label={t.common.language}
                  variant="mobile"
                />
              </div>
            </div>

            <MobileNav className="lg:hidden" locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
