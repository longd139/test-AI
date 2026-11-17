# Slot 3 Instructor Demo Guide — Reusable Workflows, MCP & Accessible AI UI

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Source Deck:** `SLOT 3 - 4 HOURS.pptx` (32 Slides)  
> **Starting Checkpoint:** `checkpoint/slot-03-start`  
> **Ready Checkpoint:** `checkpoint/slot-03-ready`

---

## DEMO-3.1: Automated PR Review via Custom Agent Command

- **Slide Reference:** `SLOT 3` Slide 09 ("Automated PR Review")
- **Category:** Supplementary Planned Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Demonstrate how to build and execute a repeatable custom agent slash command / workflow (`/review-pr`) that analyzes a Git diff against Acceptance Criteria, detects scope creep, and outputs a structured review verdict.
- **Reference Files:** `docs/automations.md`, `student/labs/slot-03-labs.md`.
- **Prerequisites:** AI Assistant supporting custom prompts/commands (Antigravity slash command, Claude prompt template, or Cursor rule).
- **Manual Instructor Participation Required:** Yes (triggering prompt, comparing review output against manual findings).

### Execution Steps
1. **Show the Reviewer Prompt Architecture:**
   - Open `docs/automations.md`.
   - Explain the 4 specialized review angles:
     1. *Scope & Boundary:* Did the PR modify files outside its approved feature scope?
     2. *Schema & Validation:* Did the PR bypass Zod validation?
     3. *Test Coverage:* Does every new behavior have an automated test?
     4. *Security & Accessibility:* Are there unescaped HTML injections or missing ARIA labels?
2. **Execute Agent PR Review:**
   - Feed the agent a sample diff (e.g., `fixtures/pr-review/cross-team-pr.diff` or `git diff checkpoint/slot-02-start..checkpoint/slot-02-demo-priority`):
     > *"Act as an automated PR reviewer using the guidelines in `docs/automations.md`. Review this Git diff. Output a structured report with: Verdict (APPROVE / REQUEST_CHANGES), Scope Analysis, and Actionable Findings."*
3. **Analyze Agent Findings with Class:**
   - Point out what the agent caught (e.g., missing enum in switch statement).
   - Point out what the agent missed (e.g., subtle timezone assumption or database lock).
   - Conclude: *AI accelerates review triage, but human engineers retain sign-off responsibility.*

---

## DEMO-3.2: Playwright MCP Browser Automation

- **Slide Reference:** `SLOT 3` Slide 16 ("Playwright MCP — INSTRUCTOR LIVE DEMO")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Demonstrate how Model Context Protocol (MCP) bridges an AI agent to an external Chromium browser, allowing the agent to navigate the live Task Manager, inspect the DOM tree, fill forms, and verify user flows.
- **Prerequisites:**
  - MCP client configuration in AI host (or local Playwright runner: `npm run test:e2e`).
  - Active web server on `http://localhost:5173`.
- **Manual Instructor Participation Required:** Yes (demonstrating MCP tool invocation or executing headless/headed Playwright E2E).

### Execution Steps
1. **Explain the MCP Architecture:**
   - Contrast static code generation (AI guessing what the DOM looks like) with tool-assisted execution (AI querying live browser DOM via MCP / Chrome DevTools).
2. **Execute Live Browser Automation (Playwright E2E):**
   ```bash
   # Run headed Playwright E2E to let students visually see automated browser control
   npm run test:e2e:headed
   ```
   *Expected Outcome:*
   - Chromium window launches automatically.
   - Types task: "Complete Slot 3 demonstration".
   - Clicks "Add Task".
   - Verifies element is added to DOM.
   - Clicks completion checkbox.
   - Filters task list by "Active" and "Completed".
   - Closes browser with `3 passed`.
3. **Show Code Behind Automation:**
   - Open `e2e/task-manager.spec.ts`.
   - Point out how Playwright tests translate directly to MCP actions (`page.goto`, `page.fill`, `page.click`).

---

## DEMO-3.3: AI UI to Working Task Manager Integration

- **Slide Reference:** `SLOT 3` Slide 25 ("AI UI to Working Task Manager")
- **Category:** Supplementary Planned Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Show how to take an AI-generated UI component (e.g. Filter Tabs), integrate it into the real React state, wire it to backend API endpoints, and ensure WCAG 2.1 AA keyboard accessibility.
- **Reference Files:** `docs/ui-a11y-report.md`, `apps/web/src/App.tsx`.
- **Manual Instructor Participation Required:** Yes (browser interaction, keyboard navigation demonstration).

### Execution Steps
1. **Show the Two Generated UI Alternatives:**
   - Alternative A: Dropdown select menu (`<select>`).
   - Alternative B: Segmented pill tabs (`<nav role="tablist">`).
2. **Justify the Engineering Choice (Pill Tabs):**
   - Direct 1-click access; no hidden dropdown menus.
   - Full keyboard accessibility with `Tab` and `Enter/Space`.
   - Mobile-responsive wrapping with Tailwind CSS.
3. **Demonstrate Accessible Navigation:**
   - Open `http://localhost:5173`.
   - Unplug/ignore mouse.
   - Press `Tab` repeatedly to navigate through task inputs and filter buttons.
   - Press `Space` or `Enter` to switch filters.
   - Show that focused elements display high-contrast focus rings (`focus:ring-2 focus:ring-blue-500`).

### Reset & Recovery
- Local verification leaves no dirty state.
