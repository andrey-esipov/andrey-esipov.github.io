import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        sage: 'rgb(var(--sage) / <alpha-value>)',
        sky: 'rgb(var(--sky) / <alpha-value>)',
        blush: 'rgb(var(--blush) / <alpha-value>)',
        butter: 'rgb(var(--butter) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
      },
      borderRadius: {
        card: '28px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--shadow-rgb) / 0.04), 0 8px 24px rgb(var(--shadow-rgb) / 0.06)',
        'card-hover': '0 2px 4px rgb(var(--shadow-rgb) / 0.05), 0 14px 32px rgb(var(--shadow-rgb) / 0.10)',
        pill: '0 1px 2px rgb(var(--shadow-rgb) / 0.06)',
      },
      letterSpacing: {
        'tight-display': '-0.02em',
        'tight-card': '-0.01em',
        eyebrow: '0.08em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.2, .7, .3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
