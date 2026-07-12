/**
 * Fixed (not random) star-field positions, transcribed from the design
 * mockup (design-handoff/project/templates/homepage/Homepage.dc.html) so
 * server- and client-render output match — Math.random() at render time
 * would cause a hydration mismatch.
 */
export const STARS = [
  { top: 13, left: 7, size: 1, delay: 0.0, duration: 2.0 },
  { top: 50, left: 60, size: 2, delay: 0.17, duration: 2.13 },
  { top: 87, left: 13, size: 1, delay: 0.34, duration: 2.26 },
  { top: 24, left: 66, size: 2, delay: 0.51, duration: 2.39 },
  { top: 61, left: 19, size: 1, delay: 0.68, duration: 2.52 },
  { top: 98, left: 72, size: 2, delay: 0.85, duration: 2.65 },
  { top: 35, left: 25, size: 1, delay: 1.02, duration: 2.78 },
  { top: 72, left: 78, size: 2, delay: 1.19, duration: 2.91 },
  { top: 9, left: 31, size: 1, delay: 1.36, duration: 3.04 },
  { top: 46, left: 84, size: 2, delay: 1.53, duration: 3.17 },
  { top: 83, left: 37, size: 1, delay: 1.7, duration: 3.3 },
  { top: 20, left: 90, size: 2, delay: 1.87, duration: 3.43 },
  { top: 57, left: 43, size: 1, delay: 2.04, duration: 3.56 },
  { top: 94, left: 96, size: 2, delay: 2.21, duration: 3.69 },
  { top: 31, left: 49, size: 1, delay: 2.38, duration: 3.82 },
  { top: 68, left: 2, size: 2, delay: 2.55, duration: 3.95 },
  { top: 5, left: 55, size: 1, delay: 2.72, duration: 4.08 },
  { top: 42, left: 8, size: 2, delay: 2.89, duration: 4.21 },
  { top: 79, left: 61, size: 1, delay: 3.06, duration: 4.34 },
  { top: 16, left: 14, size: 2, delay: 3.23, duration: 4.47 },
  { top: 53, left: 67, size: 1, delay: 3.4, duration: 4.6 },
  { top: 90, left: 20, size: 2, delay: 3.57, duration: 4.73 },
  { top: 27, left: 73, size: 1, delay: 3.74, duration: 4.86 },
  { top: 64, left: 26, size: 2, delay: 3.91, duration: 4.99 },
  { top: 38, left: 32, size: 2, delay: 4.25, duration: 2.25 },
  { top: 75, left: 85, size: 1, delay: 4.42, duration: 2.38 },
  { top: 12, left: 38, size: 2, delay: 4.59, duration: 2.51 },
  { top: 49, left: 91, size: 1, delay: 4.76, duration: 2.64 },
  { top: 86, left: 44, size: 2, delay: 4.93, duration: 2.77 },
  { top: 23, left: 97, size: 1, delay: 0.1, duration: 2.9 },
] as const

export const STAR_GLOWS = [
  { top: 31, left: 11, delay: 0.0, duration: 4.0, color: '#a78bfa' },
  { top: 12, left: 78, delay: 0.41, duration: 4.3, color: '#60a5fa' },
  { top: 83, left: 55, delay: 0.82, duration: 4.6, color: '#ff7016' },
  { top: 64, left: 32, delay: 1.23, duration: 4.9, color: '#fff' },
  { top: 45, left: 9, delay: 1.64, duration: 5.2, color: '#fff' },
  { top: 26, left: 76, delay: 2.05, duration: 5.5, color: '#f9a8d4' },
] as const

export const SHOOTING_STARS = [
  { top: 12, left: 20, duration: 8, delay: 0 },
  { top: 28, left: 55, duration: 11, delay: -3 },
  { top: 8, left: 70, duration: 14, delay: -7 },
  { top: 45, left: 10, duration: 10, delay: -5 },
] as const
