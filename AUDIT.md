# Ivory Horizons – Site Audit (Oct 2026)

Branch `site-audit-oct-2026` (not pushed). One commit per phase. Measured with Lighthouse (mobile emulation, simulated slow-4G + 4x CPU throttle, Chrome 154, Windows) against a local static server.

## Domain findings
- No `CNAME`, no config, no absolute site URL anywhere in the repo. The only trace of the domain is the contact email `hello@ivoryhorizons.com` in every footer. Git remote is `github.com/madedochristopher97-pixel/Ivory-horizons`.
- **Domain is unconfirmed**, so everything stays relative and `sitemap.xml`, `robots.txt`, `<link rel="canonical">`, `og:url` and an absolute `og:image` are **not added yet** (a relative canonical is invalid; Lighthouse SEO dropped to 92 when I tried it). A TODO comment marks the spot in the article head.

## Before / after (mobile, Lighthouse)
Before = unmodified site on a plain static server. After = median of 3 runs behind a gzip-enabled server (a real host compresses text; the "before" run did not, which only affects text files, a few hundred KB at most against 94 MB).

| Page | | LCP | CLS | TBT | Transferred | Requests | Perf | A11y / BP / SEO |
|---|---|---|---|---|---|---|---|---|
| index | before | 18.5 s | 0.002 | 1,960 ms | 94.2 MB | 476 | 32 | 95 / 96 / 100 |
| index | **after** | 3.6 s (2.7–11.6) | 0.000 | 788 ms | 2.06 MB | 35 | 55 | 100 / 100 / 100 |
| blog | before | 24.1 s | 0.102 | 150 ms | 19.8 MB | 22 | 69 | 92 / 100 / 100 |
| blog | **after** | 3.1 s | 0.000 | 404 ms | 0.73 MB | 23 | 81 | 100 / 100 / 100 |
| accommodation | before | 25.2 s | 0 | 990 ms | 6.9 MB | 21 | 51 | 92 / 100 / 100 |
| accommodation | **after** | 2.7 s | 0.001 | 594 ms | 0.80 MB | 22 | 78 | 100 / 100 / 100 |
| kenya-travel-insurance-update | before | 17.2 s | 0.02 | 30 ms | 3.6 MB | 19 | 71 | 96 / 100 / 100 |
| kenya-travel-insurance-update | **after** | 2.8 s | 0.000 | 651 ms | 0.45 MB | 22 | 78 | 100 / 100 / 100 |

Asset folder: **181.8 MB (76 files) → 13.5 MB (136 files)**. 22 files over 1 MB (173.5 MB in total) were replaced by WebP renditions of 25–620 KB.

### Targets
| Target | Result |
|---|---|
| CLS < 0.1 | **Met** on all four pages (0.000–0.001). |
| Initial weight about 2 MB | **Met** (index 2.06 MB including the hero video; inner pages 0.45–0.80 MB). |
| LCP < 2.5 s (mobile) | **Not reliably met in this lab: 2.7–3.6 s** (one index run hit 11.6 s, an outlier from machine load). See caveats. |

Caveats on the lab numbers: this Windows machine spends 350–750 ms on the first layout even of the static article (cold text and font shaping; removing each index section in turn did not change it), and TBT swings between 400 ms and 3 s from run to run. The remaining LCP cost is the render-blocking `style.css` (56 KB, about 10 KB gzipped) plus that cold layout. Please re-measure on PageSpeed Insights from the live host before treating LCP as a miss.

## Phase 1 – Blog
- Verified `kenya-travel-insurance-update.html` and its card against the brief: mandatory government insurance, effective 6 Oct 2026; new eTA applicants buy it during the application at **USD 44 per traveler**; valid-eTA holders **pay on arrival with no price stated** (USD 44 appears only in the new-eTA scenario and the headline stat tile); it does not replace comprehensive travel insurance; Ivory Horizons requires guests to hold their own cover (medical, cancellations, interruptions, unforeseen circumstances). All match. No copy changed.
- Added Open Graph (type, site_name, title, description, image, published time) and Twitter card tags. Article JSON-LD kept valid (added `dateModified`, `inLanguage`; it parses).
- **The "Read Guide" buttons on the other four cards did nothing**: `app.js` rendered `<button data-article-id>`, nothing listens for that attribute, and there are no article pages. They now render as a non-interactive "Guide coming soon" label. Only the Kenya card links to a page.

