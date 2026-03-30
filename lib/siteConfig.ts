import { RewardContentType } from "@prisma/client";
import type { Locale } from "@/lib/i18n";

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
        id: "19",
        slug: "10-years-anniversary-banner",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/10-anivarsary-banner-qr.png",
        name: "10 Years Anniversary Banner",
        description: "Claim the 10 Years Anniversary Banner reward.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "clashroyale://action=voucher&code=f9a8c8fa-8844-4e3d-99df-8c01de1d8862",
            label: "Claim banner",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/10-anivarsary-banner-qr.png",
            alt: "10 Years Anniversary Banner QR",
          },
        ] as ContentType[],
      },
      {
        id: "18",
        slug: "anniversary-lucky-chest",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9CdGNveEs0WkM0ckRXeVozR3RQWi5wbmcifQ_supercell_zVyxpJ2NrDSCVDGXSC12sl7Hgv0erpL4-BypwkP6dVo.avif",
        name: "Anniversary Lucky Chest",
        description: "Claim the Anniversary Lucky Chest reward.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "clashroyale://action=voucher&code=60181558-34ad-4ea0-8b7f-154c001e6d4c",
            label: "Claim reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/anniversary-lucky-chest-qr.png",
            alt: "Anniversary Lucky Chest QR",
          },
        ] as ContentType[],
      },

      {
        id: "17",
        slug: "clash-royale-daily-rewards",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/Snippet_random.png",
        name: "Daily Rewards",
        description: "Claim your daily rewards from the Supercell Store.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value:
              "Log in to the Supercell Store every day to earn free rewards.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale",
            label: "Go to the Supercell Store",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/screenshot-1774385702330.png",
            alt: "Clash royale daily reward offer",
          },
          {
            type: "text",
            value:
              "the rewards may differ from day to day, so make sure to check the store regularly for new offers.",
          },
        ] as ContentType[],
      },
      {
        id: "2",
        slug: "2-star-lucky-chest",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/preview-2-star-magic-lucky-chest.png",
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/supercell-page-image.png",
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
        id: "16",
        slug: "skeleton-shield-bang-emote",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/preview-skeleton-shield-bang-emote.jpeg",
        name: "Skeleton Shield Bang Emote",
        description: "Claim the Skeleton Shield Bang emote.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "clashroyale://action=voucher&code=6884f0e3-367c-4449-93ef-fb4e17ac55a1",
            label: "Claim emote",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/skeleton-shield-bang-emote-qr.png",
            alt: "Skeleton Shield Bang emote QR",
          },
        ] as ContentType[],
      },
      {
        id: "15",
        slug: "smile-goblin-emote",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/preview-smile-goblin-emote.png",
        name: "Smile Goblin Emote",
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
          { type: "text", value: "Enter the code: ROYALEAFFAIR" },
          { type: "code", value: "ROYALEAFFAIR" },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale",
            label: "Go to the Supercell Store",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/smile-goblin-emote.png",
            alt: "Smile Goblin Emote",
          },
        ] as ContentType[],
      },
      {
        id: "13",
        slug: "3-seasonal-ironheart-lucky-chests",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/ironheart_chest.webp",
        name: "3 Seasonal Ironheart Lucky Chests",
        description: "Claim the 3 Seasonal Ironheart Lucky Chests.",
        status: "expired" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=0feff294-4a00-4a7b-ae21-0b299b90f916&fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExSmpRNlFiSk5xTGJodGxQdHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR4ch-sIiWAOWIchnfHj3zMCMHJcLBD8PQIEi8g4c8YwKYXF4IVrNsmEho-fag_aem_3Jil0vYRdcg1D39zc-2abQ",
            label: "Claim 3 Chests",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/3-seasonal-ironheart-lucky-chests.png",
            alt: "3 Seasonal Ironheart Lucky Chests QR",
          },
        ] as ContentType[],
      },
      {
        id: "14",
        slug: "jojo-musketeer-banner-set",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/jojo-musketeer banner-set.png",
            alt: "Jojo Musketeer banner set QR",
          },
        ] as ContentType[],
      },
      {
        id: "12",
        slug: "hero-goblin-troll-emote",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/b57ea5d2-2ae4-4886-bd13-47856cdd87b1.png",
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/screenshot-1770053665846.png",
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
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/preview-hero-ice-golem-emote.png",
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/hero-ice-golem-emote.png",
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
        id: "3",
        slug: "hero-wizard-emote",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/preview-hero-wizard-emote.png",
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/hero-wizard-emote.png",
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
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/preview-hero-musk-emote.png",
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/hero-musk-emote.png",
            alt: "Hero Musketeer emote",
          },
        ] as ContentType[],
      },
      {
        id: "5",
        slug: "flying-royal-hogs-emote",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/preview-fly-hog-emote.png",
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/screenshot-1769632832321.png",
            alt: "Flying Royal Hogs emote",
          },
        ] as ContentType[],
      },
      {
        id: "6",
        slug: "fire-and-ice-banner-set",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/screenshot-1769632944878.png",
            alt: "Fire and Ice banner set",
          },
        ] as ContentType[],
      },
      {
        id: "7",
        slug: "snoring-dragon-banner-set",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/screenshot-1769635646682.png",
            alt: "Snoring Dragon banner set",
          },
        ] as ContentType[],
      },
      {
        id: "8",
        slug: "1000-gold-reward",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/1000-gold-qr.png",
            alt: "1,000 Gold QR code",
          },
        ],
      },
      {
        id: "9",
        slug: "hot-hog-balloon-banner-frame",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/hot-hog-balloon-banner-banner.png",
            alt: "Hot Hog Balloon banner frame QR",
          },
        ] as ContentType[],
      },
      {
        id: "10",
        slug: "hamelia-hogwart-banner-decoration",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/hamelia-hoghart-banner.png",
            alt: "Hamelia Hogwart banner decoration QR",
          },
        ] as ContentType[],
      },
      {
        id: "11",
        slug: "royal-ghost-boo-emote",
        platform: {
          name: "Clash Royale",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/preview-royal-ghost-boo-emote.jpeg",
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
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/Royal-Ghost-Boo-emote.png",
            alt: "Royal Ghost Boo emote QR",
          },
        ] as ContentType[],
      },
    ] as RewardType[],
  },
  clashofclans: {
    rewards: [
      {
        id: "coc-1",
        slug: "50k-gold",
        platform: {
          name: "Clash of Clans",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/Clash_of_Clans.webp",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/50k-gold-qr-code.png",
        name: "50k Gold",
        description: "Claim 50,000 Gold for free in Clash of Clans.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value:
              "Scan the QR code or click the link below to claim your 50k gold.",
          },
          {
            type: "link",
            href: "https://link.clashofclans.com/en/?action=voucher&code=c1929e8e-e495-4096-a859-84008ba2209a",
            label: "Claim 50k Gold",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/50k-gold-qr-code.png",
            alt: "50k Gold QR Code",
          },
        ] as ContentType[],
      },
      {
        id: "coc-2",
        slug: "baby-dragon-statue",
        platform: {
          name: "Clash of Clans",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/Clash_of_Clans.webp",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/preview-baby-dragon-statue.avif",
        name: "Baby Dragon Statue",
        description: "Get the exclusive Baby Dragon Statue for your village.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value:
              "Follow the steps in the official store to claim your Baby Dragon Statue.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/clashofclans",
            label: "Open Supercell Store",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/baby-dragon-statue.png",
            alt: "Baby Dragon Statue",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/baby-dragon-statue-claimed.png",
            alt: "Baby Dragon Statue Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "coc-3",
        slug: "bundle-maker",
        platform: {
          name: "Clash of Clans",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/Clash_of_Clans.webp",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/bundle-maker.jpeg",
        name: "Bundle Maker Reward",
        description: "Special bundle maker reward available in the store.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Check out the bundle maker in the Supercell Store.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/clashofclans",
            label: "Go to Supercell Store",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/bundle-maker.jpeg",
            alt: "Bundle Maker Reward",
          },
        ] as ContentType[],
      },
      {
        id: "coc-4",
        slug: "monthly-reward",
        platform: {
          name: "Clash of Clans",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/Clash_of_Clans.webp",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/potion_of_resources.avif",
        name: "Monthly Reward - Resource Potion",
        description:
          "Claim your monthly resource potion from the Supercell Store.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value:
              "Log in to the Supercell Store to claim your monthly reward.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/clashofclans",
            label: "Go to Supercell Store",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/monthly-resource-potion.png",
            alt: "Monthly Resource Potion",
          },
        ] as ContentType[],
      },
    ] as RewardType[],
  },
  brawlstars: {
    rewards: [
      {
        id: "bs-18",
        slug: "reward-24321637",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.29_22.25.35.899-preview.png",
        name: "500 Coins",
        description: "Claim 500 Coins in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "brawlstars://voucher/24321637-3978-4f14-a258-a1a713d17213/",
            label: "Claim Coins",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.29_22.25.35.899-qr.png",
            alt: "500 Coins QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.29_22.25.35.899.png",
            alt: "500 Coins Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-17",
        slug: "reward-d99ca645",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.28_03.27.37.132-preview.png",
        name: "Special Event Box",
        description: "Claim this special event box in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "brawlstars://voucher/d99ca645-588a-41a2-9cbd-4f7ded8baf62/",
            label: "Claim Box",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.28_03.27.37.132-qr.png",
            alt: "Special Event Box QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.28_03.27.37.132.png",
            alt: "Special Event Box Claimed",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.28_03.28.04.258.png",
            alt: "Special Event Box Contents",
          },
        ] as ContentType[],
      },
      {
        id: "bs-16",
        slug: "reward-da19cd17",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.26_23.01.29.490-preview.png",
        name: "Player Icon Reward",
        description: "Claim this exclusive player icon in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/voucher/da19cd17-68af-4ed9-8671-b974a3a73356/",
            label: "Claim Icon",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.26_23.01.29.490-qr.png",
            alt: "Player Icon QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.26_23.01.29.490.png",
            alt: "Player Icon Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-daily",
        slug: "daily-brawl-stars-rewards",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/daily-reward-preview.png",
        name: "Daily Rewards",
        description: "Claim your daily rewards from the Supercell Store.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value:
              "Log in to the Supercell Store every day to earn free rewards. Checkout Supercell store and claim the reward.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/brawlstars",
            label: "Go to the Supercell Store",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/daily-reward-content.jpeg",
            alt: "Brawl Stars daily reward offer",
          },
          {
            type: "text",
            value: "Note: Rewards may differ from day to day.",
          },
        ] as ContentType[],
      },
      {
        id: "bs-supercell-store",
        slug: "supercell-store-gems-reward",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/af985a4f-194c-4a2d-b2d1-79ae58a7bd0b.png",
        name: "Supercell Store Gems",
        description: "Special gems reward available in the Supercell Store.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value:
              "Warning: Please login to the Supercell Store first, otherwise the page will return a 'Not Found' error.",
          },
          {
            type: "link",
            href: "https://store.supercell.com/en/brawlstars/product/gems/f1b5fcf4",
            label: "Go to the Supercell Store Offer",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/supercell-store-offer.jpeg",
            alt: "Supercell Store gems offer",
          },
        ] as ContentType[],
      },
      {
        id: "bs-1",
        slug: "spray-reward",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/preview-spray.png",
        name: "Spray Reward",
        description: "Claim this exclusive spray in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/voucher/681862df-f94d-4c34-8d52-deb634009490/",
            label: "Claim Spray",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/spray-qr-code.png",
            alt: "Spray Reward QR Code",
          },
        ] as ContentType[],
      },
      {
        id: "bs-2",
        slug: "skull-head-exploid-pin",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/preview-skull-head-exploid-pin.png",
        name: "Skull Head Exploid Pin",
        description: "Claim this exclusive pin in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/voucher/e4a3bb44-95fd-48d1-9fe6-378619bf2eb9",
            label: "Claim Pin",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/skull-head-exploid-pin-qr-code.png",
            alt: "Skull Head Exploid Pin QR Code",
          },
        ] as ContentType[],
      },
      {
        id: "bs-3",
        slug: "reward-cbd9bc12",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.22.52.003_preview.png",
        name: "Player Icon Reward",
        description: "Claim this exclusive player icon in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/voucher/cbd9bc12-423e-4a32-be45-590b0ebc52ad/",
            label: "Claim Icon",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/playericon129312.png",
            alt: "Player Icon QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.22.52.003.png",
            alt: "Player Icon Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-4",
        slug: "reward-8142f715",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.24.20.973_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/?action=voucher&code=8142f715-a879-4d19-9af3-fa49e72ef59a",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/rewards1293192398.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.24.20.973.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-5",
        slug: "reward-04f69983",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.34.33.409_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/voucher/04f69983-0712-49b3-af7a-3718398c4517/",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/reward2192813.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.34.33.409.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-6",
        slug: "reward-6bb96c6a",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.39.52.284.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/?action=voucher&code=6bb96c6a-bb06-4b06-aae8-4de28c39474d",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/reward3910238.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.39.52.284.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-7",
        slug: "reward-935251d2",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.41.41.374_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/?action=voucher&code=935251d2-1647-433e-a6e6-771a6ade9293",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/rewards928298.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.41.41.374.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-8",
        slug: "reward-ab9cf7c2",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.43.39.051_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/?action=voucher&code=ab9cf7c2-45f8-4012-ad38-dfe8b1747c3b",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/rewards882819.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.08_23.43.39.051.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-9",
        slug: "reward-3484c6d2",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_00.45.14.032_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/?action=voucher&code=3484c6d2-9ab5-4eae-878a-4a186fc4e24a",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/rewards3829.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_00.45.14.032.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-10",
        slug: "reward-4c9ea6d6",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_00.46.40.312_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/?action=voucher&code=4c9ea6d6-10f7-430d-a506-201903512c50",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/reward391200.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_00.46.40.312.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-11",
        slug: "reward-91eead0b",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_00.47.59.155_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/?action=voucher&code=91eead0b-0917-4077-8efe-6b852c7e49a3",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/reward299218.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_00.47.59.155.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-12",
        slug: "reward-2593e957",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_00.56.34.971_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/fr/?action=voucher&code=2593e957-9cef-4ce7-b15f-b1dec74ec7df",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/reward39219.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_00.56.34.971.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-13",
        slug: "reward-315b3e4f",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_01.01.14.646_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/?action=voucher&code=315b3e4f-0fd5-4a31-a5b0-86806f7638fc",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/reward29188.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_01.01.14.646.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-14",
        slug: "reward-b647c71d",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_01.03.07.173_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/en/?action=voucher&code=b647c71d-41a5-42c4-a10f-8d47952d82f3",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/reward122391.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_01.03.07.173.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
      {
        id: "bs-15",
        slug: "reward-cc017c48",
        platform: { name: "Brawl Stars", src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg" },
        previewImage:
          "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_01.04.19.591_preview.png",
        name: "Brawl Stars Reward",
        description: "Claim this reward in Brawl Stars.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "link",
            href: "https://link.brawlstars.com/fr/?action=voucher&code=cc017c48-b904-448d-9fe1-dd494e28bfd2",
            label: "Claim Reward",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/reward21883.png",
            alt: "Reward QR Code",
          },
          {
            type: "text",
            value: "This is what it looks like after being claimed:",
          },
          {
            type: "image",
            src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/Screenshot_2026.03.09_01.04.19.591.png",
            alt: "Reward Claimed",
          },
        ] as ContentType[],
      },
    ] as RewardType[],
  },
  genshinimpact: {
    rewards: [
      {
        id: "genshin-codes",
        slug: "redemption-codes",
        platform: {
          name: "Genshin Impact",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/genshin-impact/logo.png",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/genshin-impact/logo.png",
        name: "Redemption Codes",
        description:
          "Check out the latest redemption codes for Genshin Impact.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value:
              "Find all the latest active redemption codes for Genshin Impact and learn how to claim them.",
          },
          {
            type: "link",
            href: "/games/genshin-impact/rewards/redemption-codes",
            label: "View All Codes",
          },
        ] as ContentType[],
      },
    ] as RewardType[],
  },
  honkaistarrail: {
    rewards: [
      {
        id: "hsr-codes",
        slug: "redemption-codes",
        platform: {
          name: "Honkai: Star Rail",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/honkai-star-rail/logo.png",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/honkai-star-rail/logo.png",
        name: "Redemption Codes",
        description:
          "Check out the latest redemption codes for Honkai: Star Rail.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value:
              "Find all the latest active redemption codes for Honkai: Star Rail and learn how to claim them.",
          },
          {
            type: "link",
            href: "/games/honkai-star-rail/rewards/redemption-codes",
            label: "View All Codes",
          },
        ] as ContentType[],
      },
    ] as RewardType[],
  },
  roblox: {
    rewards: [
      {
        id: "roblox-codes",
        slug: "redemption-codes",
        platform: {
          name: "Roblox",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/roblox/logo.png",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/roblox/logo.png",
        name: "Redemption Codes",
        description: "Check out the latest redemption codes for Roblox.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Find all the latest active redemption codes for Roblox and learn how to claim them.",
          },
          {
            type: "link",
            href: "/games/roblox/rewards/redemption-codes",
            label: "View All Codes",
          },
        ] as ContentType[],
      },
    ] as RewardType[],
  },
  riseofkingdoms: {
    rewards: [
      {
        id: "rok-codes",
        slug: "redemption-codes",
        platform: {
          name: "Rise of Kingdoms",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/rise-of-kingdoms/logo.png",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/rise-of-kingdoms/logo.png",
        name: "Redemption Codes",
        description: "Check out the latest redemption codes for Rise of Kingdoms.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Find all the latest active redemption codes for Rise of Kingdoms and learn how to claim them.",
          },
          {
            type: "link",
            href: "/games/rise-of-kingdoms/rewards/redemption-codes",
            label: "View All Codes",
          },
        ] as ContentType[],
      },
    ] as RewardType[],
  },
  growagarden: {
    rewards: [
      {
        id: "grow-a-garden-codes",
        slug: "redemption-codes",
        platform: {
          name: "Grow a Garden",
          src: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/grow-a-garden/logo.webp",
        },
        previewImage: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/grow-a-garden/logo.webp",
        name: "Redemption Codes",
        description: "Check out the latest redemption codes for Grow a Garden.",
        status: "active" as "active" | "expired",
        content: [
          {
            type: "text",
            value: "Find all the latest active redemption codes for Grow a Garden and learn how to claim them.",
          },
          {
            type: "link",
            href: "/games/grow-a-garden/rewards/redemption-codes",
            label: "View All Codes",
          },
        ] as ContentType[],
      },
    ] as RewardType[],
  },
};

