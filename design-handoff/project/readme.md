# Astra Cloud — Design System

Astra Cloud is a Ukrainian cloud hosting provider — VPS, dedicated servers, and colocation — aimed at solo developers, freelancers, and small businesses. Positioning: reliable but friendly, broad mainstream appeal (explicitly **not** the niche street/hacker aesthetic of its direct competitor).

**Mascot:** a semi-realistic stylized 3D-rendered astronaut — slightly cartoonish proportions (oversized head), realistic material textures (suit fabric, helmet plastic, sneaker rubber), semi-transparent visor showing a friendly human face whose expression changes with context. Suit is neutral white-gray (reads on both `#faf9f5` light and navy dark backgrounds); one accent detail (pants, helmet glow, straps) swaps per section — violet, cyan-neon, or orange. Appears throughout the site: servicing a server rack in the hero, "flying" between racks in the advantages illustration, inviting dialogue in the consultation block. **No mascot image was supplied — every illustration slot in the homepage template is a labeled dashed placeholder**, not a generated substitute.

## Sources provided
- `uploads/home.txt` — full homepage copy deck (Ukrainian), section by section.
- `uploads/cropped-cropped-astra-cloud-logo-site_5-e1692808077337-195x65.png` — the Astra Cloud logo (cloud + rocket badge, navy/white), copied to `assets/logo/astra-cloud-logo.png`.
- `uploads/ScreenShot Tool -20260706190040.png` — a **competitor's** site (monkey mascot, street/hacker aesthetic). Used only as a negative reference per the brief ("не заходити в цю естетику") — nothing from it was copied into this system.
- Written brief (pasted into chat) — positioning, mascot description, color palette, typography, layout, tone, and required homepage sections.

No Figma file or codebase was attached — this system was authored from the brief + copy deck + logo, so components follow the "no source inventory" path: a standard primitive set sized to what a hosting marketing site + pricing table need.

## Content fundamentals
- **Formality:** formal "ви" (vous) throughout — never "ти".
- **Humor:** light, occasional space puns (orbit, launch, uptime) — dosed sparingly, never a punchline-per-sentence, never crude or overly casual.
- **Voice:** confident and reassuring, not hypey. Copy leans on concrete guarantees ("30-денна гарантія повернення грошей", "цілодобовий моніторинг") over adjectives.
- **Structure:** headline + one-line subhead + short benefit list + single CTA, repeated per service block — copy is scannable, not paragraphs of prose.
- **Emoji:** not used in source copy; the 🚀 badge and bottom-advantage glyphs in the homepage template are original placeholder decoration, not part of the brief's copy voice — treat as optional flourish, safe to remove.
- **Example headline:** "Ваші дані — наша хмара" — short, a little poetic, on-theme (cloud storage ↔ literal cloud).
- **Example CTA pair:** primary "Спробувати" / secondary "Наші послуги" — one action verb, one navigational.

