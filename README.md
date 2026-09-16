# Sports Leagues

A single-page app that lists sports leagues from [TheSportsDB](https://www.thesportsdb.com/free_sports_api), with search, sport filtering, and a season badge viewer on click. Built as a frontend take-home assignment.

## Stack

- **React 18** + **TypeScript**
- **Webpack 5** — a single `webpack.config.ts`, no CLI scaffolding (CRA/Vite), `ts-loader` for TS/TSX
- **@tanstack/react-query** — data fetching & caching
- **CSS Modules** — the only styling system
- Simple **component-based architecture** — flat folders by concern
- **ESLint + Prettier**

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000, with HMR
```

Other scripts:

```bash
npm run build       # production bundle into dist/
npm run start        # serve the production build (dist/) on http://localhost:3000
npm run type-check   # tsc --noEmit
npm run lint         # eslint
npm run format       # prettier --write
```

No environment variables or API keys are required — the app calls TheSportsDB's public test endpoints directly from the browser.

## Features

- Fetches and lists all sports leagues (`strLeague`, `strSport`, `strLeagueAlternate`).
- Search bar filters leagues by name (and alternate name), debounced (300ms).
- Dropdown filters by sport; options are derived from the fetched data.
- Clicking a league fetches its season badges and shows the newest season (with its badge image, or a placeholder if that season has no badge yet) in a modal.
- All API responses are cached via React Query — repeat clicks / searches don't trigger new network requests.
- Loading / error (with retry) / empty states for both the league list and the badge modal.
- A top-level error boundary shows a recoverable message instead of a blank screen.

## Known API limitations

The public (keyless) `all_leagues.php` endpoint returns a fixed set of five leagues, all Soccer, and omits `strLeagueAlternate` entirely (the field is typed optional to match). `search_all_seasons.php` returns the full season archive with no way to request a single season, so the newest season is picked client-side.

## Architecture

```
src/
  app/          composition root: App.tsx, queryClient.ts, webpack entry, global base.css reset
  components/   every component, flat (UI kit + feature components + LeaguesPage)
  hooks/        useDebounce, useLeagueBadgeViewer
  api/          http client, endpoints config, react-query hooks + fetch functions
  types/        League, SeasonBadge, css-modules.d.ts
  utils/        filterLeagues, getUniqueSports
```

No routing, no separate state layer, no barrel `index.ts` files. The `@/*` path alias maps to `src/*`.

See [AI_NOTES.md](NOTES.md) for design rationale and AI tool usage notes.

## API

- All Leagues: `GET https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- Season Badge: `GET https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<idLeague>`
