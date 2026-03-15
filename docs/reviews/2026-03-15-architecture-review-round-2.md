# Architecture Review Round 2

## Scope reviewed
- `docs/architecture/architecture-proposal-v0.1.md`
- `docs/repo/product-blueprint.md`

## Findings

### Medium: The scan flow has no explicit escape hatch when OCR fails badly
The current architecture describes capture, OCR, API matching, and confirmation, but it does not define a manual recovery path if OCR fails to extract useful hints from glare, blur, or tiny print. For a non-expert user, "retry" alone is not enough. The product should explicitly support a fallback like manual search by name fragment, set browsing, or guided card-number entry.

References:
- `docs/architecture/architecture-proposal-v0.1.md` lines 96-115
- `docs/repo/product-blueprint.md` lines 109-112

### Medium: The architecture is local-first, but the scan flow still implicitly depends on live network access
The current proposal stores data locally and avoids paid runtime, but the identification flow still relies on live card API queries during scanning. That is fine, but it should be stated explicitly because the product blueprint still leaves low-connectivity importance open. Without this clarification, "local-first" can sound more offline-capable than the current design really is.

References:
- `docs/architecture/architecture-proposal-v0.1.md` lines 20-23
- `docs/architecture/architecture-proposal-v0.1.md` lines 33-39
- `docs/architecture/architecture-proposal-v0.1.md` lines 76-78
- `docs/repo/product-blueprint.md` lines 122-124

### Medium: Local-only storage needs an explicit anti-data-loss strategy, not just export/import
The proposal mentions export/import, but not when or how users will be encouraged to back up their collection. Browser data can be cleared, devices can be replaced, and local-only storage can create silent fragility. A minimal v1 should define at least one anti-data-loss measure such as backup prompts, export reminders, or a visible "data lives on this device" warning.

References:
- `docs/architecture/architecture-proposal-v0.1.md` lines 20-23
- `docs/architecture/architecture-proposal-v0.1.md` lines 66-69
- `docs/architecture/architecture-proposal-v0.1.md` lines 191-194

### Low: Product docs still leak pricing into v1 more than the current scope intends
The blueprint says v1 should focus on inventory plus identification and defer pricing as a primary feature, but it still includes market price fields in the basic card detail view and a `pricing snapshot` entity in the key model list. That is not a blocker, but it weakens scope discipline.

References:
- `docs/repo/product-blueprint.md` lines 21-24
- `docs/repo/product-blueprint.md` lines 66-73
- `docs/repo/product-blueprint.md` lines 94-101

## Open questions
- Do we want a manual fallback path in the very first scanning slice?
- Is "network required for identification" acceptable for v1?
- What is the lightest acceptable backup UX for a local-first product?

## Summary
The revised architecture is directionally much stronger than the previous paid-runtime version. The main remaining risks are not about technology choice, but about operational resilience: recovery when OCR fails, clarity about network dependence, and protecting users from local-only data loss.

## Disposition
- OCR fallback finding: accepted and incorporated
- network-dependence clarity finding: accepted and incorporated
- local data-loss finding: accepted and incorporated
- pricing-scope leak finding: accepted and incorporated
