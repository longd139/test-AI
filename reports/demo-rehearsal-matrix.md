# Demo Rehearsal Matrix — Complete 5-Slot Instructor Verification

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Evaluation Date:** November 17, 2026 (Asia/Saigon)  
> **Scope:** Full instructor-readiness rehearsal across all 14 live-demo entries in Slots 1–5  
> **Compliance Policy:**
> - Zero fabrication of external GitHub, MCP, or production results.
> - Demonstrations requiring external cloud accounts or interactive human prompting are transparently classified.

---

## 1. Master Rehearsal Evaluation Matrix

| Demo ID | Slot & Slide Reference | Starting Checkpoint | Technical Verification Command | Actual Execution Outcome | Reset / Recovery Verified | Prerequisites | Manual Demo? | Rehearsal Verdict |
|:---|:---|:---|:---|:---|:---|:---|:---:|:---:|
| **DEMO-1.1** | Slot 1 Slide 16: "LIVE DEMO: Run the Application" | `checkpoint/slot-01-start` | `npm run db:reset && npm run dev` | API boots on :3000, Web boots on :5173. 5 baseline tasks rendered. | `npm run db:reset` restores 5 baseline tasks cleanly. | Node >= 20.x, ports 3000/5173 | **Yes** (Browser) | **VERIFIED LOCAL RUNTIME** |
| **DEMO-1.2** | Slot 1 Slide 17: "LIVE DEMO: Controlled AI Change" | `checkpoint/slot-01-start` | Multi-step prompt in AI assistant | AI inspects `TaskForm.tsx`, proposes single-file plan, applies diff. | `git checkout .` cleanly reverts changes. | AI Assistant (Antigravity/Cursor) | **Yes** (AI Chat) | **VERIFIED LOCAL RUNTIME** |
| **DEMO-2.1** | Slot 2 Slide 16: "Live Demo 1: Controlled Feature Change" | `checkpoint/slot-02-start` | `git diff checkpoint/slot-02-start..checkpoint/slot-02-demo-priority` | Feature branch cleanly introduces Task Priority enum with zero type errors. | `git checkout feat/slot-02-...` restores baseline. | Git CLI | **Yes** (Git/PR) | **VERIFIED LOCAL RUNTIME** |
| **DEMO-2.2** | Slot 2 Slide 25: "Live Demo 2: From Failing Test to Fix" | `checkpoint/slot-02-whitespace-red` | `npm test -w @course4/shared` | Fails on whitespace title (RED); passes after applying `.trim()` fix (GREEN). | `git checkout checkpoint/slot-02-ready` resets green. | Vitest CLI | **Yes** (Code edit) | **VERIFIED AUTOMATED** |
| **DEMO-2.3** | Slot 2 Slide 28: "Live Demo: GitHub Actions" | `checkpoint/slot-02-ready` | Local CI pipeline rehearsal: `npm run typecheck && npm test && npm run build` | Exits code 0 cleanly; `.github/workflows/ci.yml` syntax validated. | Clean working directory. | GitHub repo (if remote) | **Yes** (CI UI) | **VERIFIED AUTOMATED** |
| **DEMO-3.1** | Slot 3 Slide 09: "Automated PR Review" | `checkpoint/slot-03-start` | Agent review against `fixtures/pr-review/cross-team-pr.diff` | Review command analyzes diff, catches schema and syntax issues. | Working tree unchanged. | AI Assistant with slash command | **Yes** (AI Prompt) | **VERIFIED LOCAL RUNTIME** |
| **DEMO-3.2** | Slot 3 Slide 16: "Playwright MCP Browser Automation" | `checkpoint/slot-03-ready` | `npm run test:e2e` (or headed `npm run test:e2e:headed`) | 3 Playwright browser scenarios pass: creates, edits, completes, filters tasks. | `prepare-db.ts` resets E2E test database automatically. | Chromium binary (Playwright) | **Yes** (Browser/MCP) | **VERIFIED AUTOMATED** |
| **DEMO-3.3** | Slot 3 Slide 25: "AI UI to Working Task Manager" | `checkpoint/slot-03-ready` | Interactive keyboard navigation (`Tab`, `Space`, `Enter`) | Filter tabs cycle smoothly, high-contrast focus rings visible. | Working tree unchanged. | Web Browser | **Yes** (Keyboard) | **VERIFIED LOCAL RUNTIME** |
| **DEMO-4.1** | Slot 4 Slide 13: "Live Demo: Security Investigation" | `checkpoint/slot-04-security-vulns` | `npm run test:security && npm run security:audit` | 9 security tests pass (IDOR and Prompt Injection); audit reports 0 high CVEs. | In-memory store resets via `resetSimulatedTasksStore()`. | Node.js | **Yes** (CLI) | **VERIFIED AUTOMATED** |
| **DEMO-4.2** | Slot 4 Slide 19: "Live Demo: Review a Pull Request" | `checkpoint/slot-04-start` | Manual walkthrough of `fixtures/pr-review/cross-team-pr.diff` | Human review catches timezone and negative duration; AI catches XSS and unused imports. | Static diff file; no state modification. | Code Reviewer | **Yes** (Human/AI) | **VERIFIED LOCAL RUNTIME** |
| **DEMO-4.3** | Slot 4 Slide 25: "Live Demo: Bug Hunt" | `checkpoint/slot-04-bug-hunt` | `npm run test:bugs` | 10 tests pass verifying reproduction and remediation of all 5 seeded bugs. | Regression tests run isolated in Vitest. | Vitest CLI | **Yes** (CLI) | **VERIFIED AUTOMATED** |
| **DEMO-5.1** | Slot 5 Slide 08: "LIVE DEMO: DEPLOYED TASK MANAGER" | `checkpoint/slot-05-start` | Public URL navigation and task CRUD | Dependent on active student/instructor cloud deployment (Render + Vercel + Neon). | N/A (Cloud state) | Internet, Vercel, Render, Neon | **Yes** (Cloud Web) | **NOT VERIFIED (EXTERNAL HOSTING DEPENDENT)** |
| **DEMO-5.2** | Slot 5 Slide 10: "Know Whether Your System Is Healthy" | `checkpoint/slot-05-ready` | `curl -i http://localhost:3000/health` | Returns HTTP 200 with `database: connected`, `latencyMs`, and structured Pino log in stdout. | Clean probe; leaves no residual state. | Local API server | **Yes** (Terminal) | **VERIFIED LOCAL RUNTIME** |
| **DEMO-5.3** | Slot 5 Slide 15: "LIVE INCIDENT DRILL" | `checkpoint/slot-05-ready` | `curl -H "x-incident-drill: simulate-outage" .../health` | Injects simulated DB outage (HTTP 503); removing header immediately restores 200 OK. | 100% reversible; no disk corruption. | Local or Cloud API | **Yes** (Instructor) | **VERIFIED LOCAL RUNTIME** |

