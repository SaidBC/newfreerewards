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
      allRewards: "Rewards",
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
      genshinImpactTitle:
        "Genshin Impact Codes (Active Rewards) and How to Redeem Them",
      genshinImpactDescription:
        "Looking for the latest Genshin Impact redeem codes? These promotional codes can give players free in-game rewards like Primogems, Mora, Hero’s Wit, and enhancement materials.",
      honkaiStarRailTitle:
        "Honkai: Star Rail Codes (March 2026) – Active Codes and How to Redeem Them",
      honkaiStarRailDescription:
        "Redeem codes in Honkai: Star Rail allow players to receive free rewards such as Stellar Jade, Credits, Traveler’s Guide, and Light Cone upgrade materials.",
      robloxTitle: "Roblox Codes (Active Rewards) and How to Redeem Them",
      robloxDescription:
        "Looking for the latest Roblox promo codes? These codes can give players free in-game items like accessories, bundles, and more.",
      riseOfKingdomsTitle:
        "Rise of Kingdoms Codes (Active Rewards) and How to Redeem Them",
      riseOfKingdomsDescription:
        "Looking for the latest Rise of Kingdoms redeem codes? These promotional codes can give players free in-game rewards like gems, keys, and speedups.",
      growAGardenTitle:
        "Grow a Garden Codes (Active Rewards) and How to Redeem Them",
      growAGardenDescription:
        "Looking for the latest Grow a Garden redeem codes? These codes can give players free in-game cosmetic items.",
      blueLockRivalsTitle:
        "Blue Lock Rivals Codes (Active Rewards) and How to Redeem Them",
      blueLockRivalsDescription:
        "Looking for the latest Blue Lock Rivals redeem codes? These codes can give players free in-game rewards like spins and lucky flow.",
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
      seeLess: "See Less",
      seeMoreRewards: "Click to see all rewards",
      loading: "Loading...",
      failedToLoad: "Failed to load rewards.",
      failedToLoadEngagement: "Failed to load feedback.",
      retry: "Retry",
      love: "Love",
      dislike: "Dislike",
      report: "Report",
      reportExpired: "Report as expired",
      reportNotWorking: "Report as not working",
      reportOther: "Other problem",
      reportNotePlaceholder: "Describe the problem",
      submitOtherReport: "Submit other report",
      reportSubmitted: "Thanks. Your report was submitted.",
      reportAlreadySubmittedToday: "You already reported this reward today.",
      needsReview: "Needs review",
      feedbackBoundToBrowser: "Feedback is tied to this browser.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      contactEmail: "Contact Email",
      contactEmailValue: "contact@newfreerewards.com",
      contactDescription:
        "For feedback, corrections, or partnership requests, please reach out to us via email or follow us on social media.",
      followUs: "Follow Us",
      visited: "Visited",
      // Cookie Consent
      cookieConsentTitle: "We Value Your Privacy",
      cookieConsentDescription:
        'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
      acceptAll: "Accept All",
      rejectAll: "Reject All",
      customizePreferences: "Customize Preferences",
      necessaryCookies: "Necessary Cookies",
      necessaryCookiesDesc:
        "Required for the website to function properly. Cannot be disabled.",
      analyticsCookies: "Analytics Cookies",
      analyticsCookiesDesc:
        "Help us understand how visitors interact with our website.",
      advertisingCookies: "Advertising Cookies",
      advertisingCookiesDesc:
        "Used to deliver personalized advertisements based on your interests.",
      back: "Back",
      savePreferences: "Save Preferences",
      cookiePolicyLinkPrefix: "Learn more in our ",
      cookiePolicy: "Cookie Policy",
      cookiePolicyLinkSuffix: ".",
      close: "Close",
      // About Page
      aboutUs: "About Us",
      aboutMission:
        "NewFreeRewards is dedicated to helping gamers discover legitimate free rewards, bonuses, and promotional codes from their favorite games and platforms. We believe that everyone should have access to free content without resorting to hacks, cheats, or unauthorized methods.",
      aboutWhatWeDo:
        "We continuously monitor official game channels, developer announcements, social media, and community forums to bring you the latest free rewards. Our team verifies each reward before publishing to ensure accuracy and legitimacy.",
      aboutTrackRewards:
        "Track and aggregate free rewards from official sources",
      aboutVerifySources:
        "Verify all rewards through official channels before publishing",
      aboutStepByStepGuides:
        "Provide step-by-step redemption guides with screenshots",
      aboutNoHacks:
        "Never promote hacks, cheats, generators, or unauthorized tools",
      aboutEditorialStandards:
        "We maintain strict editorial standards to ensure our content is accurate, trustworthy, and user-focused.",
      aboutAccuracy:
        "All rewards are verified against official sources before publication",
      aboutTransparency:
        "We clearly distinguish between official rewards and community finds",
      aboutIndependence:
        "We are not affiliated with any game developer or publisher",
      aboutUserFirst: "User experience and safety are our top priorities",
      aboutTeam:
        "NewFreeRewards is run by a small team of gaming enthusiasts who are passionate about helping fellow players get the most out of their favorite games.",
      aboutFounder: "Founder & Editor",
      aboutFounderDesc:
        "The NewFreeRewards team was created to solve the frustration of finding scattered reward codes across multiple platforms. With years of collective gaming experience, we ensure every reward is verified and clearly explained.",
      aboutContributors: "Community Contributors",
      aboutContributorsDesc:
        "Our community of players helps us discover new rewards and report expired ones. If you'd like to contribute, reach out via our contact page.",
      aboutContact:
        "Have questions, suggestions, or want to partner with us? We'd love to hear from you!",
      dmcaPolicy: "DMCA Policy",
      disclaimer: "Disclaimer",
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
      genshinImpactTitle: "Genshin Impact (Active Rewards)",
      honkaiStarRailTitle: "Honkai: Star Rail (Active Rewards)",
      genshinImpactDescription: "Explore active Genshin Impact rewards.",
      honkaiStarRailDescription: "Explore active Honkai: Star Rail rewards.",
      robloxTitle: "Roblox (Active Rewards)",
      riseOfKingdomsTitle: "Rise of Kingdoms (Active Rewards)",
      growAGardenTitle: "Grow a Garden (Active Rewards)",
      robloxDescription: "Explore active Roblox rewards.",
      riseOfKingdomsDescription: "Explore active Rise of Kingdoms rewards.",
      growAGardenDescription: "Explore active Grow a Garden rewards.",
      blueLockRivalsTitle: "Blue Lock Rivals (Active Rewards)",
      blueLockRivalsDescription: "Explore active Blue Lock Rivals rewards.",
      noActiveRewards: "No active rewards available right now.",
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
      genshinImpactTitle:
        "Códigos de Genshin Impact (Recompensas Activas) y Cómo Canjearlos",
      genshinImpactDescription:
        "¿Buscas los últimos códigos de canje de Genshin Impact? Estos códigos promocionales pueden otorgar recompensas gratuitas como Primogemas, Mora, Ingenio del Héroe y materiales de mejora.",
      honkaiStarRailTitle:
        "Códigos de Honkai: Star Rail (Marzo 2026) – Códigos Activos y Cómo Canjearlos",
      honkaiStarRailDescription:
        "Los códigos de canje en Honkai: Star Rail permiten a los jugadores recibir recompensas gratuitas como Jade Estelar, Créditos, Guía del Viajero y materiales de mejora de Cono de Luz.",
      robloxTitle: "Códigos de Roblox (Recompensas Activas) y Cómo Canjearlos",
      robloxDescription:
        "¿Buscas los últimos códigos promocionales de Roblox? Estos códigos pueden otorgar objetos gratuitos en el juego como accesorios, paquetes y más.",
      riseOfKingdomsTitle:
        "Códigos de Rise of Kingdoms (Recompensas Activas) y Cómo Canjearlos",
      riseOfKingdomsDescription:
        "¿Buscas los últimos códigos de canje de Rise of Kingdoms? Estos códigos promocionales pueden otorgar recompensas gratuitas como gemas, llaves y aceleradores.",
      growAGardenTitle:
        "Códigos de Grow a Garden (Recompensas Activas) y Cómo Canjearlos",
      growAGardenDescription:
        "¿Buscas los últimos códigos de canje de Grow a Garden? Estos códigos pueden otorgar objetos cosméticos gratuitos en el juego.",
      blueLockRivalsTitle:
        "Códigos de Blue Lock Rivals (Recompensas Activas) y Cómo Canjearlos",
      blueLockRivalsDescription:
        "¿Buscas los últimos códigos de canje de Blue Lock Rivals? Estos códigos pueden otorgar recompensas gratuitas en el juego como giros y flujo de suerte.",
      rewardMetaPrefix: "Recompensa Gratuita en",
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
      seeLess: "Ver menos",
      seeMoreRewards: "Haz clic para ver todas las recompensas",
      loading: "Cargando...",
      failedToLoad: "No se pudieron cargar las recompensas.",
      failedToLoadEngagement: "No se pudo cargar la opinión.",
      retry: "Reintentar",
      love: "Me encanta",
      dislike: "No me gusta",
      report: "Reportar",
      reportExpired: "Reportar como expirado",
      reportNotWorking: "Reportar como no funciona",
      reportOther: "Otro problema",
      reportNotePlaceholder: "Describe el problema",
      submitOtherReport: "Enviar otro reporte",
      reportSubmitted: "Gracias. Tu reporte fue enviado.",
      reportAlreadySubmittedToday: "Ya reportaste esta recompensa hoy.",
      needsReview: "Necesita revisión",
      feedbackBoundToBrowser:
        "Los comentarios están vinculados a este navegador.",
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
      contactEmail: "Correo de Contacto",
      contactEmailValue: "contact@newfreerewards.com",
      contactDescription:
        "Para comentarios, correcciones o solicitudes de asociación, contáctenos por correo electrónico o síganos en las redes sociales.",
      followUs: "Síguenos",
      visited: "Visitado",
      // Cookie Consent
      cookieConsentTitle: "Valoramos Tu Privacidad",
      cookieConsentDescription:
        'Utilizamos cookies para mejorar tu experiencia de navegación, mostrar anuncios o contenido personalizados y analizar nuestro tráfico. Al hacer clic en "Aceptar Todo", aceptas el uso de cookies.',
      acceptAll: "Aceptar Todo",
      rejectAll: "Rechazar Todo",
      customizePreferences: "Personalizar Preferencias",
      necessaryCookies: "Cookies Necesarias",
      necessaryCookiesDesc:
        "Requeridas para que el sitio web funcione correctamente. No se pueden desactivar.",
      analyticsCookies: "Cookies de Análisis",
      analyticsCookiesDesc:
        "Nos ayudan a entender cómo interactúan los visitantes con nuestro sitio web.",
      advertisingCookies: "Cookies Publicitarias",
      advertisingCookiesDesc:
        "Utilizadas para mostrar anuncios personalizados basados en tus intereses.",
      back: "Volver",
      savePreferences: "Guardar Preferencias",
      cookiePolicyLinkPrefix: "Más información en nuestra ",
      cookiePolicy: "Política de Cookies",
      cookiePolicyLinkSuffix: ".",
      close: "Cerrar",
      // About Page
      aboutUs: "Sobre Nosotros",
      aboutMission:
        "NewFreeRewards se dedica a ayudar a los jugadores a descubrir recompensas gratuitas legítimas, bonos y códigos promocionales de sus juegos y plataformas favoritos. Creemos que todos deberían tener acceso a contenido gratuito sin recurrir a hacks, cheats o métodos no autorizados.",
      aboutWhatWeDo:
        "Monitoreamos continuamente canales oficiales de juegos, anuncios de desarrolladores, redes sociales y foros comunitarios para traerte las últimas recompensas gratuitas. Nuestro equipo verifica cada recompensa antes de publicarla para garantizar precisión y legitimidad.",
      aboutTrackRewards:
        "Rastrear y agregar recompensas gratuitas de fuentes oficiales",
      aboutVerifySources:
        "Verificar todas las recompensas a través de canales oficiales antes de publicar",
      aboutStepByStepGuides:
        "Proporcionar guías de canje paso a paso con capturas de pantalla",
      aboutNoHacks:
        "Nunca promover hacks, cheats, generadores o herramientas no autorizadas",
      aboutEditorialStandards:
        "Mantenemos estrictos estándares editoriales para asegurar que nuestro contenido sea preciso, confiable y centrado en el usuario.",
      aboutAccuracy:
        "Todas las recompensas se verifican contra fuentes oficiales antes de la publicación",
      aboutTransparency:
        "Distinguimos claramente entre recompensas oficiales y hallazgos de la comunidad",
      aboutIndependence:
        "No estamos afiliados a ningún desarrollador o editor de juegos",
      aboutUserFirst:
        "La experiencia y seguridad del usuario son nuestras principales prioridades",
      aboutTeam:
        "NewFreeRewards es dirigido por un pequeño equipo de entusiastas de los videojuegos apasionados por ayudar a otros jugadores a aprovechar al máximo sus juegos favoritos.",
      aboutFounder: "Fundador y Editor",
      aboutFounderDesc:
        "El equipo de NewFreeRewards fue creado para resolver la frustración de encontrar códigos de recompensa dispersos en múltiples plataformas. Con años de experiencia colectiva en gaming, nos aseguramos de que cada recompensa sea verificada y claramente explicada.",
      aboutContributors: "Colaboradores de la Comunidad",
      aboutContributorsDesc:
        "Nuestra comunidad de jugadores nos ayuda a descubrir nuevas recompensas y reportar las expiradas. Si quieres contribuir, contáctanos a través de nuestra página de contacto.",
      aboutContact:
        "¿Tienes preguntas, sugerencias o quieres asociarte con nosotros? ¡Nos encantaría saber de ti!",
      dmcaPolicy: "Política DMCA",
      disclaimer: "Descargo de Responsabilidad",
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
      genshinImpactTitle: "Genshin Impact (Recompensas Activas)",
      honkaiStarRailTitle: "Honkai: Star Rail (Recompensas Activas)",
      genshinImpactDescription:
        "Explora las recompensas activas de Genshin Impact.",
      honkaiStarRailDescription:
        "Explora las recompensas activas de Honkai: Star Rail.",
      robloxTitle: "Roblox (Recompensas Activas)",
      riseOfKingdomsTitle: "Rise of Kingdoms (Recompensas Activas)",
      growAGardenTitle: "Grow a Garden (Recompensas Activas)",
      robloxDescription: "Explora las recompensas activas de Roblox.",
      riseOfKingdomsDescription:
        "Explora las recompensas activas de Rise of Kingdoms.",
      growAGardenDescription:
        "Explora las recompensas activas de Grow a Garden.",
      blueLockRivalsTitle: "Blue Lock Rivals (Recompensas Activas)",
      blueLockRivalsDescription:
        "Explora las recompensas activas de Blue Lock Rivals.",
      noActiveRewards:
        "No hay recompensas activas disponibles en este momento.",
      lastUpdatedLabel: "Última actualización",
      stepByStepGuide: "Guía paso a paso",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      allRewards: "المكافآت",
      games: "الألعاب",
      contact: "اتصل بنا",
      faq: "الأسئلة الشائعة",
    },
    seo: {
      siteTitle: "NewFreeRewards – مكافآت وبونص وعروض مجانية",
      siteDescription:
        "اكتشف المكافآت المجانية والبونص وأكواد العروض والهدايا من الألعاب والمنصات عبر الإنترنت. بدون تهكير. تحديث يومي.",
      gamesTitle: "ألعاب تقدم مكافآت وبونص مجاني",
      gamesDescription:
        "تصفح الألعاب التي تقدم مكافآت مجانية وبونص وأكواد عروض.",
      clashRoyaleTitle: "مكافآت وبونص مجاني لـ Clash Royale",
      clashRoyaleDescription:
        "اكتشف المكافآت والبونص والعروض النشطة في Clash Royale.",
      clashOfClansTitle: "مكافآت وبونص مجاني لـ Clash of Clans",
      clashOfClansDescription:
        "اكتشف المكافآت والبونص والعروض النشطة في Clash of Clans.",
      brawlStarsTitle: "مكافآت وبونص مجاني لـ Brawl Stars",
      brawlStarsDescription:
        "اكتشف المكافآت والستيكرات والبخاخات والعروض النشطة في Brawl Stars.",
      genshinImpactTitle:
        "أكواد قنشن امباكت (المكافآت النشطة) وكيفية استردادها",
      genshinImpactDescription:
        "هل تبحث عن أحدث أكواد استبدال جينشين إمباكت؟ يمكن لهذه الأكواد الترويجية أن تمنح اللاعبين مكافآت مجانية داخل اللعبة مثل بريموجيمز، ومورا، وذكاء البطل، ومواد التعزيز.",
      honkaiStarRailTitle:
        "أكواد هونكاي: ستار ريل (مارس 2026) – الأكواد النشطة وكيفية استردادها",
      honkaiStarRailDescription:
        "تتيح أكواد الاستبدال في هونكاي: ستار ريل للاعبين الحصول على مكافآت مجانية مثل اليشم النجمي، والائتمانات، ودليل المسافر، وموا ترقية مخروط الضوء.",
      robloxTitle: "أكواد روبلوكس (المكافآت النشطة) وكيفية استردادها",
      robloxDescription:
        "هل تبحث عن أحدث أكواد عروض روبلوكس؟ يمكن لهذه الأكواد أن تمنح اللاعبين عناصر مجانية داخل اللعبة مثل الإكسسوارات والحزم والمزيد.",
      riseOfKingdomsTitle:
        "أكواد رايز أوف كينجدومز (المكافآت النشطة) وكيفية استردادها",
      riseOfKingdomsDescription:
        "هل تبحث عن أحدث أكواد استبدال رايز أوف كينجدومز؟ يمكن لهذه الأكواد الترويجية أن تمنح اللاعبين مكافآت مجانية داخل اللعبة مثل الجواهر والمفاتيح والمسرعات.",
      growAGardenTitle: "أكواد جرو أ جاردن (المكافآت النشطة) وكيفية استردادها",
      growAGardenDescription:
        "هل تبحث عن أحدث أكواد استبدال جرو أ جاردن؟ يمكن لهذه الأكواد أن تمنح اللاعبين عناصر تجميلية مجانية داخل اللعبة.",
      blueLockRivalsTitle:
        "أكواد بلو لوك رايفلز (المكافآت النشطة) وكيفية استردادها",
      blueLockRivalsDescription:
        "هل تبحث عن أحدث أكواد استبدال بلو لوك رايفلز؟ يمكن لهذه الأكواد أن تمنح اللاعبين هدايا مجانية داخل اللعبة مثل اللفات وتدفق الحظ.",
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
      seeLess: "شاهد أقل",
      seeMoreRewards: "انقر لرؤية جميع المكافآت",
      loading: "جارٍ التحميل...",
      failedToLoad: "تعذر تحميل المكافآت.",
      failedToLoadEngagement: "فشل تحميل التفاعل.",
      retry: "إعادة المحاولة",
      love: "أعجبني",
      dislike: "لم يعجبني",
      report: "إبلاغ",
      reportExpired: "إبلاغ كمُنتهية",
      reportNotWorking: "إبلاغ بأنها لا تعمل",
      reportOther: "مشكلة أخرى",
      reportNotePlaceholder: "اشرح المشكلة",
      submitOtherReport: "إرسال بلاغ آخر",
      reportSubmitted: "شكرًا. تم إرسال البلاغ.",
      reportAlreadySubmittedToday: "لقد أبلغت عن هذه المكافأة اليوم بالفعل.",
      needsReview: "تحتاج إلى مراجعة",
      feedbackBoundToBrowser: "هذا التفاعل مرتبط بهذا المتصفح.",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      contactEmail: "البريد الإلكتروني للتواصل",
      contactEmailValue: "contact@newfreerewards.com",
      contactDescription:
        "للملاحظات أو التصحيحات أو طلبات الشراكة، يرجى التواصل معنا عبر البريد الإلكتروني أو متابعتنا على وسائل التواصل الاجتماعي.",
      followUs: "تواصل معنا",
      visited: "تمت الزيارة",
      // Cookie Consent
      cookieConsentTitle: "نقدر خصوصيتك",
      cookieConsentDescription:
        'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح، وعرض إعلانات أو محتوى مخصص، وتحليل حركة المرور. بالنقر على "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
      acceptAll: "قبول الكل",
      rejectAll: "رفض الكل",
      customizePreferences: "تخصيص التفضيلات",
      necessaryCookies: "ملفات تعريف ارتباط ضرورية",
      necessaryCookiesDesc: "مطلوبة لعمل الموقع بشكل صحيح. لا يمكن تعطيلها.",
      analyticsCookies: "ملفات تعريف ارتباط تحليلية",
      analyticsCookiesDesc: "تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا.",
      advertisingCookies: "ملفات تعريف ارتباط إعلانية",
      advertisingCookiesDesc: "تستخدم لعرض إعلانات مخصصة بناءً على اهتماماتك.",
      back: "رجوع",
      savePreferences: "حفظ التفضيلات",
      cookiePolicyLinkPrefix: "اعرف المزيد في ",
      cookiePolicy: "سياسة ملفات تعريف الارتباط",
      cookiePolicyLinkSuffix: ".",
      close: "إغلاق",
      // About Page
      aboutUs: "من نحن",
      aboutMission:
        "NewFreeRewards مكرس لمساعدة اللاعبين على اكتشاف المكافآت المجانية الشرعية، والحوافز، والأكواد الترويجية من ألعابهم ومنصاتهم المفضلة. نؤمن بأن الجميع يجب أن يحصل على محتوى مجاني دون اللجوء إلى الاختراقات، الغش، أو الطرق غير المصرح بها.",
      aboutWhatWeDo:
        "نراقب باستمرار القنوات الرسمية للألعاب، وإعلانات المطورين، ووسائل التواصل الاجتماعي، والمنتديات المجتمعية لنقدم لكم أحدث المكافآت المجانية. فريقنا يتحقق من كل مكافأة قبل النشر لضمان الدقة والشرعية.",
      aboutTrackRewards: "تتبع وجمع المكافآت المجانية من مصادر رسمية",
      aboutVerifySources:
        "التحقق من جميع المكافآت عبر القنوات الرسمية قبل النشر",
      aboutStepByStepGuides: "تقديم أدلة استرداد خطوة بخطوة مع لقطات شاشة",
      aboutNoHacks:
        "لا نروج أبدًا للاختراقات، الغش، المولدات، أو الأدوات غير المصرح بها",
      aboutEditorialStandards:
        "نحافظ على معايير تحريرية صارمة لضمان دقة وموثوقية وتركيز محتوانا على المستخدم.",
      aboutAccuracy: "يتم التحقق من جميع المكافآت مقابل مصادر رسمية قبل النشر",
      aboutTransparency:
        "نمتاز بوضوح بين المكافآت الرسمية والاكتشافات المجتمعية",
      aboutIndependence: "نحن غير تابعين لأي مطور أو ناشر ألعاب",
      aboutUserFirst: "تجربة المستخدم وسلامته أولويتنا القصوى",
      aboutTeam:
        "يدير NewFreeRewards فريق صغير من عشاق الألعاب المتحمسين لمساعدة اللاعبين الآخرين على الاستفادة القصوى من ألعابهم المفضلة.",
      aboutFounder: "المؤسس والمحرر",
      aboutFounderDesc:
        "تم إنشاء فريق NewFreeRewards لحل إحباط العثور على أكواد المكافآت المبعثرة عبر منصات متعددة. بفضل سنوات من الخبرة الجماعية في الألعاب، نضمن أن كل مكافأة يتم التحقق منها وشرحها بوضوح.",
      aboutContributors: "مساهمو المجتمع",
      aboutContributorsDesc:
        "مجتمع اللاعبين لدينا يساعدنا في اكتشاف مكافآت جديدة والإبلاغ عن المكافآت المنتهية. إذا كنت ترغب في المساهمة، تواصل معنا عبر صفحة الاتصال.",
      aboutContact:
        "هل لديك أسئلة، اقتراحات، أو ترغب في الشراكة معنا؟ يسعدنا سماعك!",
      dmcaPolicy: "سياسة DMCA",
      disclaimer: "إخلاء مسؤولية",
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
      genshinImpactTitle: "Genshin Impact (المكافآت النشطة)",
      honkaiStarRailTitle: "Honkai: Star Rail (المكافآت النشطة)",
      genshinImpactDescription: "استكشف مكافآت جينشين إمباكت النشطة.",
      honkaiStarRailDescription: "استكشف مكافآت هونكاي: ستار ريل النشطة.",
      robloxTitle: "Roblox (المكافآت النشطة)",
      riseOfKingdomsTitle: "Rise of Kingdoms (المكافآت النشطة)",
      growAGardenTitle: "Grow a Garden (المكافآت النشطة)",
      robloxDescription: "استكشف مكافآت روبلوكس النشطة.",
      riseOfKingdomsDescription: "استكشف مكافآت رايز أوف كينجدومز النشطة.",
      growAGardenDescription: "استكشف مكافآت جرو أ جاردن النشطة.",
      blueLockRivalsTitle: "بلو لوك رايفلز (المكافآت النشطة)",
      blueLockRivalsDescription: "استكشف مكافآت بلو لوك رايفلز النشطة.",
      noActiveRewards: "لا توجد مكافآت نشطة متاحة حاليًا.",
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
