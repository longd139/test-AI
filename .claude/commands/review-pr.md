# /review-pr — Automated PR Review Workflow

Execute a rigorous, evidence-grounded Pull Request review for the current feature branch against the base branch (`main` or `feat/slot-02-controlled-ai-engineering`).

## Usage
```text
/review-pr [base-branch]
```
If `base-branch` is omitted, default to comparing against `HEAD~1` or `main`.

---

## Workflow Instructions for the Agent

### Step 1: Collect Context & Inspect Git Diff
1. Run `git status` to ensure working tree status is known.
2. Run `git diff <base-branch>...HEAD` (or `git log -p <base-branch>..HEAD`) to inspect the exact line-by-line diff.
3. Read `docs/prd.md` and `docs/requirements.md` to identify the functional requirements and Acceptance Criteria (AC) targeted by this change.

### Step 2: Scope Control Check (Anti-Scope-Creep)
Verify that the diff touches ONLY the minimal necessary files:
- Did the author modify schema or database files outside the agreed requirement?
- Are there unrelated refactorings or cosmetic changes bundled into the PR?
- Did the author pull in future-slot features (e.g. auth in Slot 1–3, external PostgreSQL, unapproved libraries)?
- If scope creep is detected, flag it explicitly under **Scope Findings** with line numbers.

### Step 3: Acceptance Criteria & Contract Verification
For every Acceptance Criterion stated in the PR or relevant PRD section:
- Verify that code implements the exact behavior specified.
- Verify that shared domain schemas (`packages/shared/src/index.ts`) were used and not bypassed.
- Check edge cases: whitespace-only input, character limits, empty strings, error responses.

### Step 4: Test Adequacy & Isolation Inspection
Inspect test files included in the diff:
- Are there unit tests verifying the shared domain logic?
- Are there API integration tests validating HTTP status codes (200, 201, 400, 404, 500)?
- Did tests use an isolated database (`test.db`) rather than the development database (`dev.db`)?
- Are tests asserting observable behavior rather than superficial mocks?

### Step 5: Execute Automated Verification
Execute local test commands:
```powershell
npm run typecheck
npm test
```
Verify that all test suites pass with exit code `0`.

### Step 6: Generate Structured Review Report
Output the review in the following standard markdown format:

```markdown
## Automated PR Review Summary
- **Branch Evaluated:** `<branch-name>`
- **Base Comparison:** `<base-branch>`
- **Decision:** [APPROVED | CHANGES REQUESTED]

### 1. Scope & Boundary Compliance
- [PASS/FAIL] File boundary check
- [PASS/FAIL] Out-of-scope feature check (no unapproved auth/dependencies)

### 2. Acceptance Criteria Verification
- AC-1: [VERIFIED | MISSING] — <evidence>
- AC-2: [VERIFIED | MISSING] — <evidence>

### 3. Test Coverage & Safety
- Unit Tests: <count> passing
- API Tests: <count> passing
- Database Isolation: [VERIFIED]

### 4. Required Action Items
1. <item 1 or "None - Ready to merge">
```
