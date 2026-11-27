#!/usr/bin/env node
/**
 * Picks this week's "Now spinning" album from Spotify. Run by the weekly
 * GitHub Action (.github/workflows/now-spinning.yml), not by hand.
 *
 * 1. Uses the saved refresh token to get a short-lived access token.
 * 2. Gets your top 50 tracks for Spotify's "short term" (about the last
 *    4 weeks; Spotify doesn't offer exactly one week).
 * 3. Counts which album those tracks come from most often. A tie goes to
 *    the album whose first track ranks highest.
 * 4. Writes it to src/data/now-spinning.json, only if it changed.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'src/data/now-spinning.json';
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
  throw new Error('Missing Spotify secrets. Run scripts/spotify-connect.mjs first.');
}

const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
  },
  body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: SPOTIFY_REFRESH_TOKEN }),
});
const { access_token } = await tokenResponse.json();
if (!tokenResponse.ok || !access_token) throw new Error(`Token refresh failed (${tokenResponse.status})`);

const topResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50', {
  headers: { Authorization: `Bearer ${access_token}` },
});
if (!topResponse.ok) throw new Error(`Top tracks request failed (${topResponse.status})`);
const { items } = await topResponse.json();
if (!items?.length) {
  console.log('No top tracks yet; leaving Now spinning as it is.');
  process.exit(0);
}

// Tally tracks per album. A Map remembers insertion order, which is the
// order of first appearance, so the earliest-ranked album wins ties.
const tally = new Map();
for (const track of items) {
  const album = track.album;
  const entry = tally.get(album.id) ?? { album, count: 0 };
  entry.count += 1;
  tally.set(album.id, entry);
}
let best = null;
for (const entry of tally.values()) {
  if (!best || entry.count > best.count) best = entry;
}

const album = best.album;
const next = {
  title: album.name,
  artist: album.artists.map((a) => a.name).join(', '),
  cover: album.images?.[0]?.url,
  url: album.external_urls?.spotify,
};

const current = JSON.parse(readFileSync(FILE, 'utf8'));
if (current.title === next.title && current.artist === next.artist) {
  console.log(`Still spinning: ${next.title} by ${next.artist}. No change.`);
} else {
  writeFileSync(FILE, JSON.stringify(next, null, 2) + '\n');
  console.log(`Now spinning: ${next.title} by ${next.artist} (${best.count} of your top ${items.length} tracks).`);
}
