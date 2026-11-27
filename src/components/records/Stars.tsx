/**
 * Five stars showing a rating like 4.5.
 *
 * Each star is two drawings stacked: a pale outline underneath, and a gold
 * star on top inside a box that's cut off at 0%, 50% or 100% of its width.
 * Cutting the gold star in half is what makes a half star.
 *
 * Screen readers don't see the drawings (aria-hidden); they hear the label
 * "4.5 out of 5 stars" instead.
 */
const STAR = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z';

export default function Stars({ rating }: { rating: number }) {
  return (
    <div class="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        // How much of this star is filled: 1 = full, 0.5 = half, 0 = empty.
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span class="star" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="star-empty">
              <path d={STAR} />
            </svg>
            <span class="star-fill" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 24 24">
                <path d={STAR} />
              </svg>
            </span>
          </span>
        );
      })}
      <span class="stars-number" aria-hidden="true">
        {rating}/5
      </span>
    </div>
  );
}
