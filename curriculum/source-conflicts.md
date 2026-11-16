# Course 4 Source Conflicts, Ambiguities & Required Decisions

> **Context:** Reconciling discrepancies across the approved `SLIDE-4HOURS` PowerPoint files (Primary Source of Truth), the original 10-session materials (`Course4_ModernAISoftwareDeveloper_Materials`), the official syllabus (`Course4_Syllabus_v2.xlsx`), and the legacy multi-repo draft (`SRC_GITHUB_4_SLOTS`).  
> **Status:** Phase P0.1 Corrected Design.

---

## 1. Major Source Conflicts & Proposed Resolutions

### Conflict 1: Repository Delivery Strategy (4 Disconnected Repositories vs. 1 Evolving Monorepo)

- **Sources Involved:**
  - `SRC_GITHUB_4_SLOTS/_INSTRUCTOR_ONLY/PUBLISHING_GUIDE.md` (Advocated publishing 4 separate template repos: `slot-01`, `slot-02`, `slot-03`, `slot-04`).
  - `SLOT 1.pptx` Slide 02 & Slide 04 ("One Course. Five Slots. One Real Project. ... Teaching Repository: An instructor-provided Task Manager supports guided learning").
  - Master Instruction Section 2 ("The instructor uses ONE Teaching Task Manager repository across all slots. Student teams maintain separate, independent project repositories").
- **Nature of Conflict:**
  Maintaining four disjointed repositories creates severe synchronization overhead, duplicated dependencies, diverging schemas, and confusing Git histories for students and instructors.
- **Resolution:**
  Build **ONE coherent monorepo** (`course4-teaching-task-manager`). Model the pedagogical evolution across the five teaching slots using clean, well-documented **Git checkpoints/tags** (`checkpoint/slot-01-start`, `checkpoint/slot-02-start`, etc.). Instructors can instantly reset or advance the teaching repo with a single command.

---

### Conflict 2: Slot 5 Curriculum Definition and Session Squeezing

- **Sources Involved:**
  - `SRC_GITHUB_4_SLOTS/_INSTRUCTOR_ONLY/CURRICULUM_MAP.md` (Packed S5+S6+S7 into Slot 3, S8+S9+S10 into Slot 4, and turned Slot 5 into an ad-hoc unguided assessment with `CR-01`).
  - `SLIDE-4HOURS` Decks (Priority 1):
    - `SLOT 3 - 4HOURi.pptx`: Sessions 05 (Automations/Subagents/MCP) + 06 (Rapid UI/MVP).
    - `SLOT 4 - 4HOURS.pptx`: Sessions 07 (Security & SAST) + 08 (Code Review & Debugging).
    - `SLOT 5 - 4 HOURS.pptx`: Sessions 09 (Deployment & Operations) + 10 (Demo Day & Defense).
- **Nature of Conflict:**
  Packing 3 dense topics into 4 hours (e.g. S5+S6+S7) makes in-depth labs impossible, leaves no time for security triage, and completely distorts Slot 5's dedicated focus on production operations and final project defenses.
- **Resolution:**
  Follow the **approved 5-slot slide structure (Priority 1)** strictly:
  - **Slot 1:** Foundations & Requirements (S1 + S2)
  - **Slot 2:** Controlled AI Dev, Git & Testing (S3 + S4)
  - **Slot 3:** Automations, Subagents, MCP & UI (S5 + S6)
  - **Slot 4:** Security, Review & Debugging (S7 + S8)
  - **Slot 5:** Production Deployment, Incident Response & Final Demo Day (S9 + S10)

---

### Conflict 3: Database & Persistence Layer Architecture

- **Sources Involved:**
  - `Course4_ModernAISoftwareDeveloper_Materials/Session01-04`: Informal in-memory stores and unstructured JSON.
  - `Course4_Syllabus_v2.xlsx`: "Database: SQLite or Supabase free tier".
  - Master Instruction Section 3: "Prisma, SQLite for early local teaching checkpoints, PostgreSQL for production deployment".
- **Nature of Conflict:**
  In-memory stores do not teach students real data modeling, persistence constraints, schema migrations, or how coding agents interact with typed ORMs. Conversely, claiming SQLite and PostgreSQL migration histories can be swapped by simply editing the provider string is fragile and breaks Prisma migration logs.
- **Resolution:**
  Standardize on **Prisma ORM** with **separate schema and environment definitions**:
  - **Slots 1–4 (Local Development):** Prisma configured with **SQLite** (`prisma/dev.db`, using `prisma/schema.sqlite.prisma`). Zero cloud setup, completely self-contained, reproducible seeding via planned `npm run db:seed`.
  - **Slot 5 (Production Deployment):** Prisma configured with **PostgreSQL on Neon** (using `prisma/schema.postgres.prisma` and `DATABASE_URL`). A dedicated migration rehearsal runs in CI/staging before production deployment.

---

### Conflict 4: Location and Isolation of the 5 Seeded Bugs

- **Sources Involved:**
  - `Course4_ModernAISoftwareDeveloper_Materials/Instructor/demos/bug-hunt`: Isolated in a standalone folder with a separate 80-line mini Express script.
  - `SLOT 4 - 4HOURS.pptx` Slides 25 & 29: Describes the Bug Hunt as an exercise where students hunt 5 bugs in the training app.
- **Nature of Conflict:**
  Having the bug hunt in an unrelated standalone script breaks continuity with the Task Manager application that students have been learning across Slots 1–3. However, committing broken bugs directly to `main` would break the stable teaching repo.