## Phase 2 – Performance (what changed)
- 40 photos converted to WebP at 640 / 1024 / 1920 px widths (`name-640.webp`, `name.webp`, `name-1920.webp`), with `srcset`, `sizes`, `width`/`height`, `loading="lazy"` and `decoding="async"` on static markup and on every `app.js` template (via an `imgAttrs()` helper with an embedded size manifest). The first card on blog and accommodation is eager with `fetchpriority="high"`.
- Duplicates removed by content hash: `Turkey (1).jpg`, `dest_uganda` = `dest_rwanda`, `cultural_discovery` = `founder_story`, `journey_bush_beach` = `beach_escape`.
- All asset paths renamed to kebab-case (trailing space, `&`, apostrophes, and the `Lucury` / `Zanzibarjpg` typos fixed). Originals moved to gitignored `_originals/` (they remain in git history).
- The 3 hero GIFs (3.7 / 3.7 / 6 MB) became muted, looping, `playsinline` MP4s of 222 / 650 / 161 KB with WebP posters. The poster is preloaded for LCP; reduced-motion and Save-Data show the poster only. Note: `index.html` referenced a hero GIF that **did not exist** (`Hero section.gif`), so the hero relied on a failing `onerror` chain.
- Audio is `preload="none"`. Google Fonts trimmed to **Fraunces only** (Cormorant Garamond and Inter were loaded but never used), made non-blocking with a `<noscript>` fallback, plus weight-matched fallback `@font-face` rules so the font swap no longer shifts layout. Fraunces 600 is now actually loaded (the CSS uses it 15 times; before, it silently fell back to 500).
- `app.js` is deferred. The header scroll handler is passive and `requestAnimationFrame`-throttled and only toggles on change. Removed the header `backdrop-filter` (its background is already 95% opaque). `--transition-smooth` and `--transition-fast` no longer use `all`.
- Considered and skipped: `content-visibility:auto` (placeholder heights would misplace Lenis anchor offsets), inline critical CSS, and self-hosting Fraunces.
- A link checker proves **253 asset references, 0 broken, 0 non-kebab paths**, and was re-run after every phase.

## Phase 3 – Lenis smooth scroll
- Self-hosted **Lenis 1.3.26** (published 2026-08-05) in `assets/vendor/lenis/` (`lenis.min.js`, `lenis.css`, `LICENSE`), `defer` on all six pages, initialised once in `app.js`: duration 1.1, `smoothWheel` on, `syncTouch` off, skipped under `prefers-reduced-motion`. `scroll-behavior: smooth` removed.
- Nav anchors (`#x` and `index.html#x`) use `lenis.scrollTo` with an offset equal to the compact header height. Arriving from another page re-aligns after load and font swap. The header `scrolled` state is unaffected.
- `lenis.stop()` / `start()` follow every `<dialog open>` (covers `showModal`, `close()` and Esc); `data-lenis-prevent` is on all dialogs.
- Tested with Playwright on Chrome 154: wheel easing, Space / Down / PgDn / PgUp / Up, anchors (section top equals header bottom), modal open and Esc, cross-page anchor, reduced motion, touch swipe. No console errors. I could not test on a physical phone.

## Phase 4 – Findings (7 widths x 6 pages swept with screenshots; no horizontal scroll at any width now)
Severity: H high, M medium, L low. Fixed = in this branch. Deferred = needs your call or is out of scope.

