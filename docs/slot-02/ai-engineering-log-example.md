# AI Engineering Log Example: Controlled Title Change

## Context

- Requirement: enforce a 120-character task-title limit while preserving whitespace rejection.
- Starting checkpoint: `checkpoint/slot-02-start`.
- Branch: `feat/slot-02-controlled-ai-engineering`.

## Agent Proposal Review

The first proposal included due dates and a component redesign. Those items did not support the title acceptance criteria, so the reviewer rejected them. The approved plan changed the shared schema, existing inputs, targeted tests, and CI evidence only.

## Test-First Evidence

The red checkpoint intentionally orders validation incorrectly so a whitespace-only API title becomes an empty persisted title. A regression test asserts HTTP 400 and an unchanged database row count. The stable branch restores trim-before-minimum validation and passes the full suite.

## Reviewer Notes

- Kept one shared validation rule for client and server.
- Added request-size limiting as a compensating control for the unresolved Zod advisory.
- Did not weaken the existing whitespace tests.
- Did not claim a GitHub-hosted workflow result because nothing was pushed.
