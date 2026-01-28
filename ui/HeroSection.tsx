import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 justify-center ">
          <h1 className="text-2xl md:text-4xl font-concert-one">
            All Legit Free Stuff Rewards — In One Place
          </h1>
          <p>
            We track real free rewards, events, and opportunities, and explain
            how to claim them the right way.
          </p>
          <div>
            <Button asChild variant={"secondary"}>
              <Link href={"/#lists"}>Explore more</Link>
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