const clashOfClansTranslations: Partial<
  Record<Locale, Record<string, { name?: string; description?: string }>>
> = {
  es: {
    "50k-gold": {
      name: "50k de Oro",
      description: "Reclama 50,000 de oro gratis en Clash of Clans.",
    },
    "baby-dragon-statue": {
      name: "Estatua de Bebé Dragón",
      description:
        "Consigue la estatua exclusiva de Bebé Dragón para tu aldea.",
    },
    "bundle-maker": {
      name: "Recompensa Bundle Maker",
      description:
        "Recompensa especial del creador de paquetes disponible en la tienda.",
    },
    "monthly-reward": {
      name: "Recompensa Mensual - Poción de Recursos",
      description:
        "Reclama tu poción de recursos mensual en la tienda de Supercell.",
    },
  },
  ar: {
    "50k-gold": {
      name: "50 ألف ذهب",
      description: "احصل على 50,000 ذهب مجانًا في Clash of Clans.",
    },
    "baby-dragon-statue": {
      name: "تمثال التنين الصغير",
      description: "احصل على تمثال التنين الصغير الحصري لقريتك.",
    },
    "bundle-maker": {
      name: "مكافأة Bundle Maker",
      description: "مكافأة خاصة من صانع الحزم متاحة في المتجر.",
    },
    "monthly-reward": {
      name: "مكافأة شهرية - جرعة موارد",
      description: "احصل على جرعة الموارد الشهرية من متجر Supercell.",
    },
  },
};

