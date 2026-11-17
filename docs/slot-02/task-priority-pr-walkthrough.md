# Pull Request Walkthrough: Task Priority Feature (Slot 2 Demonstration)

> **Branch:** `demo/slot-02-task-priority`  
> **Target Base:** `feat/slot-02-controlled-ai-engineering` (or `main`)  
> **Tag:** `checkpoint/slot-02-demo-priority`  
> **Purpose:** Instructor demonstration of a complete AI-assisted feature addition, Pull Request review, and diff inspection in Slot 2.

---

## 1. Pull Request Description (Template Compliance)

### Title
`feat(tasks): add task priority level (LOW, MEDIUM, HIGH)`

### Summary
Extends the baseline Task Manager schema, API, and user interface to support task priority levels:
- Introduces `TaskPriority` enum (`LOW`, `MEDIUM`, `HIGH`) with default `MEDIUM`.
- Persists priority in SQLite database via Prisma schema.
- Updates REST endpoints (`POST /api/tasks`, `PATCH /api/tasks/:id`) with Zod input validation.
- Renders color-coded priority badges on the task board (`HIGH` = Red, `MEDIUM` = Amber, `LOW` = Blue) and adds a priority dropdown selector in the task creation form.
- Preserves single-user baseline and zero-auth boundary.

### Scope & Architectural Boundaries
- **In Scope:**
  - `packages/shared/src/index.ts`: `TaskPriority` Zod schema and TypeScript type.
  - `prisma/schema.prisma`: `priority String @default("MEDIUM")`.
  - `apps/api/src/app.ts`: handling priority in task creation and update endpoints.
  - `apps/web/src/components/TaskForm.tsx`: priority dropdown selector.
  - `apps/web/src/components/TaskItem.tsx`: priority badge.
  - `apps/web/src/api/client.ts` & `App.tsx`: priority parameter forwarding.
  - Test suites: Unit, API, component, and E2E coverage.
- **Explicitly Rejected Scope (Out of Scope):**
  - No user authentication or multi-user ownership.
  - No task due dates or calendar integrations.
  - No priority sorting or filtering (deferred to future feature request).
  - No database migration altering production semantics.

---

## 2. Acceptance Criteria Mapping

| Acceptance Criterion | Implementation | Verification Test |
|---|---|---|
| **AC-1:** User can assign a priority (`LOW`, `MEDIUM`, `HIGH`) when creating a task | `apps/web/src/components/TaskForm.tsx` `<select>` | Playwright E2E: `creates a high-priority task and displays priority badge` |
| **AC-2:** Default priority is `MEDIUM` when priority is omitted | `packages/shared/src/index.ts` `.default('MEDIUM')` | Vitest Unit: `defaults priority to MEDIUM when omitted`<br>API Supertest: `defaults task priority to MEDIUM when omitted` |
| **AC-3:** Invalid priority values are rejected with HTTP 400 | `packages/shared/src/index.ts` `TaskPriority` enum | Vitest Unit: `rejects invalid priority value` |
| **AC-4:** Task priority can be updated via PATCH | `apps/api/src/app.ts` `PATCH /api/tasks/:id` | API Supertest: `updates task priority level` |
| **AC-5:** Task priority badge renders with appropriate visual styling | `apps/web/src/components/TaskItem.tsx` | Component Test: `apps/web/tests/App.test.tsx` |

---

## 3. Instructor PR Review Walkthrough Guide

When presenting this PR in class (Slide 16 / Slide 28):

### Step 1: Check Scope Before Code
1. Open the PR description or run sheet.
2. Ask students: *"Did the AI add extra fields like dueDate, tags, or assignee?"*
3. Show the **Rejected Scope** section proving strict boundary control.

### Step 2: Inspect Git Diff
Run diff inspection in terminal:
```powershell
git diff feat/slot-02-controlled-ai-engineering..demo/slot-02-task-priority
```
*Key Discussion Points:*
- **Shared Contracts First:** Point to `packages/shared/src/index.ts`. Notice that the enum is defined once in shared code, not duplicated in frontend and backend.
- **Database Schema:** Show `priority String @default("MEDIUM")`. Explain SQLite string-backed enums and default values.
- **Input Sanitization:** Show that `apps/api/src/app.ts` relies on Zod parsing rather than trusting `req.body.priority` directly.
- **Component Changes:** Show that `TaskForm.tsx` and `TaskItem.tsx` changes are minimal and adhere to existing Tailwind design patterns.

### Step 3: Run Full Automated Verification
```powershell
npm run typecheck
npm test
npm run test:e2e
```
*Observable Evidence:*
- All TypeScript workspaces compile without errors.
- Unit, API, and component tests pass 100%.
- Chromium E2E test runs headlessly, creates a HIGH priority task, and asserts badge visibility.

---

## 4. Reset & Cleanup Instructions

To return to the clean baseline without modifying the active workspace:

```powershell
# Return to stable Slot 2 feature branch:
git checkout feat/slot-02-controlled-ai-engineering

# Reset database back to clean baseline:
npm run db:reset
```
