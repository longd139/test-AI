# INSTRUCTOR START HERE — Master Teaching & Demo Guide

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Repository:** `course4-teaching-task-manager`  
> **Audience:** Course Instructors, Lab Facilitators, Teaching Assistants  
> **Tech Stack:** Node.js (>=20.x), TypeScript, React 18, Express, Prisma ORM, SQLite (local), PostgreSQL (Neon), Tailwind CSS, Vitest, Playwright.

---

## 1. Pedagogical Philosophy: AI Can Code. Can It Engineer?

This course does **NOT** teach students how to write code line-by-line from scratch. Instead, it teaches the core disciplines of an **AI Software Engineer**:
1. **Specification-First:** Writing exact schemas, PRDs, and acceptance criteria before prompting AI.
2. **Context & Boundary Management:** Steering AI agents with strict project constraints (`AGENTS.md`) and single-file scopes.
3. **Automated Verification Loop:** Never trusting AI code blindly; validating everything through typing, automated unit/integration/E2E tests, and SAST rules.
4. **Human-First, AI-Second Code Review:** Catching business logic, architecture, and security flaws that AI models overlook.
5. **Production Responsibility:** Operating 12-factor cloud systems, incident triage, and blameless postmortems beyond localhost.

---

## 2. 5-Slot Progression Overview

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        COURSE 4 TEACHING PROGRESSION (5 SLOTS)                         │
├───────────────┬─────────────────┬─────────────────┬──────────────────┬─────────────────┤
│ SLOT 1        │ SLOT 2          │ SLOT 3          │ SLOT 4           │ SLOT 5          │
│ Understand    │ Plan & Verify   │ Extend & AI UI  │ Secure & Defend  │ Deploy & Ship   │
├───────────────┼─────────────────┼─────────────────┼──────────────────┼─────────────────┤
│ • PRD & Spec  │ • Feature Branch│ • Reusable Agent│ • Semgrep SAST   │ • 12-Factor App │
│ • Zod Schemas │ • TDD Red-Green │   Workflows     │ • IDOR & Prompt  │ • Neon Postgres │
│ • Monorepo    │ • GitHub CI     │ • Playwright MCP│   Injection      │ • Pino Logs     │
│ • Inspect loop│ • PR Review     │ • AI UI Wiring  │ • 5 Seeded Bugs  │ • Incident Drill│
│ • Local SQLite│ • Priority Demo │ • A11y & E2E    │ • Cross-team PR  │ • Demo Day M4   │
└───────────────┴─────────────────┴─────────────────┴──────────────────┴─────────────────┘
```

---

## 3. Git Checkpoint & Safe Recovery Strategy

To ensure zero live-demo failures and provide students with instant recovery paths, the repository maintains immutable Git checkpoint tags:

| Checkpoint Tag | Purpose & Target State | When to Use in Class |
|:---|:---|:---|
| `checkpoint/slot-01-start` | Clean Slot 1 project scaffold with PRD and schemas. | Start of Slot 1 class. |
| `checkpoint/slot-01-ready` | Complete Slot 1 baseline (CRUD tasks, zero-auth, SQLite). | Verification of Slot 1. |
| `checkpoint/slot-02-start` | Clean baseline ready for feature branching and TDD. | Start of Slot 2 class. |
| `checkpoint/slot-02-demo-priority` | Feature branch demonstrating Task Priority addition. | DEMO-2.1 PR walkthrough. |
| `checkpoint/slot-02-whitespace-red` | Intentionally failing TDD test branch (Red phase). | DEMO-2.2 TDD demo. |
| `checkpoint/slot-02-ready` | Complete Slot 2 with full CI workflow and unit tests. | Verification of Slot 2. |
| `checkpoint/slot-03-start` | Clean baseline ready for agent workflows and MCP. | Start of Slot 3 class. |
| `checkpoint/slot-03-ready` | Complete Slot 3 with subagents, accessible UI, and Playwright. | Verification of Slot 3. |
| `checkpoint/slot-04-start` | Clean baseline ready for security scanning and bug hunt. | Start of Slot 4 class. |
| `checkpoint/slot-04-security-vulns` | Isolated fixture demonstrating IDOR and prompt injection. | DEMO-4.1 & Lab 07. |
| `checkpoint/slot-04-bug-hunt` | Isolated fixture containing the 5 seeded bugs. | DEMO-4.3 & Lab 08. |
| `checkpoint/slot-04-ready` | Complete Slot 4 with remediated security and bug fixes. | Verification of Slot 4. |
| `checkpoint/slot-05-start` | Clean baseline ready for cloud deployment and operations. | Start of Slot 5 class. |
| `checkpoint/slot-05-ready` | Complete Slot 5 production-ready platform with runbook & M4. | Final Demo Day / Evaluation. |

### Safe Reset Instructions (Never use `git clean -fd`)
If an instructor or student gets into a broken state during live coding:
```bash
# Option 1: Discard local uncommitted changes safely
git reset --hard HEAD

