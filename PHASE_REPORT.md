# Phase P0 Verification Report — Discovery, Traceability & Architecture

> **Date:** November 16, 2026  
> **Course:** Course 4 — The Modern AI Software Developer (FPT University)  
> **Author:** Lead Software Engineer  
> **Target System:** `course4-teaching-task-manager`

---

## 1. Executive Summary

Phase P0 has been completed successfully. We performed a comprehensive inventory and deep analysis of all course materials, resolved core architectural ambiguities, mapped all 157 slides from the five 4-hour slot PowerPoint decks, defined the unified monorepo architecture, and formulated a reliable Git checkpoint strategy.

In accordance with Section 9 of the Master Instruction, **no implementation code has been authored yet**. All foundational requirements, technical references, and pedagogical dependencies have been formalized and verified.

---

## 2. Source Files Inspected & Verified

The following primary and secondary source files were read, parsed, and indexed:

1. **Approved Primary Slot Slide Decks (`D:\FPT\project\Course4_ModernAISoftwareDeveloper_Materials1\SLIDE-4HOURS`):**
   - `SLOT 1.pptx` (35 slides) — AI-Native Engineering Foundations & Requirements
   - `SLOT 2.pptx` (35 slides) — Controlled AI Development, Git Collaboration & Automated Testing
   - `SLOT 3 - 4HOURi.pptx` (32 slides) — Agent Automations, Subagents, MCP & Rapid AI UI Development
   - `SLOT 4 - 4HOURS.pptx` (32 slides) — Secure AI Code, Human vs AI Code Review & Debugging
   - `SLOT 5 - 4 HOURS.pptx` (23 slides) — Production Deployment, Incident Response & Final Demo Day
   - **Total:** 157 slides fully inventoried and categorized.

2. **Original 10-Session Course Materials (`D:\FPT\project\Course4_ModernAISoftwareDeveloper_Materials1\Course4_ModernAISoftwareDeveloper_Materials`):**
   - `Session01/Lab01_From_Prompt_to_Running_App.md` & `Session01_From_Prompt_to_Running_App.pptx`
   - `Session02/Lab02_Specs_and_Agent_Context.md` & `Session02_Context_Is_Everything.pptx`
   - `Session03/Lab03_Plan_Build_Verify.md` & `Session03_Plan_Build_Verify.pptx`
   - `Session04/Lab04_Testing_with_AI.md` & `Session04_Testing_with_AI.pptx`
   - `Session05/Lab05_Extending_Your_Agent.md` & `Session05_Extending_Your_Agent.pptx`
   - `Session06/Lab06_Rapid_UI_and_MVP.md` & `Session06_Rapid_UI_and_MVP.pptx`
   - `Session07/Lab07_Secure_AI_Code.md` & `Session07_Secure_AI_Code.pptx`
   - `Session08/Lab08_Code_Review_and_Debugging.md` & `Session08_Code_Review_and_Debugging.pptx`
   - `Session09/Lab09_Deploy_and_Operate.md` & `Session09_Ship_It_Deploy_and_Operate.pptx`
   - `Session10/Lab10_Demo_Day.md` & `Session10_Demo_Day.pptx`
   - `Instructor/Instructor_Guide.md` and all 4 demo packages: `bug-hunt/`, `mini-agent/`, `prompt-injection-demo/`, `weather-mcp/`
   - `Templates/` (AI_Engineering_Log, PRD, PR, Review_Comparison, Runbook, Postmortem, etc.)

3. **Official Course Syllabus (`Course4_Syllabus_v2.xlsx`):**
   - 10 sheets analyzed: Syllabus overview, Schedule, Session Plan, Learning Outcomes, LO Matrix, Assessment weights, Project Brief, Final Rubric (100 points), Glossary, Tools & Setup.

4. **Legacy Multi-Repo Draft (`SRC_GITHUB_4_SLOTS`):**
   - `_INSTRUCTOR_ONLY/` (`ANSWER_KEY.md`, `CURRICULUM_MAP.md`, `PUBLISHING_GUIDE.md`, `SLOT_05_INSTRUCTOR_ASSESSMENT_TEMPLATE.md`)
   - `slot-01-context-requirements/`, `slot-02-plan-test-verify/`, `slot-03-ui-agent-security/`, `slot-04-review-deploy-operate/`

---

