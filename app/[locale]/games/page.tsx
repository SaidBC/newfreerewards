import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Metadata } from "next";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return {
    title: t.seo.gamesTitle,
    description: t.seo.gamesDescription,
    alternates: {
      canonical: localizePath(locale, "/games"),
    },
    openGraph: {
      title: t.seo.gamesTitle,
      description: t.seo.gamesDescription,
      url: localizePath(locale, "/games"),
      type: "website",
    },
  };
}

export default async function GamesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  const games = await prisma.platform.findMany({
    where: { type: "GAME" },
    orderBy: { name: "asc" },
  });

  return (
    <main className="container py-12 px-4 md:px-6 min-h-[calc(100dvh-var(--header-height)-var(--footer-height)-1px)]">
      <h1 className="text-3xl md:text-4xl font-concert-one text-center mb-8">
        {t.games.allGames}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link href={localizePath(locale, `/games/${game.slug}`)} key={game.id}>
            <Card className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="font-concert-one text-xl text-center">
                  {game.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