- **Resolution:**
  Isolate the 5 seeded bugs onto a dedicated training Git checkpoint branch: `checkpoint/slot-04-bug-hunt`. The bugs will be reproduced in the actual Task Manager API routes/services, and verified by reproducible tests in `tests/bug-hunt`. Stable `main` remains clean and reliable.

---

### Conflict 5: Tool & MCP Demonstration Focus (Weather MCP vs. Playwright MCP)

- **Sources Involved:**
  - `Course4_ModernAISoftwareDeveloper_Materials/Session05/Lab05`: Provides a weather MCP server script (`weather-mcp-server.mjs`).
  - `SLOT 3 - 4HOURi.pptx` Slide 16: "Live Demo: Playwright MCP — Connect a compatible Playwright MCP server, inspect available browser tools, open the running Task Manager, execute an approved UI interaction".
- **Nature of Conflict:**
  A weather tool is decoupled from the course's Task Manager web application.
- **Resolution:**
  Align with `SLOT 3` Slide 16: Use **Playwright MCP** as the core live demo to inspect and interact with `apps/web`. Keep the Weather MCP script in `instructor/demos/weather-mcp/` as an optional extension/bonus exercise as documented in the syllabus.

---

### Conflict 6: Monorepo Layout & Workspace Conventions

- **Sources Involved:**
  - `SRC_GITHUB_4_SLOTS`: Used simple `client` and `server` folders.
  - Master Instruction Section 5: Mandates `apps/web`, `apps/api`, `packages/shared`, `prisma`, `tests`, `curriculum`, `labs`, `instructor`, `docs`, `scripts`, `.claude`, `.github/workflows`.
- **Nature of Conflict:**
  Simple two-folder layout lacks a shared package for cross-tier type definitions and Zod validation schemas.
- **Resolution:**
  Implement the full educational monorepo architecture mandated by Section 5, ensuring `packages/shared` exports schemas used by both frontend (`apps/web`) and backend (`apps/api`).

---

## 2. Features Required by Slides vs. Optional Demonstration Examples

Following independent audit verification, the functional capabilities shown across the decks are categorized into **Mandatory Slide Requirements** versus **Optional Proposed Examples**:

| Feature | Referencing Slides | Status in Curriculum | Architectural Resolution |
|:---|:---|:---|:---|
| **1. Task Priority (`LOW`, `MEDIUM`, `HIGH`)** | `SLOT 1` Slide 17 & Slide 29 ask for a *generic controlled change*. Priority is NOT in the slide text. | **Optional Demonstration Example (Slot 2 only)** | **Not in Slot 1.** In Slot 2, instructor may use Priority as a clean example of an AI-assisted schema addition. Must not be pre-implemented in Slot 1. |
| **2. Task Due Date / Deadline Editing** | `SLOT 2` Slide 16, `SLOT 2` Slide 30 | **Mandatory Slide Requirement (Slot 2)** | Core scenario for Slot 2 Live Demo 1 and Lab 01 (Agent Planning Challenge). Add nullable `dueDate` field with ISO-8601 validation in Slot 2. Must be completely absent from Slot 1 starting state. |
| **3. Simulated Identity for Ownership Checks (`X-User-Id`)** | `SLOT 4` Slide 06-07 (IDOR), Slide 25 (Bug 4) | **Mandatory Training Fixture (Slot 4 only)** | **NOT Authentication.** Slots 1–3 and Slot 5 production are single-tenant/team board with NO authentication. In Slot 4, a dev/test-only fixture simulates identity. Explicitly blocked in production with hard startup guard. |
| **4. Task Search & Pagination** | `SLOT 4` Slide 25 (Bug 1 & Bug 2) | **Mandatory Slide Requirement (Slot 4)** | Seeded Bug 1 (pagination off-by-one) and Bug 2 (case-sensitive search) require query parameters. Planned for `apps/api` with `TaskQuerySchema`. |
| **5. Health Endpoint (`GET /health`)** | `SLOT 5` Slide 08 & Slide 10 | **Mandatory Slide Requirement (Slot 5)** | Observability endpoint returning active database connectivity (`SELECT 1`), uptime, and version. |
| **6. Structured Pino JSON Logging** | `SLOT 5` Slide 10 | **Mandatory Slide Requirement (Slot 5)** | Structured JSON logs capturing `reqId`, `method`, `url`, `status`, and `responseTimeMs` for observability. |

---

## 3. Decisions Reconciled for Phase P1

1. **Repository Architecture:** ONE coherent evolving monorepo (`course4-teaching-task-manager`) with Git checkpoints.
2. **Database Reference Architecture:**
   - Local Dev: SQLite (`prisma/dev.db`)
   - Production Cloud: Neon PostgreSQL (reference) or Supabase (alternative)
   - Independent schema files (`schema.sqlite.prisma` and `schema.postgres.prisma`) to avoid provider rewriting.
3. **Deployment Reference Stack:**
   - Web: Vercel (Edge SPA)
   - API: Render (Web Service)
   - Database: Neon (Serverless PostgreSQL)
4. **Security Boundary:**
   - Single-user/team board for Slots 1–3 and Slot 5 production.
   - `X-User-Id` is strictly a development/test simulated identity fixture for Slot 4 vulnerability reproduction, never authentication, and halted if executed in production.
5. **Slot 1 Baseline Scope:**
   - Basic tasks: `id`, `title`, `completed`, `createdAt`, `updatedAt`.
   - No Priority, no Due Date, no Auth in Slot 1.
