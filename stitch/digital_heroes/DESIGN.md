---
name: Digital Heroes
colors:
  surface: '#17130d'
  surface-dim: '#17130d'
  surface-bright: '#3e3832'
  surface-container-lowest: '#110e08'
  surface-container-low: '#1f1b15'
  surface-container: '#231f19'
  surface-container-high: '#2e2923'
  surface-container-highest: '#39342d'
  on-surface: '#ebe1d7'
  on-surface-variant: '#d3c4b3'
  inverse-surface: '#ebe1d7'
  inverse-on-surface: '#353029'
  outline: '#9c8f7f'
  outline-variant: '#4f4538'
  surface-tint: '#f3bd6b'
  primary: '#f3bd6b'
  on-primary: '#442c00'
  primary-container: '#c89749'
  on-primary-container: '#4c3100'
  inverse-primary: '#7f570b'
  secondary: '#77d9a9'
  on-secondary: '#003824'
  secondary-container: '#017d54'
  on-secondary-container: '#bbffd9'
  tertiary: '#9ecafe'
  on-tertiary: '#003257'
  tertiary-container: '#77a3d5'
  on-tertiary-container: '#003961'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb0'
  primary-fixed-dim: '#f3bd6b'
  on-primary-fixed: '#281800'
  on-primary-fixed-variant: '#614000'
  secondary-fixed: '#93f6c4'
  secondary-fixed-dim: '#77d9a9'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#d1e4ff'
  tertiary-fixed-dim: '#9ecafe'
  on-tertiary-fixed: '#001d35'
  on-tertiary-fixed-variant: '#144976'
  background: '#17130d'
  on-background: '#ebe1d7'
  surface-variant: '#39342d'
typography:
  hero-h1:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  section-h2:
    fontFamily: DM Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  subhead-h3:
    fontFamily: DM Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  stat-display:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  section-padding: 120px
  element-gap: 24px
---

## Brand & Style

This design system breaks away from traditional country-club aesthetics, opting instead for a **High-End Minimalist** approach that leans into the emotional weight of charity and the prestige of the sport. The atmosphere is quiet, confident, and deeply sophisticated.

The visual narrative is driven by generous whitespace (even within a dark-mode core), gold hair-line dividers, and a focus on editorial-grade photography. It avoids "clutter" to allow the mission of the charity and the beauty of the game to resonate. The emotional response should be one of "purposeful luxury"—feeling like a member of an exclusive club where the primary benefit is the impact made on others.

## Colors

The palette is anchored by **Forest Deep**, a rich, dark green that provides a more soulful foundation than standard black or charcoal. **Harvest Gold** is used sparingly as a "hero" accent—reserved for CTA states, divider lines, and high-value status indicators. 

For information-heavy sections or "impact reports," the **Surface Card** color (#F0F7F3) provides a soft, breathable alternative to the dark background, allowing for a light-on-dark/dark-on-light interplay that keeps the long-form content engaging. **Emerald Mid** serves as a functional secondary color, used for success states or subtle interactive elements that need to feel distinct from the gold branding.

## Typography

The typographic system creates a tension between the traditional and the technical. **Playfair Display** (utilizing Noto Serif as the system equivalent where necessary) provides the editorial "voice," appearing in large, evocative headlines. 

**DM Sans** (utilizing Be Vietnam Pro as the system equivalent) handles the functional hierarchy, offering high legibility with a contemporary, clean profile. To ground the "Digital" aspect of the platform, **JetBrains Mono** is used exclusively for data, scores, and monetary values, creating a "scoreboard" feel that is precise and modern.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain the editorial "magazine" feel, ensuring that line lengths for the serif typography remain optimal for reading. 

Spacing is intentionally aggressive. Large 120px vertical gaps between sections create a sense of breathing room and premium quality. Content is organized on a 12-column grid, but frequently utilizes "offset" layouts—where imagery and text do not perfectly align—to evoke a high-end, custom-designed feel rather than a template-driven one.

## Elevation & Depth

This design system avoids traditional drop shadows in favor of **Tonal Layers** and **Gold Accents**. 

1.  **Primary Depth:** Created by the contrast between the #1A3C34 background and #F0F7F3 surface cards.
2.  **Structural Depth:** Gold Hairline Dividers (#C89749 at 0.5px or 1px thickness) are used to separate content sections, replacing shadows for a flatter, more architectural look.
3.  **Interaction Depth:** Only high-priority interactive elements (like the Primary CTA) use a soft, ambient glow in the Harvest Gold hue to suggest "lift." All other elements rely on color shifts and scale transitions.

## Shapes

The shape language is **Soft (0.25rem)**. The design system favors sharp, clean corners for large containers and dividers to maintain a high-fashion, architectural aesthetic, but uses a subtle 4px radius on buttons and input fields to ensure the UI feels modern and accessible. This slight rounding prevents the interface from feeling "hostile" while maintaining the precision associated with professional golf.

## Components

-   **Buttons:** Primary buttons use a solid Harvest Gold background with dark text. Secondary buttons use a "Ghost" style: a 1px Gold border with Harvest Gold text. All buttons feature a 4px (Soft) corner radius.
-   **Divider Lines:** 1px horizontal or vertical lines in #C89749. These are used to frame sections and "anchor" the typography.
-   **Cards:** Charity impact cards use the #F0F7F3 surface color. They should have no shadow, instead using a thin 1px border in #6B8F84 at 20% opacity.
-   **Input Fields:** Minimalist design—only a bottom border in #D0E8DC, which turns Harvest Gold on focus. Labels use the `label-caps` typography style.
-   **Score Chips:** Small capsules using JetBrains Mono for the text, featuring a #4CAF82 background for positive trends or "under par" styling.
-   **Hero Image Containers:** Large-scale imagery should use subtle "Ken Burns" pan effects on scroll, framed by gold hairline dividers to feel like a gallery piece.