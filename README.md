# Internship Board

A React 18 + TypeScript (strict) + Vite app: searchable, filterable internship listings loaded via `fetch` from `public/mock-data.json`, a details route, and a validated apply form (stored in local component state only).

## Setup
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```
The mock API waits 900 ms and fails ~20% of the time (see `src/api/internships.ts`) so loading and error UI are exercised; use "Try again" to retry.

## Thinking in React: decomposition
1. **Mock** — search bar, two filters, card grid, details page with form.
2. **Hierarchy** — one component per responsibility (below).
3. **Static version** — props only, no state.
4. **Minimal state** — `query`, `location`, `category` (HomePage); form values/touched/submitted (ApplyForm); applications (DetailsPage). Filtered list is *derived* (`useMemo`), not stored.
5. **Where state lives** — fetch status is needed by both routes, so it lives in `App` (nearest common parent) and is passed via `<Outlet context>`; filter state is only used on HomePage, so it stays there.

## Component tree
```
main.tsx  (RouterProvider)
└─ App                      owns useInternships() → { state, reload }
   ├─ header / Link
   └─ <Outlet context>
      ├─ HomePage  "/"      owns query, location, category (+ debounced query)
      │  ├─ SearchBar
      │  ├─ FilterSelect ×2
      │  ├─ StatusMessage   (loading | error | empty)
      │  └─ InternshipCard ×N
      │     └─ Badge ×N
      └─ DetailsPage "/internships/:id"   owns applications[]
         ├─ StatusMessage
         ├─ Badge ×N
         └─ ApplyForm       owns values/touched/submitted
            └─ FormField ×3
```
No prop is passed more than two levels deep.

## useState vs useReducer
- **`useReducer`** for fetch status (`useInternships`): `loading | error | success` are mutually exclusive, and a reducer with a discriminated union makes invalid combinations impossible and keeps transitions in one place.
- **`useState`** everywhere else: independent primitives (search text, a select value, form fields) with no cross-field transitions; a reducer would add ceremony without benefit.

## Pitfalls addressed
- Search is debounced (250 ms) via `useDebounce`.
- Effect cleanup aborts in-flight fetches; dependency arrays are complete.
- Keys are stable ids/strings, never array indexes.
- Empty results show a message and a "Clear" action.
- No `any`; `strict` plus `noUncheckedIndexedAccess` enabled.

## Structure
`src/api` fetch layer · `src/hooks` data/debounce hooks · `src/components` reusable UI · `src/pages` route components · `src/utils` pure filter/validation logic.
