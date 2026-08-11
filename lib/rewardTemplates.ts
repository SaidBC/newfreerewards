import { ContentBlock } from "@/components/admin/RewardForm";

export type RewardTemplateType = "SUPERCELL_CODE" | "QR_CODE" | "NONE";

export interface TemplateInfo {
  id: RewardTemplateType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: "SUPERCELL_CODE",
    name: "Supercell Redemption Code",
    description: "For Supercell game codes (Clash Royale, Brawl Stars, etc.)",
    icon: "🎟️",
    color: "bg-blue-500",
  },
  {
    id: "QR_CODE",
    name: "QR Code Reward",
    description: "For QR/link-based rewards with scan-to-claim",
    icon: "📱",
    color: "bg-purple-500",
  },
];

export function getTemplateById(
  id: RewardTemplateType,
): TemplateInfo | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getSupercellCodeTemplate(
  gameName: string = "[GAME]",
): ContentBlock[] {
  return [
    {
      type: "title",
      value: `How to Redeem ${gameName} Code`,
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      titleLevel: "h2",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "text",
      value: `To claim this reward, you'll need to sign in to your Supercell account and redeem the code through the official ${gameName} Store.`,
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "list",
      value: "",
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      listType: "ordered",
      listItems: [
        `Sign in with your Supercell ID`,
        `Open the ${gameName} Store`,
        `Scroll to the bottom of the page`,
        `Find "Redeem a Store Code"`,
        `Enter the code below`,
      ],
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "italic",
      value:
        "The code should be entered in the 'Redeem a Store Code' section shown above.",
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "text",
      value:
        "The code should be entered in the 'Redeem a Store Code' section shown above.",
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "code",
      value: "XXXX-XXXX-XXXX",
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "link",
      value: "",
      href: `https://store.supercell.com/${gameName.toLowerCase().replace(/\s+/g, "")}`,
      label: "Open Supercell Store",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { label: "" }, ar: { label: "" } },
    },
    {
      type: "title",
      value: "After Redeeming",
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      titleLevel: "h3",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "text",
      value: `Once you've successfully entered the code, return to ${gameName} and check your account for the reward. The reward should appear in your inventory within a few minutes.`,
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "text",
      value: `Reward Status

This reward is currently active and verified.

If you encounter any issues, please report this reward.`,
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
  ];
}

export function getQRCodeTemplate(
  gameName: string = "[GAME]",
  claimUrl?: string,
): ContentBlock[] {
  const actualClaimUrl = claimUrl || "https://example.com/claim-reward";

  return [
    {
      type: "title",
      value: "How to Claim This Reward",
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      titleLevel: "h2",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "text",
      value: `This reward can be claimed by scanning the QR code with your phone camera or by clicking the QR code to open the reward link in your browser.`,
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "text",
      value: "Scan the QR code below to redeem your reward:",
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "qr",
      value: "",
      href: actualClaimUrl,
      label: "QR Code",
      imageSrc: "",
      imageAlt: "QR code to claim reward",
      src: "",
      alt: "QR code to claim reward",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "link",
      value: "",
      href: actualClaimUrl,
      label: "Open Reward Link",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { label: "" }, ar: { label: "" } },
    },
    {
      type: "title",
      value: "What Happens Next?",
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      titleLevel: "h3",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "text",
      value: `After opening the link, follow the instructions shown on the reward page. You may need to launch ${gameName} to complete the claim process.`,
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "title",
      value: "After Claiming",
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      titleLevel: "h3",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "text",
      value: `Once you've successfully claimed the reward, open ${gameName} and check your account. The reward should be available immediately or after restarting the game.`,
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
    {
      type: "text",
      value: `Reward Status

Status: Active and Verified

If the reward is not working, please report it using the button below.`,
      href: "",
      label: "",
      imageSrc: "",
      imageAlt: "",
      src: "",
      alt: "",
      translations: { es: { value: "" }, ar: { value: "" } },
    },
  ];
}

export function getTemplateBlocks(
  templateId: RewardTemplateType,
  gameName?: string,
  claimUrl?: string,
): ContentBlock[] {
  switch (templateId) {
    case "SUPERCELL_CODE":
      return getSupercellCodeTemplate(gameName);
    case "QR_CODE":
      return getQRCodeTemplate(gameName, claimUrl);
    default:
      return [];
  }
}

export interface SocialMediaPostData {
  gameName: string;
  rewardName: string;
  description?: string | null;
  redemptionCode?: string | null;
  claimUrl?: string | null;
}

export function getSocialMediaSupercellCodePost(
  data: SocialMediaPostData,
): string {
  const { gameName, rewardName, description, redemptionCode } = data;
  const cleanGame = gameName || "[GAME]";
  const cleanReward = rewardName || "a new reward";
  const code = redemptionCode || "XXXX-XXXX-XXXX";
  const desc = description ? `\n\n${description}` : "";

  return [
    `🎁 NEW ${cleanGame.toUpperCase()} REWARD 🎁`,
    ``,
    `${cleanReward} is now available for FREE!${desc}`,
    ``,
    `⚡ How to Redeem:`,
    `1. Sign in with your Supercell ID`,
    `2. Open the ${cleanGame} Store`,
    `3. Scroll to the bottom of the page`,
    `4. Find "Redeem a Store Code"`,
    `5. Enter the code below 👇`,
    ``,
    `🔑 Code: ${code}`,
    ``,
    `💡 Tip: The reward will appear in your inventory within a few minutes after redeeming.`,
    ``,
    `📲 Don't miss out — codes like this expire quickly!`,
    ``,
    `#${cleanGame.replace(/\s+/g, "")} #FreeRewards #NewFreeRewards #GameCodes`,
  ].join("\n");
}

export function getSocialMediaQRCodePost(data: SocialMediaPostData): string {
  const { gameName, rewardName, description, claimUrl } = data;
  const cleanGame = gameName || "[GAME]";
  const cleanReward = rewardName || "a new reward";
  const url = claimUrl || "";
  const desc = description ? `\n\n${description}` : "";

  const body = [
    `📱 NEW ${cleanGame.toUpperCase()} REWARD 📱`,
    ``,
    `${cleanReward} is now available for FREE!${desc}`,
    ``,
    `⚡ How to Claim:`,
    `1. Scan the QR code with your phone camera`,
    `2. Or open the reward link in your browser`,
    `3. Follow the instructions on the reward page`,
    `4. Launch ${cleanGame} to complete the claim`,
    ``,
    `💡 Tip: The reward should be available immediately or after restarting the game.`,
    ``,
    `📲 Don't miss out — rewards like this expire quickly!`,
  ];

  if (url) {
    body.push(``, `🔗 ${url}`);
  }

  body.push(
    ``,
    `#${cleanGame.replace(/\s+/g, "")} #FreeRewards #NewFreeRewards #GameRewards`,
  );

  return body.join("\n");
}
