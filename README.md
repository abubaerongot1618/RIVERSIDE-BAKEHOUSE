# Riverside Bakehouse Website

A responsive, static website for Riverside Bakehouse, a neighbourhood bakery in Johannesburg, South Africa. The site covers the bakery's story and team, a searchable menu, customer enquiries, contact details with a map, and an online order form.

The site is built with plain HTML5, one shared CSS stylesheet, and small JavaScript files for interactivity. There is no build step, framework, or back end.

**Live site:** https://abubaerongot1618.github.io/RIVERSIDE-BAKEHOUSE/index.html

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage with a hero banner, a preview of four featured products, and a photo gallery with a lightbox. |
| `products.html` | Full menu with search, category filters, sorting by name or price, and a clear-filters button. Menu data is loaded from `js/products-data.js`. |
| `about.html` | Bakery story, mission and vision, team members, and an FAQ accordion. |
| `contact.html` | Address, opening hours, phone numbers, email, a Leaflet map, and a contact form. |
| `enquiry.html` | Enquiry form for catering, venue hire, and made-to-order items. |
| `order.html` | Online order form with item quantities, a live order summary, customer details, and a choice of payment method. |

Every page shares the same header navigation and footer.

---

## Project Structure

```
riverside-bakehouse/
├── index.html
├── products.html
├── about.html
├── contact.html
├── enquiry.html
├── order.html
├── style.css              Single stylesheet linked by every page
├── favicon.svg            Site icon
├── sitemap.xml            Sitemap for search engines
├── robots.txt             Crawler rules and sitemap location
├── js/                    Page scripts (see "Required files" below)
│   ├── gallery.js
│   ├── accordion.js
│   ├── products-data.js
│   ├── products.js
│   ├── map.js
│   ├── contact.js
│   ├── enquiry.js
│   └── order.js
├── images/                Photos in several widths (see "Images" below)
└── README.md
```

---

## Getting Started

No installation is needed.

1. Download or clone the project folder and keep the structure above intact. Paths are relative, so the files must stay in the same folders.
2. Open `index.html` in a browser, or serve the folder with any static file server. For example, from the project folder run `python -m http.server 8000` and visit `http://localhost:8000`.
3. Test forms and scripts through a local server rather than by opening files directly, so that everything loads as it will on the live site.

### Required files

The HTML references the following files, which must be present for the site to work fully. They were not included in the upload used to write this README:

- The `js/` folder with the eight scripts listed in the structure above.
- The `images/` folder. Each photo is used in several widths, named `<name>-<width>w.jpg`:
  - `hero-bakery-480w.jpg`, `hero-bakery-800w.jpg`, `hero-bakery-1200w.jpg`
  - `baguette`, `croissants`, `espresso`, `milkshakes`, `baker1`, each with `-300w`, `-600w`, and `-900w` variants
  - `item-*.jpg` photos used by the menu on `products.html`

The site uses Google Fonts (Playfair Display for headings and Lato for body text) and Leaflet 1.9.4 from unpkg for the contact map. Both load from the internet, so an internet connection is needed for the correct fonts and map.

---

## Design

### Colour palette and typography

Colours and spacing are defined once as CSS custom properties in the `:root` block of `style.css`. Changing a value there updates the whole site.

| Variable | Colour | Used for |
|----------|--------|----------|
| `--color-cream` | `#FBF6EF` | Page background |
| `--color-brown-deep` | `#5C3A21` | Header, footer, headings |
| `--color-terracotta` | `#B5652D` | Accents, buttons, hover states |
| `--color-text` | `#2E2117` | Body text |
| `--color-tan` | `#E8D9C3` | Borders and soft highlights |
| `--color-white` | `#FFFFFF` | Cards and form panels |

Headings use Playfair Display, and body text uses Lato.

### Stylesheet structure

`style.css` is organised into numbered sections: reset, base styles and variables, typography, layout (header, hero, main), components (product grid, menu, team, forms, footer), order page styles, and responsive breakpoints.

### Responsive behaviour

| Breakpoint | Changes |
|------------|---------|
| Desktop (1200px and up) | Product grid shows four columns. Wider main container. |
| Tablet (768px and below) | Product grid shows two columns. Team section switches to one column. Smaller navigation text. |
| Mobile (480px and below) | Navigation stacks vertically. Product grid and menu grid collapse to one or two columns. Hero image is shorter. Order rows reflow into a compact layout. |

