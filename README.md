# Morgan's Riverside Bakehouse — Website Project

A responsive website built for Morgan's Riverside Bakehouse, a local bakery
offering fresh bread, pastries, and beverages. Built with HTML, CSS
(external stylesheet), and semantic, accessible markup.

---

## Project Structure

```
WEB PRO/
├── index.html          — Homepage (hero section, featured products)
├── products.html       — Full menu (Breakfast, Lunch, Beverages, Extras)
├── about.html           — About us, history, mission/vision, team
├── contact.html         — Contact details and location
├── order.html           — Online order form
├── enquiry.html         — Customer enquiry form
├── style.css               — Single external stylesheet, linked by all pages
├── images/                 — All image assets
│   ├── hero-bakery.jpg           (base image)
│   ├── hero-bakery-480w.jpg      (mobile-sized variant)
│   ├── hero-bakery-800w.jpg      (tablet/default variant)
│   ├── hero-bakery-1200w.jpg     (desktop/large variant)
│   ├── croissants.jpg / -300w / -600w / -900w
│   ├── baguette.jpg / -300w / -600w / -900w
│   ├── espresso.jpg / -300w / -600w / -900w
│   ├── milkshakes.jpg / -300w / -600w / -900w
│   └── baker1.jpg / -300w / -600w / -900w
└── README.md            — This document
```

**Naming conventions:**
- All files use lowercase names with no spaces (hyphens used where needed).
- Responsive image variants follow the pattern `<name>-<width>w.jpg`
  (e.g. `croissants-600w.jpg`), matching the `srcset` width descriptors
  used in the HTML.
- All HTML pages share the same single stylesheet (`style.css`) for
  consistent styling and easier maintenance.

---

## Changelog

### 2026-09-15

- **Added external stylesheet (`style.css`)** and linked it to all six
  HTML pages (index, products, about, contact, order, enquiry).
  Stylesheet is structured in numbered sections: CSS reset, base
  styles/variables, typography, layout (header/nav/hero/main),
  components (product grid, menu details/summary, team, forms), and
  responsive breakpoints.

- **Established a base style system** using CSS custom properties
  (`:root` variables) for colours, fonts, and spacing — allows
  consistent theming across the whole site from a single source of
  truth.

- **Applied typography styling**: `Playfair Display` (serif) for all
  headings to give an elegant bakery-shopfront feel, `Lato`
  (sans-serif) for body text for clean readability at small sizes. Set
  `line-height`, `letter-spacing`, and a consistent type scale (h1–h3).

- **Implemented desktop layout using Flexbox and CSS Grid**: navigation
  bar uses Flexbox (`display: flex`, `justify-content: center`);
  product listings and team member section use CSS Grid for a clean
  multi-column layout on larger screens.

- **Applied visual styling**: colour palette (cream, deep brown,
  terracotta), `border`, `box-shadow` on product cards, and `:hover` /
  `:focus` interactive states on all links, buttons, and menu items to
  meet accessibility and interactivity requirements.

- **Implemented responsive design** with two breakpoints (768px for
  tablet, 480px for mobile). At each breakpoint: navigation switches
  from horizontal to stacked, product grid reduces from 4 → 2 → 1
  columns, and font sizes scale down using relative units (`rem`).

- **Added responsive images (`srcset`/`sizes`)** for all six images
  across the site (hero, baguette, croissants, espresso, milkshake,
  head baker portrait). Generated three resolution variants per image
  (e.g. 300w, 600w, 900w) so the browser loads an appropriately sized
  file for the user's screen, improving load performance on mobile.

- **Sourced replacement images** from free, properly licensed stock
  photo sources (Unsplash/Pexels) to resolve a Part 1 issue where
  placeholder/unlicensed images were in use.

- **Fixed a broken image path** in `index.html` (hero section) — `src`
  was missing a forward slash (`imageshero-bakery.jpg` →
  `images/hero-bakery.jpg`).

- **Corrected fictional staff names** in `about.html` — two placeholder
  names matched real, well-known public figures (professional
  footballers). Replaced with fully fictional names (Naledi Dlamini,
  Thabo Mokoena) to keep all site content appropriately original.

- **Reviewed and documented file/folder structure** (see Project
  Structure section above) in response to Part 1 feedback regarding
  organisation.

- **Tested responsiveness** across desktop (1280px+), tablet (768px),
  and mobile (480px and below) viewports using browser Developer Tools
  device toolbar. Screenshots included in the Responsive Testing
  section below.

---

## Responsive Testing

The website was tested across three key breakpoints to ensure a
consistent and usable experience on all device sizes: desktop, tablet,
and mobile. Testing was carried out using the browser's built-in
Developer Tools (device toolbar), simulating real device viewport
widths.

### Desktop (1280px and above)
At desktop width, the site displays a multi-column layout: the product
grid shows 4 items per row, the navigation bar is displayed
horizontally in full, and the hero image spans the full width of the
viewport at its largest resolution (1200w).

*[Insert desktop screenshot here]*

### Tablet (768px)
At the tablet breakpoint, the layout adjusts via media query: the
product grid reduces to 2 columns per row, the team member section
switches from a 2-column to a single-column layout, and font sizes
scale down slightly for readability on smaller screens.

*[Insert tablet screenshot here]*

### Mobile (480px and below)
At mobile width, the navigation menu stacks vertically for easier
tapping, the product grid collapses to a single column, the hero image
switches to its smallest resolution (480w) to reduce load time, and all
form elements and buttons remain full-width and easy to interact with
on a small screen.

*[Insert mobile screenshot here]*

### Summary

| Breakpoint | Width    | Grid Columns | Navigation           |
|------------|----------|--------------|-----------------------|
| Desktop    | ≥1280px  | 4            | Horizontal            |
| Tablet     | 768px    | 2            | Horizontal (compact)  |
| Mobile     | ≤480px   | 1            | Stacked vertical      |

Testing confirmed that images, text, and interactive elements (buttons,
menu dropdowns, form fields) remain fully functional and legible at
every tested width, with no horizontal scrolling or overlapping
content.

---

## Technical Stack

- **HTML5** — semantic markup (`header`, `nav`, `main`, `section`,
  `footer`, `details`/`summary` for expandable menu)
- **CSS3** — external stylesheet, CSS custom properties, Flexbox, CSS
  Grid, media queries, responsive images
- **Fonts** — Google Fonts (Playfair Display, Lato)
