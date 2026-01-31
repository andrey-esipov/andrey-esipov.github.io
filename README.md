# Andrey Esipov — Personal Website

A stunning, animated personal portfolio website featuring 3D particle effects, smooth scroll animations, and interactive elements.

## Features

- **3D Particle Hero** — Immersive WebGL particle system using Three.js with floating geometric shapes
- **Smooth Animations** — GSAP-powered scroll-triggered animations with text reveals and card effects
- **Custom Cursor** — Interactive cursor with magnetic effects on buttons
- **Responsive Design** — Fully responsive across all devices with mobile menu
- **Modern Aesthetics** — Dark theme with accent colors, noise texture overlay, and elegant typography

## Tech Stack

- **Three.js** — 3D graphics and particle system
- **GSAP + ScrollTrigger** — Smooth animations and scroll effects
- **Vanilla JavaScript** — No framework dependencies
- **CSS Custom Properties** — Easy theming and consistency
- **Google Fonts** — Space Grotesk + Inter

## Structure

```
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles with CSS variables
├── js/
│   └── main.js         # All JavaScript (cursor, particles, animations)
└── README.md
```

## Local Development

Simply open `index.html` in a modern browser. No build step required.

For best results, serve via a local server:
```bash
npx serve .
```

## Deployment

This site is designed for GitHub Pages. Push to the `main` branch and enable GitHub Pages in repository settings.

## Customization

Edit the CSS variables in `style.css` to change colors:
```css
:root {
    --color-bg: #0a0a0f;
    --color-accent: #6366f1;
    /* ... */
}
```

## Credits

Built with inspiration from award-winning portfolios. Uses CDN-hosted libraries (Three.js, GSAP) for easy deployment.
