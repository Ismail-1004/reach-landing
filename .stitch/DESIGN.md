---
name: Reach
colors:
  background: '#0a0a0a'
  surface: '#121214'
  surface-container: '#1a1a1e'
  on-surface: '#ffffff'
  on-surface-variant: '#8a8a93'
  on-surface-dim: '#5c5c64'
  outline: '#232328'
  primary: '#2563eb'
  primary-bright: '#3b82f6'
  on-primary: '#ffffff'
  error: '#ef4444'
  error-bright: '#f87171'
  warning: '#facc15'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 68px
    fontWeight: '600'
    lineHeight: 78px
    letterSpacing: -0.02em
  headline-section:
    fontFamily: Inter
    fontSize: 46px
    fontWeight: '600'
    lineHeight: 53px
    letterSpacing: -0.02em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: '0'
  body-emphasis:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.18em
  stat-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
rounded:
  none: 0
  sm: 8px
  DEFAULT: 12px
  md: 14px
  lg: 16px
  xl: 18px
  full: 9999px
spacing:
  unit: 4px
  section-y: 96px
  section-y-mobile: 72px
  container-max: 1140px
  gutter: 24px
---

# Design System: Reach
**Project:** Reach — курс по органическому контенту (Reach landing)

## 1. Visual Theme & Atmosphere

Reach wears a pure-black, results-focused aesthetic borrowed from premium creator-economy landing pages. The canvas is near-absolute black (`#0a0a0a`), layered with barely-lifted charcoal surfaces (`#121214`, `#1a1a1e`) that separate content not with heavy borders but with hairline `#232328` outlines. The mood is confident, minimal, and conversion-driven: every section breathes with generous 96px vertical rhythm, content is centered within a 1140px column, and a single electric blue (`#2563eb → #3b82f6`) carries all the energy — CTAs, accents, section labels, the gradient glow behind the hero, and the focus rings on interactive cards.

The atmosphere is "quiet authority with one loud color." Neutrals are cool and desaturated (blue-grays, slate muted text at `#8a8a93`), so the blue accent reads as the only emotional signal on the page. Urgency is injected sparingly through a live-stream-style red dot (`#ef4444`) on the closing CTA and a soft red for pain-point markers. Motion is restrained and tasteful: fade-and-rise on scroll via Intersection Observer, an eased FAQ accordion, and a blue glow that blooms on button hover. Nothing decorative competes with the message.

## 2. Color Palette & Roles

### Primary Foundation
- **Void Black** `#0a0a0a` — Page background, the base canvas.
- **Charcoal Surface** `#121214` — Cards, nav bar, marquee, video wells.
- **Lifted Charcoal** `#1a1a1e` — Open/active states, screenshot placeholders, hover surfaces.
- **Hairline Outline** `#232328` — All borders and dividers; structure without weight.

### Accent & Interactive
- **Electric Blue** `#2563eb` — Primary CTA fill, timeline accent bars, checklist icons, gradient start.
- **Bright Blue** `#3b82f6` — Hover state, section labels, links, gradient end, glow color.

### Typography & Text Hierarchy
- **Pure White** `#ffffff` — Headlines and primary text.
- **Muted Slate** `#8a8a93` — Body copy, sublines, captions, nav links.
- **Dim Slate** `#5c5c64` — Tertiary text, placeholder labels, numbering.

### Functional States
- **Alert Red** `#ef4444` — Live-status dot, pain-card "✕" markers.
- **Soft Red** `#f87171` — Urgency badge text.
- **Signal Gold** `#facc15` — Star ratings (4.9/5).

## 3. Typography Rules

### Hierarchy & Weights
Single-family system: **Inter** for everything (headings and body), loaded from Google Fonts. Headings use Inter **Semibold (600)** with a tight `-0.02em` tracking — the type carries a clean, modern, geometric-humanist character rather than display flair. (Syne is still loaded as a legacy fallback class but is no longer applied to headings.)

- **Hero display** — clamp(34px → 68px), weight 600, line-height ~1.15, max-width 900px, centered.
- **Section heading** — clamp(28px → 46px), weight 600.
- **Body** — 16px / 400, line-height 1.6, muted slate.
- **Emphasis / pain cards** — 17–18px / 500.
- **Section label** — 13px / 600, uppercase, `0.18em` letter-spacing, bright blue.
- **Stat numbers** — clamp(36px → 56px), weight 600, rendered with a white→blue vertical gradient text fill.

### Spacing Principles
Display and headings ride tight tracking (`-0.02em`) for a premium, compact feel; labels open up dramatically (`+0.18em`) to read as eyebrow text. Body stays at neutral tracking with relaxed 1.6 line-height for readability against the dark field.

