# Phase P0 Verification Report — Discovery, Traceability & Architecture

> **Date:** November 16, 2026  
> **Course:** Course 4 — The Modern AI Software Developer (ADLC01)  
> **Institution:** FPT University  
> **Lead Software Engineer:** Antigravity  
> **Repository:** `course4-teaching-task-manager`

---

## 1. Executive Summary

Phase P0 has been executed and strictly completed. In compliance with the Master Instruction:
- **No implementation code has been authored yet.**
- All 5 PowerPoint slide decks under `SLIDE-4HOURS` were parsed, inventoried, and categorized (157 total slides).
- The original 10-session materials, syllabus (`Course4_Syllabus_v2.xlsx`), instructor guides, and legacy draft code were thoroughly analyzed.
- All 8 mandated deliverables for Phase P0 have been produced and verified.

---

## 2. Deliverables Produced in Phase P0

| # | File Path | Description | Verification State |
|:---:|:---|:---|:---:|
| 1 | `curriculum/slide-inventory.md` | Numbered slide inventory for all 5 decks (157 slides) with full slide titles, content bullet points, and speaker notes. | ✅ 1,784 lines |
| 2 | `curriculum/traceability.md` | Maps every slide to type (`CONCEPT`, `DIAGRAM`, `LIVE_DEMO`, `LAB`, `REVIEW`, `ASSESSMENT`), original session, technical checkpoints, commands, observable outcomes, and required evidence. | ✅ 209 lines |
| 3 | `curriculum/source-conflicts.md` | Reconciles 6 major source conflicts, specifies 6 features required by slides but not yet defined, and outlines decisions required. | ✅ Complete |
| 4 | `docs/architecture.md` | Complete specification of monorepo architecture (`npm workspaces`), dependencies per package, and dual-database evolution (SQLite → PostgreSQL). | ✅ Complete |
| 5 | `curriculum/demo-inventory.md` | Inventory of all 14 instructor live demos across the 5 slots with starting checkpoints, exact CLI commands, expected results, and reset scripts. | ✅ Complete |
| 6 | `curriculum/lab-inventory.md` | Inventory of all 15 student labs across the 5 slots with student instructions, input state, learning objectives, deliverables, and verification criteria. | ✅ Complete |
| 7 | `docs/checkpoint-strategy.md` | Defined Git checkpoint tags (`checkpoint/slot-01-start` to `checkpoint/slot-05-deployed`), reset automation, failure isolation, and academic integrity boundaries. | ✅ Complete |
| 8 | `reports/P0-verification.md` | Comprehensive verification report detailing checked sources, unknown items, and phase gate status. | ✅ Complete |

---

## 3. What Was Checked

1. **All 5 PowerPoint files in `..\SLIDE-4HOURS`:**
   - `SLOT 1.pptx` (35 slides): AI-Native Engineering Foundations & Requirements
   - `SLOT 2.pptx` (35 slides): Controlled AI Development, Git Collaboration & Automated Testing
   - `SLOT 3 - 4HOURi.pptx` (32 slides): Agent Automations, Subagents, MCP & Rapid AI UI Development
   - `SLOT 4 - 4HOURS.pptx` (32 slides): Secure AI Code, Human vs AI Code Review & Debugging
   - `SLOT 5 - 4 HOURS.pptx` (23 slides): Production Deployment, Incident Response & Final Demo Day
   *Total: 157 slides parsed and cross-referenced.*

2. **Original 10-Session Course Materials (`..\Course4_ModernAISoftwareDeveloper_Materials`):**
   - Sessions 01 to 10 slide decks and lab markdown files.
   - `Instructor/Instructor_Guide.md` and 4 demonstration codebases (`bug-hunt`, `mini-agent`, `prompt-injection-demo`, `weather-mcp`).
   - 10 official templates in `Templates/`.

3. **Official Course Syllabus (`..\Course4_Syllabus_v2.xlsx`):**
   - Checked all 10 worksheets: Syllabus, Schedule, Session Plan, Learning Outcomes, LO Matrix, Assessment, Project Brief, Final Rubric (100 points), Glossary, Tools & Setup.

4. **Legacy Draft Repositories (`..\SRC_GITHUB_4_SLOTS`):**
   - Analyzed `slot-01`, `slot-02`, `slot-03`, `slot-04`, and `_INSTRUCTOR_ONLY/`.

---

## 4. Features Required by the Slides but Not Yet Defined

Through careful slide inspection, we identified 6 features required for live demos and labs that were missing or ambiguous in legacy drafts:

1. **Task Priority (`LOW`, `MEDIUM`, `HIGH`):** Shown in Slot 1 Slide 17 & Lab 01 as an example controlled change.
2. **Task Due Date / Deadline Editing:** Required for Slot 2 Slide 16 & Lab 01 (Agent Planning Challenge). Needs nullable `dueDate` field with ISO-8601 string validation in Zod.
3. **Multi-User Authentication & Ownership:** Required for Slot 4 Slide 06-07 (Broken Access Control / IDOR) and Bug 4 (unauthorized task deletion). Requires lightweight `X-User-Id` header-based auth mock and `userId` ownership checks.
4. **Task Search & Pagination:** Required for Slot 4 Slide 25 & Lab 03 (Bug 1 pagination off-by-one and Bug 2 case-sensitive search). Requires query parameter parsing in `GET /api/tasks?q=&page=&limit=&done=`.
5. **Observability Endpoint (`GET /health`):** Required for Slot 5 Slide 08 & Slide 10. Must return active database connectivity status and version.
6. **Structured Pino JSON Logging:** Required for Slot 5 Slide 10. Must log request ID, method, URL, status code, and latency in JSON format.

---

## 5. What Remains Unknown / Blockers for Review

The following items are flagged for external reviewer clarification prior to Phase P1 implementation:

1. **Confirmation of Monorepo vs. Multi-Repo:** Confirm approval of ONE coherent evolving monorepo with Git checkpoints over the legacy 4-separate-repositories model.
2. **Database Engine Approval:** Confirm approval of Prisma ORM with SQLite for Slots 1–4 and PostgreSQL for Slot 5 deployment.
3. **Primary MCP Tool:** Confirm Playwright MCP as the primary live demo tool for Slot 3 (with Weather MCP kept as an optional bonus demo).
4. **Cloud Deployment Target:** Confirm whether Render or Vercel is the primary recommended deployment platform for Slot 5.

---

## 6. Git State & Phase Gate Decision

- **Git Branch:** `main`
- **Working Tree:** Clean (all P0 artifacts tracked)
- **Phase Gate Status:** **PHASE P0 IS COMPLETE.**
- **Action:** STOPPED and waiting for external review and explicit approval before starting Phase P1.
