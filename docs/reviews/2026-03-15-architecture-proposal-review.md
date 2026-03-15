# Architecture Review: Proposal v0.1

## Scope reviewed
- initial draft of `docs/architecture/architecture-proposal-v0.1.md`

## Findings

### Medium: Runtime AI dependency conflicts with the project's budget constraint
The initial proposal leaned on OpenAI runtime vision. That is technically strong, but it does not fit a v1 constraint of no paid runtime and no use of ChatGPT Pro as application infrastructure.

### Medium: Auth is still underdefined for a collection product
The architecture names `Supabase Auth` as optional, but inventory products usually become more valuable once users expect persistence across sessions and devices. This should be resolved before implementation starts, because it affects data ownership and onboarding.

### Medium: Image retention policy is currently too vague
Keeping card images can materially help debugging and future model improvements, but it also affects storage costs and user expectations. The product should decide whether images are temporary operational artifacts or part of the collection record.

### Low: TCGdex role should stay secondary until the matching logic proves it adds measurable value
Using two sources is sensible, but dual-source logic can add complexity early. The implementation should start with one primary matching path and add the second source only where it improves recall or metadata quality.

## Open questions
- Is cross-device continuity important enough that local-first storage will feel too limiting?
- Will browser OCR quality be good enough on real child-owned cards?

## Summary
The initial proposal had a strong separation between clue extraction and API-backed card identity, but it overshot the project's cost constraint. The revised architecture should move toward local-first OCR and direct API matching while keeping auth, sync, and paid AI augmentation out of v1.

## Disposition
- runtime AI dependency finding: accepted and incorporated
- auth ambiguity finding: accepted and incorporated for v1
- image retention finding: accepted and incorporated for v1
- TCGdex scope finding: accepted and incorporated
