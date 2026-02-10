export const locales = ["en", "es"] as const;

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