const clashRoyaleTranslations: Partial<
  Record<Locale, Record<string, { name?: string; description?: string }>>
> = {
  es: {
    "10-years-banner": {
      name: "Banner de 10 Años",
      description: "Reclama la recompensa del Banner de 10 Años.",
    },
    "anniversary-lucky-chest": {
      name: "Cofre de Suerte de Aniversario",
      description: "Reclama la recompensa del Cofre de Suerte de Aniversario.",
    },

    "skeleton-shield-bang-emote": {
      name: "Emote Skeleton Shield Bang",
      description: "Reclama el emote Skeleton Shield Bang.",
    },
    "smile-goblin-emote": {
      name: "Emote Duende Sonriente",
      description: "Canjea un código promocional para desbloquear este emote.",
    },
    "3-seasonal-ironheart-lucky-chests": {
      name: "3 Cofres de Suerte Ironheart de temporada",
      description: "Reclama los 3 cofres de suerte Ironheart de temporada.",
    },
    "jojo-musketeer-banner-set": {
      name: "Set de banner de Jojo Musketeer",
      description: "Reclama el set de banner de Jojo Musketeer.",
    },
    "hero-goblin-troll-emote": {
      name: "Emote de Héroe Duende Troll",
      description: "Sigue los pasos para reclamar este emote.",
    },
    "hero-ice-golem-emote": {
      name: "Emote de Héroe Gólem de Hielo",
      description: "Sigue los pasos para reclamar este emote.",
    },
    "2-star-lucky-chest": {
      name: "Cofre de Suerte de 2 estrellas",
      description: "Sigue los pasos para reclamar este cofre.",
    },
    "hero-wizard-emote": {
      name: "Emote de Héroe Mago",
      description: "Sigue los pasos para reclamar este emote.",
    },
    "hero-musketeer-emote": {
      name: "Emote de Héroe Mosquetera",
      description: "Sigue los pasos para reclamar este emote.",
    },
    "flying-royal-hogs-emote": {
      name: "Emote de Cerdos Reales Voladores",
      description: "Desbloqueا هذا الإيموجي باستخدام كود.",
    },
    "fire-ice-banner-set": {
      name: "Set de banner Fuego y Hielo",
      description: "Incluye decoración Ember Escape y marco Firestorm.",
    },
    "snoring-dragon-banner-set": {
      name: "Set de banner Dragón Durmiente",
      description: "Desbloquea esta decoración de banner gratis.",
    },
    "1000-gold": {
      name: "1,000 de oro",
      description: "Reclama 1,000 de oro al instante.",
    },
    "hot-hog-balloon-banner-frame": {
      name: "Marco de banner Hot Hog Balloon",
      description: "Reclama este marco con QR o enlace directo.",
    },
    "hamelia-hogwart-banner-decoration": {
      name: "Decoración de banner Hamelia Hogwart",
      description: "Desbloquea esta decoración de banner gratis.",
    },
    "royal-ghost-boo-emote": {
      name: "Emote Royal Ghost Boo",
      description: "Reclama el emote Royal Ghost Boo.",
    },
    "clash-royale-daily-rewards": {
      name: "Recompensas Diarias",
      description: "Reclama tus recompensas diarias en la tienda de Supercell.",
    },
  },
  ar: {
    "10-years-banner": {
      name: "بانر 10 سنوات",
      description: "احصل على مكافأة بانر 10 سنوات.",
    },
    "anniversary-lucky-chest": {
      name: "صندوق الحظ للذكرى السنوية",
      description: "احصل على مكافأة صندوق الحظ للذكرى السنوية.",
    },

    "skeleton-shield-bang-emote": {
      name: "إيموجي Skeleton Shield Bang",
      description: "احصل على إيموجي Skeleton Shield Bang.",
    },
    "smile-goblin-emote": {
      name: "إيموجي العفريت المبتسم",
      description: "استخدم كودًا ترويجيًا لفتح هذا الإيموجي.",
    },
    "3-seasonal-ironheart-lucky-chests": {
      name: "3 صناديق حظ Ironheart موسمية",
      description: "احصل على 3 صناديق حظ Ironheart الموسمية.",
    },
    "jojo-musketeer-banner-set": {
      name: "مجموعة بانر Jojo Musketeer",
      description: "احصل على مجموعة بانر Jojo Musketeer.",
    },
    "hero-goblin-troll-emote": {
      name: "إيموجي البطل الغوبلن الترول",
      description: "اتبع الخطوات التالية للحصول على هذا الإيموجي.",
    },
    "hero-ice-golem-emote": {
      name: "إيموجي البطل آيس غولم",
      description: "اتبع الخطوات التالية للحصول على هذا الإيموجي.",
    },
    "2-star-lucky-chest": {
      name: "صندوق الحظ نجمتين",
      description: "اتبع الخطوات التالية للحصول على هذا الصندوق.",
    },
    "hero-wizard-emote": {
      name: "إيموجي البطل الساحر",
      description: "اتبع الخطوات التالية للحصول على هذا الإيموجي.",
    },
    "hero-musketeer-emote": {
      name: "إيموجي البطل ماسكيتير",
      description: "اتبع الخطوات التالية للحصول على هذا الإيموجي.",
    },
    "flying-royal-hogs-emote": {
      name: "إيموجي الخنازير الملكية الطائرة",
      description: "افتح هذا الإيموجي باستخدام كود.",
    },
    "fire-ice-banner-set": {
      name: "مجموعة بانر النار والجليد",
      description: "تتضمن زخرفة Ember Escape وإطار Firestorm.",
    },
    "snoring-dragon-banner-set": {
      name: "مجموعة بانر التنين النائم",
      description: "افتح زخرفة بانر التنين النائم مجانًا.",
    },
    "1000-gold": {
      name: "1,000 ذهب",
      description: "احصل على 1,000 ذهب فورًا.",
    },
    "hot-hog-balloon-banner-frame": {
      name: "إطار بانر Hot Hog Balloon",
      description: "احصل على هذا الإطار عبر QR أو رابط مباشر.",
    },
    "hamelia-hogwart-banner-decoration": {
      name: "زخرفة بانر Hamelia Hogwart",
      description: "افتح هذه الزخرفة مجانًا.",
    },
    "royal-ghost-boo-emote": {
      name: "إيموجي Royal Ghost Boo",
      description: "احصل على إيموجي Royal Ghost Boo.",
    },
    "clash-royale-daily-rewards": {
      name: "مكافآت يومية",
      description: "احصل على مكافآتك يومية من متجر Supercell.",
    },
  },
};

