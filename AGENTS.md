# Project Guidance

## Mission
Build a mobile-first system for cataloging a child's Pokemon card collection by scanning cards, identifying them reliably, and creating a searchable inventory that can later support valuation, organization, and deck-related workflows.

## Always Preserve Context
- Important product, technical, and domain decisions must be written to repo files, not left only in chat.
- When a meaningful decision is made, update the relevant doc in `docs/`.
- New agents should be able to understand the project by reading:
  - `README.md`
  - `docs/repo/vision.md`
  - `docs/repo/current-state.md`
  - `docs/architecture/decisions.md`

## Documentation Rules
- Keep docs concise, factual, and current.
- Prefer updating an existing file over creating a new one unless a new artifact adds clear value.
- Record why a decision was made, not just what was chosen.
- If assumptions are uncertain, label them as assumptions.
- For OpenAI-related guidance, verify against current official OpenAI docs before documenting volatile recommendations.
- For Pokemon card domain/data guidance, verify against actual public APIs or official provider docs before documenting claims.

## Working Style
- Default to small, testable steps.
- Prefer an MVP that works with manual confirmation over a "fully automatic" system that is fragile.
- Treat card identification accuracy as more important than flashy scanning UX.
- Explain Pokemon TCG concepts plainly because the project owner is not a domain expert.
- Keep work in a GitHub repository with regular, well-scoped, reviewable commits.
- Prefer commits that capture one coherent step or decision at a time.

## Current Product Direction
- Start with inventory/cataloging.
- Support scanning cards with a phone camera.
- Use OCR plus API matching, then let the user confirm likely matches.
- Expand later into pricing, collection insights, and deck-related workflows.

## Done Criteria For Early Work
- The repo documents the product vision, current status, and architectural decisions.
- The first implementation path is understandable by a new agent without chat history.
- Data-source choices are backed by real APIs, not guesses.
- Significant progress is reflected in clear, bounded Git commits.
