# Architecture Decisions

## ADR-0001: Persist project context in repo files

### Status
Accepted

### Context
Important reasoning, goals, and assumptions can disappear in chat history. This makes it hard for new agents or future sessions to understand why the project exists, what has already been decided, and which questions remain open.

### Decision
Use a small set of durable repo files as the project's source of ongoing context:
- `README.md` for onboarding
- `AGENTS.md` for working rules
- `docs/repo/vision.md` for product intent
- `docs/repo/current-state.md` for the living snapshot
- `docs/architecture/decisions.md` for decision records

### Consequences
- New agents can onboard quickly without chat history.
- Important context becomes reviewable and editable.
- The team must keep the docs current as decisions evolve.

## ADR-0002: Inventory-first product strategy

### Status
Accepted

### Context
There are many possible future features, including valuation, deck building, and collection insights. Without a trustworthy inventory, those features have no solid foundation.

### Decision
Prioritize building a reliable cataloging and inventory workflow before advanced features.

### Consequences
- Early scope stays focused.
- Data quality improves before higher-level features are added.
- Pricing and deck workflows become easier to add later.

## ADR-0003: Prefer assisted identification over brittle full automation

### Status
Accepted

### Context
The project needs a phone-based scan flow, but fully automatic image-based identification may be fragile, especially across varying card layouts, print variants, lighting conditions, and languages.

### Decision
For the MVP, prefer a flow that extracts card hints from images and presents likely matches for user confirmation.

### Consequences
- Accuracy should be higher than a forced single-shot automatic match.
- The UX must include a fast confirmation step.
- Full automation can still be explored later if real-world accuracy is good enough.

## ADR-0004: Build on real Pokemon card APIs

### Status
Accepted

### Context
Pokemon card metadata and pricing should come from established external sources, not hand-maintained data.

### Decision
Use publicly documented card APIs as the base for cataloging and future value features. Current leading candidates are:
- Pokemon TCG API
- TCGdex

### Consequences
- The project stays grounded in real card metadata.
- API coverage, rate limits, and pricing fields must be evaluated during implementation.
- The domain model should allow multiple upstream sources.

## ADR-0005: Maintain a clear GitHub history with small, bounded commits

### Status
Accepted

### Context
The project owner wants the work to remain understandable not only through docs, but also through the repository history. Large, mixed commits make it harder for future agents and collaborators to reconstruct how the project evolved.

### Decision
Keep the project in GitHub and prefer regular, well-scoped commits that each represent a clear step, decision, or implementation slice.

### Consequences
- The repo history becomes a second source of project memory.
- Reviews and rollbacks become easier.
- Work may pause briefly to package changes into clean commit boundaries.

## ADR-0006: Use a separate external-reviewer pass for meaningful changes

### Status
Accepted

### Context
Implementation and review benefit from different mindsets. When the same pass both builds and validates a change, risks can be missed or rationalized away. The project owner wants regular review from an "external" agent perspective.

### Decision
Use a dedicated review pass for meaningful project steps, guided by `docs/process/code_review.md`, and persist important review outcomes when they add long-term value.

### Consequences
- Review becomes a first-class project activity rather than an informal afterthought.
- Future agents can inspect past critiques and understand why changes were accepted or redirected.
- Delivery may take slightly longer, but quality and traceability should improve.

## ADR-0007: Start with a mobile web app centered on single-card inventory capture

### Status
Accepted

### Context
The project needs a strong phone experience because scanning is the main entry point. The project owner prefers a web app for v1, wants fast single-card capture prioritized over batch workflows, and wants the first release to emphasize inventory and identification rather than pricing.

### Decision
Build v1 as a mobile-optimized web app. Optimize the first scanning flow for one-card-at-a-time capture and confirmation. Treat pricing and valuation as follow-up features, not core v1 scope.

### Consequences
- The first architecture should favor fast web delivery and phone camera support.
- UX should optimize for short repeatable scan-confirm-save loops.
- Pricing data can still exist in the model later, but should not drive the first release.

## ADR-0008: Keep v1 free of paid runtime dependencies

### Status
Accepted

### Context
The project owner does not want to spend money on the initial product runtime and does not want to rely on a ChatGPT Pro subscription as application infrastructure. That rules out an architecture that depends on paid hosted inference or paid backend services for the core v1 loop.

### Decision
Design v1 so it can run without paid runtime dependencies. Prefer local-first storage, browser-based OCR, and public card APIs over paid hosted AI services.

### Consequences
- v1 should avoid OpenAI as a required runtime dependency.
- sync, hosted inference, and premium augmentation become future upgrades rather than initial requirements.
- the first validation target is "usable and trustworthy on one device", not "fully synced and cloud-backed".

## ADR-0009: Validate the scan-identify loop before building full inventory storage

### Status
Accepted

### Context
The largest remaining delivery risk is not page scaffolding or storage mechanics. It is whether a phone-friendly image capture flow plus OCR hints and API-backed candidate matching can identify real cards reliably enough for a non-expert user.

### Decision
Implement the first code slice as a narrow prototype of the scan-identify-confirm workflow. Start with a mobile web UI and mocked extraction or matching where needed so the user flow can be exercised before committing to full OCR, API integration, and local inventory persistence.

### Consequences
- early implementation effort stays focused on the highest-risk workflow
- real OCR and API integration become the next technical step, not a later rewrite
- inventory storage should follow only after identification quality is validated
