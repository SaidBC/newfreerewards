import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Generate static pages for each service at build time
export async function generateStaticParams() {
  const services = await prisma.platform.findMany({
    where: { type: "SERVICE" },
  });

  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Fetch data for a specific service
async function getServiceData({ slug }: { slug: string }) {
  const service = await prisma.platform.findUnique({
    where: { slug },
    include: {
      rewards: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return service;
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getServiceData({ slug: params.slug });

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <main className="container py-12 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-concert-one text-center mb-8">
        {service.name} Rewards
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {service.rewards.map((reward) => (
          <Card key={reward.id}>
            <CardHeader>
              <CardTitle>{reward.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{reward.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
