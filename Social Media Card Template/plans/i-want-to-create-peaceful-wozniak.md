# Plan: NewFreeRewards Social Media Card Templates

## Context

NewFreeRewards (NFR) is a gaming rewards tracker brand that monitors free in-game rewards from official sources. They need polished, on-brand social media card templates to post on platforms like Instagram/TikTok. Two card types are needed:

1. **New Reward Card** — announces a single newly listed reward (image + reward name + game name + NFR branding)
2. **Monthly Rewards Card** — lists all rewards for a game/platform in a given month (game name + month title + reward image grid previews + NFR branding)

---

## Aesthetic

- **Dark gaming theme** — near-black background (`#0A0A0A` / `#111111`)
- **NFR brand colors** — Yellow `#F5C518` (N), Blue `#4A90E2` (F), Green `#2ECC71` (R)
- **Typography** — `Rajdhani` (bold display, gaming feel) for headings + `Inter` for body labels — both Google Fonts
- **Card format** — Square 1:1 ratio (1080×1080 social media standard), rendered at 540px for preview
- **Stance** — Swiss-grid precision meets gaming energy: stark dark canvas, bold type, colorful accents

---

## Implementation

### Files to modify/create

- `src/index.css` — add Google Fonts `@import` for Rajdhani + Inter, add CSS token vars
- `src/App.tsx` — replace with the card template UI

### App structure

The app renders a card studio with:
- A tab switcher: **"New Reward"** | **"Monthly Rewards"**
- Live preview of the selected card (centered, 540px square)
- Editable fields below (inputs to customize card content)
- The hero-valkyrie-emote.png used as the reward image example in the New Reward card

### Card 1: New Reward Card
Layout:
```
┌─────────────────────────────────┐
│  [NFR logo top-left]  [tag: NEW]│
│                                 │
│   [reward image centered/large] │
│                                 │
│   REWARD NAME (bold, 2xl)       │
│   Game Name  •  Platform        │
│                                 │
│ ─────────────────────────────── │
│  NewFreeRewards.com  @nfr logo  │
└─────────────────────────────────┘
```
- Diagonal color accent stripe in top-right corner (using NFR yellow/blue/green)
- Glow effect under reward image
- Dark card with subtle grid texture via CSS

### Card 2: Monthly Rewards Card
Layout:
```
┌─────────────────────────────────┐
│  [NFR logo top-left]   [month]  │
│                                 │
│  CLASH ROYALE                   │
│  AUGUST 2026 REWARDS            │
│                                 │
│  [img] [img] [img]              │
│  [img] [img] [img]  (grid)      │
│                                 │
│  NewFreeRewards.com             │
└─────────────────────────────────┘
```
- Reward preview thumbnails in a 3×N grid
- Each thumbnail: image + small name label underneath
- Game accent color strip at top

### CSS tokens in `src/index.css`
```css
@import url('...Rajdhani...');
@import url('...Inter...');
@import 'tailwindcss';

:root {
  --nfr-bg: #0D0D0D;
  --nfr-card: #161616;
  --nfr-yellow: #F5C518;
  --nfr-blue: #4A90E2;
  --nfr-green: #2ECC71;
  --nfr-muted: #888888;
  --nfr-border: #2A2A2A;
}
```

### Data / Props (editable fields)
New Reward card inputs:
- Reward name (default: "Valkyrie Emote")
- Game name (default: "Fortnite")
- Platform (default: "Epic Games")

Monthly card inputs:
- Game name (default: "Clash Royale")
- Month (default: "August 2026")
- Reward list: array of { name, imageUrl } — show 4–6 thumbnails using hero-valkyrie-emote.png as placeholder

---

## Assets

- `src/imports/626888195_122287208756073889_2863061566938551913_n.jpg` — NFR logo (N yellow, F blue, R green on black) → used as brand mark on every card
- `src/imports/hero-valkyrie-emote.png` — sample reward image (Fortnite valkyrie emote) → used as placeholder reward image

Both imported as ES modules, rendered via `<img>` (no ImageWithFallback component exists in this project).

---

## Verification

1. Dev server is already running — check preview panel
2. Both card tabs render without error
3. New Reward card shows: NFR logo, reward image, reward name, game name, bottom bar
4. Monthly card shows: NFR logo, game + month heading, thumbnail grid, bottom bar
5. Editable fields update the card preview live
6. Cards look social-media-ready at 540px square
