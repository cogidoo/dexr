# Current State

## Status
Project inception. No application code exists yet.

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
- The project owner wants durable repo-based context so knowledge does not disappear in chat history.
- The project should live in a GitHub repository with regular, clearly scoped commits.
- The project should use an explicit external-reviewer pass for meaningful work.
- The project should be understandable to future agents and collaborators without prior conversation context.

## Working assumptions
- The first version should likely use OCR plus metadata matching, not depend on a single black-box card recognition API.
- Public card databases and price sources should drive catalog data.
- Domain knowledge must be documented in simple language as the project evolves.

## Confirmed external references
- Pokemon TCG API docs: `https://docs.pokemontcg.io/`
- TCGdex docs: `https://tcgdex.dev/de`
- OpenAI Codex best practices: `https://developers.openai.com/codex/learn/best-practices/`

## Next recommended steps
1. Confirm the revised zero-paid-runtime architecture direction.
2. Define the first technical slice for the MVP.
3. Scaffold the app shell and local data model.
4. Prototype OCR plus API matching on real card photos.
