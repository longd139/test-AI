# Master Student Lab & Activity Inventory — Course 4

> **Status:** APPROVED IMPLEMENTATION DESIGN (PHASE P0.1)  
> All lab states, instructions, evidence requirements, and verification criteria are **PLANNED** for execution in Phases P1–P5.

---

## 1. Lab Categorization & Slide Deck Reconciliation

An independent technical audit of the five PowerPoint decks in `SLIDE-4HOURS` established:
- **12 Explicitly Deck-Labelled Labs (Slots 1–4):**
  - `SLOT 1` Slide 29: LAB 01 — Prompt Engineering
  - `SLOT 1` Slide 30: LAB 02 — AI Business Analyst
  - `SLOT 1` Slide 31: LAB 03 — Project Kickoff (Milestone M0)
  - `SLOT 2` Slide 30: Lab 01 — Agent Planning Challenge
  - `SLOT 2` Slide 31: Lab 02 — Testing & Bug Investigation
  - `SLOT 2` Slide 32: Lab 03 — Student Project Sprint
  - `SLOT 3` Slide 29: Lab 01 — Build Your AI Automation
  - `SLOT 3` Slide 30: Lab 02 — AI UI Decision Challenge
  - `SLOT 3` Slide 31: LAB 03 — Student MVP Integration (Milestone M2)
  - `SLOT 4` Slide 27: Lab 01 — Security Investigation
  - `SLOT 4` Slide 28: Lab 02 — Human vs AI Code Review
  - `SLOT 4` Slide 29: Lab 03 — Seeded Bug Hunt
- **2 Guided Practical Activities (Slot 5):**
  - `SLOT 5` Slides 08 & 10: Guided Activity 5.1 — Cloud Deployment & Observability Configuration
  - `SLOT 5` Slides 12–15: Guided Activity 5.2 — Production Incident Response & Postmortem Drill
- **1 Summative Assessment (Slot 5):**
  - `SLOT 5` Slides 16–21: Demo Day Oral Defense & Final Project Evaluation (Milestones M3 & M4)

**Accurate Activity Total:** **14 Guided Labs/Activities plus 1 Demo Day Assessment** (not "15 student labs").

---

## 2. Slot 1 Labs

### LAB-1.1: Prompt Engineering with Context Constraints
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 1` Slide 29 ("LAB 01: Prompt Engineering")
- **Allocated Duration:** 30 minutes
- **Target Repository:** Teaching Task Manager (`checkpoint/slot-01-start`)
- **Learning Objective:** Experience how vague prompts produce uncontrolled scope, and how structured prompts with context constraints yield precise, reviewable diffs.
- **Input State [PLANNED]:** Clean checkout of `checkpoint/slot-01-start` (basic task CRUD, zero auth, single-user board).
- **Student Instructions:**
  1. Inspect existing code in `apps/api` and `packages/shared`.
  2. Write a structured engineering prompt specifying role, task, constraints, and verification steps.
  3. Direct Claude Code to propose a generic controlled change (e.g., adding an optional description field or input trim rule).
  4. Evaluate AI response: list all unstated assumptions made by the model.
  5. Document verification steps before accepting code.
- **Curriculum Note:** *Task Priority is NOT required or pre-implemented in Slot 1.*
- **Expected Deliverable Evidence [PLANNED]:** Prompt text, AI plan output, documented assumption inventory (at least 3 assumptions identified), verification plan.
- **Verification Criteria:** Student can articulate which constraints prevented the AI from making unwanted edits to unrelated files.

---

### LAB-1.2: AI Business Analyst — Requirement Clarification
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 1` Slide 30 ("LAB 02: AI Business Analyst")
- **Allocated Duration:** 30 minutes
- **Target:** Ambiguous stakeholder problem brief
- **Learning Objective:** Convert vague stakeholder requests into unambiguous, testable engineering specifications.
- **Input State [PLANNED]:** Incomplete customer brief and template `docs/PRD.md`.
- **Student Instructions:**
  1. Read the incomplete customer request: 'We need users to manage their daily work quickly.'
  2. Use AI as an interviewer to separate facts from unstated assumptions.
  3. Formulate functional requirements with testable Acceptance Criteria in Given/When/Then format.
  4. Document in `docs/PRD.md`.
- **Expected Deliverable Evidence [PLANNED]:** Committed `docs/PRD.md` with problem statement, target user, functional requirements, and Given/When/Then criteria.
- **Verification Criteria:** Acceptance criteria are verifiable by automated tests; zero ambiguous adjectives ('fast', 'easy', 'intuitive').

---