| # | Page | Issue | Law / rule | Sev | Status |
|---|---|---|---|---|---|
| 1 | blog, accommodation, article | Absolute header overlaps the hero eyebrow badge | Proximity / common region | H | Fixed (hero clears header; double gap removed) |
| 2 | blog, accommodation, article | Hero left-aligned: `.text-center` had no global rule | Similarity / alignment | M | Fixed |
| 3 | all | White on terracotta `#D77A38` = 3.1:1 (header CTA, hero CTA, blog badge, article CTA) | WCAG 1.4.3, aesthetic-usability | H | Fixed: new `--brown-accent-deep #A9561C` (5.2:1); hover `#8E4516` |
| 4 | index, blog, destination | Terracotta text on cream 3.0:1 (hero tag, star rating, timeline day, "Your Invitation") | WCAG 1.4.3 | M | Fixed (deep accent) |
| 5 | most | `#8C6D53` on cream-secondary 4.25:1 (badges, meta, labels) | WCAG 1.4.3 | M | Fixed: `#7A5C43` (5.5:1) |
| 6 | destination, journey | "Back to ..." button was white on cream (1.03:1) and sat under the header | WCAG 1.4.3, Jakob | H | Fixed |
| 7 | journey | "Best For" text on the dark hero image too dim | WCAG 1.4.3 | M | Fixed |
| 8 | all | Tap targets under 44 px: header CTA (34), pills (34), nav links (34), card links (18), hamburger (24x10), footer links (26) | Fitts's law, WCAG 2.5.5 / 2.5.8 | H | Fixed (44 px minimum; flagged items 95 → 16 before the last nav and footer tweaks) |
| 9 | all | 769–1099 px: desktop nav overflowed and caused horizontal scroll (pre-existing) | Responsive, Fitts | H | Fixed (hamburger from 1100 px) |
| 10 | journey | Stale unclosed `<dialog>` nested the real one; duplicate ids `conciergeModal`, `stepBadge` | Valid / semantic HTML | H | Fixed |
| 11 | all | No `:focus-visible` styles at all | WCAG 2.4.7 | H | Fixed (deep terracotta ring, lighter on dark surfaces) |
| 12 | all | No skip link | WCAG 2.4.1 | M | Fixed |
| 13 | all | 3 concierge `<select>`s with no accessible name | WCAG 3.3.2 / 4.1.2 | M | Fixed (`aria-label`) |
| 14 | all | Dialogs unnamed; hamburger had no `aria-expanded` | WCAG 4.1.2 | M | Fixed |
| 15 | blog, accommodation | Card titles jumped h1 → h3 | WCAG 1.3.1 | L | Fixed (h2) |
| 16 | all | Dialog focus trap and restore | WCAG 2.4.3 | – | Pass (native `showModal`: 0 escapes in 40 Tabs; focus returns to the trigger) |
| 17 | all | Alt text, single h1, form labels | WCAG 1.1.1 / 1.3.1 | – | Pass (0 images without alt) |
| 18 | style.css | 35 hardcoded hex values outside `:root` | Own rule: colours via variables | L | Fixed (tokens added) |
| 19 | style.css | Off-grid spacing (10/12/14/20/28/36/60 px) | Own rule: 8 px grid | L | Fixed (34 declarations; on-grid px values now `--space-*`). 3–6 px micro-spacing (badge and border details) kept → Deferred |
| 20 | all | Phone shown as `+254 (0) 740 199 975` and `+254 740 199 975` | Consistency / Jakob | L | Fixed → `+254 740 199 975` |
| 21 | all | Footer "Ivory Horizons Luxury Concierge" vs "Tours"; logo alt "Luxury Concierge Logo" | Brand consistency | L | Fixed in footer and alt. `<title>` / meta still say "Luxury Travel Concierge" → Deferred (brand decision) |
| 22 | all | Footer link "Private Offices" (it just scrolls to the contact block and implies physical offices) | Content clarity | L | Fixed → "Contact". Tell me if offices do exist |
| 23 | blog | 4 "Read Guide" buttons did nothing | Doherty (no feedback), false affordance | M | Fixed (disabled label); **decision needed** |
| 24 | blog | Layout shift 0.102 → 0.25 mid-audit: the footer jumped when JS filled the empty grid, then the font swap moved the grid | CLS | M | Fixed (grid height reserved, fallback font metrics) → 0.000 |
| 25 | index | Hero video source is 800x450 (the GIFs were 800 px), so it looks soft above about 1024 px | Aesthetic-usability | M | Deferred: send the original 1080p files |
| 26 | all | 8 top-level nav items plus a CTA; hero shows 2 CTAs and a music button | Hick's / Miller's law | M | Deferred: suggest grouping Destinations / Experiences / Tours |
| 27 | blog, index | Terracotta fill is used for the primary CTA and for decorative category badges | Von Restorff | L | Deferred: make badges neutral so the CTA stands alone |
| 28 | cards | Three link styles for "go" actions (`card-link`, `btn-text`, `btn-outline`) | Similarity | L | Deferred |
| 29 | all | Logo → home, standard nav order, CTA at the right end, Contact last | Jakob, serial position | – | Pass |
| 30 | all | Filters and modals respond instantly; Lenis easing is about 1.1 s but input stays responsive | Doherty threshold | – | Pass |
| 31 | blog, accommodation | `min-height: 100vh` on the grids leaves blank space when a filter returns 1–2 cards | CLS trade-off | L | Deferred (accepted for now) |
| 32 | hero titles on photos | Contrast cannot be machine-measured over images | WCAG 1.4.3 | – | Checked visually at 1440 px; overlays hold |

