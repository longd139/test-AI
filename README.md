# Course 4 Teaching Task Manager

> **Course 4:** The Modern AI Software Developer (ADLC01)  
> **Institution:** FPT University  
> **Repository:** `course4-teaching-task-manager`  
> **Status:** Phase P1 Verified Implementation (Slot 1 Baseline)

---

## 1. Overview

The **Course 4 Teaching Task Manager** is a production-grade, instructor-friendly educational monorepo designed to support live demonstrations, guided student laboratories, and engineering checkpoints across five 4-hour slots.

In **Slot 1 (AI-Native Engineering Foundations & Requirements)**, the repository serves as the baseline application demonstrating:
- A clean, running full-stack web application.
- The disciplined **Inspect-Before-Edit** AI engineering loop.
- Testable Acceptance Criteria in **Given/When/Then** format.
- Shared domain validation using **Zod** between frontend and backend.

---

## 2. Technical Architecture

```text
course4-teaching-task-manager/
├── apps/
│   ├── api/                   # Express + TypeScript backend (Port 3000)
│   └── web/                   # React 18 + Vite + Tailwind CSS frontend (Port 5173)
├── packages/
│   └── shared/                # Shared Zod schemas (CreateTaskSchema, UpdateTaskSchema)
├── prisma/                    # SQLite database schema (dev.db) & seeders
├── docs/                      # PRD, requirements, architecture, and runbooks
├── curriculum/                # 157-slide traceability, demo & lab inventories
└── instructor/                # Live demo run sheets and instructor guides
```

---

## 3. Quickstart Guide

### Prerequisites
- **Node.js:** LTS >= 20.12.0
- **npm:** >= 10.5.0
- **Git:** >= 2.40.0

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Initialize & Seed Database
```bash
# Push Prisma schema to local SQLite database (dev.db)
npx prisma db push

# Populate with reproducible Slot 1 seed data
npm run db:seed
```

### Step 3: Run the Application
```bash
# Start both backend API (port 3000) and frontend (port 5173) concurrently:
npm run dev
```

Open your browser to:
- **Frontend SPA:** `http://localhost:5173`
- **Backend API:** `http://localhost:3000/api/tasks`
- **Health Check:** `http://localhost:3000/health`

---

## 4. Testing & Verification

Run all test suites and type checks with standard npm commands:

```bash
# Run unit, integration, and component test suites:
# - Shared: Zod validation schema contract tests
# - API: Integration tests running against isolated test.db with safety assertions
# - Web: Component tests with React Testing Library (E2E browser tests planned for Slot 2)
npm test

# Type check all TypeScript workspaces
npm run typecheck

# Full production build
npm run build

# Reset database back to clean 5-task baseline
npm run db:reset
```

---

## 5. Slot 1 Live Demonstrations

Detailed step-by-step instructor run sheets are provided in:
- [instructor/run-sheets/slot-01-demo-guide.md](instructor/run-sheets/slot-01-demo-guide.md)

1. **Demo A (Slide 16) — Run the Application:**
   - Instructor clones/installs, runs `npm run dev`, shows task list, adds task, edits task, marks complete, and explains data flow from React to Express and Prisma SQLite.
2. **Demo B (Slide 17) — Controlled AI Change:**
   - Instructor prompts Claude Code to inspect `apps/api/src/app.ts`, `packages/shared/src/index.ts`, and `prisma/schema.prisma`.
   - Generates plan for a small controlled change (e.g. adding an optional description field or input trim rule).
   - Reviews git diff, runs tests, and proves the change works without unintended side effects.
   - Restores clean state using disposable Git worktrees without touching active working files.