## Visual foundations
- **Color:** navy gradient (`--navy-950` → `--navy-700`) is the dark-section base; neon cyan and violet are decoration/glow only (illustration backlight, glow shadows) — never body text; orange is the *single* CTA/accent color and appears on both light and dark surfaces; light sections use warm off-white `--paper` (`#faf9f5`), never pure white, for comfortable long-form reading (pricing, FAQ).
- **Type:** Unbounded for all display/headline text (bold, geometric, a little sci-fi) — keep tracking neutral-to-tight, Unbounded is wide by default and loose tracking makes it feel sloppy. Inter for everything else (nav, body, tables, forms, UI labels) — chosen for legibility at small sizes.
- **Spacing/layout:** generous, DigitalOcean-style comfortable container (`--container-max: 1200px`) that never stretches full-bleed on large monitors; section vertical padding is large (`--section-padding-y`, 64–128px) so each block "breathes" independently.
- **Section rhythm:** alternating light (`--paper`) and dark (navy gradient) sections down the page — hero, advantages, consultation, and footer are dark; services, pricing, and FAQ are light, matching the brief's "many-text" sections.
- **Backgrounds:** flat color or navy gradient only — no photography, no repeating patterns/textures. Illustration is the only imagery, always mascot-centric, always with a soft neon glow shadow behind it on dark sections.
- **Corner radii:** moderate throughout — 6/10/16/24px scale, pill only for buttons/tags/badges. Never sharp/square (feels cold) and never everything-pill (feels juvenile) — a hosting company needs to read as trustworthy, not playful-only.
- **Cards:** white or navy-800 surface, 1px hairline border (`--border-on-light`/`--border-on-dark`), soft low-contrast shadow on light (`--shadow-card`) — no colored left-border accent, no rounded-corner-plus-icon-circle cliché.
- **Elevation/glow:** light-section elevation is a soft two-layer shadow; dark-section "elevation" is a neon glow (`--glow-cyan`/`--glow-violet`/`--glow-orange`) behind illustration slots and badges — glow, not shadow, is the dark-surface depth cue.
- **Motion:** subtle only — `--duration-fast` (120ms) for press/hover, `--duration-standard` (200ms) for tab/accordion state changes, standard ease-out curve. No bounce, no infinite decorative loops.
- **Hover/press states:** buttons brighten slightly on hover (`filter: brightness(1.06)`) and scale down slightly on press (`scale(0.97)`) — no color-swap hovers, no darken-only.
- **Borders:** 1px hairlines everywhere on light sections (`--border-on-light`, warm light gray); 1px 12%-opacity white on dark sections (`--border-on-dark`).
- **Transparency/blur:** used narrowly — sticky header uses `backdrop-filter: blur(8px)` over translucent paper; not used elsewhere.
- **Imagery color vibe:** N/A — no photography in the brief; illustration is the only imagery channel and it is mascot/3D-render based, not photographic.

## Iconography
No icon font, SVG icon set, or icon usage was defined in the provided brief or copy deck. The homepage template placeholder icons (💸 🛠️ ⚡ 📊 🚀 🗄️) in the bottom-advantages grid are a **flagged substitution** — plain emoji standing in for a real icon set until the client supplies one or approves a specific system (Lucide/Heroicons are reasonable line-icon candidates given the clean, trustworthy brand direction). Replace before shipping. Payment-network marks (Mastercard/VISA/Bitcoin/PayPal) are rendered as plain text labels, not logos — no real payment-network logo assets were provided, and those marks are trademarked, so they are not reproduced from memory.

## Components
Standard primitive set (no Figma/codebase inventory was provided, so this follows the brand-guidelines-only path), grouped by concern under `components/`:

**Core** (`components/core/`) — `Button`, `Badge`, `Tag`, `Card`
**Forms** (`components/forms/`) — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
**Navigation** (`components/navigation/`) — `Tabs`
**Feedback** (`components/feedback/`) — `Accordion`, `Dialog`, `Tooltip`
**Data** (`components/data/`) — `PricingTable`

### Intentional additions
- `PricingTable` — the brief explicitly calls for a tabular, filterable pricing comparison; built as a first-class data component rather than assembled ad hoc each time.
- `Tag` — toggleable filter chip, needed for the pricing table's location/CPU/IPv4-IPv6/payment filters described in the brief.

## Templates
- `templates/homepage/Homepage.dc.html` — full marketing landing page recreation: header/nav, hero, three service-announcement blocks (colocation, dedicated, VPS), "Reliable infrastructure" advantages section, pricing table with tabs + filters, bottom advantages grid, partners strip, payment methods, FAQ accordion, consultation CTA, footer. Composes the component primitives above; illustration/mascot slots are labeled placeholders (see Visual foundations).

## Fonts
No font files were supplied. Unbounded, Inter, Golos Text, and Manrope are loaded from Google Fonts CDN (`tokens/typography.css`) — these are the exact families the brief names, not substitutes. If the brand later licenses static files, swap the `@import` for local `@font-face` rules in the same file.

## Index
- `styles.css` — root stylesheet, imports everything below.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css` (spacing/radius/shadow/motion), `base.css` (resets).
- `assets/logo/` — Astra Cloud logo.
- `guidelines/` — foundation specimen cards: `colors/` (navy scale, neon accents, orange CTA, neutrals+surfaces), `type/` (display, body, scale reference), `spacing/` (spacing scale, radius scale, elevation), `brand/` (logo, section rhythm, mascot placeholder note).
- `components/` — see Components above.
- `templates/homepage/` — the homepage template + its `ds-base.js` loader.
- `SKILL.md` — portable skill definition for use outside this environment.
