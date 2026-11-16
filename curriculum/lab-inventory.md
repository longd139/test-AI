# Master Student Lab Inventory — Course 4

> Complete specification for every student laboratory exercise across all five 4-hour slots.

## Slot 1: AI-Native Engineering Foundations & Requirements

### LAB-1.1: Prompt Engineering with Context Constraints
- **Slide Reference:** SLOT 1, Slide 29
- **Allocated Duration:** 30 minutes
- **Target Repository:** Teaching Task Manager (`checkpoint/slot-01-start`)
- **Learning Objective:** Students experience that vague prompts cause hallucinated dependencies and uncontrolled scope, while structured prompts with context yield constrained, reviewable changes.
- **Input State:** Clean checkout of `checkpoint/slot-01-start` with running Task Manager.
- **Student Instructions:**
1. Inspect existing code in `apps/api` and `packages/shared`.
2. Write a structured engineering prompt specifying role, task, constraints, and verification.
3. Prompt Claude Code to plan a new task attribute (e.g., priority or category).
4. Evaluate AI response: list all unstated assumptions made by the model.
5. Document verification steps before accepting code.
- **Expected Deliverable Evidence:** Prompt text, AI plan output, documented assumption inventory (at least 3 assumptions identified), verification plan.
- **Verification Criteria:** Student can explain which constraints prevented AI from editing unrelated files.

### LAB-1.2: AI Business Analyst — Requirement Clarification
- **Slide Reference:** SLOT 1, Slide 30
- **Allocated Duration:** 30 minutes
- **Target Repository:** Ambiguous customer specification
- **Learning Objective:** Students learn to convert vague stakeholder desires into unambiguous, testable engineering specifications.
- **Input State:** Raw customer brief and template `docs/PRD.md`.
- **Student Instructions:**
1. Read the incomplete customer request: 'We need users to manage their daily work quickly.'
2. Use AI as an interviewer to separate facts from assumptions.
3. Formulate 3 functional requirements with testable Acceptance Criteria in Given/When/Then format.
4. Document in `docs/PRD.md`.
- **Expected Deliverable Evidence:** Committed `docs/PRD.md` with problem statement, target user, functional requirements, and Given/When/Then criteria.
- **Verification Criteria:** Every acceptance criterion is verifiable by an automated test; zero subjective terms ('fast', 'easy', 'modern').

### LAB-1.3: Student Project Kickoff & M0 Submission
- **Slide Reference:** SLOT 1, Slide 31
- **Allocated Duration:** 35 minutes
- **Target Repository:** Student Team Project Repository (Independent)
- **Learning Objective:** Establish team accountability, role distribution, and independent project repository infrastructure.
- **Input State:** Empty GitHub repository.
- **Student Instructions:**
1. Form team of 4–5 students and assign rotating roles.
2. Choose a separate, real-world project problem (NOT the Task Manager).
3. Create team GitHub repository, initialize README, add instructor read access.
4. Complete Milestone M0 submission.
- **Expected Deliverable Evidence:** GitHub repository URL, initial README, member roster with roles, M0 submission link.
- **Verification Criteria:** Repo exists, all team members have pushed a commit, instructor has access.

## Slot 2: Controlled AI Development, Git Collaboration & Automated Testing

### LAB-2.1: Agent Planning Challenge & Scope Creep Rejection
- **Slide Reference:** SLOT 2, Slide 30
- **Allocated Duration:** 30 minutes
- **Target Repository:** Teaching Task Manager (`checkpoint/slot-02-start`)
- **Learning Objective:** Enforce human control gate; train students to reject unnecessary dependencies and scope creep in AI proposals.
- **Input State:** Task Manager baseline with tasks lacking editable due dates.
- **Student Instructions:**
1. Inspect requirement: 'Allow users to edit task due dates.'
2. Prompt AI to propose an implementation plan.
3. Identify scope creep (e.g., AI attempting to install new calendar libraries, change DB schema unnecessarily, or refactor unrelated routes).
4. Reject the broad plan and force a minimal, single-responsibility plan.
5. Save plan to `docs/PLAN.md`.
- **Expected Deliverable Evidence:** `docs/PLAN.md` containing rejected AI plan, reasons for rejection, and approved minimal plan.
- **Verification Criteria:** Approved plan touches <= 3 files and adds zero new third-party packages.

### LAB-2.2: Testing & Bug Investigation (Whitespace Validation)
- **Slide Reference:** SLOT 2, Slide 31
- **Allocated Duration:** 35 minutes
- **Target Repository:** Teaching Task Manager (`apps/api`)
- **Learning Objective:** Experience Test-Driven Development (TDD) with AI: proving defects with tests before modifying source code.
- **Input State:** Buggy validation allowing whitespace-only task titles.
- **Student Instructions:**
1. Reproduce bug: creating a task with title `'   '` succeeds with 201 Created.
2. Write a failing integration test in `tests/integration/tasks.test.ts` asserting 400 Bad Request.
3. Run test and verify it fails (RED).
4. Direct AI to apply minimal root-cause fix in Zod schema (`z.string().trim().min(1)`).
5. Rerun test and verify green.
- **Expected Deliverable Evidence:** Terminal test output showing failure before fix, diff of fix, terminal test output showing 100% pass after fix.
- **Verification Criteria:** Existing valid task creation tests still pass; whitespace-only titles are cleanly rejected with 400.

