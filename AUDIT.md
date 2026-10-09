# Ivory Horizons – Site Audit (Oct 2026)

Branch: `site-audit-oct-2026` (not pushed).

## Domain findings
- No `CNAME`, no config file, no absolute site URL anywhere in the repo.
- The only occurrence of `ivoryhorizons.com` is the contact email `hello@ivoryhorizons.com` (footer of every page).
- Git remote: `github.com/madedochristopher97-pixel/Ivory-horizons`.
- **Domain is unconfirmed**, so all URLs stay relative and `sitemap.xml`/`robots.txt`/canonical/og:url are deferred.

## Phase 0 – Baseline (before)
Lighthouse, mobile emulation, simulated 4G throttling, local static server, Chrome 154.

| Page | LCP | CLS | TBT | Transferred | Requests | Perf | A11y |
|---|---|---|---|---|---|---|---|
| index.html | 18.5 s | 0.002 | 1,960 ms | 94.2 MB | 476 | 32 | 95 |
| blog.html | 24.1 s | 0.102 | 150 ms | 19.8 MB | 22 | 69 | 92 |
| accommodation.html | 25.2 s | 0 | 990 ms | 6.9 MB | 21 | 51 | 92 |
| kenya-travel-insurance-update.html | 17.2 s | 0.02 | 30 ms | 3.6 MB | 19 | 71 | 96 |
