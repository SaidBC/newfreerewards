import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Decorative Elements */}
      <div className="absolute -left-20 top-0 h-72 w-72 bg-primary/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 bg-amber-500/10 blur-[150px] rounded-full -z-10" />
      
      <div className="container-wrapper grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit mx-auto lg:mx-0 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New Rewards Daily
          </div>
          
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-concert-one uppercase leading-[1.1] tracking-tight">
            {t.home.heroTitle.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? 'text-primary' : ''}>{word} </span>
            ))}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
            {t.home.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button asChild size="lg" className="h-14 px-8 text-base font-concert-one uppercase">
              <Link href={localizePath(locale, "/#list")}>{t.home.exploreMore}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-concert-one uppercase">
              <Link href={localizePath(locale, "/#faq")}>{t.home.faqTitle}</Link>
            </Button>
          </div>
        </div>

        <div className="relative group mx-auto lg:ml-auto">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-amber-500/30 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity -z-10 animate-pulse" />
          <div className="relative rounded-3xl border bg-card/50 backdrop-blur-sm p-4 shadow-2xl overflow-hidden">
            <Image
              src="/images/clash-royale/hero.png"
              className="w-full h-auto max-w-lg rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
              width={700}
              height={400}
              alt="hero"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
