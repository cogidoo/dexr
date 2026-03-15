# Current State

## Status
Early implementation spike.
A local `Next.js` prototype exists and validates the first mobile scan flow shape, but real OCR, API search, and inventory persistence are not implemented yet.

## Project name
`dexr`

## What is already known
- The core use case is cataloging a child’s Pokemon card collection.
- The preferred input is phone-based scanning.
- The product direction is mobile-first.
- v1 should be a mobile-optimized web app.
- v1 should prioritize single-card scanning over batch capture.
- v1 should focus on inventory and identification before pricing.
- v1 should avoid paid runtime dependencies.
- ChatGPT Pro should not be treated as application infrastructure.
- v1 identification will require network access to public card APIs.
- v1 should include visible export/backup guidance because collection data is local-first.
- v1 should include a manual fallback path when OCR-based scanning is weak.
- The project owner wants durable repo-based context so knowledge does not disappear in chat history.
- The project should live in a GitHub repository with regular, clearly scoped commits.
- The project should use an explicit external-reviewer pass for meaningful work.
- The project should be understandable to future agents and collaborators without prior conversation context.
- The first implemented slice should validate the scan-to-candidate workflow before building full inventory storage.
- Local development is the immediate execution path; hosted previews can use `Vercel` later without changing the v1 architecture.

## What now exists in the repo
- `Next.js` app scaffold with App Router, TypeScript, and Tailwind CSS
- project-level `.mcp.json` for the official Next.js MCP server
- a mobile-first scan prototype page
- file input configured for image upload and phone camera fallback
- mock OCR output and mock candidate ranking UI for product-flow validation
- working `npm run build` and `npm run lint`
- `Next.js` upgraded to v16 so the official MCP integration can run

## Working assumptions
- The first version should likely use OCR plus metadata matching, not depend on a single black-box card recognition API.
- Public card databases and price sources should drive catalog data.
- Domain knowledge must be documented in simple language as the project evolves.
- Local-first is a storage strategy, not a guarantee of offline card identification.
- The current prototype uses mocked extraction and matching so the UX can be exercised before live integrations are added.
- React framework documentation can continue to use the shared `context7` MCP server rather than a separate dedicated server.

## Confirmed external references
- Pokemon TCG API docs: `https://docs.pokemontcg.io/`
- TCGdex docs: `https://tcgdex.dev/de`
- OpenAI Codex best practices: `https://developers.openai.com/codex/learn/best-practices/`

## Next recommended steps
1. Replace mock extraction with real browser OCR on sample card photos.
2. Integrate live candidate lookup against `Pokemon TCG API`.
3. Evaluate matching quality on a small real-world card set before adding inventory persistence.
4. Add local collection storage only after the identification loop is trustworthy enough.
