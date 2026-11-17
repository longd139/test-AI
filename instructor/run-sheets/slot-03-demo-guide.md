# Instructor Run Sheet — Slot 3 Live Demonstrations

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 3:** Agent Automations, Subagents, MCP & Rapid AI UI Development  
> **Target Checkpoint:** `checkpoint/slot-03-start`  
> **Platform:** Windows PowerShell (with Bash equivalents noted)

---

## Pre-Flight Setup (5 Minutes Before Class)

Ensure the teaching environment is prepared in a disposable worktree:

```powershell
# Open terminal in repository root:
cd D:\FPT\project\Course4_ModernAISoftwareDeveloper_Materials1\SRC-GUIDE

# Create disposable demo worktree:
$demoPath = Join-Path (Split-Path -Parent (Get-Location)) "demo-slot-03-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
git worktree add -b demo-slot-03 $demoPath checkpoint/slot-03-start
Set-Location -LiteralPath $demoPath

# Install dependencies and seed local SQLite database:
npm ci
npm run db:reset

# Verify tests pass:
npm test
```

---

## DEMO 1 — AUTOMATED PR REVIEW VIA CUSTOM WORKFLOW (25 Minutes)

- **Slide Reference:** `SLOT 3` Slide 09 ("Automated PR Review — Read the Git diff")
- **Learning Objective:** Show how a repetitive development workflow (PR review) can be automated with an AI command/skill that is grounded in requirements (`docs/prd.md`) and Git diffs.

### Step-by-Step Execution:

1. **Explain the Repetitive Problem (Slide 05–08):**
   - Manual PR review is slow and often misses out-of-scope files or skipped acceptance criteria.
   - Show `.claude/commands/review-pr.md`. Point out the step-by-step instructions: inspecting the diff, checking scope, verifying acceptance criteria, and running tests.

2. **Run the Automated PR Review Command:**
   In Claude Code CLI:
   ```powershell
   claude
   # Prompt:
   /review-pr main
   ```
   *Or execute the standalone CLI validator script:*
   ```powershell
   node scripts/review-pr.mjs main
   ```

3. **Walk Students Through the Automated Output:**
   - **Scope Check:** Agent lists all changed files and confirms no unapproved libraries or database engines were introduced.
   - **Requirement Check:** Agent compares changed lines against `docs/prd.md`.
   - **Test Execution:** Agent runs `npm test` and reports pass/fail counts.
   - **Decision:** Outputs clear `[APPROVED | CHANGES REQUESTED]` verdict.

---

## DEMO 2 — PLAYWRIGHT MCP BROWSER AUTOMATION (25 Minutes)

- **Slide Reference:** `SLOT 3` Slide 16 ("Playwright MCP — INSTRUCTOR LIVE DEMO")
- **Learning Objective:** Demystify Model Context Protocol (MCP). Show how tool connection enables the agent to interact directly with the running web application, and explain the permission boundary.

### Step-by-Step Execution:

1. **Show the MCP Configuration (Slide 13–15):**
   - Open [.mcp.json](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/.mcp.json).
   - Explain that MCP uses JSON-RPC to connect the agent process to external tools.
   - Discuss **Slide 17 ("A Tool Connection Is a Permission Decision")**: Connecting browser tools gives the agent permission to execute actions in the local web environment.

2. **Start Monorepo Services:**
   In Terminal 1:
   ```powershell
   npm run dev
   ```

3. **Demonstrate Browser Interaction:**
   In Terminal 2, run the demonstrable browser automation sequence:
   ```powershell
   node scripts/demo-browser-interaction.mjs
   ```
   *Expected Observable Output:*
   - Launches Chromium.
   - Navigates to `http://localhost:5173`.
   - Locates header `"Task Manager"`.
   - Automatically enters task `"MCP Browser Task ..."`, submits form, and asserts DOM element appeared.
   - Clicks completion checkbox and verifies progress counter updates in real time.

4. **Run End-to-End Test Suite:**
   ```powershell
   npm run test:e2e
   ```
   *Result:* 3/3 Playwright browser flows pass in headless Chromium.

---

## DEMO 3 — RAPID AI UI TO WORKING TASK MANAGER (30 Minutes)

- **Slide Reference:** `SLOT 3` Slide 18–25 ("Two Designs. One Requirement", "Beautiful Is Not the Same as Correct", "AI UI to Working Task Manager")
- **Learning Objective:** Show how to critically evaluate two AI-generated UI alternatives, justify the accessible choice, and integrate it with real backend API behavior.

### Step-by-Step Execution:

1. **Present the Two UI Alternatives (Slide 20–21):**
   - Show [docs/slot-03/ui-design-decision.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/docs/slot-03/ui-design-decision.md).
   - Compare **Option A (Dropdown menu)** vs **Option B (Segmented Pill Filter Bar)**.
   - Explain why Option A hides task counts and hurts discoverability.
   - Explain why Option B provides instant feedback (`All 5`, `Active 3`, `Completed 2`) and complies with WCAG 2.1 AA.

2. **Examine the Code:**
   - Show `apps/web/src/components/TaskFilterBar.tsx` (Option B with `role="tablist"` and `aria-selected`).
   - Show `apps/web/src/App.tsx` filtering tasks dynamically from API state.

3. **Demonstrate Keyboard Accessibility in Browser:**
   - Open `http://localhost:5173`.
   - Unplug mouse or do not touch it:
     - Press `Tab` to navigate into the Task Filter Bar.
     - Notice the prominent blue focus ring (`focus:ring-2 focus:ring-blue-500`).
     - Press `Space` or `Enter` on "Active" tab: Observe that completed tasks disappear instantly.
     - Press `Tab` and `Enter` on "Completed" tab: Observe only completed tasks are shown.
     - Press `Tab` and `Enter` on "All" tab: Full list returns.

---

## Safe Worktree Cleanup

When class is finished, return to the main repository and clean up non-destructively:

```powershell
# Return to main repo:
cd D:\FPT\project\Course4_ModernAISoftwareDeveloper_Materials1\SRC-GUIDE

# Safely remove demo worktree:
git worktree remove --force $demoPath
git branch -D demo-slot-03

# Verify clean git status:
git status
```
