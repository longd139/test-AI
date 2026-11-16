# AGENTS.md — AI Coding Agent Guidelines

## System Overview
- **Repository:** `course4-teaching-task-manager`
- **Purpose:** University teaching repository for FPT Course 4: "The Modern AI Software Developer".
- **Stack:** Node.js (>=20.x), TypeScript, React 18, Express, Prisma ORM, SQLite (local), Tailwind CSS, Vitest.

## Workspaces
- `packages/shared`: Shared types, constants, and Zod validation schemas.
- `apps/api`: REST API on Express (Port 3000).
- `apps/web`: React SPA on Vite (Port 5173).
- `prisma`: SQLite schema (`dev.db`), `seed.ts`, and `reset.ts`.

## Core Agent Rules
1. **Plan First:** Always inspect context and present an implementation plan with file boundaries before modifying code.
2. **Respect Teaching Checkpoints:** Do not pull features from future slots into the current slot.
3. **No Auth in Slot 1:** The baseline application is a single-user task board. Do not introduce user accounts or simulated identity headers in Slot 1.
4. **Validation via Shared Zod:** Never bypass Zod schemas. Validate on both client and server using `@course4/shared`.
5. **Verify Before Reporting:** Always execute `npm test` and `npm run typecheck` to confirm that all tests pass and TypeScript compiles cleanly.

## Key Verification Commands
```bash
npm run typecheck    # Must exit with code 0
npm test             # Must pass 100% of test suites
npm run build        # Must compile packages/shared, apps/api, apps/web
npm run db:reset     # Re-seeds SQLite database with 5 baseline tasks
```
