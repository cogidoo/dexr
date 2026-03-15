# Code Review Process

## Purpose
This project uses a deliberate external-reviewer pass so important issues are caught from a perspective separate from the implementation pass.

## Review mindset
Review should default to a code-review mindset:
- identify bugs
- identify regressions
- identify risky assumptions
- identify product misunderstandings
- identify weak or missing tests
- identify places where complexity is not justified

## Priority order
When reviewing, prioritize:
1. correctness
2. data reliability
3. user-facing workflow risks
4. maintainability
5. polish

## Domain-specific checks for dexr
- Is the card-identification logic likely to confuse similar cards, variants, promos, or set printings?
- Are Pokemon card claims backed by a real source or API?
- Are pricing assumptions presented carefully instead of as guaranteed truth?
- Does the workflow support user confirmation when confidence is low?
- Does the UX work for a non-expert user?

## Output format
Reviews should be concise and actionable.

Preferred structure:
- findings first, ordered by severity
- open questions or assumptions second
- short summary last

If no findings are discovered, say so explicitly and mention residual risks or missing validation.

## When to persist a review
Create or update a file in `docs/reviews/` when:
- the review uncovered important findings
- the review changed implementation direction
- the review clarified a reusable rule
- future agents would benefit from seeing the critique

## Suggested review triggers
- after product-blueprint changes
- after architecture choices
- before merging a major feature
- after implementing scanning or card-matching logic
- before integrating a new external API
