import TextLogo from "@/components/TextLogo";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localizePath } from "@/lib/i18n";
import Link from "next/link";

const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
     <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47l-.02-.01c-.01 2.44-.01 4.88-.01 7.32 0 1.54-.13 3.11-.79 4.52-1.04 2.22-3.3 3.65-5.7 3.84-2.29.17-4.73-.85-5.99-2.78-1.46-2.22-1.12-5.46.8-7.39 1.14-1.14 2.72-1.74 4.34-1.76v4.03c-.93.02-1.89.44-2.43 1.2-.55.77-.59 1.83-.12 2.65.34.6.93 1.05 1.61 1.21.68.16 1.48.06 2.05-.38.57-.44.82-1.17.82-1.89l.01-13.43c-1.39-.01-2.78-.01-4.17-.01V.02z" />
  </svg>
);

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="w-full bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <TextLogo />
            <p className="text-muted-foreground max-w-xs text-center md:text-left text-sm leading-relaxed">
              {t.seo.siteDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/80 lowercase-none">
                {t.nav.games}
              </h4>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                <Link href={localizePath(locale, "/")} className="hover:text-primary transition-colors">
                  {t.nav.home}
                </Link>
                <Link href={localizePath(locale, "/#list")} className="hover:text-primary transition-colors">
                  {t.nav.allRewards}
                </Link>
                <Link href={localizePath(locale, "/games")} className="hover:text-primary transition-colors">
                  {t.nav.games}
                </Link>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/80">
                Support
              </h4>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                <Link href={localizePath(locale, "/contact")} className="hover:text-primary transition-colors">
                  {t.nav.contact}
                </Link>
                <Link href={localizePath(locale, "/privacy")} className="hover:text-primary transition-colors">
                  {t.common.privacyPolicy}
                </Link>
                <Link href={localizePath(locale, "/terms")} className="hover:text-primary transition-colors">
                  {t.common.termsOfService}
                </Link>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2 order-2 md:order-1">
            <span className="text-muted-foreground text-xs font-medium text-center md:text-left">
              &copy; {new Date().getFullYear()} <span className="text-foreground">NewFreeRewards</span>. {t.common.allRightsReserved}
            </span>
          </div>

          <div className="flex items-center gap-6 order-1 md:order-2">
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest hidden sm:inline">
              {t.common.followUs}
            </span>
            <div className="flex items-center gap-4">
              <a 
                href="https://x.com/newfreeerewards" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-sm"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@newfreerewards" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-sm"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
