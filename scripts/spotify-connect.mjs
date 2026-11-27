#!/usr/bin/env node
/**
 * One-time setup: connects your Spotify account to the weekly
 * "Now spinning" job. Run it yourself, from the portfolio folder:
 *
 *   node scripts/spotify-connect.mjs
 *
 * What it does:
 * 1. Asks for your Spotify app's Client ID and Client secret (the secret is
 *    hidden as you type, like a password).
 * 2. Opens Spotify in your browser so you can approve "read my top tracks".
 * 3. Spotify sends your browser back to this script (on 127.0.0.1:8888),
 *    which swaps the approval for a long-lived "refresh token".
 * 4. Saves all three values as GitHub repo secrets with the `gh` tool.
 *    Nothing is printed or written to a file, so they stay private.
 */
import http from 'node:http';
import readline from 'node:readline';
import { execFileSync } from 'node:child_process';

const REDIRECT_URI = 'http://127.0.0.1:8888/callback';
const SCOPE = 'user-top-read'; // the only permission we ask for

/** Ask a question in the terminal. hidden = don't show what's typed. */
function ask(question, hidden = false) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      // Swallow what readline would echo, so the secret never appears on screen.
      rl._writeToOutput = (text) => {
        if (text.startsWith(question)) rl.output.write(question);
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write('\n');
      resolve(answer.trim());
    });
  });
}

/** Store one GitHub Actions secret, passing the value on stdin (never as an argument). */
function setSecret(name, value) {
  execFileSync('gh', ['secret', 'set', name], { input: value, stdio: ['pipe', 'inherit', 'inherit'] });
}

const clientId = await ask('Spotify Client ID: ');
const clientSecret = await ask('Spotify Client secret (hidden): ', true);
if (!clientId || !clientSecret) {
  console.error('Both the Client ID and Client secret are needed.');
  process.exit(1);
}

// A random value Spotify sends back, to make sure the reply is for this run.
const state = crypto.randomUUID();
const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({ response_type: 'code', client_id: clientId, scope: SCOPE, redirect_uri: REDIRECT_URI, state });

const code = await new Promise((resolve, reject) => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, REDIRECT_URI);
    if (url.pathname !== '/callback') return res.end();
    const ok = url.searchParams.get('state') === state && url.searchParams.get('code');
    res.end(ok ? 'Connected! You can close this tab and go back to the terminal.' : 'Something went wrong. Check the terminal.');
    server.close();
    ok ? resolve(url.searchParams.get('code')) : reject(new Error(url.searchParams.get('error') || 'state mismatch'));
  });
  server.listen(8888, '127.0.0.1', () => {
    console.log('\nOpening Spotify in your browser. Approve access, then come back here.');
    execFileSync('open', [authUrl]);
  });
});

const response = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  },
  body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
});
const tokens = await response.json();
if (!response.ok || !tokens.refresh_token) {
  console.error('Spotify did not return a refresh token:', tokens.error_description || tokens.error || response.status);
  process.exit(1);
}

console.log('Saving secrets to GitHub...');
setSecret('SPOTIFY_CLIENT_ID', clientId);
setSecret('SPOTIFY_CLIENT_SECRET', clientSecret);
setSecret('SPOTIFY_REFRESH_TOKEN', tokens.refresh_token);
console.log('Done! The weekly "Now spinning" job can now read your top tracks.');
