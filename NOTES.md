# AI Tools & Design Notes

## AI tools used

Cursor (Claude) was used throughout: sketching the architecture, scaffolding the Webpack/TypeScript
config, and drafting the component, hook and API code. It was most useful for the boilerplate the
assignment isn't really testing — the build config, the CSS Modules, the reset stylesheet. Every
suggestion was reviewed and often redirected: layering, naming, state placement and the caching
strategy below were all decided by hand, not accepted as generated.

## Design decisions

- **React + TypeScript + Webpack, no CRA/Vite.** A single `webpack.config.ts` is small enough to read
  end to end, and keeps the tooling explicit rather than hidden behind a scaffold.
- **Flat, component-based structure** — `components/`, `hooks/`, `api/`, `types/`, `utils/`, `app/`.
  At this size, deeper layering would cost more to navigate than it returns.
- **React Query owns all server state.** `useAllLeagues()` fetches once with `staleTime: Infinity`;
  `useSeasonBadge(leagueId)` is lazy — it only runs when a league is clicked — and is cached per
  league ID, so re-opening a league never re-fetches. This is what satisfies the "cache responses to
  avoid repeat calls" requirement.
- **Plain `useState` for client state, no store.** The only client state is search text, selected
  sport, and which league's modal is open. Redux/MobX/Zustand would be pure overhead here.
- **Client-side filtering,** since `all_leagues.php` has no search or sport query parameters. Search
  is debounced at 300 ms, but clearing the box applies instantly rather than waiting out the delay.
- **CSS Modules only.** One styling system, one small global reset, and a single brand accent defined
  as CSS custom properties and reused for buttons, focus rings and error states.
- **Every async surface has loading, error-with-retry and empty states** — on the list and in the
  badge modal — plus an image `onError` fallback and a top-level error boundary, so a failure
  degrades to a recoverable message instead of a blank screen.

## Out of scope

Left out deliberately for the ~90-minute budget, in the order I'd add them next:

1. **Tests.** Given more time I'd start with `filterLeagues` and `getUniqueSports` as pure-function
   unit tests, then component tests covering the three behaviours the brief asks for: the list
   renders, search narrows it, and clicking a card opens the badge modal.
2. **Fuller modal accessibility** — focus trap and focus restore on close.
3. **Runtime schema validation** of the API responses (e.g. Zod) instead of trusting the declared types.
4. **Virtualization or pagination,** which this dataset doesn't need but a real league list would.

## Time spent

The basic requirements (league list, search, sport filter, click-through badge modal, caching,
loading/error/empty states) were done within the assignment's suggested ~90 minutes. An additional
~60 minutes went into manually testing and verifying behaviour end-to-end, simplifying parts of the
initial implementation, and fixing the issues that testing pass turned up.

## Note on the API

The keyless `all_leagues.php` endpoint returns five leagues, all Soccer, and omits
`strLeagueAlternate` entirely — so the sport dropdown has one real option and the alternate-name line
shows its fallback. Both the filter and the field are implemented against the documented shape; the
data simply doesn't exercise them. See the README for details.
