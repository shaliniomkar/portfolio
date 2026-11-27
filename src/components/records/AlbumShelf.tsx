/**
 * The album grid plus the sort buttons. This is the one part of the Record
 * Shop that needs to react to clicks, so it's a Preact component.
 *
 * `useState` remembers which sort is picked. Clicking a button changes it,
 * Preact re-runs this function, and the grid redraws in the new order.
 * The page loads already sorted by rating, so it still looks right before
 * (or without) JavaScript.
 */
import { useState } from 'preact/hooks';
import AlbumCard from './AlbumCard';
import type { Album } from './types';
import './albums.css';

type SortKey = 'rating' | 'newest' | 'title';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'rating', label: 'Top rated' },
  { key: 'newest', label: 'Newest' },
  { key: 'title', label: 'A–Z' },
];

// Each comparer returns a negative number if `a` should come first.
const compare: Record<SortKey, (a: Album, b: Album) => number> = {
  rating: (a, b) => b.rating - a.rating || b.year - a.year,
  newest: (a, b) => b.year - a.year || a.title.localeCompare(b.title),
  title: (a, b) => a.title.localeCompare(b.title),
};

export default function AlbumShelf({ albums }: { albums: Album[] }) {
  const [sort, setSort] = useState<SortKey>('rating');
  // [...albums] copies the list first, because .sort() changes the list it's given.
  const sorted = [...albums].sort(compare[sort]);
  const current = SORTS.find((s) => s.key === sort)!.label;

  return (
    <div class="shelf">
      <div class="sort" role="group" aria-label="Sort albums">
        <span class="sort-label" aria-hidden="true">Sort:</span>
        {SORTS.map((s) => (
          <button
            type="button"
            class="sort-button"
            aria-pressed={sort === s.key}
            onClick={() => setSort(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>
      {/* Tells screen reader users the order changed */}
      <p class="visually-hidden" aria-live="polite">
        Sorted by {current.toLowerCase()}
      </p>
      <ul class="album-grid">
        {sorted.map((album) => (
          <li key={album.id}>
            <AlbumCard album={album} />
          </li>
        ))}
      </ul>
    </div>
  );
}
