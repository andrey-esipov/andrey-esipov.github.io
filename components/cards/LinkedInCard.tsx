'use client'

/**
 * Small wide rectangle — dark navy with the LinkedIn glyph centered.
 * Click anywhere navigates to the LinkedIn profile.
 */
export function LinkedInCard() {
  return (
    <a
      href="https://www.linkedin.com/in/andrey-esipov/"
      target="_blank"
      rel="noopener noreferrer"
      data-category="about"
      aria-label="Andrey on LinkedIn"
      className="group relative flex h-full items-center justify-center overflow-hidden rounded-card border border-[#0E1B2D]/40 shadow-card transition-[transform,box-shadow,filter] duration-[260ms] ease-smooth hover:-translate-y-0.5 hover:shadow-card-hover hover:brightness-110"
      style={{
        background:
          'radial-gradient(140% 100% at 30% 0%, #1B335A 0%, #0A1628 60%, #060E1A 100%)',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-12 w-12 text-white transition-transform duration-300 ease-smooth group-hover:scale-105"
        fill="currentColor"
      >
        <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.76c1.4-2.59 7-2.78 7 2.48V19z" />
      </svg>
    </a>
  )
}
