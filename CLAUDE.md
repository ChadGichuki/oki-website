# OKI Digital website

Marketing site for OKI Digital, a Kenyan creative social media and LinkedIn agency.
Replaces the Carrd site at okidigital.co.ke. Design source of truth: the OKI design canvas.
If the canvas and this file disagree, ask before building.

## Stack
Next.js App Router, TypeScript (strict), Tailwind, GSAP + ScrollTrigger, Lenis,
Resend (contact form), Umami Cloud (analytics, cookie-free), Vercel (hosting). pnpm.

## Rules
- All copy lives in /content (site.ts, case-studies/*.ts). Never hard-code copy in components.
- Server components by default; "use client" only for motion, video and the form.
- No gradients, drop shadows, emoji or left-border cards. Flat colour and thin rules only.
- Every motion effect must respect prefers-reduced-motion and leave content visible without JS.
- Real <button>/<a> elements, visible focus ring, text contrast >= 4.5:1.
- Never use AI-generated imagery for client products or results. Client media is real.
- Secrets only in env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, UMAMI_WEBSITE_ID.
- Run `pnpm lint && pnpm typecheck && pnpm build` before saying a task is done.

## Tokens
brand #ED5F1E · ink #000000 · paper #FAF9F6 · sand #F0EEE9
line #E3E1DB, #D6D4CF · muted #444444, #555555 · muted-dark #CFCFCF, #8A8A8A · card #1C1C1C
Orange is for buttons (black text), highlight words in headings and labels on black.
Never orange body text on paper.

Display: Archivo 900, font-stretch 75%, uppercase, line-height 0.88-0.95.
Hero clamp(64px, min(11vw, calc((100svh - 380px) * 0.28)), 176px): height-capped so CTAs
stay above the fold. Section titles clamp(48px, 7vw, 96px).
Body: Inter 400/500, 16-22px. Labels: 12-14px uppercase, tracking 0.12-0.14em.
Container 1280px, padding 24px (16px mobile). Sections 120px (64px mobile).
Buttons: pill, min 44px tall, primary 52px.

## Hero video
Fills the viewport below the sticky header (100svh - 73px), full-bleed, object-fit cover,
autoplay muted playsInline. Plays once, no loop, and holds its last frame (the lit bulb) as
the permanent background.
16:9 source for desktop, 9:16 for phones. Poster = lit bulb frame (AVIF/WebP < 80 KB).
Flat rgba(0,0,0,0.45) overlay. No gradient.
Text flies in at hero.video.revealAt (as the bulb starts shrinking) and lands as it settles:
headline lines rise out of a mask with a slight tilt, subline and CTAs fade up 24px, the highlight
word flickers on like neon. Show text at once if: the video hasn't started within 1.5s,
Save-Data is on, or prefers-reduced-motion (which also jumps straight to the last frame).

## Motion spec
1. Line reveal: translateY 40% -> 0, opacity 0 -> 1, 0.9s, 120ms stagger, cubic-bezier(.2,.7,.1,1).
2. Client marquee: 38s linear loop, pause on hover.
3. Result numbers count up once at 50% in view.
4. Work cards: media scale 1 -> 1.04 on hover; desktop plays a 6s muted clip on hover.
5. Section content fades up 24px on enter.
6. Lenis smooth scroll, no scroll-jacking, anchor links work. Kill ScrollTriggers on route change.

## Performance budget
LCP < 2.5s (mid-range Android, 4G) · CLS < 0.05 · homepage JS < 150 KB gzipped
Hero first segment < 3 MB · images via next/image, AVIF/WebP, lazy below the fold.

## Analytics events
contact_submit, whatsapp_click, credentials_download, case_study_view

## Routes
/ · /work/winners · /work/niche · /work/linkedin · /privacy · /credentials.pdf