### LAB-1.3: Student Project Kickoff (Milestone M0)
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 1` Slide 31 ("LAB 03: Project Kickoff")
- **Allocated Duration:** 35 minutes
- **Target:** Student Team Project Repository (**Separate & Independent**)
- **Learning Objective:** Establish team accountability, rotating role distribution, and independent project repository infrastructure.
- **Input State [PLANNED]:** Empty GitHub repository created by student team.
- **Student Instructions:**
  1. Form team of 4–5 students and assign initial rotating roles.
  2. Choose a separate, real-world project problem (**NOT the Teaching Task Manager**).
  3. Initialize GitHub repository, add README with problem statement, grant instructor read access.
  4. Submit Milestone M0.
- **Expected Deliverable Evidence [PLANNED]:** GitHub repository URL, initial README, member roster with roles, M0 submission link.
- **Verification Criteria:** Repository exists, all team members have pushed a commit, instructor access verified.

---

## 3. Slot 2 Labs

### LAB-2.1: Agent Planning Challenge & Scope Creep Rejection
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 2` Slide 30 ("Lab 01 - Agent Planning Challenge")
- **Allocated Duration:** 30 minutes
- **Target Repository:** Teaching Task Manager (`checkpoint/slot-02-start`)
- **Learning Objective:** Enforce the human control gate; train students to identify and reject scope creep in AI proposals.
- **Input State [PLANNED]:** Task Manager baseline where tasks lack editable due dates.
- **Student Instructions:**
  1. Inspect requirement: 'Allow users to edit task due dates.'
  2. Prompt AI to propose an implementation plan.
  3. Detect scope creep (e.g., AI attempting to install third-party calendar libraries, refactor unrelated routes, or change DB schema).
  4. Reject the broad plan and constrain the agent to a minimal, single-responsibility plan.
  5. Save approved plan to `docs/PLAN.md`.
- **Expected Deliverable Evidence [PLANNED]:** `docs/PLAN.md` containing rejected AI plan, reasons for rejection, and approved minimal plan.
- **Verification Criteria:** Approved plan touches <= 3 files and introduces zero unnecessary third-party packages.

---

### LAB-2.2: Testing & Bug Investigation (Whitespace Validation)
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 2` Slide 31 ("Lab 02 - Testing & Bug Investigation")
- **Allocated Duration:** 35 minutes
- **Target Repository:** Teaching Task Manager (`apps/api`)
- **Learning Objective:** Apply Test-Driven Development (TDD) with AI: proving defects with tests before modifying source code.
- **Input State [PLANNED]:** Buggy validation in `checkpoint/slot-02-start` allowing whitespace-only task titles (`"   "`).
- **Student Instructions:**
  1. Write a failing integration test in `tests/integration/tasks.test.ts` asserting that whitespace-only titles return HTTP 400.
  2. Run test and verify it fails (RED).
  3. Direct AI to apply minimal root-cause fix in Zod schema (`z.string().trim().min(1)`).
  4. Rerun test and verify pass (GREEN).
- **Expected Deliverable Evidence [PLANNED]:** Test execution log showing failure before fix, git diff of schema fix, test execution log showing 100% pass after fix.
- **Verification Criteria:** Existing valid task creation tests still pass; whitespace-only titles are cleanly rejected.

---

### LAB-2.3: Student Project Sprint — Controlled Feature 1
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 2` Slide 32 ("Lab 03 - Student Project Sprint")
- **Allocated Duration:** 35 minutes
- **Target Repository:** Student Team Project Repository
- **Learning Objective:** Apply branch-per-feature workflow and test-first AI implementation to student projects.
- **Input State [PLANNED]:** Team repository from Slot 1.
- **Student Instructions:**
  1. Pick User Story 1 from team PRD.
  2. Create feature branch `feat/<story-name>`.
  3. Write Acceptance Criteria and failing test.
  4. Use AI to implement minimal feature under human review.
  5. Open Pull Request on GitHub with test evidence.
- **Expected Deliverable Evidence [PLANNED]:** GitHub PR link, diff review notes, AI Engineering Log entry.
- **Verification Criteria:** PR has passing automated tests, clear description, and at least one peer review approval.

---

## 4. Slot 3 Labs

