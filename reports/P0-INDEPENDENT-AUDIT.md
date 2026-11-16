# Independent Technical Review — Phase P0

**Audit date:** 2026-11-16  
**Decision:** **BLOCKED**

## A. Executive Summary

The five supplied PowerPoint decks were independently inspected at the OOXML slide level. Their counts are correct: Slot 1 **35**, Slot 2 **35**, Slot 3 **32**, Slot 4 **32**, Slot 5 **23**, total **157**. The slide inventory and traceability table each contain 157 numbered entries, and the slot/session grouping is generally consistent with the decks.

P0 is nevertheless blocked. It presents proposed, non-existent application/checkpoint assets as ready teaching states, introduces a client-controlled `X-User-Id` value as authentication without an explicit fixture-only boundary, and attributes Task Priority to Slot 1 slides that do not mention it. The demo and lab totals also conflate explicitly labelled activities with inferred instructor/student activities.

## B. Sources Actually Inspected

- All five files in `../SLIDE-4HOURS`, including each slide XML/text payload: `SLOT 1.pptx`, `SLOT 2.pptx`, `SLOT 3 - 4HOURi.pptx`, `SLOT 4 - 4HOURS.pptx`, and `SLOT 5 - 4 HOURS.pptx`.
- P0 files: `curriculum/slide-inventory.md`, `traceability.md`, `source-conflicts.md`, `demo-inventory.md`, `lab-inventory.md`; `docs/architecture.md`, `docs/checkpoint-strategy.md`; `reports/P0-verification.md`; and `PHASE_REPORT.md`.
- Original-material structure and the Session 1–10 lab files, instructor guide, templates, and legacy `SRC_GITHUB_4_SLOTS` material. In particular, Session 7–10 requirements were checked against Labs 07–10 and the instructor guide.
- Git object database and refs directly (normal worktree Git commands reject the directory because it is owned by another Windows SID).

## C. Git Verification

`57d917b3e8a36629b5fc6da0346466654329c645` exists on `main`. Its message is `docs(p0): complete all 8 Phase P0 deliverables and inventories`; it changes the eight claimed P0 deliverables (2,628 insertions, 183 deletions). The recent object history has only `57d917b` and `2e24eb7`.

The tracked HEAD tree contains documentation only; it contains no `apps/`, `packages/`, `prisma/`, `scripts/`, `.github/`, instructor answer keys, or application implementation. No Git tags were present. Direct status inspection reported an untracked `.vscode/` directory; normal `git status --short` could not be run because of Git's safe-directory ownership protection. Thus the report's claim that checkpoint tags, reset automation, and executable application states already exist is unverified and contradicted by the tracked P0 tree.

## D. Slide Coverage Audit

| Slot | Deck count | Inventory entries | Traceability entries | Result |
|---|---:|---:|---:|---|
| 1 | 35 | 35 | 35 | Count and numbering match |
| 2 | 35 | 35 | 35 | Count and numbering match |
| 3 | 32 | 32 | 32 | Count and numbering match |
| 4 | 32 | 32 | 32 | Count and numbering match |
| 5 | 23 | 23 | 23 | Count and numbering match |
| **Total** | **157** | **157** | **157** | No missing or duplicate numbered entry found |

The primary titles/concepts in the inventories agree with the extracted deck text in sampled and activity slides, including all explicitly labelled LIVE DEMO/LAB/Demo Day slides. The traceability classifications are internally complete (94 CONCEPT, 16 DIAGRAM, 17 REVIEW, 12 LIVE_DEMO, 12 LAB, 6 ASSESSMENT), but those counts do not agree with the separate claimed 14 demos / 15 labs and are therefore not a reliable activity count.

**Incorrect source attribution:** no extracted Slot 1 slide text mentions `Priority`, `LOW`, `MEDIUM`, or `HIGH`. The decks describe a generic controlled change (Slide 17) and a generic Task Manager change (Lab 01, Slide 29). Task Priority is a proposed example, not a slide-required feature.

## E. Live Demo Coverage Matrix

