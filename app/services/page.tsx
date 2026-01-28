import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ServicesPage() {
  const services = await prisma.platform.findMany({
    where: { type: "SERVICE" },
    orderBy: { name: "asc" },
  });

  return (
    <main className="container py-12 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-concert-one text-center mb-8">
        All Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Link href={`/services/${service.slug}`} key={service.id}>
            <Card className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="font-concert-one text-xl text-center">{service.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