const brawlStarsTranslations: Partial<
  Record<Locale, Record<string, { name?: string; description?: string }>>
> = {
  es: {
    "daily-brawl-stars-rewards": {
      name: "Recompensas Diarias",
      description: "Reclama tus recompensas diarias en la tienda de Supercell.",
    },
    "spray-reward": {
      name: "Recompensa de Spray",
      description: "Reclama este spray exclusivo en Brawl Stars.",
    },
    "skull-head-exploid-pin": {
      name: "Pin de Calavera Explosiva",
      description: "Reclama este pin exclusivo en Brawl Stars.",
    },
    "supercell-store-gems-reward": {
      name: "Gemas de la Tienda Supercell",
      description:
        "Recompensa especial de gemas disponible en la tienda Supercell.",
    },
    "reward-da19cd17": {
      name: "Recompensa de Icono de Jugador",
      description: "Reclama este icono de jugador exclusivo en Brawl Stars.",
    },
    "reward-d99ca645": {
      name: "Cofre de Evento Especial",
      description: "Reclama este cofre de evento especial en Brawl Stars.",
    },
    "reward-24321637": {
      name: "Recompensa de 500 Monedas",
      description: "Reclama 500 monedas en Brawl Stars.",
    },
  },
  ar: {
    "daily-brawl-stars-rewards": {
      name: "مكافآت يومية",
      description: "احصل على مكافأتك اليومية من متجر Supercell.",
    },
    "spray-reward": {
      name: "مكافأة بخاخ",
      description: "احصل على هذا البخاخ الحصري في Brawl Stars.",
    },
    "skull-head-exploid-pin": {
      name: "دبوس رأس الجمجمة المتفجر",
      description: "احصل على هذا الدبوس الحصري في Brawl Stars.",
    },
    "supercell-store-gems-reward": {
      name: "جواهر متجر Supercell",
      description: "مكافأة جواهر خاصة متاحة في متجر Supercell.",
    },
    "reward-da19cd17": {
      name: "مكافأة أيقونة اللاعب",
      description: "احصل على أيقونة اللاعب الحصرية هذه في Brawl Stars.",
    },
    "reward-d99ca645": {
      name: "صندوق حدث خاص",
      description: "احصل على صندوق الحدث الخاص هذا في Brawl Stars.",
    },
    "reward-24321637": {
      name: "مكافأة 500 عملة",
      description: "احصل على 500 عملة في Brawl Stars.",
    },
  },
};

