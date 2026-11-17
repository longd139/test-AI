# Slot 1 Instructor Demo Guide — Baseline Architecture & Controlled AI Loop

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Source Deck:** `SLOT 1 - 4 HOURS.pptx` (29 Slides)  
> **Starting Checkpoint:** `checkpoint/slot-01-start`  
> **Ready Checkpoint:** `checkpoint/slot-01-ready`

---

## DEMO-1.1: Run the Teaching Task Manager Application

- **Slide Reference:** `SLOT 1` Slide 16 ("LIVE DEMO: Run the Application")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 10 minutes
- **Learning Objective:** Show a running baseline monorepo application (React SPA + Express API + SQLite) to establish project context before any AI assistance or code generation begins.
- **Prerequisites:**
  - Node.js >= 20.x, npm >= 10.x.
  - Ports 3000 (API) and 5173 (Vite Web) available.
  - Zero external daemons (SQLite operates locally).
- **Manual Instructor Participation Required:** Yes (running commands, opening browser, interacting with task list).

### Execution Steps
1. **Initialize & Seed Baseline:**
   ```bash
   # Re-seed the baseline SQLite database with 5 standard tasks
   npm run db:reset
   ```
   *Expected Output:*
   ```
   [Database Reset] Cleared existing tasks.
   [Database Reset] Seeded 5 baseline tasks successfully.
   ```
2. **Start Monorepo Concurrently:**
   ```bash
   npm run dev
   ```
   *Expected Output:*
   ```
   [api] [apps/api] Course 4 Task Manager API listening on http://localhost:3000
   [api] [apps/api] Health check: http://localhost:3000/health
   [web] VITE v6.4.6  ready in 240 ms
   [web] ➜  Local:   http://localhost:5173/
   ```
3. **Open Browser & Verify Baseline Features:**
   - Navigate to `http://localhost:5173`.
   - Show the 5 baseline tasks rendered in the UI.
   - Point out that there are **no user accounts, no login buttons, and no auth headers** (Slot 1 single-user baseline rule).
   - Test checking off a task (toggles completed state).
   - Test adding a task: "Review PRD specifications".

### Reset & Recovery
```bash
# If database state was dirtied:
npm run db:reset
```

---

## DEMO-1.2: Controlled AI Change via Inspect-Before-Edit Loop

- **Slide Reference:** `SLOT 1` Slide 17 ("LIVE DEMO: Controlled AI Change")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Demonstrate the disciplined agent loop: prompt AI to inspect context first, propose a minimal plan with file boundaries, inspect diff, and verify in the application.
- **Prerequisites:** AI Coding Assistant (Antigravity, Cursor, Claude Code, or Gemini CLI).
- **Manual Instructor Participation Required:** Yes (copying prompt, reviewing plan with class, applying diff, verifying).

### Execution Steps
1. **Explain the Anti-Pattern to Students:**
   - *Bad developer prompt:* "Fix the task list and make it look better." (Causes AI to rewrite 10 files, hallucinate libraries, or introduce unwanted auth).
2. **Execute Disciplined 3-Step AI Prompt:**
   - **Step 1 (Inspect & Plan First):**
     > *"Inspect `packages/shared/src/schemas.ts` and `apps/web/src/components/TaskForm.tsx`. I want to ensure the task title field shows a live character counter (0/100). Do not write code yet. Present an implementation plan with file boundaries."*
   - **Step 2 (Review File Boundaries):**
     - Show students the AI's proposed plan. Confirm it touches **only** `TaskForm.tsx` and does not alter backend APIs or database schemas.
   - **Step 3 (Execute & Review Diff):**
     - Allow AI to make the edit.
     - In VS Code, inspect the Git diff before saving or committing.
3. **Verify in Application:**
   - Switch to browser (`http://localhost:5173`).
   - Type in the input box: show character count updating dynamically.
   - Run typecheck and test:
     ```bash
     npm run typecheck
     npm test
     ```

### Reset & Recovery
```bash
# Discard live demo edits cleanly:
git checkout .
# Or reset to Slot 1 baseline:
git checkout checkpoint/slot-01-ready
```
