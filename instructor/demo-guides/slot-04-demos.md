# Slot 4 Instructor Demo Guide — Secure AI Code, Code Review & Bug Hunt

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Source Deck:** `SLOT 4 - 4 HOURS.pptx` (32 Slides)  
> **Starting Checkpoint:** `checkpoint/slot-04-start`  
> **Ready Checkpoint:** `checkpoint/slot-04-ready`

---

## DEMO-4.1: Security Investigation (SAST & SCA Scanning)

- **Slide Reference:** `SLOT 4` Slide 13 ("Live Demo: Security Investigation")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Demonstrate automated Static Application Security Testing (SAST) with Semgrep and Software Composition Analysis (SCA) with `npm audit` on AI-generated code to catch IDOR, raw exception leakage, and insecure dependencies.
- **Reference Files:** `.semgrep.yml`, `SECURITY.md`, `.github/workflows/security.yml`.
- **Target Fixture:** `checkpoint/slot-04-security-vulns` (or `apps/api/src/fixtures/simulated-ownership.ts`).
- **Prerequisites:** Python `semgrep` CLI (or pre-baked test run `npm run test:security`).
- **Manual Instructor Participation Required:** Yes (running CLI commands, reviewing vulnerability findings with class).

### Execution Steps
1. **Explain the AI Security Blindspot:**
   - AI models frequently generate code that *works functionally* but introduces critical vulnerabilities (e.g., omitting authorization ownership checks, using `dangerouslySetInnerHTML`, or leaking raw DB error stacks).
2. **Execute SAST Scan:**
   ```bash
   # Run automated regression security tests
   npm run test:security
   ```
   *Expected Outcome:*
   - `tests/security/ownership.test.ts`: Verifies that User 2 cannot delete User 1's tasks in the remediated endpoint (returns HTTP 403 Forbidden).
   - `tests/security/prompt-injection.test.ts`: Verifies that delimiter defense (`<user_data>`) and breakout tag stripping neutralize prompt injection payloads.
3. **Inspect the Semgrep Rules (`.semgrep.yml`):**
   - Show students Rule 1 (IDOR): Detects missing caller authorization checks.
   - Show Rule 2 (Raw Exception Disclosure): Detects `res.status(500).json(err)`.
   - Show Rule 4 (XSS): Flags `dangerouslySetInnerHTML`.
4. **Execute SCA Scan:**
   ```bash
   npm run security:audit
   ```
   - Confirm zero high-severity CVEs in active production dependencies.

---

## DEMO-4.2: Review a Pull Request (Human vs AI Review)

- **Slide Reference:** `SLOT 4` Slide 19 ("Live Demo: Review a Pull Request")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Demonstrate the "Human-First, AI-Second" review protocol: conduct a 5-minute manual review of a 160-line simulated PR diff, record findings, execute an AI review pass, and compare detection capabilities.
- **Target Fixture:** `fixtures/pr-review/cross-team-pr.diff`.
- **Reference Files:** `docs/slot-04/human-vs-ai-review-guide.md`, `docs/slot-04/review-comparison-template.md`.
- **Manual Instructor Participation Required:** Yes (walking through diff, showing human vs AI catches).

### Execution Steps
1. **Inspect `fixtures/pr-review/cross-team-pr.diff` with Students:**
   - Give students 3 minutes to spot bugs in the diff.
2. **Reveal Human Review Catches (Subtle Logic & Domain Flaws):**
   - *Bug 1 (Timezone Offset):* `date.setHours(date.getHours() + 7)` breaks if server is already in UTC+7 or daylight savings.
   - *Bug 2 (Negative Duration):* Reminder scheduled for `-15` minutes executes in the past.
3. **Execute AI Review Pass (Prompt AI with diff):**
   - Ask AI to review `fixtures/pr-review/cross-team-pr.diff`.
   - *What AI Catches Well:* Unused imports, missing TypeScript types, and `dangerouslySetInnerHTML`.
   - *What AI Often Misses:* Subtle business logic timezone shifts and negative durations.
4. **Conclusion:**
   - Emphasize the Slide 18 takeaway: *AI is an excellent junior linter; humans are the software architects.*

---

## DEMO-4.3: Bug Hunt (5 Seeded Bugs & Scientific Debugging)

- **Slide Reference:** `SLOT 4` Slide 25 ("Live Demo: Bug Hunt")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 20 minutes
- **Learning Objective:** Demonstrate scientific debugging (Reproduce -> Isolate -> Hypothesize -> Fix -> Regression Test) across the 5 seeded bugs.
- **Starting Checkpoint:** `checkpoint/slot-04-bug-hunt`.
- **Reference Files:** `tests/bug-hunt/bug-implementations.ts`, `tests/bug-hunt/bugs.test.ts`.
- **Manual Instructor Participation Required:** Yes (running bug tests, explaining root cause and remediation).

### Execution Steps
1. **Run the Bug Hunt Suite:**
   ```bash
   npm run test:bugs
   ```
   *Expected Outcome:*
   ```
   ✓ tests/bug-hunt/bugs.test.ts (10 tests)
   Test Files 1 passed (1)
   Tests 10 passed (10)
   ```
2. **Walk Through Two Key Bugs with Class:**
   - **Bug 1: Pagination Off-By-One:**
     - *Buggy:* `skip = page * limit` (Page 1 skips the first `limit` items, losing page 1 entirely!).
     - *Fix:* `skip = (page - 1) * limit`.
   - **Bug 3: Boolean Query String Coercion:**
     - *Buggy:* `Boolean("false") === true` in JavaScript! Passing `?completed=false` sets completed to `true`.
     - *Fix:* `val === 'true' || val === true`.
3. **Show Regression Safety:**
   - Explain how `bugs.test.ts` acts as a permanent regression test ensuring these bugs never re-enter the codebase.
