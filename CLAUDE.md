# Claude Code Project Guidelines — Course 4 Teaching Task Manager

> **Project:** `course4-teaching-task-manager`  
> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Architecture:** npm-workspaces monorepo (`packages/shared`, `apps/api`, `apps/web`, `prisma`)

---

## 1. Quick Commands

### Build & Verification
```bash
# Clean install
npm install

# Database setup & reproducible seeding
npx prisma generate
npx prisma db push
npm run db:seed

# Run all test suites
npm test

# Run type checking across workspaces
npm run typecheck

# Full production build
npm run build
```

### Local Development
```bash
# Start both API and Web concurrently
npm run dev

# Start API only (port 3000)
npm run dev:api

# Start Web only (port 5173)
npm run dev:web
```

---

## 2. Monorepo Workspaces & Boundaries

- **`packages/shared`:** Single source of truth for domain schemas and TypeScript types.
  - Exported schemas: `CreateTaskSchema`, `UpdateTaskSchema`, `TaskSchema`.
  - Always validate input through Zod.
- **`apps/api`:** Express + TypeScript backend.
  - Access database strictly via `@prisma/client`.
  - Routes in `src/app.ts`, server entrypoint in `src/index.ts`.
- **`apps/web`:** React 18 + Vite + Tailwind CSS frontend.
  - API calls isolated in `src/api/client.ts`.
  - Components in `src/components/`.
- **`prisma/`:** SQLite database schema and reproducible seed script.

---

## 3. Strict Educational Constraints & Quality Rules

1. **Slot Boundary Enforcement:**
   - **Do NOT pre-implement Slot 2 features:** No Task Priority, no Task Due Dates/Deadlines in Slot 1.
   - **Do NOT implement authentication:** Slot 1 is single-user / team-shared workspace. No `X-User-Id` headers or auth middleware in Slot 1.
2. **Inspect Before Edit:**
   - Always read existing files and schemas before editing.
   - Propose a minimal plan and list affected files before applying edits.
3. **Test-Driven Discipline:**
   - Every schema change or endpoint change must have corresponding tests.
   - Run `npm test` and `npm run typecheck` to verify changes before marking work done.
4. **Single Responsibility Diffs:**
   - Never reformat entire files or modify unrelated files during a targeted fix.
   - Keep git diffs small, concise, and reviewable.
