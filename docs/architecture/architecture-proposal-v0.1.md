# dexr Architecture Proposal v0.1

## Goal
Define a practical v1 architecture for a mobile-first web app that captures one Pokemon card at a time, identifies it reliably, and stores it in a searchable inventory without requiring paid runtime dependencies.

## Hard constraints
- no paid runtime required for v1
- do not depend on ChatGPT Pro usage as application infrastructure
- keep the first version usable on a phone
- prioritize trustworthy identification over impressive but brittle automation
- identification in v1 may require network access to public card APIs

## Recommended architecture

### App shell
- `Next.js` web app optimized for mobile browsers
- `TypeScript`
- `Tailwind CSS`
- can become an installable `PWA`, but that is not required for the first slice

### Persistence model
- local-first storage in the browser using `IndexedDB`
- no required sign-in in v1
- add explicit export and import of collection data so the user can back up or move the collection manually
- show a visible warning that collection data lives on this device unless exported
- add backup reminders after meaningful catalog progress

### Card data sources
- primary source: `Pokemon TCG API`
- secondary source: `TCGdex`, only where it improves recall or metadata coverage
- keep a source-agnostic internal card model

### Identification pipeline
Recommended v1 approach: `browser capture + on-device OCR + deterministic API matching + user confirmation`

1. user captures a card image on phone
2. the app preprocesses the image client-side where helpful
3. on-device OCR extracts visible text hints
4. the app queries card APIs using those hints
5. a ranking step returns likely candidates
6. the user confirms the correct card
7. the confirmed card is stored locally in the collection

If OCR confidence is too low, the flow must offer a manual recovery path instead of only a blind retry.

## Why this is the recommended path

### 1. It matches the product priorities
- mobile-first
- fast single-card capture
- inventory and identification before pricing
- low-cost by design

### 2. It respects the budget constraint
Using OpenAI as a runtime dependency would require separate API usage and billing, which does not fit the current project constraint. The app should therefore not require OpenAI services to function in production.

### 3. It uses reliable sources of truth
The app should not "guess" card identities from a black-box model. It should extract clues and then match them against real card APIs.

### 4. It stays easy to ship
Local-first architecture removes the need for paid backend services, auth setup, secrets management, and hosted inference just to validate the first product loop.

## Core technical choices

## Frontend
- `Next.js`
- mobile camera capture in the browser
- file-upload fallback when direct camera access is unavailable
- simple card confirmation UI optimized for repetitive one-card scan loops

## Storage
- `IndexedDB` for structured client-side storage
- store collection, inventory items, scan results, and cached match candidates locally
- support export/import as JSON for backup and transfer
- include lightweight backup UX in v1, not only raw export capability

## OCR
- use `Tesseract.js` in the browser as the initial OCR engine
- treat OCR as a hint extractor, not a card identity engine
- reuse a worker across scans where possible for better performance

## External APIs
- query `Pokemon TCG API` first
- optionally query `TCGdex` when the first pass fails or when multilingual metadata improves matching

## Hosting
- static or low-cost web hosting is enough for v1
- `Vercel` is a reasonable default for the web app, but the product architecture should not depend on paid hosting features

## Proposed internal flow

### Step A: capture
- open scan screen
- use mobile camera if available
- fallback to standard photo upload
- keep the working image in memory during the scan flow

### Step B: preprocess
- crop or resize client-side if needed
- optionally grayscale or increase contrast before OCR

### Step C: OCR hint extraction
- extract likely card name fragments
- extract collector number if visible
- extract set text if visible
- extract language hints where possible

### Step D: matching
- first try precise searches using collector number plus set hints
- if that fails, search by name fragments and secondary clues
- rank candidates by agreement between OCR hints and API data

### Step E: fallback when OCR is weak
- allow retry with a new photo
- allow manual search by name fragment
- allow guided entry of visible collector number when readable by the user
- keep this fallback simple enough for a non-expert parent
### Step F: confirmation
- show top candidates
- highlight the evidence used for the match
- let the user confirm, retry, or mark as unresolved
### Step G: persistence
- save confirmed inventory item locally
- optionally save a lightweight scan record for later debugging
- do not require long-term image retention for v1

## Why not OpenAI in the v1 runtime
- it introduces paid runtime dependency
- it does not fit the current budget constraint
- it is better reserved as a future enhancement path rather than a dependency for the first usable product

## Why not pure API search without OCR
- users often will not know the exact card name or set
- collector number and tiny printed text matter
- a scan-first product needs at least some machine extraction from the image

## Why not full auto-classification first
Fully automatic classification still creates too much risk of wrong matches across:
- similar names
- promos
- alternate printings
- different sets with the same Pokemon
- language differences

For `dexr`, a wrong saved card is worse than a fast confirm step.

## Recommended v1 data model

### `collections`
- id
- name
- created_at
- updated_at

### `inventory_items`
- id
- collection_id
- canonical_card_id
- quantity
- condition_note
- source_scan_result_id
- created_at

### `scan_sessions`
- id
- collection_id
- started_at
- capture_mode

### `scan_results`
- id
- scan_session_id
- extracted_name
- extracted_collector_number
- extracted_set_hint
- extracted_language
- extraction_provider
- extraction_confidence
- status

### `match_candidates`
- id
- scan_result_id
- source_name
- source_card_id
- score
- evidence_json
- raw_card_json

### `canonical_cards`
- id
- primary_source
- primary_source_card_id
- name
- set_name
- collector_number
- rarity
- supertype
- image_url

## Explicit v1 decisions
- no required login in v1
- local-first collection storage
- card photos are scan inputs, not first-class long-term inventory assets
- `TCGdex` stays secondary until it proves concrete value
- identification requires network access in v1
- v1 must include a manual fallback path when OCR-based matching is weak
- v1 must include a visible backup/export reminder because data is stored locally

## Review integration
The previous review raised four important points. They are incorporated here as follows:
- model extraction scope: resolved by removing model runtime dependence from v1
- auth ambiguity: resolved by choosing no-login local-first v1
- image-retention ambiguity: resolved by making photos temporary scan inputs in v1
- TCGdex scope creep: resolved by making it secondary and optional

The second review raised three further product-operational points. They are incorporated here as follows:
- OCR failure recovery: resolved by adding an explicit manual fallback path
- local-first versus offline ambiguity: resolved by explicitly stating that identification needs network access in v1
- data-loss risk: resolved by requiring visible export and backup reminders in v1

## Risks
- browser OCR may struggle with glare, blur, or tiny print
- OCR quality may vary heavily across devices
- public API rate limits can become a constraint if search is too noisy
- local-only storage increases the importance of export/import UX

## Future upgrade path
If the local-first OCR path proves too weak, a later version can add:
- optional account sync
- optional server-side preprocessing
- optional OpenAI-assisted hint extraction as a premium or advanced mode

That should be treated as a later decision, not a v1 dependency.

## Suggested decision
Proceed with a `Next.js + IndexedDB + Tesseract.js + Pokemon TCG API` architecture for v1, with `TCGdex` as a secondary fallback or enrichment source.

## References
- Pokemon TCG API overview: https://docs.pokemontcg.io/
- Pokemon TCG API rate limits: https://docs.pokemontcg.io/getting-started/rate-limits/
- TCGdex docs: https://tcgdex.dev/
- MDN IndexedDB overview: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- Dexie docs: https://dexie.org/
- Tesseract.js: https://github.com/naptha/tesseract.js
