/** One album, as the Preact components receive it from the page. */
export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  rating: number; // 0 to 5 in half steps
  take: string;
  color: 'blue' | 'purple' | 'coral' | 'mint' | 'yellow' | 'sky';
  cover?: string; // official cover image URL
  spinning: boolean;
}