### LAB-3.1: Build Your AI Automation (Custom Slash Command)
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 3` Slide 29 ("Lab 01: Build Your AI Automation")
- **Allocated Duration:** 30 minutes
- **Target Repository:** Teaching Task Manager or Student Project Repo
- **Learning Objective:** Turn repetitive prompts into version-controlled, team-shareable agent automations.
- **Input State [PLANNED]:** Repository without custom commands.
- **Student Instructions:**
  1. Identify repetitive development workflow (e.g., test-and-fix or PR review).
  2. Create `.claude/commands/test-and-fix.md` specifying step-by-step agent execution.
  3. Execute the command on a branch with a broken test.
  4. Verify agent diagnoses failure, fixes code, reruns test, and reports result without hallucination.
  5. Document in `docs/automations.md`.
- **Expected Deliverable Evidence [PLANNED]:** Committed `.claude/commands/test-and-fix.md` and execution transcript in `docs/automations.md`.
- **Verification Criteria:** Command executes cleanly from Claude Code CLI and successfully automates the multi-step cycle.

---

### LAB-3.2: AI UI Decision Challenge & Accessibility Audit
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 3` Slide 30 ("Lab 02: AI UI Decision Challenge")
- **Allocated Duration:** 30 minutes
- **Target Repository:** Teaching Task Manager (`apps/web`)
- **Learning Objective:** Critically evaluate AI-generated UI beyond aesthetics; prioritize usability, responsiveness, and accessibility.
- **Input State [PLANNED]:** Basic unstyled task list.
- **Student Instructions:**
  1. Generate two UI variations for the task filter/board using an AI generator.
  2. Evaluate both for responsive layout (mobile vs desktop) and accessibility (ARIA labels, keyboard tab order).
  3. Refactor selected component to pass keyboard navigation.
  4. Document decisions in `docs/ui-a11y-report.md`.
- **Expected Deliverable Evidence [PLANNED]:** Component code in `apps/web/src/components/`, screenshot of keyboard focus states, `docs/ui-a11y-report.md`.
- **Verification Criteria:** Every interactive element (button, input, filter) is operable via Tab/Enter keys; screen reader labels present.

---

### LAB-3.3: Student MVP Integration (Milestone M2)
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 3` Slide 31 ("LAB 03: STUDENT MVP INTEGRATION")
- **Allocated Duration:** 40 minutes
- **Target Repository:** Student Team Project Repository
- **Learning Objective:** Deliver a functional end-to-end Minimum Viable Product (MVP).
- **Input State [PLANNED]:** Disjointed frontend and backend in team repository.
- **Student Instructions:**
  1. Integrate frontend components with real API and database persistence.
  2. Verify 1 complete core user journey from UI to database and back.
  3. Ensure basic responsive styling and error handling.
  4. Prepare demonstrable MVP for class checkpoint.
- **Expected Deliverable Evidence [PLANNED]:** Working demo in class, passing integration tests, Milestone M2 submission.
- **Verification Criteria:** User can complete the primary workflow in the browser with persistence; no mock data in production path.

---

## 5. Slot 4 Labs

### LAB-4.1: Security Investigation & Remediation (SAST & SCA)
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 4` Slide 27 ("Lab 01: Security Investigation")
- **Allocated Duration:** 35 minutes
- **Target Repository:** Teaching Task Manager (`checkpoint/slot-04-security-vulns`)
- **Learning Objective:** Detect and remediate OWASP Top 10 security flaws commonly generated by AI coding tools.
- **Input State [PLANNED]:** Isolated training branch containing 3 deliberate, benign vulnerabilities.
- **Security Boundary Note:** *`X-User-Id` is strictly a simulated identity fixture for vulnerability demonstration, NOT authentication. It is guarded against production use.*
- **Student Instructions:**
  1. Run `npm run security:scan` (Semgrep + `npm audit`).
  2. Triage findings: distinguish true positives from false alarms.
  3. Fix at least 3 verified vulnerabilities (IDOR in simulated fixture, input sanitization boundary, sensitive data exposure).
  4. Write regression tests proving vulnerabilities are resolved.
  5. Document in `docs/security-report.md`.
- **Expected Deliverable Evidence [PLANNED]:** Before and after Semgrep output, 3 regression tests, committed `docs/security-report.md`.
- **Verification Criteria:** Semgrep scan exits with 0 errors; all security regression tests pass.

---

