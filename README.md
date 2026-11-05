# Cities of Champions

Every MLB, NHL, NBA and NFL champion since 1903, grouped by metro area. Rank the cities, map the clusters, compare them side by side and watch the title race.

A static site served by a Cloudflare Worker (assets only, no server code).

## Layout

| Path | What it is |
| --- | --- |
| `wrangler.jsonc` | Worker config at the repo root. `name` must match the Worker's name in the Cloudflare dashboard. |
| `public/index.html` | Page styles plus the markup template (`<script id="tpl">`). |
| `public/app.js` | The data (champions, metros, franchises, map) and all the logic. |
| `public/runtime.js` | Small template runtime that renders the markup from `app.js`. |
| `public/main.js` | Starts the app. |
| `public/vendor/morphdom-umd.min.js` | DOM diffing, copied from the `morphdom` npm package. |
| `public/favicon.svg` and PNGs | The 2×2 league icon grid. |

## Run locally

```sh
npm install
npm run dev      # http://localhost:8787
```

## Deploy

Cloudflare dashboard: Workers & Pages, Create, Import a repository, pick this repo.
Leave the root directory blank, leave the build command empty and use `npx wrangler deploy` as the deploy command. The production branch is `main`.

By hand: `npx wrangler login` once, then `npm run deploy`.

## Updating the data

Champions live in `D.titles` inside `public/app.js`, one line per season: `year: [[league, metro, team, city, franchise], ...]`. League indexes are 0 MLB, 1 NHL, 2 NBA, 3 NFL. Totals, rankings, the map and the charts all recompute from that table.
