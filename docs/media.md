# Media manifest

Every media slot on the site, with the file name and location the code expects.
Drop files at these exact paths; videos go on the CDN and their URLs are listed in a reply.

Rules
- Lowercase, hyphens, no spaces: `public/media/<page>/<slot>.<ext>`.
- Images: AVIF or WebP preferred; JPG/PNG are fine at the sizes below — next/image serves
  AVIF/WebP automatically. Give at least the pixel size listed (that's 2x the display size).
- Keep the subject centred: some frames crop differently on phones (noted below).
- Video posters are the first frame (or best frame) of that video, same aspect ratio.
- Videos: H.264 MP4 is required; a WebM (VP9/AV1) next to it is optional and smaller.
  Muted (no audio track), loops cleanly.
- Real client media only. No AI-generated imagery for client products or results (CLAUDE.md).

## Homepage

| Slot | File / URL | Aspect | Min size | Notes |
|---|---|---|---|---|
| Hero poster | `public/media/hero/poster.avif` (or `.webp`) | 16:9 | 1920×1080 | **< 80 KB**. The lit-bulb frame. Phones crop to a centred 9:16 |
| Hero video, desktop | CDN: 16:9 MP4 (+ WebM) | 16:9 | 1920×1080 | First segment < 3 MB. Headline reveals at 0:05 |
| Hero video, phones | CDN: 9:16 MP4 (+ WebM) | 9:16 | 1080×1920 | Same cut, reframed |
| Winners card | `public/media/work/winners-card.jpg` | 2:1 | 2400×1200 | Phones crop to a centred 4:3 |
| Winners hover clip | CDN: MP4 (+ WebM) | 2:1 | 1600×800 | 6 s loop, plays on desktop hover |
| Niche card | `public/media/work/niche-card.jpg` | 4:5 | 1200×1500 | |
| LinkedIn card | `public/media/work/linkedin-card.jpg` | 4:5 | 1200×1500 | Collage of post analytics |
| Agency OS demo poster | `public/media/agency-os/demo-poster.webp` | 16:10 | 1600×1000 | |
| Agency OS demo video | CDN: MP4 (+ WebM) | 16:10 | 1600×1000 | Screen recording, muted loop |
| Credentials PDF | `public/credentials.pdf` | | | Linked from the contact section |

## /work/winners

| Slot | File / URL | Aspect | Min size |
|---|---|---|---|
| Hero clip poster | `public/media/work/winners/hero-poster.jpg` | 16:7 (phones crop to 4:3) | 2400×1050 |
| Hero clip | CDN: MP4 (+ WebM) | 16:7 | 1920×840 |
| TikTok reel 1 | `public/media/work/winners/reel-1.jpg` | 9:16 | 1080×1920 |
| Recipe video | `public/media/work/winners/recipe.jpg` | 9:16 | 1080×1920 |
| Sales promo poster | `public/media/work/winners/promo-poster.jpg` | 9:16 | 1080×1920 |
| Employee feature | `public/media/work/winners/employee-feature.jpg` | 9:16 | 1080×1920 |
| Carousel spread | `public/media/work/winners/carousel.jpg` | 4:3 | 1600×1200 |
| Analytics screenshot | `public/media/work/winners/analytics.png` | 4:3 | 1600×1200 |

## /work/niche

| Slot | File / URL | Aspect | Min size |
|---|---|---|---|
| Hero clip poster | `public/media/work/niche/hero-poster.jpg` | 16:7 (phones crop to 4:3) | 2400×1050 |
| Hero clip | CDN: MP4 (+ WebM) | 16:7 | 1920×840 |
| Influencer reel | `public/media/work/niche/influencer-reel.jpg` | 9:16 | 1080×1920 |
| Behind the chair | `public/media/work/niche/behind-the-chair.jpg` | 9:16 | 1080×1920 |
| Campaign poster | `public/media/work/niche/campaign-poster.jpg` | 9:16 | 1080×1920 |
| Spa experience | `public/media/work/niche/spa.jpg` | 9:16 | 1080×1920 |
| Ad creative | `public/media/work/niche/ad-creative.jpg` | 4:3 | 1600×1200 |
| Analytics screenshot | `public/media/work/niche/analytics.png` | 4:3 | 1600×1200 |

## /work/linkedin

| Slot | File | Aspect | Min size |
|---|---|---|---|
| Founder profile screenshot | `public/media/work/linkedin/founder-profile.png` | 4:3 | 1600×1200 |
| Post analytics 1–4 | `public/media/work/linkedin/analytics-1.png` … `analytics-4.png` | 4:5 | 1080×1350 |

Screenshots (analytics, profile) as PNG keep text crisp; photos as JPG/AVIF/WebP.
The extension can differ from the table: tell me if `reel-1.webp` is what you have.

## Alt text

Each image and video needs a one-line description of what it shows, e.g.
"Winners Dairy TikTok reel: a chef pours yoghurt over granola". Send them with the files,
or I'll draft them from the files for you to approve.

## Content brief per slot (inspo branch)

Branch `feat/inspo` fills every slot with an AI-generated reference image, labelled
"INSPO · NOT CLIENT MEDIA" with the file it stands in for. It shows the kind of shot each
slot needs. **Never merge it**: CLAUDE.md forbids AI imagery for client work. To swap one,
overwrite the file at the same path with the real photo (same aspect ratio), then update
`width`/`height` and the `alt` text in the content file.

| File | What it should show |
|---|---|
| `work/winners-card.jpg` | Behind-the-scenes from a Winners shoot: real staff with real product, ideally the OKI crew filming in frame. People centred (phones crop the sides) |
| `work/linkedin-card.jpg` | 4–6 real LinkedIn post-analytics screenshots arranged on flat orange, names blurred |
| `agency-os/demo-poster.webp` | A clean frame from the Agency OS screen recording: calendar plus a post awaiting approval |
| `work/winners/hero-poster.jpg` | Wide, cinematic still: the farm, the plant or the shoot. Keep the subject in the middle third |
| `work/winners/reel-1.jpg` | Frame from a top TikTok: a face plus product, with the on-screen caption visible |
| `work/winners/recipe.jpg` | Frame from a recipe video, overhead, product being used |
| `work/winners/promo-poster.jpg` | A real sales-promo post: products, prices, where to buy |
| `work/winners/employee-feature.jpg` | An employee-feature post: portrait at work plus name/role caption |
| `work/winners/carousel.jpg` | 3 slides of one carousel laid side by side on a plain background |
| `work/winners/analytics.png` | Meta Business Suite insights: reach over the engagement, follower growth. Page name visible or blurred, as the client prefers |
| `work/niche/hero-poster.jpg` | Wide still of the Niche space or a cut in progress, warm light |
| `work/niche/influencer-reel.jpg` | Frame from the influencer's reel at Niche, caption visible (needs her sign-off) |
| `work/niche/behind-the-chair.jpg` | Close-up of a barber at work: clippers, the fade, the mirror |
| `work/niche/campaign-poster.jpg` | The campaign's key poster (the Mother's Day one would fit here) |
| `work/niche/spa.jpg` | Sauna, steam room or treatment room, a client relaxing |
| `work/niche/ad-creative.jpg` | The best-performing ad, shown as it appeared in the feed (phone screenshot) |
| `work/niche/analytics.png` | Ads Manager results for the campaign: results, reach, cost per result in KES |
| `work/linkedin/founder-profile.png` | Desktop screenshot of the founder's profile: banner, headline, About, Featured |
| `work/linkedin/analytics-1…4.png` | Phone screenshots: impressions/reach, audience demographics, 12-month growth, a top post with its engagement. Client names and photos blurred |
