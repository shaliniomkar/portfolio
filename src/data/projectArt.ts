/** The clip-art drawings ProjectArt.astro knows how to draw. */
export const artKinds = [
  'chip',        // microcontroller / embedded
  'thermometer', // sensors, temperature
  'cpu',         // processor, emulator, architecture
  'cache',       // memory, caches, data structures
  'raytrace',    // graphics, rendering
  'board',       // web apps, job boards, dashboards
  'music',       // music / audio projects
  'robot',       // ML / AI
  'claw',        // mechanical builds, robotics
  'chart',       // data analysis
  'image',       // image processing, graphics
  'cards',       // games
  'gear',        // anything else
] as const;

export type ArtKind = (typeof artKinds)[number];

/** Tint name -> [background tint, main color] from tokens.css */
export const tints = {
  blue: ['var(--color-workshop-tint)', 'var(--color-workshop)'],
  purple: ['var(--color-gallery-tint)', 'var(--color-gallery)'],
  coral: ['var(--color-recordshop-tint)', 'var(--color-recordshop)'],
  mint: ['var(--color-lookout-tint)', 'var(--color-lookout)'],
  yellow: ['var(--color-accent-tint)', 'var(--color-accent)'],
} as const;