const contentTextTranslations: Partial<Record<Locale, Record<string, string>>> =
  {
    es: {
      "Claim banner": "Reclamar banner",
      "10 Years Banner QR": "QR del Banner de 10 Años",
      "Open the Supercell store website and log in.":
        "Abre la tienda de Supercell e inicia sesión.",
      "Scroll to the bottom and find the redeem code input.":
        "Desplázate hasta abajo y busca el campo para canjear código.",
      "Enter the code: ROYALEAFFAIR": "Introduce el código: ROYALEAFFAIR",
      "Go to the Supercell Store": "Ir a la tienda de Supercell",
      "Claim 3 Chests": "Reclamar 3 cofres",
      "Claim banner set": "Reclamar set de banner",
      "Note: Make sure you are logged in before clicking the emote link.":
        "Nota: asegúrate de haber iniciado sesión antes de abrir el enlace del emote.",
      "Click here to open the emote offer":
        "Haz clic aquí para abrir la oferta del emote",
      "Click the Free button, then open Clash Royale to receive the emote.":
        "Pulsa el botón Gratis y luego abre Clash Royale para recibir el emote.",
      "Open the Supercell Store": "Abrir la tienda de Supercell",
      "Scroll down and click on bonuses box which will appears when you scroll down , then click the Lucky Chest reward.":
        "Desplázate hacia abajo y pulsa en la caja de bonificaciones que aparece; luego pulsa la recompensa Lucky Chest.",
      "Open the link or scan the QR code .":
        "Abre el enlace o escanea el código QR.",
      "Enter the code: REINABARRIGA": "Introduce el código: REINABARRIGA",
      "Redeem the code here": "Canjear el código aquí",
      "Enter the code: WHENHOGSFLY!": "Introduce el código: WHENHOGSFLY!",
      "Enter the code: FIREANDICE!!": "Introduce el código: FIREANDICE!!",
      "Enter the code: TRUSTYTURRET": "Introduce el código: TRUSTYTURRET",
      "Claim 1,000 Gold": "Reclamar 1,000 de oro",
      "Claim banner frame": "Reclamar marco de banner",
      "Claim banner decoration": "Reclamar decoración de banner",
      "Claim emote": "Reclamar emote",
      "Skeleton Shield Bang emote QR": "QR del emote Skeleton Shield Bang",
      "Log in to the Supercell Store every day to earn free rewards.":
        "Inicia sesión en la tienda de Supercell todos los días para ganar recompensas gratuitas.",
      "This is what it looks like after being claimed:":
        "Así es como se ve después de ser reclamado:",
      "Scan the QR code or click the link below to claim your 50k gold.":
        "Escanea el código QR o haz clic en el enlace de abajo para reclamar tus 50k de oro.",
      "Claim 50k Gold": "Reclamar 50k de Oro",
      "50k Gold QR Code": "Código QR de 50k de Oro",
      "Follow the steps in the official store to claim your Baby Dragon Statue.":
        "Sigue los pasos en la tienda oficial para reclamar tu estatua de Bebé Dragón.",
      "Baby Dragon Statue": "Estatua de Bebé Dragón",
      "Baby Dragon Statue Claimed": "Estatua de Bebé Dragón Reclamada",
      "Check out the bundle maker in the Supercell Store.":
        "Echa un vistazo al creador de paquetes en la tienda de Supercell.",
      "Bundle Maker Reward": "Recompensa Bundle Maker",
      "Log in to the Supercell Store to claim your monthly reward.":
        "Inicia sesión en la tienda de Supercell para reclamar tu recompensa mensual.",
      "Go to Supercell Store": "Ir a la tienda de Supercell",
      "Monthly Resource Potion": "Poción de Recursos Mensual",
      "Claim Coins": "Reclamar monedas",
      "500 Coins QR Code": "Código QR de 500 Monedas",
      "500 Coins Claimed": "500 Monedas Reclamadas",
    },
    ar: {
      "Claim banner": "احصل على البانر",
      "10 Years Banner QR": "رمز QR لبانر 10 سنوات",
      "Open the Supercell store website and log in.":
        "افتح متجر Supercell وسجّل الدخول.",
      "Scroll to the bottom and find the redeem code input.":
        "مرّر للأسفل وابحث عن حقل إدخال كود الاسترداد.",
      "Enter the code: ROYALEAFFAIR": "أدخل الكود: ROYALEAFFAIR",
      "Go to the Supercell Store": "اذهب إلى متجر Supercell",
      "Claim 3 Chests": "احصل على 3 صناديق",
      "Claim banner set": "احصل على مجموعة البانر",
      "Note: Make sure you are logged in before clicking the emote link.":
        "ملاحظة: تأكد من تسجيل الدخول قبل الضغط على رابط الإيموجي.",
      "Click here to open the emote offer": "اضغط هنا لفتح عرض الإيموجي",
      "Click the Free button, then open Clash Royale to receive the emote.":
        "اضغط زر Free ثم افتح Clash Royale لاستلام الإيموجي.",
      "Open the Supercell Store": "افتح متجر Supercell",
      "Scroll down and click on bonuses box which will appears when you scroll down , then click the Lucky Chest reward.":
        "مرّر للأسفل ثم اضغط على صندوق المكافآت الذي يظهر، ثم اختر مكافأة Lucky Chest.",
      "Open the link or scan the QR code .": "افتح الرابط أو امسح رمز QR.",
      "Enter the code: REINABARRIGA": "أدخل الكود: REINABARRIGA",
      "Redeem the code here": "استرد الكود من هنا",
      "Enter the code: WHENHOGSFLY!": "أدخل الكود: WHENHOGSFLY!",
      "Enter the code: FIREANDICE!!": "أدخل الكود: FIREANDICE!!",
      "Enter the code: TRUSTYTURRET": "أدخل الكود: TRUSTYTURRET",
      "Claim 1,000 Gold": "احصل على 1,000 ذهب",
      "Claim banner frame": "احصل على إطار البانر",
      "Claim banner decoration": "احصل على زخرفة البانر",
      "Claim emote": "احصل على الإيموجي",
      "Skeleton Shield Bang emote QR": "رمز QR لإيموجي Skeleton Shield Bang",
      "Log in to the Supercell Store every day to earn free rewards.":
        "سجّل الدخول إلى متجر Supercell يوميًا للحصول على مكافآت مجانية.",
      "This is what it looks like after being claimed:":
        "هذا هو الشكل الذي يبدو عليه بعد استلامه:",
      "Scan the QR code or click the link below to claim your 50k gold.":
        "امسح رمز QR أو اضغط على الرابط أدناه للحصول على 50 ألف ذهب.",
      "Claim 50k Gold": "احصل على 50 ألف ذهب",
      "50k Gold QR Code": "رمز QR لـ 50 ألف ذهب",
      "Follow the steps in the official store to claim your Baby Dragon Statue.":
        "اتبع الخطوات في المتجر الرسمي للحصول على تمثال التنين الصغير.",
      "Baby Dragon Statue": "تمثال التنين الصغير",
      "Baby Dragon Statue Claimed": "تم استلام تمثال التنين الصغير",
      "Check out the bundle maker in the Supercell Store.":
        "تحقق من صانع الحزم في متجر Supercell.",
      "Bundle Maker Reward": "مكافأة صانع الحزم",
      "Log in to the Supercell Store to claim your monthly reward.":
        "سجّل الدخول إلى متجر Supercell للحصول على مكافأتك الشهرية.",
      "Go to Supercell Store": "اذهب إلى متجر Supercell",
      "Monthly Resource Potion": "جرعة الموارد الشهرية",
      "Claim Coins": "احصل على العملات",
      "500 Coins QR Code": "رمز QR لـ 500 عملة",
      "500 Coins Claimed": "تم استلام 500 عملة",
    },
  };

