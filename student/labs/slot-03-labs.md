# Slot 3 Student Labs — Workflows, MCP & Rapid UI Development

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 3:** Agent Automations, Subagents, MCP & Rapid AI UI Development  
> **Prerequisites:** Completed Slot 2 Git and Testing baseline.

---

## LAB 01: BUILD YOUR AI AUTOMATION (Custom Slash Command)

- **Slide Reference:** `SLOT 3` Slide 29 ("Lab 01: Build Your AI Automation")
- **Time Allocated:** 30 minutes
- **Target Repository:** Teaching Task Manager or Student Project Repo
- **Objective:** Turn a repetitive, multi-step prompt sequence into a version-controlled, reusable agent automation.

### Step-by-Step Instructions:

1. **Identify Repetitive Task:** Choose an engineering workflow you execute frequently (e.g., test-and-fix diagnostic, PR review, or schema sync).
2. **Author the Command Specification:**
   - Create a markdown command file in your repository:
     - For Claude Code: `.claude/commands/<command-name>.md`
     - For generic hosts: `.agent/workflows/<command-name>.md`
   - Specify clear step-by-step instructions:
     - Inspection phase (read relevant files, inspect git diff).
     - Execution phase (run verification command, isolate failure).
     - Reporting phase (structured summary format).
3. **Execute and Verify:**
   - Open your agent CLI:
     ```powershell
     claude
     # Run your custom command:
     /<command-name>
     ```
   - Verify the agent executes each step sequentially without hallucinating.
4. **Document Execution Evidence:**
   - Record the command prompt and execution log in `docs/automations.md`.

### Deliverables:
- Committed command file (`.claude/commands/<command-name>.md`).
- Execution log and findings in `docs/automations.md`.

---

## LAB 02: AI UI DECISION CHALLENGE & ACCESSIBILITY AUDIT

- **Slide Reference:** `SLOT 3` Slide 30 ("Lab 02: AI UI Decision Challenge")
- **Time Allocated:** 30 minutes
- **Target Repository:** `apps/web`
- **Objective:** Critically evaluate AI-generated UI beyond visual aesthetics; prioritize usability, keyboard navigation, and WCAG accessibility.

### Step-by-Step Instructions:

1. **Generate Two UI Alternatives:**
   - Ask an AI coding agent to generate two distinct UI solutions for a feature (e.g. status filter: Dropdown vs Segmented Pill Bar).
2. **Perform Accessibility & Usability Evaluation:**
   - Test both alternatives against the 4 accessibility principles (Perceivable, Operable, Understandable, Robust):
     - **Keyboard Operability:** Can you reach every button using only `Tab`? Can you activate it with `Enter` or `Space`?
     - **Focus Rings:** Is there a visible `focus:ring` indicator when an element is focused?
     - **Screen Reader Semantics:** Are proper ARIA attributes present (`role="tablist"`, `aria-selected`, `aria-label`)?
     - **Feedback:** Does the UI show real-time dynamic counters reflecting actual data?
3. **Select & Integrate the Winning Option:**
   - Choose the superior component, justify your decision in a tradeoff matrix, and wire it into the real React state and API.
4. **Document Decisions:**
   - Fill in your evaluation matrix and accessibility findings in `docs/ui-a11y-report.md`.

### Deliverables:
- Integrated accessible component in `apps/web/src/components/`.
- Written evaluation and a11y audit report in `docs/ui-a11y-report.md`.

---

## LAB 03: STUDENT MVP INTEGRATION (Milestone M2)

- **Slide Reference:** `SLOT 3` Slide 31 ("LAB 03: STUDENT MVP INTEGRATION")
- **Time Allocated:** 40 minutes
- **Target Repository:** Student Team Project Repository
- **Objective:** Deliver a working end-to-end Minimum Viable Product (MVP) connected to a real database.

### Step-by-Step Instructions:

1. **Connect Frontend to Backend:**
   - Ensure your React/Vite UI communicates with your Express API via HTTP.
   - Verify all API calls pass through Zod schema validation.
2. **Verify Full Persistence Lifecycle:**
   - In your browser:
     1. Create a new record (observe POST 201).
     2. Refresh the browser page (observe data persists from SQLite database).
     3. Update the record (observe PATCH 200).
     4. Delete the record (observe DELETE 200).
3. **No Mock Data in Production Path:**
   - Ensure the UI renders data dynamically fetched from the database, not hardcoded mock arrays.
4. **Record Milestone M2 Evidence:**
   - Run automated tests (`npm test` and `npm run test:e2e`).
   - Capture a screenshot of the running MVP with real data.
   - Prepare your team demo for the class checkpoint.

### Deliverables:
- Working full-stack repository branch.
- Milestone M2 evidence submitted according to course syllabus rubric.