# Option 2: Jump cleanly to any Slot starting point in a fresh branch
git checkout -b my-demo-slot-02 checkpoint/slot-02-start

# Option 3: Reset database to clean 5 baseline tasks
npm run db:reset
```

---

## 4. Master Live-Demo Index

Every live demo has a dedicated run sheet in `instructor/demo-guides/`:

| Slot | Demo ID | Slide Ref | Demo Title | Guide Location |
|:---:|:---|:---:|:---|:---|
| **1** | **DEMO-1.1** | Slot 1 Slide 16 | Run the Teaching Task Manager Application | [slot-01-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-01-demos.md) |
| **1** | **DEMO-1.2** | Slot 1 Slide 17 | Controlled AI Change via Inspect-Before-Edit | [slot-01-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-01-demos.md) |
| **2** | **DEMO-2.1** | Slot 2 Slide 16 | Controlled Feature Change via Git Branch & PR | [slot-02-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-02-demos.md) |
| **2** | **DEMO-2.2** | Slot 2 Slide 25 | From Failing Test to Fix (TDD Red → Green) | [slot-02-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-02-demos.md) |
| **2** | **DEMO-2.3** | Slot 2 Slide 28 | Continuous Integration via GitHub Actions | [slot-02-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-02-demos.md) |
| **3** | **DEMO-3.1** | Slot 3 Slide 09 | Automated PR Review via Custom Agent Command | [slot-03-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-03-demos.md) |
| **3** | **DEMO-3.2** | Slot 3 Slide 16 | Playwright MCP Browser Automation | [slot-03-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-03-demos.md) |
| **3** | **DEMO-3.3** | Slot 3 Slide 25 | AI UI to Working Task Manager Integration | [slot-03-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-03-demos.md) |
| **4** | **DEMO-4.1** | Slot 4 Slide 13 | Security Investigation (SAST & SCA Scanning) | [slot-04-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-04-demos.md) |
| **4** | **DEMO-4.2** | Slot 4 Slide 19 | Review a Pull Request (Human vs AI Review) | [slot-04-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-04-demos.md) |
| **4** | **DEMO-4.3** | Slot 4 Slide 25 | Bug Hunt (5 Seeded Bugs & Scientific Debug) | [slot-04-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-04-demos.md) |
| **5** | **DEMO-5.1** | Slot 5 Slide 08 | Deployed Task Manager on Public Cloud | [slot-05-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-05-demos.md) |
| **5** | **DEMO-5.2** | Slot 5 Slide 10 | Health Check & Structured Pino Logging | [slot-05-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-05-demos.md) |
| **5** | **DEMO-5.3** | Slot 5 Slide 15 | Live Production Incident Response Drill | [slot-05-demos.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/demo-guides/slot-05-demos.md) |

---

## 5. Classroom Setup Checklist (T-30 Minutes Before Class)

1. **Node Environment:** Execute `node -v` (Must be >= 20.x).
2. **Dependencies:** Execute `npm install` (Should be instant and zero warnings).
3. **Database Health:** Execute `npm run db:reset` to seed 5 baseline tasks into `dev.db`.
4. **Verification Smoke Test:** Execute `npm test` and `npm run typecheck` (All tests must pass).
5. **Port Clearance:** Ensure ports `3000` (API) and `5173` (Vite) are free.
6. **Projector Setup:** Split screen recommended: Left 50% VS Code / Terminal, Right 50% Browser (`http://localhost:5173`).