function translateContentText(locale: Locale, text?: string) {
  if (!text) return text;
  return contentTextTranslations[locale]?.[text] || text;
}

export function getLocalizedClashRoyaleRewards(locale: Locale): RewardType[] {
  const localizedEntries = clashRoyaleTranslations[locale] || {};

  return siteConfig.clashroyale.rewards.map((reward) => {
    const translation = localizedEntries[reward.slug];

    return {
      ...reward,
      name: translation?.name || reward.name,
      description: translation?.description || reward.description,
      content: reward.content.map((content) => ({
        ...content,
        value: translateContentText(locale, content.value),
        label: translateContentText(locale, content.label),
        alt: translateContentText(locale, content.alt),
      })),
    };
  });
}

export function getLocalizedClashOfClansRewards(locale: Locale): RewardType[] {
  const localizedEntries = clashOfClansTranslations[locale] || {};

  return siteConfig.clashofclans.rewards.map((reward) => {
    const translation = localizedEntries[reward.slug];

    return {
      ...reward,
      name: translation?.name || reward.name,
      description: translation?.description || reward.description,
      content: reward.content.map((content) => ({
        ...content,
        value: translateContentText(locale, content.value),
        label: translateContentText(locale, content.label),
        alt: translateContentText(locale, content.alt),
      })),
    };
  });
}