Images use `srcset` and `sizes`, so browsers download the smallest file that suits the screen. Animations and transitions are disabled for users who have set reduced motion in their operating system.

---

## Features

- **Menu search and filters** on `products.html`, with sorting by name or price and a live item count.
- **Photo gallery** on `index.html` that opens images in a lightbox.
- **FAQ accordion** on `about.html`.
- **Interactive map** on `contact.html`.
- **Order form** on `order.html` with per-item quantities, a live summary and total, and an empty-order warning.
- **Client-side validation** on the enquiry, contact, and order forms, with inline error messages.
- **Search engine metadata** on every page: titles, descriptions, keywords, Open Graph tags, a `sitemap.xml`, and a `robots.txt` file. Schema.org business data is included on `contact.html`.
- **Accessibility**: semantic HTML5 elements, labels linked to inputs, `aria-live` regions for messages and errors, visible focus styles, and keyboard support for the navigation and accordion.

---

## Search Engine Files

Two files at the root of the site tell search engines what to index.

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://abubaerongot1618.github.io/RIVERSIDE-BAKEHOUSE/sitemap.xml
```

- `User-agent: *` applies the rules to all search engine crawlers.
- `Allow: /` lets crawlers index the whole site. No pages are hidden, because every page is public.
- `Sitemap:` tells crawlers where to find the sitemap. It must be a full URL.

### sitemap.xml

`sitemap.xml` lists the six public HTML pages, each with a last-modified date (`lastmod`). It does not list CSS, JavaScript, or image files.

| Page | URL |
|------|-----|
| Home | `https://abubaerongot1618.github.io/RIVERSIDE-BAKEHOUSE/index.html` |
| Menu | `https://abubaerongot1618.github.io/RIVERSIDE-BAKEHOUSE/products.html` |
| About | `https://abubaerongot1618.github.io/RIVERSIDE-BAKEHOUSE/about.html` |
| Contact | `https://abubaerongot1618.github.io/RIVERSIDE-BAKEHOUSE/contact.html` |
| Enquiry | `https://abubaerongot1618.github.io/RIVERSIDE-BAKEHOUSE/enquiry.html` |
| Order | `https://abubaerongot1618.github.io/RIVERSIDE-BAKEHOUSE/order.html` |

The addresses include the repository name, `RIVERSIDE-BAKEHOUSE`, because the site is hosted on GitHub Pages at a project path. The name must keep its capitalisation. If the site moves to a custom domain, update every address in both files.

After each change to a page, update its `lastmod` date in `sitemap.xml`.

---

## Configuration Before Going Live

Some values in the project should be checked before deployment:

- **`robots.txt` and `sitemap.xml`** are set to the GitHub Pages address above. If the repository or site address changes, update both files to match.
- **Open Graph images.** The `og:image` tags use a relative path (`images/hero-bakery-1200w.jpg`). Social media previews usually need a full URL, so change these to `https://abubaerongot1618.github.io/RIVERSIDE-BAKEHOUSE/images/hero-bakery-1200w.jpg`.
- **`order.html`** shows placeholder bank details in the EFT section. Replace these with the real account details, or remove the section.
- **Forms** use `action="#"` and do not submit anywhere yet. Connect each form to a form-handling service or a back end before launch.
- **Contact details** appear in several places (`contact.html`, its schema data, and the footer). Keep them consistent.

---

## Known Issues

- **`order.html` collects card details in the page.** The payment section includes card name, number, expiry, and CVV fields, but its note says card details are not taken online. Remove these fields, or make sure they are never sent anywhere insecure. Card data should not be collected through a plain HTML form.
- **`order.html` EFT section has broken markup.** Inside the bank transfer block, a `<p>` tag is not closed, and several lines use `>` where `<br>` or `</strong>` should be. Bank details may display incorrectly. Fix the markup in that block.
- **Contact map was blank on desktop (fixed).** Leaflet needs its `#map` container to have a height. The stylesheet previously set one only for tablet and mobile widths, so on desktop the map collapsed to zero height. `style.css` now sets a base height of 400px for `#map`. If the map is still blank after deployment, check that the Leaflet CSS and JavaScript from unpkg.com load (the browser console will show a failed request), and that `js/map.js` initialises the map on an element with `id="map"`.
- **`contact.html` loads `style.css` twice (fixed).** The duplicate `<link>` tag has been removed.
- **`contact.html` schema data uses `"@Context"`.** The key should be lowercase `"@context"` for the structured data to be read reliably.
- **Phone number formatting** differs between pages. The schema uses `+27632198701`, while the visible text shows `0632198701`. Both formats are correct, but use the same number throughout.
- **`products.html` is data-driven.** Menu items are generated by JavaScript from `products-data.js`, so the page shows nothing if JavaScript is disabled.