### LAB-4.2: Cross-Team Code Review: Human vs AI
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 4` Slide 28 ("Lab 02: Human vs AI Code Review")
- **Allocated Duration:** 30 minutes
- **Target Repository:** Peer Team Pull Request (100–400 LOC)
- **Learning Objective:** Understand AI code review strengths (syntax, edge cases) and blind spots (business logic, context).
- **Input State [PLANNED]:** Open Pull Request on peer team repository.
- **Student Instructions:**
  1. Read peer team's PR description and Acceptance Criteria.
  2. Perform human review first: write 3 specific, constructive comments.
  3. Run AI review prompt on the same PR diff.
  4. Compare findings: classify findings into syntax, architecture, business logic, security.
  5. Document in `docs/review-comparison.md`.
- **Expected Deliverable Evidence [PLANNED]:** Posted GitHub PR review comments, comparison matrix in `docs/review-comparison.md`.
- **Verification Criteria:** Comparison includes at least 3 human catches and 3 AI catches with validity analysis.

---

### LAB-4.3: Seeded Bug Hunt — Scientific Debugging
- **Category:** `[DECK-LABELLED LAB]`
- **Slide Reference:** `SLOT 4` Slide 29 ("Lab 03: Seeded Bug Hunt")
- **Allocated Duration:** 35 minutes
- **Target Repository:** Teaching Task Manager (`checkpoint/slot-04-bug-hunt`)
- **Learning Objective:** Apply the 5-stage debugging loop (Reproduce -> Isolate -> Hypothesize -> Fix -> Regression Test).
- **Input State [PLANNED]:** Isolated training branch with all 5 seeded bugs active.
- **Student Instructions:**
  1. Review 5 user bug reports (pagination off-by-one, case-sensitive search, boolean query parsing, broken ownership check in simulated fixture, shared state/prototype pollution).
  2. For each bug: write failing test, isolate cause, apply minimal fix, verify green.
  3. Record time and whether AI's initial hypothesis was correct.
- **Expected Deliverable Evidence [PLANNED]:** 5 passing regression tests in `tests/bug-hunt/`, bug investigation log.
- **Verification Criteria:** 5/5 tests pass; no regressions in baseline task endpoints.

---

## 6. Slot 5 Guided Activities & Summative Assessment

### ACTIVITY-5.1: Cloud Deployment & Production Observability
- **Category:** `[GUIDED PRACTICAL ACTIVITY]`
- **Slide Reference:** `SLOT 5` Slide 08 & Slide 10 ("From GitHub to a Public URL" / "Health Check & Structured Logs")
- **Allocated Duration:** 35 minutes
- **Target Repository:** Student Team Project Repository
- **Learning Objective:** Configure a twelve-factor web application on production cloud hosting with live observability.
- **Input State [PLANNED]:** Local-only repository ready for deployment.
- **Student Instructions:**
  1. Configure environment variables in Vercel (web) and Render (API) with Neon PostgreSQL.
  2. Deploy application and confirm live public URLs.
  3. Verify `GET /health` returns JSON status 200 with database connected.
  4. Confirm structured Pino JSON logs record real requests with request IDs and duration.
- **Expected Deliverable Evidence [PLANNED]:** Public URLs, passing health check response, sample structured log excerpt in README.
- **Verification Criteria:** Public web app functions end-to-end; health check returns HTTP 200.

---

### ACTIVITY-5.2: Production Incident Response & Postmortem Drill
- **Category:** `[GUIDED PRACTICAL ACTIVITY]`
- **Slide Reference:** `SLOT 5` Slides 12–15 ("WHEN PRODUCTION BREAKS" / "LIVE INCIDENT DRILL")
- **Allocated Duration:** 25 minutes
- **Target Repository:** Teaching Task Manager or Student Deployed App
- **Learning Objective:** Practice disciplined incident triage: mitigate first, investigate second, document postmortem.
- **Input State [PLANNED]:** Simulated broken configuration causing service degradation (HTTP 503).
- **Student Instructions:**
  1. Trigger simulated incident: broken DB connection or missing environment variable.
  2. Follow operational runbook (`docs/runbook.md`) to mitigate immediately (rollback or config fix).
  3. Verify service restoration via health check.
  4. Direct AI to summarize sanitized logs and isolate root cause.
  5. Write incident postmortem in `docs/postmortem-drill.md`.
- **Expected Deliverable Evidence [PLANNED]:** Restored health check proof, incident timeline, completed `docs/postmortem-drill.md`.
- **Verification Criteria:** Service recovered within drill window; postmortem identifies root cause and actionable preventions.

---

### ASSESSMENT-5.3: Demo Day Oral Defense & Final Project Evaluation
- **Category:** `[SUMMATIVE ASSESSMENT]`
- **Slide Reference:** `SLOT 5` Slides 16–21 ("SHOW THE PRODUCT. DEFEND THE ENGINEERING.")
- **Allocated Duration:** 60 minutes (7 min demo + 5 min individual defense per team)
- **Target:** Student Team Project & Final Course Deliverables (Milestones M3 & M4)
- **Learning Objective:** Defend engineering ownership, explain AI-assisted decisions, and demonstrate a live, tested software product.
- **Input State [PLANNED]:** Production deployed application, release tag `v1.0`, and complete Git history.
- **Student Instructions:**
  1. Tag git release `v1.0`.
  2. Submit `docs/final-report.md` (max 6 pages) and presentation deck (max 8 slides).
  3. Deliver 7-minute live product demonstration on public production URL.
  4. Undergo 5-minute individual oral defense explaining code, AI prompts, and architectural decisions.
- **Expected Deliverable Evidence [PLANNED]:** Release tag `v1.0`, live presentation, individual Q&A evaluation, peer evaluation factor.
- **Verification Criteria:** Evaluated according to 100-point rubric; individual defense proves genuine ownership of committed code.
