# Revenue Ledger — Revenue Aggregator MVP

A small React app that pulls sales data from three store branches, merges
duplicate products across branches, and shows a searchable, sorted table of
total revenue per product.

## Setup

```bash
npm install     # install dependencies
npm test        # run all tests in watch mode
npm start       # serve at http://localhost:3000/
```

## How it works

- On load, the app fetches `api/branch1.json`, `api/branch2.json` and
  `api/branch3.json` (served from `public/api/`) in parallel with `fetch`.
- `src/utils/aggregateProducts.js` merges the three datasets: products with
  the same name (even across different branches) have their revenue summed,
  and the result is sorted alphabetically by product name.
- The table can be filtered by product name via the search box (case
  insensitive, matches anywhere in the name).
- The total revenue footer always reflects the *currently filtered* rows,
  not the full dataset.
- All monetary values are rendered through `src/utils/formatNumber.js`.

## Project structure

```
public/
  api/
    branch1.json
    branch2.json
    branch3.json
src/
  utils/
    aggregateProducts.js      # merge + sort logic
    aggregateProducts.test.js
    formatNumber.js           # shared currency formatter
    formatNumber.test.js
  App.js                      # fetch, filter, render
  App.test.js                 # integration tests
  App.css
```

## Tests

19 tests across 3 suites cover:
- currency formatting (`formatNumber`)
- merging/summing/sorting logic (`aggregateProducts`)
- end-to-end app behaviour: loading state, fetching all 3 branches,
  merging + sorting in the UI, total revenue calculation, case-insensitive
  filtering with live total updates, empty-state messaging, and a
  branch-fetch failure state

Run them with:

```bash
npm test
```

## Design

Styled as a "ledger" — deep ink-green header, warm paper background, gold
accents, monospace figures for the revenue column, and a dashed "tear line"
above the total, echoing a receipt/ledger book rather than a generic
dashboard.

## Deployment

Deployed with Vercel, connected to this GitHub repository. Every push to
`main` redeploys automatically.