| Slot | Explicit deck evidence | P0 inventory interpretation | Audit conclusion |
|---|---|---|---|
| 1 | Slides 16, 17 explicitly say LIVE DEMO | 2 | Supported (2) |
| 2 | Slides 16, 25, 28 explicitly say Live Demo | 3 | Supported (3) |
| 3 | Slide 16 presents Playwright MCP; slides 9/25 are activities, not labelled Live Demo | 3 | Inferred, not explicit |
| 4 | Slides 13, 19, 25 explicitly say Live Demo | 3 | Supported (3) |
| 5 | Slide 8 explicitly says LIVE DEMO; Slide 15 is a LIVE INCIDENT DRILL | 3 | One explicit demo plus an activity; observability is inferred from Slide 10 |

There are **9 explicitly titled live-demo slides**, or **10** if the Slot 5 live incident drill is counted as an instructor demonstration. The inventory's **14** is defensible only as a planning total that adds unlabelled activities (Slot 3 automation/UI, Slot 5 observability/incident); it must not be reported as a count of actual “Live Demo” slides.

For all 14 planned entries, the inventory has a slide reference, objective, commands/actions, outcome and reset field. However, every starting checkpoint, application state, command, key-file reference, and expected runtime evidence is prospective: those files/tags do not exist at HEAD. Technical prerequisites are not consistently stated (for example Node/package install, hosting credentials, Semgrep availability, browser/MCP installation, `jq`, or cloud/network access). The public URLs in `demo-inventory.md:227-228` are placeholders/unverified, not evidence of deployment.

## F. Lab Coverage Matrix

| Slot | Deck-labelled labs | Inventory entries | Audit conclusion |
|---|---:|---:|---|
| 1 | 3 | 3 | Supported |
| 2 | 3 | 3 | Supported |
| 3 | 3 | 3 | Supported |
| 4 | 3 | 3 | Supported |
| 5 | 0 labelled labs; deployment/incident activities and Demo Day | 3 | Two guided activities plus one assessment, not three labelled labs |

The inventory has 15 entries, each with objective, state, activities, deliverable and verification criterion. Follow-up work is not consistently explicit. The accurate presentation is **14 guided labs/activities plus one Demo Day assessment**, not “15 student labs.”

Required source outcomes are preserved at the planning level: Lab 4.1 calls for three fixes, Semgrep/CI evidence and regression tests; Lab 4.2 puts human review before AI and requires a quantitative comparison; Lab 4.3 calls for five seeded bugs and regression evidence; Slot 5 covers public URLs, health/logs, runbook, postmortem, M3, 7-minute demo plus 5-minute individual Q&A (12 minutes), and M4. These remain unimplemented/unverified plans, not executable evidence.

## G. Architecture Findings

The npm-workspaces React/Express/shared-Zod outline is proportionate for teaching and avoids unnecessary build tooling. Separate unit/API/E2E layers, GitHub Actions, Semgrep/npm audit, structured logs, health checks, fixtures, and deliberate-failure isolation are appropriate goals.

Material gaps: no actual workspace/package contracts, CI, Semgrep configuration, fixture/seed specification, environment variable contract, MCP compatibility fallback, health endpoint semantics, deployment/IaC, or executable migration proof exists. Rewriting Prisma's provider in place (`docs/architecture.md:107`) is fragile: it can make migration history/provider behaviour ambiguous. Prefer separate environment configuration/schema strategy validated in CI, with a documented migration rehearsal. `Render or Supabase` and `Render or Vercel` are not a deployment decision.

## H. Security Findings

`X-User-Id` is not authentication: a client can select any identity. It is acceptable only in an explicitly marked, local training fixture with a server-selected/seeded identity and a hard production startup refusal. The current architecture calls it “Authentication” and permits `X-User-Id (or Bearer token)` without defining token validation, identity provenance, route isolation, or a production auth design. P1 must not treat it as a production-ready authorization boundary.

## I. Git Checkpoint Findings

The intended separation of stable checkpoints from bug/security/incident branches is sound. It is not verified: no tags or branches other than `main` exist, and no reset, database reset, answer-key export, or recovery script is tracked. The stated reset (`git reset --hard` and `git clean -fd`) is destructive; it needs an explicit disposable-clone/worktree precondition, PowerShell and Bash implementations, and a dry-run/confirmation path. Current instructions also promise sub-10-second recovery without measured evidence. Instructor-only answer-key isolation is only a proposed directory/export process.

Task Priority is proposed for Slot 1 even though it is not deck evidence, and would pre-seed a feature that Slot 2 uses to teach controlled feature work. Keep the Slot 2 due-date feature absent from its starting checkpoint and make any Slot 1 example generic unless a curriculum owner approves priority.