### LAB-2.3: Student Project Sprint — Controlled Feature 1
- **Slide Reference:** SLOT 2, Slide 32
- **Allocated Duration:** 35 minutes
- **Target Repository:** Student Team Project Repository
- **Learning Objective:** Apply branch-per-feature workflow and test-first AI implementation to student projects.
- **Input State:** Team repository from Slot 1.
- **Student Instructions:**
1. Pick User Story 1 from team PRD.
2. Create a feature branch `feat/<story-name>`.
3. Write Acceptance Criteria and failing test.
4. Use AI to implement minimal feature under human review.
5. Open Pull Request on GitHub with test evidence.
- **Expected Deliverable Evidence:** GitHub PR link, diff review notes, AI Engineering Log entry.
- **Verification Criteria:** PR has passing automated tests, clear description, and at least one peer review approval.

## Slot 3: Agent Automations, Subagents, MCP & Rapid AI UI Development

### LAB-3.1: Build Your AI Automation (Custom Slash Command/Skill)
- **Slide Reference:** SLOT 3, Slide 29
- **Allocated Duration:** 30 minutes
- **Target Repository:** Teaching Task Manager or Student Project Repo
- **Learning Objective:** Turn repetitive prompts into version-controlled, team-shareable agent automations.
- **Input State:** Repository without custom commands.
- **Student Instructions:**
1. Identify repetitive development workflow (e.g., test-and-fix or PR review).
2. Create `.claude/commands/test-and-fix.md` specifying step-by-step agent execution.
3. Execute the command on a branch with a broken test.
4. Verify agent diagnoses failure, fixes code, reruns test, and reports result without hallucination.
5. Document in `docs/automations.md`.
- **Expected Deliverable Evidence:** Committed `.claude/commands/test-and-fix.md` and execution transcript in `docs/automations.md`.
- **Verification Criteria:** Command executes cleanly from Claude Code CLI and successfully automates the multi-step cycle.

### LAB-3.2: AI UI Decision Challenge & Accessibility Audit
- **Slide Reference:** SLOT 3, Slide 30
- **Allocated Duration:** 30 minutes
- **Target Repository:** Teaching Task Manager (`apps/web`)
- **Learning Objective:** Critically evaluate AI-generated UI beyond aesthetics; prioritize usability, responsiveness, and accessibility.
- **Input State:** Basic unstyled task list.
- **Student Instructions:**
1. Generate two UI variations for the task filter/board using an AI generator.
2. Evaluate both for responsive layout (mobile vs desktop) and accessibility (ARIA labels, keyboard tab order).
3. Refactor selected component to pass keyboard navigation.
4. Document decisions in `docs/ui-a11y-report.md`.
- **Expected Deliverable Evidence:** Component code in `apps/web/src/components/`, screenshot of keyboard focus states, `docs/ui-a11y-report.md`.
- **Verification Criteria:** Every interactive element (button, input, filter) is operable via Tab/Enter keys; screen reader labels present.

### LAB-3.3: Student MVP Integration (Milestone M2)
- **Slide Reference:** SLOT 3, Slide 31
- **Allocated Duration:** 40 minutes
- **Target Repository:** Student Team Project Repository
- **Learning Objective:** Deliver a functional end-to-end Minimum Viable Product (MVP).
- **Input State:** Disjointed frontend and backend in team repository.
- **Student Instructions:**
1. Integrate frontend components with real API and database persistence.
2. Verify 1 complete core user journey from UI to database and back.
3. Ensure basic responsive styling and error handling.
4. Prepare demonstrable MVP for class checkpoint.
- **Expected Deliverable Evidence:** Working demo in class, passing integration tests, Milestone M2 submission.
- **Verification Criteria:** User can complete the primary workflow in the browser with persistence; no mock data in production path.

## Slot 4: Secure AI Code, Human vs AI Code Review & Debugging

