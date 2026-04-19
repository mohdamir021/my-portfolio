# 🖥️ Portfolio – Claude Code Instructions

> A terminal-flavored, Catppuccin Mocha (Teal accent) personal portfolio built with SvelteKit.
> All content is data-driven and editable via JSON files under `src/content/`.

---

## 🎯 Project Overview

Build a **SvelteKit** personal portfolio website with:

- A **terminal / hacker aesthetic** — think dark background, monospace fonts, glowing teal borders, scanline overlays, blinking cursors, bracket-style labels, and bold typographic hierarchy.
- **Catppuccin Mocha** palette, with **Teal** (`#94e2d5`) as the primary accent.
- Smooth scroll, entrance animations, and page transitions.
- A persistent **sidebar** (desktop) / **topbar** (mobile) layout.
- **All content stored in `src/content/*.json`** so it's trivially editable without touching components.
- Ready-to-deploy output (SSG via `@sveltejs/adapter-static` or SSR via `adapter-node`).

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Framework | SvelteKit (latest) |
| Styling | Tailwind CSS v4 + custom CSS vars |
| Animations | `svelte/transition`, `svelte/animate`, CSS keyframes |
| Icons | `lucide-svelte` |
| Fonts | `JetBrains Mono` (body/mono), `Space Mono` (headings/display) — via Google Fonts or self-hosted |
| Adapter | `@sveltejs/adapter-static` (default) |
| Content | Plain JSON in `src/content/` |

---

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── content/                  # ✏️ All editable content lives here
│   │   ├── meta.json             # Site title, name, tagline, social links
│   │   ├── hero.json             # Hero section — headline, subtitle, CTA
│   │   ├── about.json            # About Me — bio, fun facts, avatar path
│   │   ├── skills.json           # What I Do — skill groups with icons & descriptions
│   │   ├── projects.json         # Projects — title, description, stack, links, image
│   │   └── contact.json          # Contact — email, form toggle, social links
│   ├── lib/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.svelte
│   │   │   │   ├── Topbar.svelte
│   │   │   │   └── Footer.svelte
│   │   │   ├── sections/
│   │   │   │   ├── Hero.svelte
│   │   │   │   ├── About.svelte
│   │   │   │   ├── Skills.svelte
│   │   │   │   ├── Projects.svelte
│   │   │   │   └── Contact.svelte
│   │   │   └── ui/
│   │   │       ├── TerminalBlock.svelte   # Reusable terminal-window wrapper
│   │   │       ├── SectionLabel.svelte    # e.g. [ 01 // ABOUT ]
│   │   │       ├── ProjectCard.svelte
│   │   │       ├── SkillCard.svelte
│   │   │       └── BlinkCursor.svelte
│   │   └── utils/
│   │       └── scroll.ts         # Smooth scroll helper
│   ├── routes/
│   │   ├── +layout.svelte        # Root layout: sidebar + topbar + slot
│   │   ├── +layout.ts            # Load all content JSON once here
│   │   └── +page.svelte          # Single-page: renders all sections in order
│   └── app.css                   # Global styles, CSS vars, font imports
├── static/
│   ├── fonts/                    # Self-hosted fonts (optional)
│   ├── images/                   # Project screenshots, avatar
│   └── favicon.svg
├── svelte.config.js
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## 🎨 Design System

### Color Palette — Catppuccin Mocha + Teal

Define all colors as CSS custom properties in `app.css`:

```css
:root {
  /* Catppuccin Mocha Base */
  --crust:    #11111b;
  --mantle:   #181825;
  --base:     #1e1e2e;
  --surface0: #313244;
  --surface1: #45475a;
  --surface2: #585b70;
  --overlay0: #6c7086;
  --overlay1: #7f849c;
  --subtext0: #a6adc8;
  --subtext1: #bac2de;
  --text:     #cdd6f4;

  /* Accents */
  --teal:     #94e2d5;   /* PRIMARY accent */
  --green:    #a6e3a1;
  --blue:     #89b4fa;
  --mauve:    #cba6f7;
  --red:      #f38ba8;
  --yellow:   #f9e2af;
  --peach:    #fab387;

  /* Terminal specifics */
  --glow-teal: 0 0 8px #94e2d580, 0 0 20px #94e2d530;
  --border:   1px solid var(--surface1);
  --border-accent: 1px solid var(--teal);
  --radius:   4px;
}
```

### Typography

```css
--font-mono: 'JetBrains Mono', 'Space Mono', monospace;
--font-display: 'Space Mono', monospace;
```

