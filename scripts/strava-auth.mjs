#!/usr/bin/env node
/**
 * One-time Strava OAuth helper. Run locally to obtain a long-lived
 * refresh token, then store it as the GitHub Actions secret
 * STRAVA_REFRESH_TOKEN.
 *
 * Usage:
 *   1. At https://www.strava.com/settings/api set:
 *      - Authorization Callback Domain: localhost
 *   2. Set env vars STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET (or pass them
 *      inline: `STRAVA_CLIENT_ID=... STRAVA_CLIENT_SECRET=... node scripts/strava-auth.mjs`)
 *   3. Run this script. It prints a URL — open it, approve, and Strava redirects
 *      to http://localhost/?code=...&scope=...
 *   4. Copy the `code` query param and paste it back into this script.
 *   5. The script exchanges the code for a refresh token and prints all secrets.
 */

import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const CLIENT_ID = process.env.STRAVA_CLIENT_ID
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Set STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET first.')
  process.exit(1)
}

const SCOPES = 'read,activity:read'
const REDIRECT = 'http://localhost'

const authUrl =
  `https://www.strava.com/oauth/authorize` +
  `?client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT)}` +
  `&response_type=code&approval_prompt=auto&scope=${encodeURIComponent(SCOPES)}`

console.log('\nOpen this URL in your browser, approve, then copy the `code` param from the redirect:\n')
console.log(authUrl + '\n')

const rl = createInterface({ input, output })
const code = (await rl.question('Paste the code value here: ')).trim()
rl.close()

const res = await fetch('https://www.strava.com/api/v3/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
  }),
})

if (!res.ok) {
  console.error('Exchange failed:', res.status, await res.text())
  process.exit(1)
}

const json = await res.json()
console.log('\n--- copy these into GitHub repo secrets ---\n')
console.log('STRAVA_CLIENT_ID     =', CLIENT_ID)
console.log('STRAVA_CLIENT_SECRET =', CLIENT_SECRET)
console.log('STRAVA_REFRESH_TOKEN =', json.refresh_token)
console.log('\n(athlete id:', json.athlete?.id, ')\n')
