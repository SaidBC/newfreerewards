import type { Metadata } from "next";
import { Concert_One} from "next/font/google";
import "./globals.css";
import SmartlinkPopunder from "@/components/SmartlinkPopunder";

const concertOne = Concert_One({
  variable: "--font-concert-one",
  weight: "400",
});


export const metadata: Metadata = {
  title: "NewFreeRewards – Free Rewards, Bonuses & Promotions",
  description:
    "Discover free rewards, bonuses, promo codes, and giveaways from games and online platforms. No hacks. Updated daily.",
  openGraph: {
    title: "NewFreeRewards – Free Rewards & Bonuses",
    description:
      "Find free rewards from games and online platforms. Emotes, bonuses, credits, and more.",
    url: "/",
    type: "website",
  },
  other: {
    "application-name": "NewFreeRewards",
    monetag: "9f8b97552771ece2a7c120c0c4dd932a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${concertOne.variable} antialiased`}
      >
        <SmartlinkPopunder />
        {children}
      </body>
    </html>
  );
}
