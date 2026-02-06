import { $Enums, RewardContentType } from "@prisma/client";

interface ContentType {
  type: RewardContentType;
  value?: string;
  href?: string;
  src?: string;
  alt?: string;
  label?: string;
}

interface RewardType {
  id: string;
  slug: string;
  platform: {
    name: string;
    src: string;
  };
  previewImage?: string;
  name: string;
  description: string;
  status: "active" | "expired";
  content: ContentType[];
}

const siteConfig = {
  navLinks: [
    { href: "/", title: "Home" },
    { href: "/#list", title: "All Rewards" },
    { href: "/games", title: "Games" },
    { href: "/contact", title: "Contact" },
    { href: "/#faq", title: "FAQ" },
  ],
  clashroyale: {
    rewards: [
      {
        id: "13",
        slug: "3-seasonal-ironheart-lucky-chests",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/ironheart_chest.webp",
        name: "3 Seasonal Ironheart Lucky Chests",
        description: "Claim the 3 Seasonal Ironheart Lucky Chests.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=0feff294-4a00-4a7b-ae21-0b299b90f916&fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExSmpRNlFiSk5xTGJodGxQdHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR4ch-sIiWAOWIchnfHj3zMCMHJcLBD8PQIEi8g4c8YwKYXF4IVrNsmEho-fag_aem_3Jil0vYRdcg1D39zc-2abQ",
            label: "Claim 3 Chests",
          },
          {
            type: "image",
            src: "/3-seasonal-ironheart-lucky-chests.png",
            alt: "3 Seasonal Ironheart Lucky Chests QR",
          },
        ] as ContentType[],
      },
      {
        id: "14",
        slug: "jojo-musketeer-banner-set",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        name: "Jojo Musketeer banner set",
        description: "Claim the Jojo Musketeer banner set.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=94158c89-9f24-4d8c-8694-76eb087caef2",
            label: "Claim banner set",
          },
          {
            type: "image",
            src: "/jojo-musketeer banner-set.png",
            alt: "Jojo Musketeer banner set QR",
          },
        ] as ContentType[],
      },
      {
        id: "12",
        slug: "hero-goblin-troll-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/b57ea5d2-2ae4-4886-bd13-47856cdd87b1.png",
        name: "Hero Goblin Troll Emote",
        description: "Follow the steps below to claim this emote.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Open the Supercell store website and log in.",
          },
          {
            type: "text",
            value:
              "Note: Make sure you are logged in before clicking the emote link.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale/product/emote/9f336c3b",
            label: "Click here to open the emote offer",
          },
          {
            type: "image",
            src: "/screenshot-1770053665846.png",
            alt: "Hero Goblin Troll emote page",
          },
          {
            type: "text",
            value:
              "Click the Free button, then open Clash Royale to receive the emote.",
          },
        ] as ContentType[],
      },
      {
        id: "1",
        slug: "hero-ice-golem-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/preview-hero-ice-golem-emote.png",
        name: "Hero Ice Golem Emote",
        description: "Follow the steps below to claim this emote.",
        status: "expired" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Open the Supercell store website and log in.",
          },
          {
            type: "text",
            value:
              "Note: Make sure you are logged in before clicking the emote link.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale/product/emote/425024a6",
            label: "Click here to open the emote offer",
          },
          {
            type: "image",
            src: "/hero-ice-golem-emote.png",
            alt: "Hero Ice Golem emote page",
          },
          {
            type: "text",
            value:
              "Click the Free button, then open Clash Royale to receive the emote.",
          },
        ] as ContentType[],
      },

      {
        id: "2",
        slug: "2-star-lucky-chest",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/preview-2-star-magic-lucky-chest.png",
        name: "2-Star Lucky Chest",
        description: "Follow the steps below to claim this chest.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Open the Supercell store website and log in.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale",
            label: "Open the Supercell Store",
          },
          {
            type: "image",
            src: "/supercell-page-image.png",
            alt: "Supercell Store page",
          },
          {
            type: "text",
            value:
              "Scroll down and click on bonuses box which will appears when you scroll down , then click the Lucky Chest reward.",
          },
        ] as ContentType[],
      },

      {
        id: "3",
        slug: "hero-wizard-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/preview-hero-wizard-emote.png",
        name: "Hero Wizard Emote",
        description: "Follow the steps below to claim this emote.",
        status: "expired" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Open the Supercell store website and log in.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale/product/emote/425024a6",
            label: "Click here to open the emote offer",
          },
          {
            type: "image",
            src: "/hero-wizard-emote.png",
            alt: "Hero Wizard emote page",
          },
          {
            type: "text",
            value:
              "Click the Free button, then open Clash Royale to receive the emote.",
          },
        ] as ContentType[],
      },

      {
        id: "4",
        slug: "hero-musketeer-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/preview-hero-musk-emote.png",
        name: "Hero Musketeer Emote",
        description: "Redeem a promo code to unlock this emote.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Open the Supercell store website and log in.",
          },
          {
            type: "text",
            value: "Scroll to the bottom and find the redeem code input.",
          },
          { type: "text", value: "Enter the code: TRUSTYTURRET" },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale",
            label: "Go to the Supercell Store",
          },
          {
            type: "image",
            src: "/hero-musk-emote.png",
            alt: "Hero Musketeer emote",
          },
        ] as ContentType[],
      },

      {
        id: "5",
        slug: "flying-royal-hogs-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/preview-fly-hog-emote.png",
        name: "Flying Royal Hogs Emote",
        description: "Unlock the Flying Royal Hogs emote using a code.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Open the Supercell store website and log in.",
          },
          { type: "text", value: "Enter the code: WHENHOGSFLY!" },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale",
            label: "Redeem the code here",
          },
          {
            type: "image",
            src: "/screenshot-1769632832321.png",
            alt: "Flying Royal Hogs emote",
          },
        ] as ContentType[],
      },

      {
        id: "6",
        slug: "fire-and-ice-banner-set",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        name: "Fire & Ice Banner Set",
        description:
          "Includes Ember Escape decoration and Firestorm banner frame.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Open the Supercell store website and log in.",
          },
          { type: "text", value: "Enter the code: FIREANDICE!!" },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale",
            label: "Redeem the code here",
          },
          {
            type: "image",
            src: "/screenshot-1769632944878.png",
            alt: "Fire and Ice banner set",
          },
        ] as ContentType[],
      },

      {
        id: "7",
        slug: "snoring-dragon-banner-set",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        name: "Snoring Dragon Banner Set",
        description: "Unlock the Snoring Dragon banner decoration.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Open the Supercell store website and log in.",
          },
          { type: "text", value: "Enter the code: REINABARRIGA" },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale",
            label: "Redeem the code here",
          },
          {
            type: "image",
            src: "/screenshot-1769635646682.png",
            alt: "Snoring Dragon banner set",
          },
        ] as ContentType[],
      },

      {
        id: "8",
        slug: "1000-gold-reward",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        name: "1,000 Gold",
        description: "Claim 1,000 Gold instantly.",
        status: "active" as "active" | "expired",
        content: [
          { type: "text", value: "Open the link or scan the QR code ." },
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=2c13ee10-68de-4cc6-940e-57cfb9aebb0c",
            label: "Claim 1,000 Gold",
          },
          {
            type: "image",
            src: "/1000-gold-qr.png",
            alt: "1,000 Gold QR code",
          },
        ],
      },

      {
        id: "9",
        slug: "hot-hog-balloon-banner-frame",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        name: "Hot Hog Balloon Banner Frame",
        description: "Claim this banner frame via QR or direct link.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=f49b8488-8068-4b1a-8f9f-57e1517f2f5a",
            label: "Claim banner frame",
          },
          {
            type: "image",
            src: "/hot-hog-balloon-banner-banner.png",
            alt: "Hot Hog Balloon banner frame QR",
          },
        ] as ContentType[],
      },

      {
        id: "10",
        slug: "hamelia-hogwart-banner-decoration",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        name: "Hamelia Hogwart Banner Decoration",
        description: "Unlock this banner decoration for free.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=80486871-5620-4237-83fb-42174ddc8a83",
            label: "Claim banner decoration",
          },
          {
            type: "image",
            src: "/hamelia-hoghart-banner.png",
            alt: "Hamelia Hogwart banner decoration QR",
          },
        ] as ContentType[],
      },

      {
        id: "11",
        slug: "royal-ghost-boo-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/preview-royal-ghost-boo-emote.jpeg",
        name: "Royal Ghost Boo Emote",
        description: "Claim the Royal Ghost Boo emote.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.clashroyale.com/de/?action=voucher&code=bf578c2b-bc44-4312-8c61-5e513b6fb817",
            label: "Claim emote",
          },
          {
            type: "image",
            src: "/Royal-Ghost-Boo-emote.png",
            alt: "Royal Ghost Boo emote QR",
          },
        ] as ContentType[],
      },
    ] as RewardType[],
  },
};

export default siteConfig;
