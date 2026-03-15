# dexr Product Blueprint v0.1

## Summary
`dexr` is a mobile-first system for cataloging a Pokemon card collection through phone-based scanning, assisted identification, and a searchable inventory. The first version should help a non-expert user reliably capture what cards exist, not maximize automation at all costs.

## Who this is for
- a parent or family member with limited Pokemon TCG knowledge
- a child with a real physical collection
- future power users who may later want value tracking or deck workflows

## Core problem
The collection currently exists only as physical cards. Without a catalog, it is hard to answer basic questions:
- What cards do we actually have?
- How many duplicates are there?
- Which cards might be valuable?
- Which cards belong together or are useful for play?

## MVP goal
Turn a pile of Pokemon cards into a trustworthy digital inventory with as little friction as possible.

## Confirmed product choices
- v1 should be a web app optimized for mobile use
- v1 should prioritize fast single-card scanning
- v1 should focus on inventory plus identification, not pricing as a primary feature

## MVP non-goal
The first version does not need to:
- fully auto-identify every card from a single photo with no user confirmation
- provide authoritative pricing for buying or selling decisions
- support advanced deck optimization
- solve every Pokemon TCG edge case from day one

## Product principles
- reliability over magic
- non-expert friendly language
- mobile-first capture
- explicit uncertainty handling
- real-world APIs over hand-maintained card data

## Primary user flow
1. Open dexr on a phone.
2. Start a scan session.
3. Photograph a card.
4. Extract visible hints from the card image.
5. Look up likely matches from real card APIs.
6. Show the top candidates with confidence cues.
7. Confirm the right card.
8. Save the result into the collection.
9. Repeat quickly for the next card.

## MVP feature slice

### 1. Collection inventory
- create a collection
- store cards as confirmed inventory items
- track quantity
- basic browse and search

### 2. Assisted card identification
- capture a card image on phone
- extract card hints using OCR and visual heuristics
- query at least one real card API
- return likely candidates
- let the user confirm or retry

### 3. Basic card detail view
- card image
- name
- set
- card number
- rarity
- supertype or category where available
- available market price fields when present

### 4. Basic collection summary
- total cards cataloged
- unique cards
- duplicates

## Explicitly deferred from v1
- collection valuation as a core surfaced feature
- advanced pricing views
- batch capture as the primary scanning mode

## Why assisted identification is the right first move
Pokemon cards have many similar-looking variants across sets, numbers, printings, rarities, promos, and languages. A wrong "automatic" match is more harmful than a fast confirm step. The MVP should optimize for trustworthy capture, not maximum autonomy.

## Likely data approach
- use OCR to extract visible clues such as name fragments, card number, and set markers
- match those clues against Pokemon card APIs
- merge or compare multiple candidate sources when useful
- preserve confidence and source data for later improvement

## Key entities
- collection
- inventory item
- scan session
- scan result
- match candidate
- canonical card record
- pricing snapshot

## Product risks
- card identification may be harder than expected for worn, foreign-language, or badly lit cards
- similar cards may produce false matches
- pricing data may be incomplete or volatile
- Pokemon TCG concepts may confuse non-expert users unless the UI explains them simply

## Success criteria for the MVP
- a non-expert can catalog cards from a phone without needing Pokemon knowledge
- most scan attempts lead to a correct card after a short confirm step
- the resulting inventory feels trustworthy enough to use as a base for future features

## Plausible phase 2 directions
- duplicate insights
- binder and box organization
- value watchlists
- collection exports
- child-friendly collection browsing
- deck-related helpers

## Open questions to resolve with the project owner
- should children also be primary users, or mostly parents?
- how important is offline or low-connectivity usage?