export function getLocalizedBrawlStarsRewards(locale: Locale): RewardType[] {
  const localizedEntries = brawlStarsTranslations[locale] || {};

  return siteConfig.brawlstars.rewards.map((reward) => {
    const translation = localizedEntries[reward.slug];

    return {
      ...reward,
      name: translation?.name || reward.name,
      description: translation?.description || reward.description,
      content: reward.content.map((content) => ({
        ...content,
        value: translateContentText(locale, content.value),
        label: translateContentText(locale, content.label),
        alt: translateContentText(locale, content.alt),
      })),
    };
  });
}

export function getLocalizedGenshinImpactRewards(locale: Locale): RewardType[] {
  return siteConfig.genshinimpact.rewards.map((reward) => ({
    ...reward,
    content: reward.content.map((content) => ({
      ...content,
      value: translateContentText(locale, content.value),
      label: translateContentText(locale, content.label),
      alt: translateContentText(locale, content.alt),
    })),
  }));
}

export function getLocalizedHonkaiStarRailRewards(
  locale: Locale,
): RewardType[] {
  return siteConfig.honkaistarrail.rewards.map((reward) => ({
    ...reward,
    content: reward.content.map((content) => ({
      ...content,
      value: translateContentText(locale, content.value),
      label: translateContentText(locale, content.label),
      alt: translateContentText(locale, content.alt),
    })),
  }));
}

export function getLocalizedRobloxRewards(locale: Locale): RewardType[] {
  return siteConfig.roblox.rewards.map((reward) => ({
    ...reward,
    content: reward.content.map((content) => ({
      ...content,
      value: translateContentText(locale, content.value),
      label: translateContentText(locale, content.label),
      alt: translateContentText(locale, content.alt),
    })),
  }));
}

export function getLocalizedRiseOfKingdomsRewards(locale: Locale): RewardType[] {
  return siteConfig.riseofkingdoms.rewards.map((reward) => ({
    ...reward,
    content: reward.content.map((content) => ({
      ...content,
      value: translateContentText(locale, content.value),
      label: translateContentText(locale, content.label),
      alt: translateContentText(locale, content.alt),
    })),
  }));
}

export function getLocalizedGrowAGardenRewards(locale: Locale): RewardType[] {
  return siteConfig.growagarden.rewards.map((reward) => ({
    ...reward,
    content: reward.content.map((content) => ({
      ...content,
      value: translateContentText(locale, content.value),
      label: translateContentText(locale, content.label),
      alt: translateContentText(locale, content.alt),
    })),
  }));
}

export default siteConfig;
