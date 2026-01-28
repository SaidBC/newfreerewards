import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function GamesPage() {
  const games = await prisma.platform.findMany({
    where: { type: "GAME" },
    orderBy: { name: "asc" },
  });

  return (
    <main className="container py-12 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-concert-one text-center mb-8">
        All Games
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link href={`/games/${game.slug}`} key={game.id}>
            <Card className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="font-concert-one text-xl text-center">{game.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
