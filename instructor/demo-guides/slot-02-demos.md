# Slot 2 Instructor Demo Guide — Controlled AI Engineering, TDD & CI/CD

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Source Deck:** `SLOT 2 - 4 HOURS.pptx` (30 Slides)  
> **Starting Checkpoint:** `checkpoint/slot-02-start`  
> **Ready Checkpoint:** `checkpoint/slot-02-ready`

---

## DEMO-2.1: Controlled Feature Change via Git Branch & Pull Request

- **Slide Reference:** `SLOT 2` Slide 16 ("Live Demo 1: Controlled Feature Change")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Demonstrate the branch-per-feature workflow with AI assistance: creating a scoped feature branch, steering AI to implement Task Priority, reviewing Git diffs, and preparing a Pull Request.
- **Starting Tag:** `checkpoint/slot-02-start` (or pre-baked branch `demo/slot-02-task-priority` / tag `checkpoint/slot-02-demo-priority`).
- **Prerequisites:** Git CLI, active local monorepo.
- **Manual Instructor Participation Required:** Yes (Git branching, executing AI prompt, walking through diff).

### Execution Steps
1. **Create Isolated Feature Branch:**
   ```bash
   git checkout -b feat/task-priority checkpoint/slot-02-start
   ```
2. **Review Target Scope with Students:**
   - Goal: Add an optional priority field (`low`, `medium`, `high`) defaulting to `medium`.
   - File Boundaries: `packages/shared/src/schemas.ts`, `apps/api/src/app.ts`, `apps/web/src/App.tsx`.
3. **Inspect the Pre-Baked Demo Diff (or Prompt AI live):**
   ```bash
   # Compare against baseline to show clean diff boundaries
   git diff checkpoint/slot-02-start checkpoint/slot-02-demo-priority
   ```
4. **Point Out Key Teaching Points:**
   - Schema validation updated in shared package first.
   - Backward-compatible: existing tasks without priority default cleanly to `medium`.
   - Clean, readable commit history.

### Reset & Recovery
```bash
git checkout feat/slot-02-controlled-ai-engineering
git branch -D feat/task-priority
```

---

## DEMO-2.2: From Failing Test to Fix (TDD RED → GREEN)

- **Slide Reference:** `SLOT 2` Slide 25 ("Live Demo 2: From Failing Test to Fix")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Demonstrate Test-Driven Development (TDD): translate Acceptance Criteria (whitespace-only title rejection) into an automated test, observe failure (RED), implement minimal fix, and verify passing (GREEN).
- **Starting Tag:** `checkpoint/slot-02-whitespace-red` (Failing test state).
- **Prerequisites:** Vitest CLI.
- **Manual Instructor Participation Required:** Yes (running test, showing red assertion error, applying fix, showing green).

### Execution Steps
1. **Checkout the Red TDD State:**
   ```bash
   git checkout checkpoint/slot-02-whitespace-red
   ```
2. **Run the Test Suite (Observe RED Failure):**
   ```bash
   npm test -w @course4/shared
   ```
   *Expected Output (RED):*
   ```
   FAIL tests/schemas.test.ts > rejects whitespace-only title
   AssertionError: expected false to be true
   ```
   - *Teaching note:* Show students that writing the test first proves the test is actually testing the bug and isn't a false pass!
3. **Apply the Minimal Fix in `packages/shared/src/schemas.ts`:**
   - Change `title: z.string().min(1)` to `title: z.string().trim().min(1, 'Title cannot be empty')`.
4. **Re-run the Test Suite (Observe GREEN Pass):**
   ```bash
   npm test -w @course4/shared
   ```
   *Expected Output (GREEN):*
   ```
   ✓ tests/schemas.test.ts (10 tests)
   Test Files 1 passed (1)
   Tests 10 passed (10)
   ```

### Reset & Recovery
```bash
git checkout feat/slot-02-controlled-ai-engineering
```

---

## DEMO-2.3: Continuous Integration via GitHub Actions

- **Slide Reference:** `SLOT 2` Slide 28 ("Live Demo: GitHub Actions")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 10 minutes
- **Learning Objective:** Demonstrate how CI acts as an automated, impartial gatekeeper: running lint, typecheck, unit tests, and build on every Pull Request before merge authorization.
- **Prerequisites:** GitHub repository with `.github/workflows/ci.yml`.
- **Manual Instructor Participation Required:** Yes (inspecting CI workflow file, showing GitHub Actions UI or simulating CI locally).

### Execution Steps
1. **Inspect `.github/workflows/ci.yml`:**
   - Show students the automated steps:
     1. `npm run build -w @course4/shared`
     2. `npm run typecheck`
     3. `npm run lint`
     4. `npm test`
     5. `npm run build`
2. **Execute Full CI Pipeline Locally (Rehearsal):**
   ```bash
   npm run build -w @course4/shared && npm run typecheck && npm test && npm run build
   ```
   *Expected Output:*
   ```
   All packages typechecked cleanly.
   All test suites passed.
   Vite build finished: dist/index.html created.
   ```
3. **Explain GitHub Pull Request Gate:**
   - When branch protection is enabled, a single failing test or type error blocks the "Merge Pull Request" button automatically.
   - AI cannot bypass CI status checks.

### Reset & Recovery
- Local verification leaves no dirty state.
