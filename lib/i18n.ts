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
    },
    games: {
      allGames: "All Games",
      clashRoyaleTitle: "Free Clash Royale Rewards",
      activeRewards: "Current Active Rewards",
      expiredRewards: "Expired Rewards",
      back: "Back",
      clashRoyaleDescription:
        "Discover all currently available free Clash Royale rewards in one place. We track free chests, emotes, events, and limited-time bonuses so you never miss a reward.",
      lastUpdatedLabel: "Last updated",
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
    },
    games: {
      allGames: "Todos los juegos",
      clashRoyaleTitle: "Recompensas gratis de Clash Royale",
      activeRewards: "Recompensas activas",
      expiredRewards: "Recompensas expiradas",
      back: "Volver",
      clashRoyaleDescription:
        "Descubre todas las recompensas gratuitas de Clash Royale disponibles actualmente en un solo lugar. Seguimos cofres gratis, emotes, eventos y bonos por tiempo limitado para que no te pierdas ninguna recompensa.",
      lastUpdatedLabel: "Última actualización",
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
    },
    games: {
      allGames: "كل الألعاب",
      clashRoyaleTitle: "مكافآت Clash Royale المجانية",
      activeRewards: "المكافآت النشطة",
      expiredRewards: "المكافآت المنتهية",
      back: "رجوع",
      clashRoyaleDescription:
        "اكتشف جميع مكافآت Clash Royale المجانية المتاحة حاليًا في مكان واحد. نحن نتابع الصناديق المجانية والإيموجيات والفعاليات والمكافآت المؤقتة حتى لا تفوّت أي مكافأة.",
      lastUpdatedLabel: "آخر تحديث",
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
