import ComingSoonPage from "@/components/ComingSoonPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact NewFreeRewards",
  description:
    "Contact NewFreeRewards for feedback, corrections, partnership requests, or reward submissions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact NewFreeRewards",
    description:
      "Reach out to NewFreeRewards for updates, corrections, and business inquiries.",
    url: "/contact",
    type: "website",
  },
};

export default function Page() {
  return <ComingSoonPage />;
}
