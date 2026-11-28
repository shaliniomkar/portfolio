/**
 * The four places on the island. This one list feeds the buildings in the
 * scene, the speech bubble text, the "Where to?" menu and the placeholder
 * pages, so a name or description only ever changes here.
 */
export interface Place {
  id: 'workshop' | 'experience' | 'record-shop' | 'lookout';
  name: string;
  line: string;      // what the speech bubble says
  menuLine: string;  // shorter text for the "Where to?" card
  x: number;         // center of the building in the scene (1440-wide grid)
  kind: 'house' | 'lighthouse';
  roof: string;
  roofDark: string;
  accent: string;    // icon color on the menu card
  tint: string;      // pale background of the menu card
  door?: string;
  windows?: string[];
  vinyl?: boolean;   // record on the roof (Record Shop)
  clock?: boolean;   // clock on the roof (Town Hall)
}

export const places: Place[] = [
  {
    id: 'workshop',
    name: 'Workshop',
    line: 'Technical projects: embedded systems, hardware builds and ML work, each with a write-up, photos and code.',
    menuLine: 'Technical projects: embedded, hardware, ML.',
    x: 400,
    kind: 'house',
    roof: 'var(--color-workshop)',
    roofDark: 'var(--color-workshop-dark)',
    accent: 'var(--color-workshop)',
    tint: 'var(--color-workshop-tint)',
  },
  {
    id: 'experience',
    name: 'Town Hall',
    line: 'Experience: my research and work, with both versions of my resume.',
    menuLine: 'Experience: research and work.',
    x: 698,
    kind: 'house',
    roof: 'var(--color-accent)',
    roofDark: 'var(--color-star)',
    accent: 'var(--color-accent)',
    tint: 'var(--color-accent-tint)',
    door: 'var(--color-workshop-dark)',
    windows: ['var(--color-window-glow)', 'var(--color-window-glow)'],
    clock: true,
  },
  {
    id: 'record-shop',
    name: 'Record Shop',
    line: "Albums I'm rating, what I'm listening to right now, and a short take on each.",
    menuLine: "Albums I'm rating and what I'm listening to.",
    x: 996,
    kind: 'house',
    roof: 'var(--color-recordshop)',
    roofDark: 'var(--color-recordshop-dark)',
    accent: 'var(--color-recordshop)',
    tint: 'var(--color-recordshop-tint)',
    door: 'var(--color-recordshop-dark)',
    windows: ['var(--color-sky)'],
    vinyl: true,
  },
  {
    id: 'lookout',
    name: 'Lookout',
    line: "Photography and places I've been, pinned on a map.",
    menuLine: "Photography and places I've been, pinned on a map.",
    x: 1240,
    kind: 'lighthouse',
    roof: 'var(--color-recordshop)',
    roofDark: 'var(--color-recordshop-dark)',
    accent: 'var(--color-lookout)',
    tint: 'var(--color-lookout-tint)',
  },
];

/** The ground line every building stands on, in scene units. */
export const GROUND = 469;

/** How far above the ground a building's sign floats (negative = up). */
export function signOffset(place: Pick<Place, 'kind' | 'vinyl' | 'clock'>): number {
  if (place.kind === 'lighthouse') return -275;
  return place.vinyl || place.clock ? -238 : -205;
}
