# dexr Vision

## Problem
A growing Pokemon card collection is hard to understand without a catalog. It is difficult to know what cards exist, whether there are duplicates, which cards may be valuable, and what can be used for play or deck building.

## User reality
- The primary user is not a Pokemon TCG expert.
- The fastest input method should be a phone-based scanning flow.
- The system must tolerate uncertainty and help the user confirm likely matches.

## Product vision
Create a mobile-first collection system that turns a pile of Pokemon cards into a reliable, searchable inventory.

## MVP vision
The first version should let a user:
- scan or photograph a card with a phone
- extract identifying hints from the image
- match likely cards using public card APIs
- confirm the correct card
- save the card into a collection inventory
- view a basic collection summary

## Product principles
- Reliability over magic: a confirmed match is better than a wrong automatic match.
- Plain-language guidance: explain card concepts without assuming prior TCG knowledge.
- Real data over guesswork: use established APIs for card metadata and pricing.
- Extensible foundation: inventory first, valuation and deck workflows later.

## Future directions
- estimated collection value
- duplicate detection
- storage organization by binder/box/page
- wishlist and trading workflows
- deck-building support
- alerts for potentially valuable cards
