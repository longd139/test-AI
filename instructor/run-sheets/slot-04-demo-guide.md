# Instructor Run Sheet — Slot 4 Live Demonstrations

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 4:** Secure AI Code, Human vs AI Code Review & Debugging  
> **Target Checkpoint:** `checkpoint/slot-04-start`  
> **Platform:** Windows PowerShell (with Bash equivalents noted)

---

## Pre-Flight Setup (5 Minutes Before Class)

Ensure the teaching environment is prepared in a disposable worktree:

```powershell
# Open terminal in repository root:
cd D:\FPT\project\Course4_ModernAISoftwareDeveloper_Materials1\SRC-GUIDE

# Create disposable demo worktree:
$demoPath = Join-Path (Split-Path -Parent (Get-Location)) "demo-slot-04-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
git worktree add -b demo-slot-04 $demoPath checkpoint/slot-04-start
Set-Location -LiteralPath $demoPath

# Install dependencies and reset local database:
npm ci
npm run db:reset

# Verify test baseline:
npm test
```

---

## DEMO 1 — SECURITY INVESTIGATION VIA SAST & SCA (25 Minutes)

- **Slide Reference:** `SLOT 4` Slide 13 ("Live Demo: Security Investigation")
- **Learning Objective:** Show how AI coding agents can generate syntactically valid code that contains severe OWASP Top 10 security vulnerabilities, and demonstrate how automated SAST (`Semgrep`) and SCA (`npm audit`) detect them.

### Step-by-Step Execution:

1. **Explain the Blind Spot (Slides 04–08):**
   - AI tools optimize for code completion, not security. Show how an AI can easily generate code that deletes a record by ID without checking whether the user owns it.
   - Reiterate the non-negotiable rule: `X-User-Id` is strictly a simulated identity fixture for testing; never authentication.

2. **Execute Dependency & Security Scan:**
   ```powershell
   npm run security:scan
   ```

3. **Demonstrate IDOR in Simulated Fixture:**
   Run the ownership check test:
   ```powershell
   npm run test:security
   ```
   - Walk students through `tests/security/ownership.test.ts`.
   - Show how the vulnerable route allows Bob to delete Alice's task (`task-alice-1`).
   - Show how the secure route enforces `task.ownerId === callerId` and returns HTTP 403 Forbidden.
   - Point out `assertSafeEnvironment()`, which halts process boot if anyone attempts to run this fixture in production.

4. **Demonstrate Prompt Injection Delimiter Defense (Slide 10–11):**
   - Walk through `tests/security/prompt-injection.test.ts`.
   - Show how naive concatenation lets user text become system commands.
   - Show how XML delimiters (`<user_data>`) and JSON serialization enforce boundary safety.

---

## DEMO 2 — HUMAN VS AI CODE REVIEW EXPERIMENT (25 Minutes)

- **Slide Reference:** `SLOT 4` Slide 19 ("Live Demo: Review a Pull Request")
- **Learning Objective:** Demonstrate the "Human-First, AI-Second" review methodology using the cross-team PR fixture.

### Step-by-Step Execution:

1. **Display the Cross-Team PR Diff:**
   Open `fixtures/pr-review/cross-team-pr.diff` on the classroom projector.

2. **Conduct the 5-Minute Human Review (Classroom Participation):**
   - Ask students: *"Look at `calculateIsOverdue` in `dueDate.ts`. What happens if this runs in Vietnam (UTC+7) or California (UTC-8)?"*
   - Reveal the timezone date offset bug.
   - Ask students: *"Look at `reminderMinutesBefore: z.number().optional()`. Can a user pass `-30` minutes?"*
   - Reveal the negative duration bug.

3. **Run the AI Review Prompt Live:**
   Open Claude Code or IDE AI:
   ```powershell
   claude
   # Prompt:
   Review the diff in fixtures/pr-review/cross-team-pr.diff. Identify all bugs, security risks, and code quality issues.
   ```

4. **Compare Side-by-Side (Slide 17–18):**
   - **What AI caught instantly:** The unused `date-fns` import, the typo `isOverude`, and the `dangerouslySetInnerHTML` XSS risk.
   - **What AI missed:** The subtle timezone boundary bug and the negative duration domain logic flaw.
   - *Key Takeaway:* AI is a tireless assistant for syntax and hygiene, but humans must lead on business logic and domain intent.

---

## DEMO 3 — SEEDED BUG HUNT (30 Minutes)

- **Slide Reference:** `SLOT 4` Slide 25 ("Live Demo: Bug Hunt")
- **Learning Objective:** Demonstrate the 5-stage scientific debugging loop (Reproduce → Isolate → Hypothesize → Fix → Regression Test).

### Step-by-Step Execution:

1. **Run the Bug Hunt Suite in Buggy Mode:**
   ```powershell
   npm run test:bugs
   ```
   Show all 5 bugs executing and explain the symptoms.

2. **Live Fix Demonstration (Bug 1 & Bug 4):**
   - **Bug 1 (Pagination):**
     - Show `calculatePaginationOffset(page, limit)` in `tests/bug-hunt/bug-implementations.ts`.
     - Point out: `page * limit` causes Page 1 to start at offset 5!
     - Change to `(page - 1) * limit`.
   - **Bug 4 (Ownership):**
     - Show `verifyTaskAccess(task, callerUserId)`.
     - Change from `return true` to `return task.ownerId === callerUserId`.

3. **Verify Regression Suite Turns Green:**
   ```powershell
   npm run test:bugs
   ```
   *Expected Observable Output:* All 10 tests pass (both reproduction and remediated assertions).

---

## Safe Worktree Cleanup

When class is finished, return to the main repository and clean up non-destructively:

```powershell
# Return to main repo:
cd D:\FPT\project\Course4_ModernAISoftwareDeveloper_Materials1\SRC-GUIDE

# Safely remove demo worktree:
git worktree remove --force $demoPath
git branch -D demo-slot-04

# Verify clean git status:
git status
```
