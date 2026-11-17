# Final Project Engineering Report (Milestone M4)

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Team Name:** [Team Name]  
> **Project Title:** Course 4 Task Manager — AI-Engineered Production Task Platform  
> **Repository:** [GitHub URL]  
> **Release Tag:** `v1.0`  
> **Live Web URL:** [https://your-team-app.vercel.app]  
> **Live API URL:** [https://your-api.onrender.com]  
> **Document Constraints:** Strictly maximum 6 pages (excluding appendices).

---

## 1. Executive Summary & Problem Solved (Approx. 0.75 Page)
- **Target Persona:** Engineering teams requiring a clean, zero-friction task management workspace with verified input validation and responsive accessibility.
- **Core Value Proposition:** Combines high-speed client interactions with robust server-side validation, observable cloud telemetry, and automated verification.
- **Key Milestones Achieved:**
  - *M1 (Slot 1–2):* PRD, specifications, shared Zod schemas, baseline React SPA + Express API + SQLite.
  - *M2 (Slot 3):* Multi-mode user flows, automated subagent PR review, Playwright MCP testing.
  - *M3 (Slot 4–5):* SAST scanning with Semgrep, isolated security fixtures, cloud deployment to Vercel/Render/Neon, structured Pino logging, and operational runbook.
  - *M4 (Slot 5):* Production release `v1.0`, blameless postmortem drill, and Demo Day oral defense.

---

## 2. System Architecture & AI Engineering Workflow (Approx. 1.25 Pages)
- **Monorepo Structure:**
  - `packages/shared`: Shared types, constants, and Zod schemas (`CreateTaskSchema`, `UpdateTaskSchema`).
  - `apps/api`: Express REST API, Prisma ORM, fail-fast configuration, structured logging.
  - `apps/web`: React 18 SPA, Vite, Tailwind CSS, WCAG 2.1 AA accessible controls.
  - `prisma`: SQLite schema for local dev/testing, PostgreSQL schema for production.
- **AI-Human Collaborative Workflow:**
  - *Specification-First Prompting:* Feeding explicit Zod schemas and user stories into AI coding agents before generating code.
  - *Context Boundary Control:* Restricting agent edits to single-file scopes via `AGENTS.md`.
  - *Human-First, AI-Second Code Review:* Reviewing PR diffs manually for architectural coherence before running AI review passes.

---

## 3. Verification, Testing & CI/CD Pipeline (Approx. 1.0 Page)
- **Automated Test Matrix:**
  - *Unit & Schema Tests:* 10 tests verifying Zod boundary conditions, whitespace rejections, and priority limits.
  - *API Integration Tests:* 31 tests verifying HTTP status codes, error sanitization, and database query executions.
  - *Web Component Tests:* 4 tests verifying React component rendering and status badges.
  - *E2E Browser Tests:* 3 Playwright scenarios verifying full browser CRUD flows, keyboard navigation, and status filtering.
  - *Security & Bug Hunt Tests:* 19 tests verifying ownership checks, prompt injection delimiters, and the 5 seeded bugs.
  - **Total Automated Coverage:** 64 automated tests passing (100% pass rate).
- **GitHub Actions CI Pipeline:**
  - Executes on all pull requests to `main`.
  - Workflow steps: Checkout → Setup Node.js → Cache dependencies → Build shared package → Typecheck (`tsc --noEmit`) → Lint → Run test suite → Verify Playwright E2E.

---

## 4. Security, SAST & Code Review Findings (Approx. 1.0 Page)
- **Static Application Security Testing (SAST):**
  - Configured Semgrep rules scanning for IDOR vulnerabilities, raw exception stack disclosures, and dangerous DOM injections (`dangerouslySetInnerHTML`).
- **Prompt Injection Defense Architecture:**
  - Enforced strict XML encapsulation (`<user_data>`), length bounds (120 chars), and breakout tag stripping to prevent instruction confusion in AI agent workflows.
- **Cross-Team Code Review Exercise:**
  - Investigated a 160-line simulated PR diff.
  - Human review caught subtle timezone offset bugs and negative reminder intervals that naive AI code generation overlooked.
  - AI review efficiently flagged syntax oversights and unused imports.

---

## 5. Production Deployment, Health & Incident Operations (Approx. 1.0 Page)
- **Cloud Infrastructure Configuration:**
  - Database: Neon Serverless PostgreSQL with connection pooling.
  - Backend: Render Web Service with fail-fast environment validation and restricted CORS.
  - Frontend: Vercel Vite SPA connected to backend via HTTPS.
- **Observability Architecture:**
  - `GET /health` issues an active `SELECT 1` query to verify database connectivity and returns latency in milliseconds.
  - Structured Pino JSON logs output request ID, method, status, and duration to standard output.
- **Incident Response Drill & Postmortem:**
  - Successfully executed a 25-minute simulated database outage drill.
  - Followed `docs/runbook.md`, diagnosed the incident within 4.5 minutes via `/health` and structured logs, and restored service in 12 minutes.
  - Documented findings in `docs/postmortem-drill.md`.

---

## 6. Individual Contributions & Self-Reflections (Approx. 1.0 Page)

| Team Member | Assigned Responsibilities | Key PRs / Commits Owned | Self-Reflection on AI Engineering |
|:---|:---|:---|:---|
| **Member 1 (Lead)** | Architecture, Monorepo Setup, CI/CD, Deployment | PR #1, PR #8, Tag `v1.0` | Learned that specifying constraints upfront saves hours of AI hallucinations. |
| **Member 2 (Backend)** | Express API, Prisma PostgreSQL, Health Check, Fail-Fast | PR #3, PR #7, Config | Discovered that AI often forgets fail-closed security unless explicitly prompted. |
| **Member 3 (Frontend)** | React UI, Tailwind, Accessibility, State Filtering | PR #2, PR #5, E2E | Used AI effectively for accessible markup and CSS styling iteration. |
| **Member 4 (QA/Security)** | Semgrep SAST, Bug Hunt, Incident Drill, Postmortem | PR #4, PR #6, Runbook | Verified that automated tests are the only reliable safety net for AI-generated code. |
