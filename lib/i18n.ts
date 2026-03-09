export const locales = ["en", "es", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      allRewards: "All Rewards",
      games: "Games",
      contact: "Contact",
      faq: "FAQ",
    },
    seo: {
      siteTitle: "NewFreeRewards – Free Rewards, Bonuses & Promotions",
      siteDescription:
        "Discover free rewards, bonuses, promo codes, and giveaways from games and online platforms. No hacks. Updated daily.",
      gamesTitle: "Games With Free Rewards & Bonuses",
      gamesDescription:
        "Browse games offering free rewards, bonuses, promo codes, and giveaways. Games, services, and more.",
      clashRoyaleTitle: "Clash Royale Free Rewards & Bonuses",
      clashRoyaleDescription:
        "Discover active free rewards, bonuses, and promotions available for Clash Royale.",
      clashOfClansTitle: "Clash of Clans Free Rewards & Bonuses",
      clashOfClansDescription:
        "Discover active free rewards, bonuses, and promotions available for Clash of Clans.",
      brawlStarsTitle: "Brawl Stars Free Rewards & Bonus Items",
      brawlStarsDescription:
        "Discover active free rewards, pins, sprays, and promotions available for Brawl Stars.",
      rewardMetaPrefix: "Free Reward on",
      rewardMetaDescriptionPrefix: "Step-by-step guide to claim",
    },
    home: {
      heroTitle: "All Legit Free Stuff Rewards — In One Place",
      heroDescription:
        "We track real free rewards, events, and opportunities, and explain how to claim them the right way.",
      exploreMore: "Explore more",
      recentRewards: "Recent Rewards",
      allPlatforms: "All Platforms",
      gamesTab: "Games",
      moneyTab: "Money",
      faqTitle: "Frequently Asked Questions",
    },
    common: {
      allRightsReserved: "All rights reserved.",
      learnMore: "Learn More",
      language: "Language",
      seeMore: "See More",
    },
    games: {
      allGames: "All Games",
      clashRoyaleTitle: "Free Clash Royale Rewards",
      activeRewards: "Current Active Rewards",
      expiredRewards: "Expired Rewards",
      back: "Back",
      clashRoyaleDescription:
        "Discover all currently available free Clash Royale rewards in one place. We track free chests, emotes, events, and limited-time bonuses so you never miss a reward.",
      clashOfClansTitle: "Free Clash of Clans Rewards",
      clashOfClansDescription:
        "Discover all currently available free Clash of Clans rewards in one place. We track free gold, items, events, and limited-time bonuses so you never miss a reward.",
      brawlStarsTitle: "Free Brawl Stars Rewards",
      brawlStarsDescription:
        "Discover all currently available free Brawl Stars rewards in one place. We track free pins, sprays, items, and limited-time bonuses so you never miss a reward.",
      lastUpdatedLabel: "Last updated",
      stepByStepGuide: "Step-By-Step Guide",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      allRewards: "Recompensas",
      games: "Juegos",
      contact: "Contacto",
      faq: "Preguntas",
    },
    seo: {
      siteTitle: "NewFreeRewards – Recompensas, Bonos y Promociones Gratis",
      siteDescription:
        "Descubre recompensas gratis, bonos, códigos promocionales y sorteos de juegos y plataformas online. Sin hacks. Actualizado diariamente.",
      gamesTitle: "Juegos con recompensas y bonos gratis",
      gamesDescription:
        "Explora juegos con recompensas gratis, bonos, códigos promocionales y sorteos.",
      clashRoyaleTitle: "Recompensas y bonos gratis de Clash Royale",
      clashRoyaleDescription:
        "Descubre recompensas, bonos y promociones activas de Clash Royale.",
      clashOfClansTitle: "Recompensas y bonos gratis de Clash of Clans",
      clashOfClansDescription:
        "Descubre recompensas, bonos y promociones activas de Clash of Clans.",
      brawlStarsTitle: "Recompensas y bonos gratis de Brawl Stars",
      brawlStarsDescription:
        "Descubre recompensas, pines, sprays y promociones activas de Brawl Stars.",
      rewardMetaPrefix: "Recompensa gratis en",
      rewardMetaDescriptionPrefix: "Guía paso a paso para reclamar",
    },
    home: {
      heroTitle: "Todas las recompensas gratis legítimas en un solo lugar",
      heroDescription:
        "Rastreámos recompensas reales, eventos y oportunidades gratis, y te mostramos cómo reclamarlas correctamente.",
      exploreMore: "Explorar más",
      recentRewards: "Recompensas recientes",
      allPlatforms: "Todas las plataformas",
      gamesTab: "Juegos",
      moneyTab: "Dinero",
      faqTitle: "Preguntas frecuentes",
    },
    common: {
      allRightsReserved: "Todos los derechos reservados.",
      learnMore: "Más información",
      language: "Idioma",
      seeMore: "Ver más",
    },
    games: {
      allGames: "Todos los juegos",
      clashRoyaleTitle: "Recompensas gratis de Clash Royale",
      activeRewards: "Recompensas activas",
      expiredRewards: "Recompensas expiradas",
      back: "Volver",
      clashRoyaleDescription:
        "Descubre todas las recompensas gratuitas de Clash Royale disponibles actualmente en un solo lugar. Seguimos cofres gratis, emotes, eventos y bonos por tiempo limitado para que no te pierdas ninguna recompensa.",
      clashOfClansTitle: "Recompensas gratis de Clash of Clans",
      clashOfClansDescription:
        "Descubre todas las recompensas gratuitas de Clash of Clans disponibles actualmente en un solo lugar. Seguimos oro gratis, objetos, eventos y bonos por tiempo limitado para que no te pierdas ninguna recompensa.",
      brawlStarsTitle: "Recompensas gratis de Brawl Stars",
      brawlStarsDescription:
        "Descubre todas las recompensas gratuitas de Brawl Stars disponibles actualmente en un solo lugar. Seguimos pines gratis, sprays, objetos, eventos y bonos por tiempo limitado para que no te pierdas ninguna recompensa.",
      lastUpdatedLabel: "Última actualización",
      stepByStepGuide: "Guía paso a paso",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      allRewards: "كل المكافآت",
      games: "الألعاب",
      contact: "اتصل بنا",
      faq: "الأسئلة الشائعة",
    },
    seo: {
      siteTitle: "NewFreeRewards – مكافآت وبونص وعروض مجانية",
      siteDescription:
        "اكتشف المكافآت المجانية والبونص وأكواد العروض والهدايا من الألعاب والمنصات عبر الإنترنت. بدون تهكير. تحديث يومي.",
      gamesTitle: "ألعاب تقدم مكافآت وبونص مجاني",
      gamesDescription: "تصفح الألعاب التي تقدم مكافآت مجانية وبونص وأكواد عروض.",
      clashRoyaleTitle: "مكافآت وبونص مجاني لـ Clash Royale",
      clashRoyaleDescription: "اكتشف المكافآت والبونص والعروض النشطة في Clash Royale.",
      clashOfClansDescription: "اكتشف المكافآت والبونص والعروض النشطة في Clash of Clans.",
      brawlStarsTitle: "مكافآت وبونص مجاني لـ Brawl Stars",
      brawlStarsDescription: "اكتشف المكافآت والستيكرات والبخاخات والعروض النشطة في Brawl Stars.",
      rewardMetaPrefix: "مكافأة مجانية على",
      rewardMetaDescriptionPrefix: "دليل خطوة بخطوة للحصول على",
    },
    home: {
      heroTitle: "كل المكافآت المجانية الحقيقية في مكان واحد",
      heroDescription:
        "نحن نتابع المكافآت والفعاليات والفرص المجانية الحقيقية، ونشرح لك طريقة المطالبة بها بشكل صحيح.",
      exploreMore: "استكشف المزيد",
      recentRewards: "أحدث المكافآت",
      allPlatforms: "كل المنصات",
      gamesTab: "الألعاب",
      moneyTab: "الخدمات",
      faqTitle: "الأسئلة الشائعة",
    },
    common: {
      allRightsReserved: "جميع الحقوق محفوظة.",
      learnMore: "اعرف المزيد",
      language: "اللغة",
      seeMore: "شاهد المزيد",
    },
    games: {
      allGames: "كل الألعاب",
      clashRoyaleTitle: "مكافآت Clash Royale المجانية",
      activeRewards: "المكافآت النشطة",
      expiredRewards: "المكافآت المنتهية",
      back: "رجوع",
      clashRoyaleDescription:
        "اكتشف جميع مكافآت Clash Royale المجانية المتاحة حاليًا في مكان واحد. نحن نتابع الصناديق المجانية والإيموجيات والفعاليات والمكافآت المؤقتة حتى لا تفوّت أي مكافأة.",
      clashOfClansTitle: "مكافآت Clash of Clans المجانية",
      clashOfClansDescription:
        "اكتشف جميع مكافآت Clash of Clans المجانية المتاحة حاليًا في مكان واحد. نحن نتابع الذهب المجاني، والعناصر، والفعاليات، والمكافآت المؤقتة حتى لا تفوّت أي مكافأة.",
      brawlStarsTitle: "مكافآت Brawl Stars المجانية",
      brawlStarsDescription:
        "اكتشف جميع مكافآت Brawl Stars المجانية المتاحة حاليًا في مكان واحد. نحن نتابع الستيكرات والبخاخات والعناصر والفعاليات والمكافآت المؤقتة حتى لا تفوّت أي مكافأة.",
      lastUpdatedLabel: "آخر تحديث",
      stepByStepGuide: "دليل خطوة بخطوة",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}

export function localizePath(locale: Locale, href: string) {
  if (href.startsWith("http") || href.startsWith("#")) return href;
  const normalized = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${normalized}`;
}
