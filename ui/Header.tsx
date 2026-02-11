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
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex w-full h-(--header-height) items-center justify-between gap-4">
          <Link href={localizePath(locale, "/")}>
            <TextLogo size="md" />
          </Link>
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
          <MainNav className="hidden lg:flex" locale={locale} />
        </div>
      </div>
    </header>
  );
}