- Headings: `Space Mono`, bold, uppercase with letter-spacing
- Body: `JetBrains Mono`, regular
- Labels/tags: monospace, teal, with `[ ]` bracket notation

### Terminal Aesthetic Rules

- **Borders**: thin 1px borders, teal glow on hover/focus
- **Section labels**: styled like `[ 01 // SECTION_NAME ]` in teal monospace
- **Prompt decoration**: `>_` or `~/section $` prefix on headings
- **Backgrounds**: layered — `--base` body, `--mantle` cards, `--crust` sidebar
- **Scanlines**: subtle repeating-linear-gradient overlay on hero (CSS only, low opacity)
- **Glow effects**: `text-shadow` and `box-shadow` using `--glow-teal` on key elements
- **Cursor blink**: animated `|` or `█` character in headings where appropriate
- **Grid lines**: faint grid background on hero using CSS `background-image`

---

## 📐 Layout

### Sidebar (desktop ≥ 1024px)

- Fixed, left side, `240px` wide
- Dark background (`--crust`)
- Contains: avatar/logo, nav links (anchor scroll), social icons at bottom
- Active section highlighted with teal left border + glow
- Nav items styled like terminal commands: `$ about`, `$ projects`

### Topbar (mobile < 1024px)

- Sticky top bar, full width
- Site name left, hamburger right
- Slide-down mobile menu with same nav links
- Collapses on nav click

### Main content

- `margin-left: 240px` on desktop, full-width on mobile
- Sections are full-width with generous padding
- Each section has a visible anchor `id` for scroll navigation

---

## 📄 Sections

### 1. Hero (`src/content/hero.json`)

```json
{
  "greeting": "Hello, World.",
  "name": "Amir",
  "title": "Full Stack Developer",
  "subtitle": "I build things for the web — clean, fast, and intentional.",
  "cta": { "label": "View my work", "href": "#projects" },
  "cta_secondary": { "label": "Get in touch", "href": "#contact" },
  "prompt": "~/portfolio $"
}
```

**Visual treatment:**
- Full viewport height
- Animated text: `greeting` types out character by character (typewriter effect)
- `name` is large, bold, teal glow
- Faint scanline + grid CSS overlay on background
- Blinking cursor after the subtitle
- Scroll indicator arrow at bottom

### 2. About (`src/content/about.json`)

```json
{
  "bio": [
    "Web developer based in Malaysia, currently building white-label SaaS at Heyjom.",
    "I enjoy clean architecture, thoughtful UIs, and the occasional homelab rabbit hole."
  ],
  "fun_facts": [
    "2A yo-yo practitioner 🪀",
    "Three cats: Moeza, Mochi, Neo 🐱",
    "Runs Debian on everything 🐧",
    "Currently watching: Monster 🎴"
  ],
  "avatar": "/images/avatar.jpg",
  "resume": "/resume.pdf"
}
```

**Visual treatment:**
- Two-column: left = terminal-window bio block, right = avatar with teal border frame
- Fun facts listed as `// comment` style lines
- Subtle entrance animation (slide up + fade)

### 3. Skills / What I Do (`src/content/skills.json`)

```json
{
  "intro": "Here's what I work with — the tools, stacks, and things I actually care about.",
  "groups": [
    {
      "label": "Frontend",
      "icon": "monitor",
      "items": ["Next.js", "SvelteKit", "TypeScript", "Tailwind CSS", "React"]
    },
    {
      "label": "Backend",
      "icon": "server",
      "items": ["Laravel", "Node.js", "Express", "REST APIs", "MySQL / MariaDB"]
    },
    {
      "label": "DevOps & Tools",
      "icon": "terminal",
      "items": ["Debian Linux", "nginx", "Tailscale", "Docker (basics)", "Git"]
    },
    {
      "label": "Currently Exploring",
      "icon": "cpu",
      "items": ["AI/LLM integration", "Socket.io", "TTS / Voice synthesis", "Homelab infra"]
    }
  ]
}
```

**Visual treatment:**
- Grid of **SkillCard** components — dark card (`--mantle`), teal border on hover, icon + label + skill tags
- Tags styled like `<badge>` with `--surface1` bg and `--teal` text
- Cards stagger-animate in on scroll (IntersectionObserver)

### 4. Projects (`src/content/projects.json`)

```json
{
  "projects": [
    {
      "id": "heyjom",
      "title": "Heyjom Platform",
      "description": "White-label SaaS platform with multi-tenant architecture, OAuth branding, and custom domain routing.",
      "stack": ["Next.js", "Laravel", "TypeScript", "MySQL"],
      "links": { "github": null, "live": "https://heyjom.com" },
      "image": "/images/projects/heyjom.png",
      "featured": true,
      "status": "live"
    }
  ]
}
```