### LAB-4.1: Security Investigation & Remediation (SAST & SCA)
- **Slide Reference:** SLOT 4, Slide 27
- **Allocated Duration:** 35 minutes
- **Target Repository:** Teaching Task Manager (`checkpoint/slot-04-security-vulns`)
- **Learning Objective:** Detect and remediate OWASP Top 10 security flaws commonly generated by AI coding tools.
- **Input State:** Branch with 3 deliberate, benign vulnerabilities.
- **Student Instructions:**
1. Run `npm run security:scan` (Semgrep + `npm audit`).
2. Triage findings: distinguish true positives from false alarms.
3. Fix at least 3 verified vulnerabilities:
   - Broken Access Control (IDOR: user modifying another user's task)
   - Missing input sanitization / schema boundary
   - Sensitive data exposure in API responses
4. Write regression tests proving vulnerabilities are resolved.
5. Document in `docs/security-report.md`.
- **Expected Deliverable Evidence:** Before and after Semgrep output, 3 regression tests, committed `docs/security-report.md`.
- **Verification Criteria:** Semgrep scan exits with 0 errors; all security regression tests pass.

### LAB-4.2: Cross-Team Code Review: Human vs AI
- **Slide Reference:** SLOT 4, Slide 28
- **Allocated Duration:** 30 minutes
- **Target Repository:** Peer Team Pull Request (100–400 LOC)
- **Learning Objective:** Understand AI code review strengths (style, edge cases) and blind spots (business logic, context).
- **Input State:** Open Pull Request on peer repository.
- **Student Instructions:**
1. Read peer team's PR description and Acceptance Criteria.
2. Perform human review first: write 3 specific, constructive comments.
3. Run AI review prompt on the same PR diff.
4. Compare findings: classify findings into syntax, architecture, business logic, security.
5. Document in `docs/review-comparison.md`.
- **Expected Deliverable Evidence:** Posted GitHub PR review comments, comparison matrix in `docs/review-comparison.md`.
- **Verification Criteria:** Comparison includes at least 3 human catches and 3 AI catches with validity analysis.

### LAB-4.3: Seeded Bug Hunt — Scientific Debugging
- **Slide Reference:** SLOT 4, Slide 29
- **Allocated Duration:** 35 minutes
- **Target Repository:** Teaching Task Manager (`checkpoint/slot-04-bug-hunt`)
- **Learning Objective:** Apply the 5-stage debugging loop (Reproduce -> Isolate -> Hypothesize -> Fix -> Regression Test).
- **Input State:** Isolated training branch with all 5 seeded bugs active.
- **Student Instructions:**
1. Review 5 user bug reports:
   - Bug 1: Pagination off-by-one (page 1 skips first item)
   - Bug 2: Case-sensitive search
   - Bug 3: Boolean query string parsing (`?done=false` treated as truthy)
   - Bug 4: Broken authorization (user deleting another user's task)
   - Bug 5: Shared reference / prototype pollution
2. For each bug: write failing test, isolate cause, apply minimal fix, verify green.
3. Record time and whether AI's initial hypothesis was correct.
- **Expected Deliverable Evidence:** 5 passing regression tests in `tests/bug-hunt/`, bug investigation log.
- **Verification Criteria:** 5/5 tests pass; no regressions in baseline task endpoints.

## Slot 5: Production Deployment, Incident Response & Final Demo Day

### LAB-5.1: Cloud Deployment & Production Observability
- **Slide Reference:** SLOT 5, Slide 08 & 10
- **Allocated Duration:** 35 minutes
- **Target Repository:** Student Team Project Repository
- **Learning Objective:** Configure twelve-factor application for production deployment with operational observability.
- **Input State:** Local-only repository ready for deployment.
- **Student Instructions:**
1. Configure deployment environment variables in hosting provider (Render / Vercel).
2. Deploy frontend and backend with PostgreSQL database.
3. Verify `GET /health` returns JSON status 200.
4. Confirm structured Pino JSON logs record real requests with reqId and response duration.
5. Document URLs in README.
- **Expected Deliverable Evidence:** Live public URLs (web and API), passing health check curl output, sample structured log excerpt.
- **Verification Criteria:** Public web app works end-to-end on live URL; health endpoint returns HTTP 200.

### LAB-5.2: Production Incident Response & Postmortem Drill
- **Slide Reference:** SLOT 5, Slide 12-15
- **Allocated Duration:** 25 minutes
- **Target Repository:** Teaching Task Manager or Student Deployed App
- **Learning Objective:** Experience disciplined incident triage: mitigate first, investigate second, document postmortem.
- **Input State:** Failing application returning 503.
- **Student Instructions:**
1. Trigger simulated incident: broken configuration causing HTTP 500/503.
2. Follow operational runbook (`docs/runbook.md`) to mitigate immediately (rollback/config fix).
3. Verify service restoration via health check.
4. Direct AI to summarize sanitized logs and isolate root cause.
5. Write postmortem in `docs/postmortem-drill.md`.
- **Expected Deliverable Evidence:** Restored service proof, incident timeline, completed `docs/postmortem-drill.md`.
- **Verification Criteria:** Service recovered within drill window; postmortem identifies root cause and actionable preventions.

### LAB-5.3: Final Demo Day & Individual Defense (Milestone M4)
- **Slide Reference:** SLOT 5, Slide 16-21
- **Allocated Duration:** 60 minutes
- **Target Repository:** Student Team Project & Final Deliverables
- **Learning Objective:** Defend engineering ownership, explain AI-assisted decisions, and demonstrate a live, tested software product.
- **Input State:** Production deployed application and complete Git history.
- **Student Instructions:**
1. Tag git release `v1.0`.
2. Submit `docs/final-report.md` (max 6 pages) and presentation deck (max 8 slides).
3. Deliver 7-minute live product demonstration on public production URL.
4. Undergo 5-minute individual oral defense explaining code, AI prompts, and architectural decisions.
- **Expected Deliverable Evidence:** Release tag `v1.0`, live presentation, individual Q&A evaluation, peer evaluation factor.
- **Verification Criteria:** Evaluation according to 100-point rubric; individual defense proves genuine ownership of committed code.