---

## 2. Classroom Failure Modes & Instructor Triage Guide

| Failure Scenario | Affected Demo | Root Cause | Immediate Instructor Recovery Action |
|:---|:---|:---|:---|
| **Port 3000 / 5173 Already in Use** | DEMO-1.1, DEMO-5.2 | Zombie Node process from previous demo. | Run in PowerShell: `Get-Process node -ErrorAction SilentlyContinue \| Stop-Process -Force` |
| **Database Locked (`SQLITE_BUSY`)** | DEMO-1.1, DEMO-2.2 | Multiple processes opening SQLite file. | Delete `prisma/dev.db-journal` if present, or run `npm run db:reset`. |
| **AI Rewrites Unintended Files** | DEMO-1.2, DEMO-3.3 | AI model ignores file boundaries. | Run `git checkout .` to revert, then re-prompt with explicit `AGENTS.md` scope rules. |
| **Playwright Browser Missing** | DEMO-3.2 | Chromium browser binary not downloaded. | Run `npx playwright install chromium` before class. |
| **Cloud Cold Start (> 45s Delay)** | DEMO-5.1 | Render free-tier instance slept after 15m. | Pre-warm 5 minutes before class by running `curl https://<api-url>/health`. |
| **Drill Outage Persists Unexpectedly** | DEMO-5.3 | Client browser cached 503 response or header left active. | Hard refresh browser (`Ctrl + F5`) and probe without custom header. |
