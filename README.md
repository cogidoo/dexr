# dexr

`dexr` is a mobile-first system for cataloging a Pokemon card collection from a phone camera scan, identifying cards against real-world card databases, and building a trustworthy inventory that can later power pricing, organization, and deck-related features.

## Why this project exists
The immediate need is simple: a child has many Pokemon cards, and the collection needs to be captured into a usable digital inventory. The project owner is not a Pokemon card expert, so the system must also reduce domain confusion and guide decisions with clear explanations.

## Where to start
Read these files in order:
- `docs/repo/vision.md`
- `docs/repo/product-blueprint.md`
- `docs/architecture/architecture-proposal-v0.1.md`
- `docs/repo/current-state.md`
- `docs/architecture/decisions.md`
- `AGENTS.md`

## Working principle
Important context must be persisted in the repo so that new agents, future sessions, and different tools can understand:
- why the project exists
- what we currently believe
- which decisions were made
- which assumptions are still open

## Current app slice
The repo now contains a first `Next.js` prototype focused on the riskiest MVP loop:
- mobile-friendly card image input
- simulated OCR hint extraction
- simulated candidate matching UI
- groundwork for real `Tesseract.js` plus `Pokemon TCG API` integration

## Local development
```bash
npm install
npm run dev
```

Open `http://localhost:3000` on desktop or phone.

## MCP setup
- The repo includes a project-level MCP config in `.mcp.json` for the official `next-devtools-mcp` server.
- The app was upgraded to `Next.js 16` because the official Next.js MCP server requires Next 16 or newer.
- React docs are available through the already configured `context7` MCP server using the official library ID `/reactjs/react.dev`.

## MCP usage convention
- Use `next-devtools-mcp` first for `Next.js` questions that depend on project structure or framework behavior in this app.
- Use `context7` for `React` questions, with `/reactjs/react.dev` as the default official source.
- Use `context7` for third-party library docs unless the project later adds a more specific official MCP server.
- If guidance affects architecture or recurring team practice, persist the conclusion in repo docs.
