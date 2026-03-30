import CreateRewardsCard from "@/ui/CreateRewardsCard";

export const dynamic = "force-static";

export default function Page() {
  return (
    <main className="container py-12 px-4 md:px-6">
      <CreateRewardsCard />
    </main>
  );
}
