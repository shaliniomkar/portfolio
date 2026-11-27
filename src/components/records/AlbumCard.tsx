/**
 * One album card: the album's cover with a vinyl record peeking out from
 * behind it, then the title, artist, year, star rating and Shalini's take.
 *
 * The cover image is linked from the music service's image server rather
 * than saved in this repo. If an album has no cover link, its pastel color
 * block with the title shows instead. The record's center label is a small
 * round crop of the same cover, like a real picture disc.
 */
import Stars from './Stars';
import type { Album } from './types';

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <article class={`album album-${album.color}${album.spinning ? ' is-spinning' : ''}`}>
      <div class="album-art" aria-hidden="true">
        <div class="album-vinyl">
          {album.cover && <img class="album-label" src={album.cover} alt="" loading="lazy" />}
        </div>
        <div class="album-cover">
          {album.cover ? (
            <img src={album.cover} alt="" width={300} height={300} loading="lazy" />
          ) : (
            <span>{album.title}</span>
          )}
        </div>
      </div>
      <h3 class="album-title">{album.title}</h3>
      <p class="album-meta">
        {album.artist} · {album.year}
      </p>
      <Stars rating={album.rating} />
      <p class="album-take">{album.take}</p>
    </article>
  );
}