## 3. P0 Deliverables Generated

The following core specification documents have been authored and placed in `curriculum/`:

1. **`curriculum/traceability.md`:**
   - Complete 157-slide matrix.
   - Categorization: `CONCEPT`, `DIAGRAM`, `LIVE_DEMO`, `LAB`, `REVIEW`, `ASSESSMENT`.
   - Exact mapping from the 5 slots to original Sessions 01–10.
   - For every Live Demo and Lab: starting checkpoint, CLI commands, source files, expected observable outcome, and required evidence.

2. **`curriculum/source-conflicts.md`:**
   - Identified and resolved 6 critical conflicts between the slide decks, syllabus, legacy draft, and master instruction:
     1. Repository delivery: 4 disconnected repos vs. 1 evolving monorepo with Git checkpoints.
     2. Slot 5 allocation: Session squeezing vs. dedicated Deployment/Observability/Demo Day.
     3. Persistence layer: In-memory arrays vs. unified Prisma (SQLite local → PostgreSQL production).
     4. Bug hunt isolation: External script vs. isolated branch on Task Manager (`checkpoint/slot-04-bug-hunt`).
     5. MCP tool demo: Standalone weather vs. Playwright MCP UI automation.
     6. Directory layout: Generic client/server vs. approved `apps/web`, `apps/api`, `packages/shared`.

3. **`curriculum/repository-architecture.md`:**
   - Formal specification of the `npm workspaces` monorepo layout.
   - Architectural roles for `apps/web`, `apps/api`, `packages/shared`, `prisma`, `tests`, `curriculum`, `labs`, `instructor`, `docs`, `scripts`, `.claude`, `.github/workflows`.
   - Pedagogical and technical rationale for each component of the tech stack.

4. **`curriculum/git-checkpoint-strategy.md`:**
   - Definitive checkpoint tag map (`checkpoint/slot-01-start` through `checkpoint/slot-05-deployed`).
   - Checkpoint reset automation (`npm run checkpoint:reset`).
   - Design Principle D compliance: strict isolation of intentional training failures.
   - Academic integrity controls for instructor-only assets.

---

## 4. Risks, Missing Inputs & Potential Mismatches

| Identified Risk / Mismatch | Impact | Mitigation / Proposed Path |
|:---|:---|:---|
| **Student Machine Heterogeneity (Windows vs. macOS/Linux)** | Shell scripts or path separators breaking on student PCs | All scripts in `scripts/` will be cross-platform Node.js (`.mjs`) scripts; commands in labs will provide both Bash and PowerShell syntax. |
| **Prisma Provider Switching (SQLite vs. PostgreSQL)** | Prisma traditionally requires a single provider in `schema.prisma` | Use Prisma environment variable substitution or a small build-step script (`scripts/switch-db.mjs`) to switch schema provider seamlessly between SQLite and PostgreSQL. |
| **Playwright MCP Server Compatibility** | MCP protocol versions evolve rapidly; students may struggle with local MCP configuration | Provide a pre-tested `.mcp.json` in `.claude/` and fallback headless Playwright command scripts if MCP runtime is unavailable. |
| **Free-Tier Deployment Rate Limits (Render/Vercel/Supabase)** | Cloud cold starts or verification delays during Slot 5 Demo Day | Include local production simulation via Docker / local PostgreSQL script as a guaranteed offline fallback. |

---

## 5. Verification Commands Executed

```powershell
# Verified python-pptx extraction across all 5 decks
python inspect_slides.py
# Exit Code: 0 (All 5 decks / 157 slides parsed)

# Verified syllabus worksheets
python inspect_syllabus.py
# Exit Code: 0 (10 sheets inspected)

# Generated traceability matrix
python generate_traceability_md.py
# Exit Code: 0 (209 lines written to curriculum/traceability.md)

# Verified generated curriculum files
Get-ChildItem -Path "curriculum"
# Output: git-checkpoint-strategy.md, repository-architecture.md, source-conflicts.md, traceability.md
```

---

## 6. Next Steps & Phase Gate P1 Readiness

With Phase P0 fully verified and documented, the project is ready for **Phase P1 (Scaffold, Monorepo Setup & Slot 1 Baseline)** upon external review and approval.

**PHASE P0 STATUS: COMPLETE — STOPPED AND AWAITING EXTERNAL REVIEW.**
