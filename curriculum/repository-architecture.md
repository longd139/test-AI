# Educational Architecture — Course 4 Teaching Task Manager

> **Repository Name:** `course4-teaching-task-manager`  
> **Target Audience:** FPT University 5th Semester Undergraduates (ADLC01) & Faculty Instructors  
> **Core Philosophy:** Educational Engineering System — clean, typed, modular, disciplined human-agent collaboration.

---

## 1. Monorepo Structure (npm workspaces)

```text
course4-teaching-task-manager/
├── apps/
│   ├── api/                     # Node.js + Express + TypeScript backend
│   │   ├── src/
│   │   │   ├── routes/          # Express route controllers (tasks, auth, health)
│   │   │   ├── middleware/      # Auth, validation, error handler, Pino request logger
│   │   │   ├── services/        # Business logic & Prisma data access
│   │   │   ├── index.ts         # Server entrypoint
│   │   │   └── app.ts           # Express app definition (exportable for Supertest)
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── web/                     # React 18 + TypeScript + Vite + Tailwind CSS
│       ├── src/
│       │   ├── components/      # TaskList, TaskCard, TaskForm, FilterBar, ErrorBoundary
│       │   ├── hooks/           # useTasks, useAuth
│       │   ├── api/             # Typed API client fetching from backend
│       │   ├── App.tsx          # Main application component
│       │   └── main.tsx         # React DOM mount
│       ├── index.html
│       ├── vite.config.ts
│       ├── tailwind.config.js
│       └── package.json
│
├── packages/
│   └── shared/                  # Shared domain contracts & validation schemas
│       ├── src/
│       │   ├── schemas/         # Zod schemas (CreateTaskSchema, UpdateTaskSchema, FilterSchema)
│       │   ├── types/           # TypeScript inferred types & API response envelopes
│       │   └── constants/       # Task priority, status enum values
│       ├── tsconfig.json
│       └── package.json
│
├── prisma/                      # Database persistence layer
│   ├── schema.prisma            # Multi-provider compatible schema (SQLite / PostgreSQL)
│   ├── migrations/              # Prisma migration history
│   ├── seed.ts                  # Reproducible test fixture seeder
│   └── dev.db                   # Local SQLite database (ignored by git, auto-seeded)
│
├── tests/                       # Full test pyramid
│   ├── unit/                    # Fast Vitest unit tests for schemas & pure logic
│   ├── integration/             # Supertest API tests hitting real endpoints & SQLite
│   ├── e2e/                     # Playwright tests testing full user workflows in browser
│   └── bug-hunt/                # Seeded bug regression tests for Slot 4
│
├── curriculum/                  # Pedagogical blueprints
│   ├── traceability.md          # 157-slide mapping matrix across all 5 slots
│   ├── source-conflicts.md      # Resolution log of ambiguous/conflicting requirements
│   ├── repository-architecture.md # Technical architectural definition
│   └── git-checkpoint-strategy.md # Branch & tag checkpoint strategy
│
├── labs/                        # Student-facing lab workbooks
│   ├── slot-01/                 # Lab 01 (Prompt Eng), Lab 02 (AI BA), Lab 03 (Kickoff M0)
│   ├── slot-02/                 # Lab 01 (Planning), Lab 02 (Testing/Bugs), Lab 03 (Sprint)
│   ├── slot-03/                 # Lab 01 (Automations), Lab 02 (UI Decision), Lab 03 (MVP M2)
│   ├── slot-04/                 # Lab 01 (Security), Lab 02 (Code Review), Lab 03 (Bug Hunt)
│   └── slot-05/                 # Production deployment, incident runbook, Demo Day M3/M4
│
├── instructor/                  # Instructor-only materials (kept out of student distribution)
│   ├── run-sheets/              # Minute-by-minute live demo scripts for Slots 1–5
│   ├── answer-keys/             # Verification standards, expected diffs, grading checklists
│   └── recovery/                # Emergency reset scripts if a live demo goes off-track
│
├── docs/                        # Engineering documentation templates & deliverables
│   ├── PRD.md                   # Product Requirements Document & Acceptance Criteria
│   ├── architecture.md          # System architecture & component interaction
│   ├── security-report.md       # SAST findings & remediation evidence (Slot 4)
│   ├── review-comparison.md     # Human vs AI code review matrix (Slot 4)
│   ├── runbook.md               # Operational runbook & troubleshooting guide (Slot 5)
│   └── postmortem-drill.md      # Incident drill postmortem report (Slot 5)
│
├── scripts/                     # Cross-platform developer scripts (Node/PowerShell/Bash)
│   ├── seed.mjs                 # Quick seed runner
│   ├── reset-checkpoint.mjs     # Helper to checkout & reset to any slot checkpoint
│   ├── security-scan.mjs        # Semgrep + npm audit runner
│   └── check-submission.mjs     # Automated student milestone validation tool
│
├── .claude/                     # Claude Code agent configuration
│   ├── CLAUDE.md                # Persistent repository instructions & quality rules
│   ├── commands/                # Reusable slash commands (/review-pr, /test-and-fix)
│   └── skills/                  # Custom agent skill definitions
│
├── .github/
│   └── workflows/               # Continuous Integration pipeline
│       ├── ci.yml               # Lint, Typecheck, Test (Unit + Integration)
│       ├── e2e.yml              # Playwright browser test suite
│       └── security.yml         # Semgrep SAST & npm audit gate
│
├── AGENTS.md                    # Universal agent instruction standard
├── package.json                 # Monorepo root package definition
└── tsconfig.base.json           # Shared TypeScript compiler options
```

---

## 2. Technical Stack Justification

| Technology | Role | Pedagogical Justification |
|:---|:---|:---|
| **npm workspaces** | Monorepo orchestration | Native to Node.js; no third-party monorepo tool (Turborepo/Nx) overhead to confuse students. |
| **React + TypeScript + Vite** | Frontend application | Industry standard, instant hot-module replacement (HMR), rigorous type checking. |
| **Tailwind CSS** | UI styling | Utility-first CSS allows rapid AI UI generation and predictable component refactoring without style bleed. |
| **Node.js + Express + TS** | Backend API | Minimalist, transparent request/response pipeline; ideal for demonstrating middleware, auth, and logging. |
| **Zod** | Validation schemas | Enables single-source-of-truth validation shared between frontend forms and backend request parsers in `packages/shared`. |
| **Prisma ORM** | Data access layer | Generates type-safe database queries. Seamlessly bridges local **SQLite** (frictionless onboarding) and production **PostgreSQL**. |
| **Vitest & Supertest** | Unit & API testing | Ultra-fast test runner compatible with Vite configs; Supertest tests real HTTP routes without binding to live network ports. |
| **Playwright** | End-to-end testing | Modern browser automation; supports tracing, screenshots, and integrates with Playwright MCP for live agent demos. |
| **Pino** | Structured logging | Produces machine-readable JSON logs with request IDs, response times, and status codes; essential for Slot 5 incident response. |
| **Semgrep CLI** | SAST Security | Fast static analysis tool with clear rule definitions; teaches students to catch IDOR, injection, and secret leakage. |
