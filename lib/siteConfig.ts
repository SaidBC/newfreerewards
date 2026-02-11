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
        id: "15",
        slug: "smile-goblin-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/preview-smile-goblin-emote.png",
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
            src: "/smile-goblin-emote.png",
            alt: "Smile Goblin Emote",
          },
        ] as ContentType[],
      },
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


const clashRoyaleTranslations: Partial<
  Record<Locale, Record<string, { name?: string; description?: string }>>
> = {
  es: {
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
      description: "Desbloquea este emote con un código.",
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
  },
  ar: {
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
  },
};

const contentTextTranslations: Partial<Record<Locale, Record<string, string>>> = {
  es: {
    "Open the Supercell store website and log in.": "Abre la tienda de Supercell e inicia sesión.",
    "Scroll to the bottom and find the redeem code input.": "Desplázate hasta abajo y busca el campo para canjear código.",
    "Enter the code: ROYALEAFFAIR": "Introduce el código: ROYALEAFFAIR",
    "Go to the Supercell Store": "Ir a la tienda de Supercell",
    "Claim 3 Chests": "Reclamar 3 cofres",
    "Claim banner set": "Reclamar set de banner",
    "Note: Make sure you are logged in before clicking the emote link.": "Nota: asegúrate de haber iniciado sesión antes de abrir el enlace del emote.",
    "Click here to open the emote offer": "Haz clic aquí para abrir la oferta del emote",
    "Click the Free button, then open Clash Royale to receive the emote.": "Pulsa el botón Gratis y luego abre Clash Royale para recibir el emote.",
    "Open the Supercell Store": "Abrir la tienda de Supercell",
    "Scroll down and click on bonuses box which will appears when you scroll down , then click the Lucky Chest reward.": "Desplázate hacia abajo y pulsa en la caja de bonificaciones que aparece; luego pulsa la recompensa Lucky Chest.",
    "Open the link or scan the QR code .": "Abre el enlace o escanea el código QR.",
    "Enter the code: REINABARRIGA": "Introduce el código: REINABARRIGA",
    "Redeem the code here": "Canjear el código aquí",
    "Enter the code: WHENHOGSFLY!": "Introduce el código: WHENHOGSFLY!",
    "Enter the code: FIREANDICE!!": "Introduce el código: FIREANDICE!!",
    "Enter the code: TRUSTYTURRET": "Introduce el código: TRUSTYTURRET",
    "Claim 1,000 Gold": "Reclamar 1,000 de oro",
    "Claim banner frame": "Reclamar marco de banner",
    "Claim banner decoration": "Reclamar decoración de banner",
    "Claim emote": "Reclamar emote",
  },
  ar: {
    "Open the Supercell store website and log in.": "افتح متجر Supercell وسجّل الدخول.",
    "Scroll to the bottom and find the redeem code input.": "مرّر للأسفل وابحث عن حقل إدخال كود الاسترداد.",
    "Enter the code: ROYALEAFFAIR": "أدخل الكود: ROYALEAFFAIR",
    "Go to the Supercell Store": "اذهب إلى متجر Supercell",
    "Claim 3 Chests": "احصل على 3 صناديق",
    "Claim banner set": "احصل على مجموعة البانر",
    "Note: Make sure you are logged in before clicking the emote link.": "ملاحظة: تأكد من تسجيل الدخول قبل الضغط على رابط الإيموجي.",
    "Click here to open the emote offer": "اضغط هنا لفتح عرض الإيموجي",
    "Click the Free button, then open Clash Royale to receive the emote.": "اضغط زر Free ثم افتح Clash Royale لاستلام الإيموجي.",
    "Open the Supercell Store": "افتح متجر Supercell",
    "Scroll down and click on bonuses box which will appears when you scroll down , then click the Lucky Chest reward.": "مرّر للأسفل ثم اضغط على صندوق المكافآت الذي يظهر، ثم اختر مكافأة Lucky Chest.",
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

export default siteConfig;
