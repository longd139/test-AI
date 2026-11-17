# Slot 4 Student Labs — Secure AI Code, Human vs AI Review & Scientific Debugging

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 4:** Secure AI Code, Human vs AI Code Review & Debugging  
> **Target Checkpoint:** `checkpoint/slot-04-start`  
> **Notice:** All security exercises use isolated training fixtures. Do not attempt to run training fixtures in production.

---

## LAB 01: SECURITY INVESTIGATION & REMEDIATION (SAST & SCA)

- **Slide Reference:** `SLOT 4` Slide 27 ("Lab 01: Security Investigation")
- **Time Allocated:** 35 minutes
- **Target Files:** `apps/api/src/fixtures/simulated-ownership.ts`, `apps/api/src/app.ts`, `.semgrep.yml`
- **Objective:** Use automated security tools (SAST & SCA) to identify security flaws in AI-generated code, triage true positives from false alarms, and implement verified fixes with regression tests.

### Step-by-Step Instructions:
1. **Run Static Analysis & Dependency Audits:**
   ```powershell
   npm run security:scan
   ```
2. **Triage Findings:**
   - Review reported warnings against OWASP API Security Top 10.
   - Look for:
     - Broken Object-Level Authorization (IDOR) where caller identity is ignored.
     - Sensitive data or exception disclosure in HTTP response handlers.
     - Permissive validation or prompt injection exposure.
3. **Remediate Three Verified Vulnerabilities:**
   - For each vulnerability, write a failing regression test first.
   - Apply the minimal security patch.
   - Verify the regression test turns green.
4. **Complete Deliverable:**
   - Record your findings and remediation evidence in `docs/security-report.md`.

---

## LAB 02: CROSS-TEAM CODE REVIEW: HUMAN VS AI

- **Slide Reference:** `SLOT 4` Slide 28 ("Lab 02: Human vs AI Code Review")
- **Time Allocated:** 30 minutes
- **Target Fixture:** `fixtures/pr-review/cross-team-pr.diff`
- **Objective:** Practice the **Human-First, AI-Second** code review workflow to discover the strengths and blind spots of AI code reviewers.

### Step-by-Step Instructions:
1. **Phase 1: Human Review First (12 Minutes):**
   - Open `fixtures/pr-review/cross-team-pr.diff`.
   - Read the changes manually without using AI tools or running test scripts.
   - Look for business logic edge cases, timezone calculations, and negative durations.
   - Write down at least 3 specific review comments.
2. **Phase 2: AI Code Review Second (8 Minutes):**
   - Provide the diff to an AI coding assistant (Claude Code or IDE assistant).
   - Prompt: *"Review this git diff for syntax errors, security flaws, unused imports, and edge cases."*
   - Capture the AI's list of findings.
3. **Phase 3: Compare & Evaluate (10 Minutes):**
   - Compare what you found versus what the AI found.
   - Did the AI catch any typos or unused imports you missed?
   - Did you catch business logic flaws that the AI completely overlooked?
   - Record your comparison in `docs/review-comparison.md` using `docs/slot-04/review-comparison-template.md`.

---

## LAB 03: SEEDED BUG HUNT — SCIENTIFIC DEBUGGING

- **Slide Reference:** `SLOT 4` Slide 29 ("Lab 03: Seeded Bug Hunt")
- **Time Allocated:** 35 minutes
- **Target Directory:** `tests/bug-hunt/`
- **Objective:** Apply the 5-stage scientific debugging loop (Reproduce → Isolate → Hypothesize → Fix → Regression Test) to resolve exactly five reproducible bugs.

### The Five Bug Reports:
1. **Bug 1 (Pagination):** Requesting Page 1 with limit 5 skips tasks #1 through #5.
2. **Bug 2 (Search):** Searching for lowercase `"report"` fails to match uppercase task titles like `"Report Q4"`.
3. **Bug 3 (Query Filtering):** Passing query parameter `?completed=false` returns completed tasks instead of pending tasks.
4. **Bug 4 (Authorization):** A user is able to delete or view another user's task in the simulated training fixture.
5. **Bug 5 (State Leakage):** Adding tags to one task causes newly created unrelated tasks to inherit those tags.

### Step-by-Step Instructions:
1. Run the bug hunt test suite:
   ```powershell
   npm run test:bugs
   ```
2. For each of the 5 bugs:
   - Identify the root cause in `tests/bug-hunt/bug-implementations.ts`.
   - Formulate a testable hypothesis.
   - Implement the minimal fix.
   - Run the test suite to confirm that all 5 regression tests pass.
3. Submit your completed bug investigation log and green test run.