## 4. Component Stylings

### Buttons
Pill-adjacent rounded rectangles (`12px`, large variant `14px`). Primary fill is electric blue, white label, weight 600. Hover lifts the button (`translateY(-2px)`), brightens to `#3b82f6`, and blooms a layered blue glow (ring + drop shadow + ambient `60px` blur). A ghost variant uses a transparent fill with a hairline outline that fills to lifted-charcoal on hover.

### Cards & Containers
Charcoal surface (`#121214`) with hairline outline and `16px` radius. On hover, the border shifts to translucent blue (`rgba(37,99,235,.5)`) and the card rises 4px. Week/program cards add a 3px solid blue left-accent bar. Metric cards center large gradient-filled numbers. No heavy shadows — elevation is communicated through border-color and subtle translate, not drop shadows.

### Navigation
Fixed top bar, 68px tall, semi-transparent black with `blur(14px)` backdrop and a hairline bottom border. Left cluster: enlarged logo image (52px) followed by muted-slate text links (Домой / Результат / Вопросы) that brighten to white on hover. Right: a compact blue CTA button. On mobile (≤860px) the links and CTA collapse into a hamburger-triggered drawer that stacks centered.

### Inputs & Forms
No native form fields on the page; the FAQ accordion is the primary interactive control. Each item is a charcoal card with a full-width question button; clicking eases the answer open (`max-height` + `cubic-bezier(.4,0,.2,1)`), rotates a blue "+" 135° into an "×", fades the answer in with a slight upward slide, and tints the open item's border blue with a lifted-charcoal background.

### Domain-Specific Components
- **Hero subline chip** — sharp-cornered (`radius 0`) inline tag with a left-anchored blue→transparent gradient, white Inter Regular text hugging the edges.
- **Live-status badge** — soft-red pill with a pulsing red dot that emits an expanding ring, mimicking a "LIVE" / "places remaining" indicator.
- **Rating badge** — pill with gold stars + bold "4.9/5".

## 5. Layout Principles

### Grid & Structure
Centered 1140px max-width container with 24px gutters. Sections use simple responsive grids: 2-up (pain cards, program timeline, for-who), 3-up (solution, metrics, testimonials), collapsing to a single column below 860px. The FAQ constrains to a 760px reading column.

### Whitespace Strategy
Base 4px unit. Sections breathe at 96px vertical (72px on mobile). Cards carry generous 30–36px internal padding. The overall philosophy is airy and uncluttered — few elements per section, lots of black space, so the single blue accent and the headlines dominate.

### Alignment & Visual Balance
Hero, VSL, case, testimonials, and the closing CTA are centered for a declarative, conversion-page feel; multi-card sections left-align their card contents. A radial blue glow sits behind the hero and the final CTA to anchor the eye at entry and exit.

### Responsive Behavior & Touch
Mobile-first and fully fluid via `clamp()` type and collapsing grids. Hamburger drawer for navigation, larger touch targets on stacked nav links (17px), and the logo scales down to 44px. Horizontal overflow is clipped to keep the sharp-edged hero chip and glows contained.

## 6. Design System Notes for Stitch Generation

### Language to Use
"Pure-black, premium, conversion-focused creator-economy landing page. Single electric-blue accent on a desaturated cool-neutral field. Minimal, confident, lots of negative space, hairline borders instead of shadows, tasteful fade-on-scroll motion."

### Color References
- Void Black `#0a0a0a` (background)
- Charcoal Surface `#121214`, Lifted Charcoal `#1a1a1e` (cards/states)
- Hairline Outline `#232328` (borders)
- Electric Blue `#2563eb` → Bright Blue `#3b82f6` (accent + gradients + glow)
- Pure White `#ffffff`, Muted Slate `#8a8a93`, Dim Slate `#5c5c64` (text)
- Alert Red `#ef4444` / Soft Red `#f87171` (urgency), Signal Gold `#facc15` (ratings)

### Component Prompts
- "A fixed dark glassmorphic nav bar: 52px logo image on the left, three muted text links beside it, a small electric-blue pill CTA on the right, hairline bottom border."
- "A FAQ accordion of charcoal cards with hairline borders; clicking eases the answer open, a blue plus rotates into an x, the open card gains a blue border and slightly lighter background."
- "A closing CTA block centered over a radial blue glow: a soft-red live badge with a pulsing dot reading '3 места осталось', a large semibold headline, and a glowing electric-blue button."

### Incremental Iteration
Keep the palette to one accent — resist adding a second hue; let red appear only as a sparse urgency signal and gold only on ratings. Prefer border-color and translate for elevation over drop shadows. Maintain tight `-0.02em` heading tracking and wide `0.18em` label tracking as the system's typographic signature.
