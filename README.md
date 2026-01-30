# Andrey Esipov — 3D World

Production-ready Three.js world with smooth navigation and UI overlays.

## Structure
- `index.html` – main page
- `css/styles.css` – styling
- `js/` – modular JS (world, locations, navigation, ui, main)
- `tests/test.html` – simple Three.js load test

## How to run
Open `tests/test.html` first to verify Three.js loads (rotating cube and “✓ Three.js working”).
Then open `index.html` for the full experience.

## Notes
- Uses UMD builds of Three.js and GSAP via CDN (no ES module imports).
- Includes WebGL fallback message and console logging.
