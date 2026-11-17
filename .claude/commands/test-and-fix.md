# /test-and-fix — Automated Test-and-Fix Workflow

Automated workflow that runs project test suites, isolates failing assertions, identifies the exact defect root cause without breaking working behavior, applies minimal fixes, and verifies the resolution.

## Usage
```text
/test-and-fix [workspace]
```
If `workspace` is omitted, run across all workspaces (`packages/shared`, `apps/api`, `apps/web`).

---

## Workflow Instructions for the Agent

### Step 1: Run Test Suite & Capture Failure
1. Execute `npm test` (or `npm test -w <workspace>`).
2. If all tests pass, report `ALL GREEN (0 failures)` and exit.
3. If any test fails, capture the exact:
   - Failing test suite file
   - Failing test name
   - Expected vs Received assertion difference
   - Stack trace line numbers

### Step 2: Root-Cause Investigation (Inspect Before Edit)
- Open and read the failing test file.
- Identify what behavioral contract is being tested (e.g., input trimming, 400 validation error, data isolation).
- Locate the implementation file responsible for this logic.
- **NEVER modify or delete the test** to force a pass unless the test itself has an explicit bug approved by the user.

### Step 3: Minimal Scoped Repair
- Formulate the smallest possible patch in the implementation file.
- Ensure the fix does not introduce side effects to existing passing tests.
- Do not add unrequested dependencies or rewrite architectural patterns.

### Step 4: Verification Loop
- Re-run the specific failing test suite:
  ```powershell
  npm test -w <workspace>
  ```
- If green, run full monorepo typecheck and all tests:
  ```powershell
  npm run typecheck
  npm test
  ```
- If all pass, present the git diff and a summary of the defect and fix.

### Step 5: Deliverable Report Format
```markdown
## Test-and-Fix Report
- **Failing Test:** `<suite-name> > <test-name>`
- **Root Cause:** `<brief technical explanation>`
- **Fix Applied:** `<file modified and lines changed>`
- **Verification:** `<X/X tests passing>`
```
