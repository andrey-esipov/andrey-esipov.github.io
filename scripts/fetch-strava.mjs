#!/usr/bin/env node
/**
 * Fetches the most recent Strava activity for the authenticated athlete and
 * writes it to `public/data/strava-latest.json` in a public-safe shape.
 *
 * Required environment variables:
 *   STRAVA_CLIENT_ID
 *   STRAVA_CLIENT_SECRET
 *   STRAVA_REFRESH_TOKEN  (one-time obtained via scripts/strava-auth.mjs)
 *
 * Designed to run inside a GitHub Action — see .github/workflows/strava-sync.yml.
 */

import { writeFile, readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '..', 'public', 'data', 'strava-latest.json')

function requireEnv(name) {
  const v = process.env[name]
  if (!v) {
    console.error(`Missing required env var: ${name}`)
    process.exit(1)
  }
  return v
}

async function getAccessToken() {
  const res = await fetch('https://www.strava.com/api/v3/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: requireEnv('STRAVA_CLIENT_ID'),
      client_secret: requireEnv('STRAVA_CLIENT_SECRET'),
      grant_type: 'refresh_token',
      refresh_token: requireEnv('STRAVA_REFRESH_TOKEN'),
    }),
  })
  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`)
  }
  const json = await res.json()
  return json.access_token
}

async function getLatestActivity(accessToken) {
  const res = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=1', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    throw new Error(`Activities fetch failed: ${res.status} ${await res.text()}`)
  }
  const list = await res.json()
  return list[0] || null
}

function shape(activity) {
  if (!activity) return null
  return {
    name: activity.name || 'Untitled activity',
    type: activity.sport_type || activity.type || 'Activity',
    distance_m: Math.round(activity.distance || 0),
    moving_time_s: Math.round(activity.moving_time || 0),
    total_elevation_gain_m: Math.round(activity.total_elevation_gain || 0),
    start_date_local: activity.start_date_local || activity.start_date,
    summary_polyline: activity.map?.summary_polyline || null,
  }
}

async function main() {
  const token = await getAccessToken()
  const raw = await getLatestActivity(token)
  const next = shape(raw)
  if (!next) {
    console.log('No activities found; leaving existing file untouched.')
    return
  }

  // Compare to existing JSON so we only write when something changed
  let prev = null
  try {
    prev = JSON.parse(await readFile(OUT, 'utf8'))
  } catch {
    // file may not exist yet
  }
  if (prev && prev.start_date_local === next.start_date_local && prev.name === next.name) {
    console.log('Latest activity unchanged.')
    return
  }
  await writeFile(OUT, JSON.stringify(next, null, 2) + '\n', 'utf8')
  console.log('Wrote', OUT, '·', next.name)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