## J. Findings Table

| ID | Severity | File:line | Evidence | Recommended fix |
|---|---|---|---|---|
| P0-01 | BLOCKER | `docs/architecture.md:59,128-129`; `curriculum/source-conflicts.md:101` | Client-controlled `X-User-Id` is designated authentication with no fixture/production boundary. | Specify fixture-only middleware, block it in production, and define real production identity validation before P1. |
| P0-02 | HIGH | `curriculum/source-conflicts.md:99`; `reports/P0-verification.md:63` | Actual Slot 1 Slides 17/29 do not mention Task Priority. | Remove the claim; record it as optional pending curriculum-owner approval. |
| P0-03 | HIGH | `curriculum/demo-inventory.md:1-275`; `curriculum/lab-inventory.md:227-239`; `curriculum/traceability.md:158-170` | Claims 14 demos/15 labs, while the decks evidence 9 explicit demos (10 incl. incident) and 14 guided activities + Demo Day assessment. | Separate explicit slide labels from planned supplementary activities and correct totals/classifications. |
| P0-04 | HIGH | `docs/checkpoint-strategy.md:9,26-37`; `curriculum/demo-inventory.md:10-275` | No tags, checkpoint branches, scripts, or referenced app files are in the committed tree. | Label all checkpoint/run-sheet content as design only; do not claim verified/resettable states until P1 assets and checks exist. |
| P0-05 | HIGH | `docs/checkpoint-strategy.md:34-36,47,53` | Destructive reset/clean is claimed cross-platform but has no script, safe precondition, or student/instructor separation proof. | Provide tested PowerShell/Bash scripts in a later phase, with disposable-worktree guidance and answer-key export verification. |
| P0-06 | MEDIUM | `docs/architecture.md:103-109` | Provider-rewrite approach and undecided hosting are insufficiently reproducible. | Choose deployment target and document/test a non-mutating SQLite-to-PostgreSQL migration route. |
| P0-07 | MEDIUM | `curriculum/demo-inventory.md:227-228,245-247`; `docs/architecture.md:97-101` | URLs, ports, commands, and “under 1 second”/runtime outcomes are unverified prospective claims. | Mark placeholders, list prerequisites, and verify only after implementation. |
| P0-08 | LOW | `reports/P0-verification.md:13-17,85-87`; `PHASE_REPORT.md:13-17,85-87` | “Strictly completed” conflicts with listed unresolved decisions and absent executable artifacts. | State “documentation discovery complete; implementation/checkpoint validation pending.” |

**Finding counts:** BLOCKER 1; HIGH 4; MEDIUM 2; LOW 1.

## K. Phase Gate Decision

**BLOCKED.** The source inventory is substantially complete, but security boundaries, source attribution, activity accounting, and the difference between design and verified implementation must be corrected before P1.

## L. Exact Required Corrections Before P1

1. Replace `X-User-Id` “authentication” with a fixture-only design and production-auth decision; add explicit startup/deployment safeguards.
2. Remove Task Priority as a slide-required feature or obtain a curriculum-owner decision and label it optional.
3. Reconcile traceability, demo, and lab classifications/counts; label supplementary activities separately from deck-labelled demos and Demo Day assessment.
4. Amend P0 reports/checkpoint material to state that tags, reset scripts, application files, deployments, and test results are planned—not verified.
5. Decide the production host/database path and write a reproducible, non-destructive Prisma migration/checkpoint plan with prerequisites.
6. Define safe checkpoint recovery and instructor-only solution publication controls before creating teaching checkpoints.

## M. Explicitly Unverified Items

- Normal Git worktree status (blocked by ownership trust); direct status did show untracked `.vscode/`.
- The claimed clean working tree at the time of the original report.
- All runtime behavior, tests, CI, Semgrep/npm audit results, `npm` commands, reset duration, database migrations, Playwright MCP operation, and seeded bugs.
- Public URLs, production PostgreSQL, health endpoint, Pino logs, and incident recovery.
- Speaker notes/visual-only PowerPoint content not represented in slide XML text.
- Course workbook/rubric cell-level details; the source files were identified and supporting Session materials checked, but the `.xlsx` was not programmatically rendered in this read-only audit.
