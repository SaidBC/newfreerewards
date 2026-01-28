const siteConfig = {
  navLinks: [
    { href: "/", title: "Home" },
    { href: "/offers", title: "Offers" },
    { href: "/#list", title: "All Rewards" },
    { href: "/games", title: "Games" },
    { href: "/contact", title: "Contact" },
    { href: "/#faq", title: "FAQ" },
  ],
  clashroyale: {
    rewards: [
      {
        id: "1",
        slug: "hero-ice-golem-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "Hero Ice Golem Emote",
        description: "Follow the steps below to claim this emote.",
        rewardType: "emote",
        status: "active",
        content: [
          { type: "text", value: "Open the Supercell website and log in." },
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
        ],
      },

      {
        id: "2",
        slug: "2-star-lucky-chest",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "2-Star Lucky Chest",
        description: "Follow the steps below to claim this chest.",
        rewardType: "chest",
        status: "active",
        content: [
          { type: "text", value: "Open the Supercell website and log in." },
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
            value: "Scroll down and click the Lucky Chest reward.",
          },
        ],
      },

      {
        id: "3",
        slug: "hero-wizard-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "Hero Wizard Emote",
        description: "Follow the steps below to claim this emote.",
        rewardType: "emote",
        status: "active",
        content: [
          { type: "text", value: "Open the Supercell website and log in." },
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
        ],
      },

      {
        id: "4",
        slug: "hero-musketeer-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "Hero Musketeer Emote",
        description: "Redeem a promo code to unlock this emote.",
        rewardType: "emote",
        status: "active",
        content: [
          { type: "text", value: "Open the Supercell website and log in." },
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
        ],
      },

      {
        id: "5",
        slug: "flying-royal-hogs-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "Flying Royal Hogs Emote",
        description: "Unlock the Flying Royal Hogs emote using a code.",
        rewardType: "emote",
        status: "active",
        content: [
          { type: "text", value: "Open the Supercell website and log in." },
          { type: "text", value: "Enter the code: WHENHOGSFLY!" },
          {
            type: "link",
            href: "https://store.supercell.com/clashroyale",
            label: "Redeem the code here",
          },
          {
            type: "image",
            src: "/placeholder-image.png",
            alt: "Flying Royal Hogs emote",
          },
        ],
      },

      {
        id: "6",
        slug: "fire-and-ice-banner-set",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "Fire & Ice Banner Set",
        description:
          "Includes Ember Escape decoration and Firestorm banner frame.",
        rewardType: "banner",
        status: "active",
        content: [
          { type: "text", value: "Open the Supercell website and log in." },
          { type: "text", value: "Enter the code: FIREANDICE!!" },
          {
            type: "image",
            src: "/placeholder-image.png",
            alt: "Fire and Ice banner set",
          },
        ],
      },

      {
        id: "7",
        slug: "snoring-dragon-banner-set",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "Snoring Dragon Banner Set",
        description: "Unlock the Snoring Dragon banner decoration.",
        rewardType: "banner",
        status: "active",
        content: [
          { type: "text", value: "Open the Supercell website and log in." },
          { type: "text", value: "Enter the code: REINABARRIGA" },
          {
            type: "image",
            src: "/placeholder-image.png",
            alt: "Snoring Dragon banner set",
          },
        ],
      },

      {
        id: "8",
        slug: "1000-gold-reward",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "1,000 Gold",
        description: "Claim 1,000 Gold instantly.",
        rewardType: "gold",
        status: "active",
        content: [
          { type: "text", value: "Open the link or scan the QR code in-game." },
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=1000GOLD",
            label: "Claim 1,000 Gold",
          },
          {
            type: "image",
            src: "/placeholder-qr.png",
            alt: "1,000 Gold QR code",
          },
        ],
      },

      {
        id: "9",
        slug: "hot-hog-balloon-banner-frame",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "Hot Hog Balloon Banner Frame",
        description: "Claim this banner frame via QR or direct link.",
        rewardType: "banner",
        status: "active",
        content: [
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=HOTHOGFRAME",
            label: "Claim banner frame",
          },
          {
            type: "image",
            src: "/placeholder-qr.png",
            alt: "Hot Hog Balloon banner frame QR",
          },
        ],
      },

      {
        id: "10",
        slug: "hamelia-hogwart-banner-decoration",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "Hamelia Hogwart Banner Decoration",
        description: "Unlock this banner decoration for free.",
        rewardType: "banner",
        status: "active",
        content: [
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=HAMELIAHOG",
            label: "Claim banner decoration",
          },
          {
            type: "image",
            src: "/placeholder-qr.png",
            alt: "Hamelia Hogwart banner decoration QR",
          },
        ],
      },

      {
        id: "11",
        slug: "royal-ghost-boo-emote",
        platform: { name: "Clash Royale", src: "/clash-royale.jpg" },
        previewImage: "/hero-ice-golem-emote.png",
        name: "Royal Ghost Boo Emote",
        description: "Claim the Royal Ghost Boo emote.",
        rewardType: "emote",
        status: "active",
        content: [
          {
            type: "link",
            href: "https://link.clashroyale.com/en/?action=voucher&code=ROYALGHOSTBOO",
            label: "Claim emote",
          },
          {
            type: "image",
            src: "/placeholder-qr.png",
            alt: "Royal Ghost Boo emote QR",
          },
        ],
      },
    ],
  },
};

export default siteConfig;