### Image mismatches: every place, and what I did (please review)
| Original | Where it appeared | Now |
|---|---|---|
| `dest_kenya.jpg` (jeep, Tanzanian plate) | Home: Kenya destination card; `destinationData.Kenya.image` (destination page hero and destination cards) | `journey-migration.webp` (acacia at sunset) |
| `journey_kenya.jpg` (same jeep) | Home: Kenya Classic Safari card; journey page hero and "Maasai Mara Wilderness Safari" day; "Maasai Cultural Immersion" day; Kenya gallery slot; Angama Mara `onerror` fallback; **blog card "The Art of the Private Fly-in Safari"** | Kenya Classic Safari card and Mara days → `curated-modalities/safari-adventure.webp` (wildebeest herd). Cultural day, gallery slot and Angama fallback → `journey-migration.webp`. Blog card → `handpicked-lands/tanzania.webp` (elephants with Kilimanjaro) |
| `hero_sunset.jpg` (same jeep) | Not referenced anywhere | Moved out of the deployed folder |
| `safari_adventure.jpg` (barbecue) | **Not on a blog card.** Only an `onerror` fallback for the Giraffe Manor card and the home Safari Adventure card | Fallbacks re-pointed (Angama Mara / journey-migration); file moved out |
| `Curated Modalities/Safari Adventure.jpg` | Home Safari Adventure card; Kenya gallery; Kenya itinerary day | **Kept** (wildebeest herd; I could not verify the location). It now also serves the Kenya Classic Safari card, so it repeats on the home page. Needs your call |

Retired files are in `_originals/unused/`.

## Needs your decision
1. **Live domain**, then I add `sitemap.xml`, `robots.txt`, canonical, `og:url` and an absolute `og:image`.
2. **The four dead blog links**: write the articles, keep "Guide coming soon", or hide those cards.
3. **Replacement images**: the Kenya imagery above is a stopgap from existing files. Real Kenya photos without plates would be better, and I need to know whether `Safari Adventure.jpg` really is Ngorongoro.
4. **Original 1080p hero footage** to re-encode at full resolution.
5. "Private Offices" → "Contact", and "Luxury Concierge" in `<title>` / meta: confirm the brand wording.
6. Nav grouping and CTA hierarchy (findings 26–27).

## Housekeeping notes
- `_originals/` (about 175 MB) is **gitignored and exists only on this machine**; the old versions remain in git history. Back it up if you want them.
- `download_images.js` (a dev script in the repo root) is still deployed and writes into `assets/images` with the old naming; consider deleting or moving it.
- `assets/tour-icons/*.svg` are 30–85 KB each (unoptimised exports); an SVGO pass would save about 300 KB more.
- Installed on this PC at your request: GitHub CLI 2.102.0 (run `gh auth login`) and FFmpeg 9.0.2. A plugin hook (`backend-design` `check_backend_component.py`) is broken and blocked some Write-tool calls, so I wrote some files through the shell instead.