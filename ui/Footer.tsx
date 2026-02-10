import TextLogo from "@/components/TextLogo";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className=" bg-card text-card-foreground border-t text-sm text-center">
      <div className="container h-(--footer-height) mx-auto flex items-center justify-center gap-2">
        <span>&copy; {new Date().getFullYear()}</span>
        <TextLogo />
        <span>. {t.common.allRightsReserved}</span>
      </div>
    </footer>
  );
}
