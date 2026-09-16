# AI Tools & Design Notes

## AI tools used

Cursor (Claude) was used throughout: planning the architecture, scaffolding the Webpack/TypeScript
config, writing the component/hook/API code, and a later simplification pass that removed things
that had accumulated more process/tooling weight than the assignment justified. Every change was
reviewed and directed — architecture layering, naming, state placement, caching strategy, and
tooling trade-offs were all iterated on, not accepted as-is.

## Key design decisions (short version)

- **Component-based architecture, flat folders.** Started with Feature-Sliced Design; flattened to
  `components/`, `hooks/`, `api/`, `types/`, `utils/`, `app/` once the layer boundaries stopped
  paying for themselves at this app's size.
- **React Query for all server state.** `useAllLeagues()` fetches once and caches for the session;
  `useSeasonBadge(leagueId)` is lazy (enabled on click) and cached per league id, so re-clicking a
  league never re-fetches.
- **Plain `useState` for client state**, no store. The only client state is search text, selected
  sport, and which league's modal is open — too small to justify Redux/MobX/Zustand.
- **Filters are not synced to the URL.** Built during development, then removed: real feature, not
  requested, and the most complex piece of client state in the app for a benefit that doesn't apply
  to a five-league list.
- **Client-side filtering**, since the All Leagues endpoint has no search/sport query params.
- **CSS Modules only, no Tailwind.** Tailwind was tried and removed — it carried a handful of
  utility classes while duplicating the CSS Modules' own palette, and the two systems only rendered
  correctly by accident (stylesheet import order). One system, one small global reset.
- **One brand color** (a Sporty Group–style red), defined once as CSS custom properties and reused
  for buttons, focus rings, and error states.
- **No runtime schema validation, no virtualization/pagination, no router, no state manager.**
  Reasonable for two read-only endpoints and a five-row dataset — named explicitly as trade-offs
  rather than left implicit.

## Simplification pass

Additional time went into building a test suite and other tooling, verifying the app's behavior
end-to-end, and then a deliberate pass back toward simplicity once that review was done:

- Removed the Vitest + React Testing Library suite and its CI workflow. They were genuinely useful
  during development (e.g. catching regressions in the modal and URL-sync logic), but for a
  take-home submission they added a second toolchain to review for correctness that's easy to check
  by hand in a couple of minutes.
- Removed URL-synced filters, the accessible-modal focus trap, and the "Clear filters" button —
  each was a reasonable addition, but not something the assignment asked for, and each added more
  surface area (code, edge cases, review time) than it earned back for this submission.
- Removed all inline code comments, on the premise that this file is the right place for *why*
  something is built a certain way, not scattered comments.

The general bar used throughout: keep only what directly demonstrates the judgment the assignment
is evaluating (data handling, caching, loading/error states, resilience), and cut anything whose
main effect was more surface area to review. Some smaller decisions (e.g. dropping an unrequested
`maxLength` on the search input) followed the same logic without being written up individually here.

## Where AI suggestions were overridden

- A store (MobX/Redux/Zustand) was suggested at one point and skipped — client state never grew
  large enough to need one.
- Feature-Sliced Design and Tailwind were both introduced, then removed once their overhead stopped
  being worth it for an app this size.
- A full test suite and CI workflow were built, then deliberately removed for the final submission —
  overriding an earlier scope decision, not an AI suggestion, but the same "does this complexity earn
  its keep" judgment call as the rest of this list.