**Visual treatment:**
- Masonry or 2-col grid of **ProjectCard** components
- Card: image top, dark overlay on hover revealing description
- Stack badges, status indicator (`● live` in green, `● wip` in yellow)
- "Featured" projects get a wider card with teal left border accent
- Hover: card lifts with `box-shadow` glow

### 5. Contact (`src/content/contact.json`)

```json
{
  "heading": "Let's connect.",
  "subtext": "Whether it's a project, a question, or just a chat — reach out.",
  "email": "amir@example.com",
  "show_form": true,
  "socials": [
    { "label": "GitHub", "icon": "github", "url": "https://github.com/yourhandle" },
    { "label": "LinkedIn", "icon": "linkedin", "url": "https://linkedin.com/in/yourhandle" }
  ]
}
```

**Visual treatment:**
- Terminal-style contact form: labels as `$ input:`, inputs with teal border focus
- Social links as icon buttons with glow on hover
- On submit: terminal-output success message animation

### 6. Footer

```json
// part of meta.json
{
  "footer": {
    "copyright": "© 2025 Amir. All rights reserved.",
    "note": "Built with SvelteKit + ☕"
  }
}
```

**Visual treatment:**
- Minimal, `--mantle` bg
- Centered text, subtext color
- Optional: tiny ASCII art divider above footer

---

## ✨ Animations & Interactions

| Effect | Implementation |
|---|---|
| Typewriter on Hero | `setInterval` character append, `onMount` in Svelte |
| Blinking cursor | CSS `@keyframes blink` on a `::after` pseudo or `<BlinkCursor />` |
| Section entrance | `IntersectionObserver` → toggle `visible` class → CSS transition |
| Smooth scroll | `scroll-behavior: smooth` on `html` + JS helper for offset (sidebar width) |
| Card hover glow | CSS `transition` + `box-shadow: var(--glow-teal)` |
| Page load | `+layout.svelte` wraps content in a Svelte `fade` transition |
| Stagger cards | `animation-delay: calc(var(--i) * 80ms)` via CSS custom property set inline |

---

## 🔧 Init Commands

```bash
# Scaffold
npm create svelte@latest my-portfolio
# Choose: Skeleton project, TypeScript, ESLint + Prettier

cd my-portfolio
npm install

# Dependencies
npm install -D tailwindcss @tailwindcss/vite
npm install lucide-svelte

# Dev
npm run dev
```

**`svelte.config.js`** — use static adapter:
```js
import adapter from '@sveltejs/adapter-static';
export default {
  kit: { adapter: adapter({ fallback: '404.html' }) }
};
```

**`vite.config.ts`** — add Tailwind plugin:
```ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
export default { plugins: [tailwindcss(), sveltekit()] };
```

---

## 📦 Content Loading Pattern

In `+layout.ts`, load all JSON once and pass down via `$page.data`:

```ts
// src/routes/+layout.ts
import meta from '$lib/content/meta.json';
import hero from '$lib/content/hero.json';
import about from '$lib/content/about.json';
import skills from '$lib/content/skills.json';
import projects from '$lib/content/projects.json';
import contact from '$lib/content/contact.json';

export const load = () => ({ meta, hero, about, skills, projects, contact });
```

Then in each section component:
```svelte
<script>
  import { page } from '$app/stores';
  $: data = $page.data.hero; // or .about, .skills, etc.
</script>
```

---

## ✅ Checklist Before Deploying

- [ ] Replace placeholder content in all `src/content/*.json`
- [ ] Add real avatar to `static/images/avatar.jpg`
- [ ] Add project screenshots to `static/images/projects/`
- [ ] Update social links in `meta.json` and `contact.json`
- [ ] Add real resume PDF to `static/resume.pdf` (or remove the link)
- [ ] Set correct site URL in `svelte.config.js` if using `paths.base`
- [ ] Run `npm run build` and test `npm run preview`
- [ ] Check mobile responsiveness (sidebar → topbar transition)
- [ ] Verify all anchor scroll links work with sidebar offset

---

## 🧭 Reference

- **Color reference**: [Catppuccin Mocha](https://catppuccin.com/palette)
- **Icon library**: [Lucide Icons](https://lucide.dev)
- **Fonts**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), [Space Mono](https://fonts.google.com/specimen/Space+Mono)
- **SvelteKit docs**: [kit.svelte.dev](https://kit.svelte.dev)

---

> _"A lone light on a mountain peak. Build something worth the climb."_
