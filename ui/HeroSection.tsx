import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 justify-center ">
          <h1 className="text-2xl md:text-4xl font-concert-one">{t.home.heroTitle}</h1>
          <p>{t.home.heroDescription}</p>
          <div>
            <Button asChild variant={"secondary"}>
              <Link href={localizePath(locale, "/#list")}>{t.home.exploreMore}</Link>
            </Button>
          </div>
        </div>
        <div className="relative mt-8 md:mt-0">
          <Image
            src="/hero.png"
            className="w-full max-w-lg"
            width={700}
            height={300}
            alt="hero"
          />
          <div className="absolute inset-10 animate-rotation-colors rounded-full blur-3xl opacity-10 -z-1"></div>
        </div>
      </div>
    </section>
  );
}
