# Instructor Run Sheet — Slot 1 Live Demonstrations

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 1:** AI-Native Engineering Foundations & Requirements  
> **Target Checkpoint:** `checkpoint/slot-01-start`  
> **Platform:** Windows PowerShell (with Bash equivalents noted)

---

## Pre-Flight Setup (5 Minutes Before Class)

Ensure the teaching environment is prepared:
```powershell
# Open terminal in repository root:
cd D:\FPT\project\Course4_ModernAISoftwareDeveloper_Materials1\SRC-GUIDE

# Verify clean checkout:
git checkout checkpoint/slot-01-start

# Install dependencies and seed local SQLite database:
npm install
npm run db:reset

# Verify tests pass:
npm test
```

---

## DEMO A — RUN THE TEACHING APPLICATION (20 Minutes)

- **Slide Reference:** `SLOT 1` Slide 16 ("LIVE DEMO: Run the Application")
- **Learning Objective:** Show the baseline running system and explain the end-to-end data flow (React SPA → Express API → Prisma ORM → SQLite `dev.db`) before asking an AI agent to touch any code.

### Step-by-Step Execution:

1. **Start the Monorepo Services:**
   ```powershell
   npm run dev
   ```
   *Expected Observable Output:*
   - `[api]` Course 4 Task Manager API listening on `http://localhost:3000`
   - `[web]` Local: `http://localhost:5173/`

2. **Open the Browser:**
   - Navigate to `http://localhost:5173`
   - *Observable Result:* Task Manager UI renders with 5 seeded tasks (e.g., "Read Course Syllabus...", "Clone repository..."). Total count reads "2 of 5 completed".

3. **Demonstrate Baseline Interactions:**
   - **Create Task:** Enter `"Submit Milestone M0 by Sunday"`, click **Add Task**.  
     *Result:* Task appears instantly at the top of the list. Count updates to "2 of 6 completed".
   - **Mark Complete:** Click checkbox next to `"Run local development server"`.  
     *Result:* Checkbox checks, text gets strikethrough styling, count updates to "3 of 6 completed".
   - **Edit Task Title:** Click edit icon on `"Submit Milestone M0 by Sunday"`, change title to `"Submit Milestone M0 before midnight"`, click checkmark button.  
     *Result:* Title updates in-place.
   - **Validation Demonstration:** Try submitting an empty task or spaces `"    "`.  
     *Result:* Client displays validation error `"Title cannot be empty"`.

4. **Explain Architecture & Data Flow (Point to Code):**
   - **Frontend:** Show `apps/web/src/App.tsx` and `src/api/client.ts`. Explain that the UI is decoupled from the database and speaks JSON over HTTP.
   - **Backend:** Show `apps/api/src/app.ts`. Explain route handlers and the health check `GET /health`.
   - **Shared Contracts:** Show `packages/shared/src/index.ts`. Explain that `CreateTaskSchema` defines validation once and is shared across frontend and backend.
   - **Database:** Show `prisma/schema.prisma` and SQLite `prisma/dev.db`.

5. **Safe Reset (Between Demos):**
   ```powershell
   # Reset seeded data in under 2 seconds:
   npm run db:reset
   ```

---

## DEMO B — CONTROLLED AI CHANGE VIA INSPECT-BEFORE-EDIT (25 Minutes)

- **Slide Reference:** `SLOT 1` Slide 17 ("LIVE DEMO: Controlled AI Change")
- **Learning Objective:** Demonstrate disciplined AI interaction: giving the agent context, forcing it to inspect before editing, reviewing its plan for scope creep, inspecting the git diff, and verifying behavior.
- **Change Scenario:** Add an optional `description` field (max 500 characters) to tasks.  
  *(Note: This is a safe Slot 1 change that does NOT pre-implement Slot 2 features like Priority or Deadlines).*

### Step-by-Step Execution:

1. **Phase 1: Give Context & Inspect Before Edit:**
   Open Claude Code CLI:
   ```powershell
   claude
   ```
   Execute the prompt:
   ```text
   Read packages/shared/src/index.ts, prisma/schema.prisma, and apps/api/src/app.ts.
   We want to add an optional task description field (string, max 500 chars).
   Do NOT modify any files yet. First propose a concise implementation plan and list exactly which files need to change.
   ```
   *Expected Observable Output:*
   - Agent reads the files.
   - Agent outputs a plan:
     1. Update `packages/shared/src/index.ts`: add `description: z.string().max(500).optional()` to schemas.
     2. Update `prisma/schema.prisma`: add `description String?` to Task model.
     3. Update `apps/api/src/app.ts`: permit description in POST/PATCH.
     4. Add test case verifying description handling.

2. **Phase 2: Review Scope & Approve Plan:**
   - Point out to students that the agent identified the exact 3 files and did NOT suggest changing unrelated modules, adding auth, or touching UI components.
   - Approve the plan:
     ```text
     Proceed with steps 1, 2, 3 and add tests in packages/shared/tests/schemas.test.ts and apps/api/tests/api.test.ts. Do not touch apps/web yet.
     ```

3. **Phase 3: Inspect Git Diff in Terminal:**
   Exit Claude or open a secondary terminal:
   ```powershell
   git diff packages/shared/ apps/api/
   ```
   *Teaching Point:* Walk through every line of the diff. Show that only the requested `description` property was added.

4. **Phase 4: Run Tests to Prove Correctness:**
   ```powershell
   npx prisma db push
   npm test
   ```
   *Expected Observable Output:* All unit and integration tests pass cleanly.

5. **Safe Reset to Clean Checkpoint:**
   ```powershell
   # Discard experimental demo change and restore pristine checkpoint:
   git checkout .
   git clean -fd
   npm run db:reset
   ```