---

## Browser Support

The site is written for current versions of Chrome, Edge, Firefox, Safari, and their mobile equivalents. Some styling uses `:has()` for the payment options, which requires a recent browser.

---

## Credits

- Photography sourced from free, licensed stock sites (Unsplash and Pexels).
- Fonts from Google Fonts. Map by Leaflet and OpenStreetMap contributors.
- Staff names on the About page are fictional.

---

---

## Changelog

### 2026-11-01

- **Added `robots.txt` and `sitemap.xml`** with the live GitHub Pages address. The sitemap lists the six public pages with a last-modified date, and `robots.txt` points crawlers to it. Replaced the `YOUR-SITE-URL` placeholders.
- **Updated the README** with the live site address, a Search Engine Files section, and a corrected configuration list.
- **Fixed the contact map not displaying.** Added a base height and width for `#map` in `style.css`. Leaflet collapsed the map to zero height on desktop screens because the height was only set in the tablet and mobile breakpoints.
- **Corrected page titles.** The homepage title had a missing space before the separator. The contact page title was changed from "Contact-Info" to "Contact Us | Riverside Bakehouse Johannesburg". The enquiry page title had stray spaces and a misplaced symbol, which were removed.
- **Removed a duplicate stylesheet link** from `contact.html`.
- **Fixed the contact form.** The bakery email address was missing its `@`, so the email link could not open. The surname error ID did not match the HTML, and the message type dropdown had no error message element, which stopped the form from submitting when a field was empty. All three are fixed in `contact.js` and `contact.html`.
- **Fixed the enquiry confirmation.** The response messages were keyed to values that did not match the dropdown, so the "Venue" and "Made to Order" enquiries showed "undefined". The keys in `enquiry.js` now match the dropdown values.
- **Restored the README changelog and added this references section**, which had been left out of the earlier rewrite.

### 2026-09-15

- **Added the external stylesheet (`style.css`)** and linked it from all pages. The stylesheet is organised into numbered sections: reset, base styles and variables, typography, layout, components, and responsive breakpoints.
- **Established a base style system** using CSS custom properties (`:root` variables) for colours, fonts, and spacing, so the whole site can be themed from one place.
- **Applied typography styling.** Playfair Display is used for headings and Lato for body text. Line height, letter spacing, and a consistent type scale for h1 to h3 are set.
- **Implemented desktop layout with Flexbox and CSS Grid.** The navigation uses Flexbox, and the product listings and team section use Grid.
- **Applied visual styling** with a cream, deep brown, and terracotta palette, borders, box shadows on product cards, and hover and focus states on links, buttons, and menu items.
- **Implemented responsive design** with breakpoints at 768px and 480px. The navigation stacks on smaller screens, the product grid reduces from four columns to two and then one, and font sizes scale with relative units.
- **Added responsive images** (`srcset` and `sizes`) for the hero, baguette, croissant, espresso, milkshake, and head baker images. Each image has three resolution variants (300w, 600w, and 900w).
- **Replaced placeholder images** with properly licensed stock photos from Unsplash and Pexels.
- **Fixed a broken image path** in the hero section of `index.html`.
- **Replaced two staff names** in `about.html` that matched real public figures with fictional names.
- **Documented the file and folder structure** in response to Part 1 feedback on organisation.
- **Tested responsiveness** at desktop (1280px and above), tablet (768px), and mobile (480px and below) widths using the browser developer tools.

---

## References
-w3schools. *html,css,javascipt*
- Google Fonts. *Playfair Display* and *Lato* typefaces. https://fonts.google.com
- Leaflet. (2024). *Leaflet 1.9.4 documentation*. https://leafletjs.com
- OpenStreetMap contributors. *OpenStreetMap*. https://www.openstreetmap.org
- Unsplash. *Free photos*. https://unsplash.com
- Pexels. *Free stock photos*. https://www.pexels.com
- Mozilla Developer Network. *CSS reference and HTML elements reference*. https://developer.mozilla.org
- Schema.org. *Bakery type*. https://schema.org/Bakery

---

*Last updated: 2026-11-01*
