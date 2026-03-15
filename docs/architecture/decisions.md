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
Proposed

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
