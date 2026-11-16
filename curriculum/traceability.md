# Curriculum Traceability Matrix — Course 4: The Modern AI Software Developer

> **Source of Truth:** 5 PowerPoint files in `SLIDE-4HOURS` (Total: 157 slides) mapped against original Session01–Session10 materials, course syllabus (`Course4_Syllabus_v2.xlsx`), and the unified Teaching Task Manager repository (`course4-teaching-task-manager`).  
> **Status:** Phase P0.1 Corrected Design. All checkpoints, commands, and expected evidence below are **PLANNED** for execution in Phases P1–P5.

## Classification Taxonomy & Reconciliation
Every slide is categorized according to its primary instructional modality:
- `CONCEPT` (94 slides): Theoretical principle, mental model, or foundational knowledge.
- `DIAGRAM` (16 slides): Architectural flow, system topology, or state/process diagram.
- `LIVE_DEMO` (12 slides): Instructor live demonstrations and demonstration activities.
- `LAB` (12 slides): The 12 deck-labelled hands-on student labs (Slots 1–4).
- `REVIEW` (17 slides): Synthesis, reflection, checkpoint criteria, or checklist.
- `ASSESSMENT` (6 slides): Summative Demo Day defense and milestone rubric slides (Slot 5).
- **Total: Exactly 157 slides.**

*Reconciliation Note:* The separate **Demo Inventory** inventories 14 demonstrations (9 explicitly deck-titled Live Demos + 1 live incident drill + 4 supplementary planned demonstrations). The **Lab Inventory** inventories 14 guided student labs/activities (12 deck-labelled labs + 2 guided practical activities in Slot 5) plus 1 summative Demo Day assessment.

---
## Slot 1: AI-Native Engineering Foundations & Requirements (4 Hours)
**Mapped Original Sessions:** Session 01 (From Prompt to Running App) + Session 02 (Context Is Everything: Specs & Agent Context)  
**Slide Count:** 35 slides  

| Slide # | Title & Focus | Type | Original Session | Technical Context / Demo / Lab Specifics |
|:---|:---|:---:|:---:|:---|
| SLOT1-S01 | **AI-Native Engineering Foundations & Requirements**<br>_From Prompt to Running App_ | `CONCEPT` | Session 01 |  |
| SLOT1-S02 | **One Course. Five Slots. One Real Project.**<br>_01_ | `DIAGRAM` | Session 01 |  |
| SLOT1-S03 | **Learning Objectives**<br>_01_ | `REVIEW` | Session 01 |  |
| SLOT1-S04 | **Two Repositories, Two Purposes**<br>_Teaching Repository_ | `DIAGRAM` | Session 01 |  |
| SLOT1-S05 | **AI Can Code.**<br>_Can It Engineer?_ | `CONCEPT` | Session 01 |  |
| SLOT1-S06 | **How LLMs Work**<br>_Token_ | `CONCEPT` | Session 01 |  |
| SLOT1-S07 | **AI Assistant**<br>_Helps you understand and create._ | `CONCEPT` | Session 01 |  |
| SLOT1-S08 | **The Agent Execution Loop**<br>_Request_ | `DIAGRAM` | Session 01 |  |
| SLOT1-S09 | **Why AI-Generated Code Can Fail**<br>_Unverified assumptions can produce behavior nobody requested._ | `CONCEPT` | Session 01 |  |
| SLOT1-S10 | **What Makes an Engineering Prompt?**<br>_Verification_ | `CONCEPT` | Session 01 |  |
| SLOT1-S11 | **From Vague Request to Testable Task**<br>_01_ | `CONCEPT` | Session 01 |  |
| SLOT1-S12 | **Inspect Before Edit**<br>_Read the existing code and project documentation._ | `CONCEPT` | Session 01 |  |
| SLOT1-S13 | **Context**<br>_Understand the project._ | `CONCEPT` | Session 01 |  |
| SLOT1-S14 | **Meet the Teaching Project**<br>_Task Manager_ | `CONCEPT` | Session 01 | Task Manager overview (apps/web, apps/api, packages/shared, prisma) |
| SLOT1-S15 | **Frontend**<br>_Backend_ | `DIAGRAM` | Session 01 |  |
| SLOT1-S16 | **LIVE DEMO:**<br>_Run the Application_ | `LIVE_DEMO` | Session 01 | **Demo: Run Teaching App**<br>Checkpoint: `checkpoint/slot-01-start`<br>Commands: `npm install`, `npm run dev`<br>Outcome: Web at localhost:5173, API at localhost:3000<br>Evidence: Running browser showing task list, passing health check |
| SLOT1-S17 | **LIVE DEMO:**<br>_Controlled AI Change_ | `LIVE_DEMO` | Session 01 | **[PLANNED] Demo: Controlled AI Change**<br>Checkpoint: `checkpoint/slot-01-start`<br>Commands: Claude Code prompt to inspect `apps/api/src/routes/tasks.ts`, generate plan, review diff<br>Outcome: Generic controlled change (e.g. optional description or input trim). *Task Priority is NOT required or pre-implemented in Slot 1.*<br>Evidence: Git diff showing minimal scoped edit |
| SLOT1-S18 | **Software Starts with a Problem**<br>_Business problems should drive software decisions._ | `CONCEPT` | Session 02 |  |
| SLOT1-S19 | **Business Analysis Foundation**<br>_Problem_ | `CONCEPT` | Session 02 |  |
| SLOT1-S20 | **Fact vs Assumption**<br>_Fact:_ | `CONCEPT` | Session 02 |  |
| SLOT1-S21 | **From Business Need to Requirement**<br>_Business Need_ | `CONCEPT` | Session 02 |  |
| SLOT1-S22 | **Functional Requirements**<br>_The system creates a task when the user submits a valid title._ | `CONCEPT` | Session 02 |  |
| SLOT1-S23 | **Acceptance Criteria**<br>_Given:_ | `CONCEPT` | Session 02 |  |
| SLOT1-S24 | **Requirement Traceability**<br>_Business_ | `DIAGRAM` | Session 02 |  |
| SLOT1-S25 | **Why Agent Context Matters ?**<br>_Persistent project instructions help an AI agent understand project boundaries._ | `CONCEPT` | Session 02 |  |
| SLOT1-S26 | **PRD, CLAUDE.md & AGENTS.md**<br>_PRD_ | `CONCEPT` | Session 02 |  |
| SLOT1-S27 | **From Specification to Running App**<br>_PRD_ | `CONCEPT` | Session 02 |  |
| SLOT1-S28 | **Apply**<br>_What You Learned_ | `REVIEW` | Session 02 |  |
| SLOT1-S29 | **LAB 01:**<br>_Prompt Engineering_ | `LAB` | Session 02 | **Lab 01: Prompt Engineering**<br>Target: Teaching Task Manager<br>Task: Propose controlled change with structured prompt<br>Evidence: Prompt log, AI plan, assumption inventory |
| SLOT1-S30 | **LAB 02: AI Business Analyst**<br>_Scenario:_ | `LAB` | Session 02 | **Lab 02: AI Business Analyst**<br>Target: Incomplete requirements to PRD<br>Task: Turn vague request into testable Acceptance Criteria (Given/When/Then)<br>Evidence: PRD v1 draft in `docs/PRD.md` |
| SLOT1-S31 | **LAB 03: Project Kickoff**<br>_Form teams of 4-5._ | `LAB` | Session 02 | **Lab 03: Project Kickoff (M0)**<br>Target: Student team repository (NOT teaching repo)<br>Task: Form teams 4-5, select problem, create GitHub repo, initial README<br>Evidence: Public/private GitHub repo URL, M0 submission |
| SLOT1-S32 | **Student Project Ideas**<br>_Task Planner_ | `CONCEPT` | Session 02 |  |
| SLOT1-S33 | **What to Submit**<br>_Lab 1:_ | `REVIEW` | Session 02 |  |
| SLOT1-S34 | **Prepare for**<br>_Slot 2_ | `REVIEW` | Session 02 |  |
| SLOT1-S35 | **AI can generate code. Engineers make sure it solves the right problem.**<br>_Understand. Control. Verify._ | `CONCEPT` | Session 02 |  |

---
## Slot 2: Controlled AI Development, Git Collaboration & Automated Testing (4 Hours)
**Mapped Original Sessions:** Session 03 (Plan, Build, Verify & Git) + Session 04 (Testing with AI & CI)  
**Slide Count:** 35 slides  

| Slide # | Title & Focus | Type | Original Session | Technical Context / Demo / Lab Specifics |
|:---|:---|:---:|:---:|:---|
| SLOT2-S01 | **PLAN**<br>_BUILD_ | `CONCEPT` | Session 03 |  |
| SLOT2-S02 | **From Understanding Requirements to Building Correct Software**<br>_Business Problem_ | `CONCEPT` | Session 03 |  |
| SLOT2-S03 | **Slot 2 Learning Outcomes**<br>_01_ | `REVIEW` | Session 03 |  |
| SLOT2-S04 | **Never Let AI Jump Directly from Request to Code.**<br>_1._ | `CONCEPT` | Session 03 |  |
| SLOT2-S05 | **What Makes an Engineering Agent?**<br>_Goal-driven._ | `CONCEPT` | Session 03 |  |
| SLOT2-S06 | **The Agent Execution Loop**<br>_Understand_ | `DIAGRAM` | Session 03 |  |
| SLOT2-S07 | **Human Control**<br>_vs_ | `CONCEPT` | Session 03 |  |
| SLOT2-S08 | **Plan First.**<br>_Edit Second._ | `CONCEPT` | Session 03 |  |
| SLOT2-S09 | **Inspect Before Edit**<br>_Read existing implementation._ | `CONCEPT` | Session 03 |  |
| SLOT2-S10 | **Small Batches, Lower Risk**<br>_One massive AI change_ | `CONCEPT` | Session 03 |  |
| SLOT2-S11 | **Human Approval Gate**<br>_01_ | `REVIEW` | Session 03 |  |
| SLOT2-S12 | **Why Git Matters with AI ?**<br>_AI can write changes quickly. Git makes them inspectable and reversible._ | `CONCEPT` | Session 03 |  |
| SLOT2-S13 | **Branch-per-Feature Workflow**<br>_Main_ | `DIAGRAM` | Session 03 |  |
| SLOT2-S14 | **Review the Change, Not Just the AI Explanation.**<br>_Added code._ | `CONCEPT` | Session 03 |  |
| SLOT2-S15 | **Pull Request Review**<br>_Does the change satisfy the requirement?_ | `DIAGRAM` | Session 03 |  |
| SLOT2-S16 | **Live Demo 1:**<br>_Controlled Feature Change_ | `LIVE_DEMO` | Session 03 | **Demo 1: Controlled Feature Change via Git Branch & PR**<br>Checkpoint: `checkpoint/slot-02-start`<br>Commands: `git checkout -b feat/edit-task`, prompt Claude Code, approve minimal plan, `git diff`, commit & open PR<br>Outcome: Clean PR with single-responsibility diff<br>Evidence: Git branch, PR diff |
| SLOT2-S17 | **Working Code**<br>_Is Not Verified Code_ | `CONCEPT` | Session 03 |  |
| SLOT2-S18 | **Testing Starts from Acceptance Criteria**<br>_Business Rule_ | `CONCEPT` | Session 04 |  |
| SLOT2-S19 | **Unit Tests**<br>_Integration Tests_ | `CONCEPT` | Session 04 |  |
| SLOT2-S20 | **Unit Testing**<br>_Verify individual functions and business rules._ | `CONCEPT` | Session 04 |  |
| SLOT2-S21 | **API & Integration Testing**<br>_Verify interactions between application layers._ | `CONCEPT` | Session 04 |  |
| SLOT2-S22 | **End-to-End Testing**<br>_Verify user visible workflows_ | `CONCEPT` | Session 04 |  |
| SLOT2-S23 | **RED**<br>_GREEN_ | `CONCEPT` | Session 04 |  |
| SLOT2-S24 | **AI-Assisted**<br>_Test Generation_ | `CONCEPT` | Session 04 |  |
| SLOT2-S25 | **Live Demo 2:**<br>_From Failing Test to Fix_ | `LIVE_DEMO` | Session 04 | **Demo 2: TDD — Failing Test to Fix (RED-GREEN)**<br>Checkpoint: `checkpoint/slot-02-start`<br>Commands: `npm test -w apps/api` (fails on AC), implement minimal fix in `tasks.ts`, rerun `npm test`<br>Outcome: Test passes (RED → GREEN)<br>Evidence: Vitest terminal output before and after |
| SLOT2-S26 | **Every Pull Request Should Prove Itself.**<br>_Push_ | `CONCEPT` | Session 04 |  |
| SLOT2-S27 | **CI Pass vs CI Failure**<br>_What a green or red status actually means_ | `REVIEW` | Session 04 |  |
| SLOT2-S28 | **Live Demo: GitHub Actions**<br>_Push code to feature branch._ | `LIVE_DEMO` | Session 04 | **Demo 3: GitHub Actions CI Pipeline**<br>Checkpoint: `checkpoint/slot-02-start`<br>Commands: `git push origin feat/...`<br>Outcome: GitHub Actions triggers lint, build, test<br>Evidence: Green CI badge or workflow run output in terminal/gh CLI |
| SLOT2-S29 | **Now You**<br>_Control_ | `CONCEPT` | Session 04 |  |
| SLOT2-S30 | **Lab 01 - Agent Planning Challenge**<br>_Scenario: AI proposes several unrelated changes while implementing task deadline editing._ | `LAB` | Session 04 | **Lab 01: Agent Planning Challenge**<br>Target: Teaching Task Manager<br>Scenario: AI proposes scope creep during task deadline edit<br>Task: Reject unrelated changes, constrain plan<br>Evidence: Rejected vs approved plan in `docs/PLAN.md` |
| SLOT2-S31 | **Lab 02 - Testing & Bug Investigation**<br>_Scenario: Task creation accepts whitespace-only titles despite a validation requirement._ | `LAB` | Session 04 | **Lab 02: Testing & Bug Investigation**<br>Target: Task whitespace-only title bug<br>Task: Write failing unit test, isolate root cause, fix validation with Zod, verify green<br>Evidence: Test code, test execution log showing pass |
| SLOT2-S32 | **Lab 03 - Student Project Sprint**<br>_Select one User Story from your own PRD._ | `LAB` | Session 04 | **Lab 03: Student Project Sprint**<br>Target: Student team project repo<br>Task: Pick User Story 1, branch, plan, test-first implementation<br>Evidence: Feature branch, PR, AI Engineering Log entry |
| SLOT2-S33 | **Slot 2 Deliverables**<br>_IN CLASS_ | `REVIEW` | Session 04 |  |
| SLOT2-S34 | **Show**<br>_Evidence,_ | `REVIEW` | Session 04 |  |
| SLOT2-S35 | **AI writes code.**<br>_Engineers control and verify the change._ | `REVIEW` | Session 04 |  |

---
## Slot 3: Agent Automations, Subagents, MCP & Rapid AI UI Development (4 Hours)
**Mapped Original Sessions:** Session 05 (Extending Your Agent: Commands, Subagents & MCP) + Session 06 (Rapid UI with AI & MVP)  
**Slide Count:** 32 slides  

| Slide # | Title & Focus | Type | Original Session | Technical Context / Demo / Lab Specifics |
|:---|:---|:---:|:---:|:---|
| SLOT3-S01 | **EXTEND YOUR AGENT.**<br>_BUILD YOUR MVP._ | `CONCEPT` | Session 05 |  |
| SLOT3-S02 | **From Controlled Coding to**<br>_Intelligent Workflows_ | `CONCEPT` | Session 05 |  |
| SLOT3-S03 | **WHAT YOU WILL**<br>_LEARN ?_ | `REVIEW` | Session 05 |  |
| SLOT3-S04 | **One Project, Expanding Capabilities**<br>_Slot 1_ | `CONCEPT` | Session 05 |  |
| SLOT3-S05 | **REPETITIVE WORK SHOULD BECOME A**<br>_WORKFLOW_ | `CONCEPT` | Session 05 |  |
| SLOT3-S06 | **FROM PROMPT TO**<br>_AUTOMATION_ | `CONCEPT` | Session 05 |  |
| SLOT3-S07 | **COMMANDS, SKILLS**<br>_AUTOMATIONS_ | `CONCEPT` | Session 05 |  |
| SLOT3-S08 | **DESIGNING A REUSABLE**<br>_WORKFLOW_ | `CONCEPT` | Session 05 |  |
| SLOT3-S09 | **Automated PR Review**<br>_Read the Git diff._ | `LIVE_DEMO` | Session 05 | **Demo 1: Automated PR Review via Custom Skill**<br>Checkpoint: `checkpoint/slot-03-start`<br>Commands: Run `/review-pr` (or `.claude/skills/review-pr.md`) on open branch diff<br>Outcome: Structured markdown review (scope check, AC alignment, test completeness)<br>Evidence: Review comment output |
| SLOT3-S10 | **One Agent Does Not Need to Do**<br>_Everything_ | `CONCEPT` | Session 05 |  |
| SLOT3-S11 | **DELEGATING ENGINEERING**<br>_TASKS_ | `DIAGRAM` | Session 05 |  |
| SLOT3-S12 | **Delegate Tasks.**<br>_Keep Control._ | `CONCEPT` | Session 05 |  |
| SLOT3-S13 | **MCP Connects AI**<br>_Applications to Tools_ | `CONCEPT` | Session 05 |  |
| SLOT3-S14 | **MCP Architecture**<br>_Permission Boundary_ | `DIAGRAM` | Session 05 |  |
| SLOT3-S15 | **MCP Changes What an Agent Can Access**<br>_WITHOUT CONNECTED TOOL_ | `CONCEPT` | Session 05 |  |
| SLOT3-S16 | **Playwright MCP**<br>_1._ | `LIVE_DEMO` | Session 05 | **Demo 2: Playwright MCP Browser Automation**<br>Checkpoint: `checkpoint/slot-03-start`<br>Commands: Configure `.mcp.json` with Playwright MCP, prompt agent to navigate to localhost:5173, create a task and inspect DOM<br>Outcome: Agent inspects live UI and reports DOM snapshot<br>Evidence: Browser interaction transcript |
| SLOT3-S17 | **A Tool Connection Is a**<br>_Permission Decision_ | `CONCEPT` | Session 05 |  |
| SLOT3-S18 | **A GOOD UI BEGINS WITH A**<br>_REQUIREMENT_ | `CONCEPT` | Session 06 |  |
| SLOT3-S19 | **AI APP GENERATORS VS CODING AGENTS**<br>_AI App Generator_ | `CONCEPT` | Session 06 |  |
| SLOT3-S20 | **Option A**<br>_Two Designs. One Requirement._ | `CONCEPT` | Session 06 |  |
| SLOT3-S21 | **Beautiful Is Not the Same**<br>_as Correct_ | `CONCEPT` | Session 06 |  |
| SLOT3-S22 | **From Generated UI to**<br>_Working Software_ | `CONCEPT` | Session 06 |  |
| SLOT3-S23 | **Every UI Action Must Match**<br>_Real System Behavior_ | `CONCEPT` | Session 06 |  |
| SLOT3-S24 | **Responsive &**<br>_Accessible UI_ | `CONCEPT` | Session 06 |  |
| SLOT3-S25 | **AI UI to**<br>_Working Task Manager_ | `LIVE_DEMO` | Session 06 | **Demo 3: Rapid AI UI to Working Task Manager**<br>Checkpoint: `checkpoint/slot-03-start`<br>Commands: Integrate modern Tailwind UI component into `apps/web`, bind to API endpoint `GET /api/tasks`, test interactive creation<br>Outcome: Polished, responsive task board connected to backend<br>Evidence: Browser screenshot / running web UI |
| SLOT3-S26 | **An MVP Must Work,**<br>_Not Just Look Finished_ | `DIAGRAM` | Session 06 |  |
| SLOT3-S27 | **MVP Verification & Feedback**<br>_Run MVP_ | `REVIEW` | Session 06 |  |
| SLOT3-S28 | **Build the Workflow.**<br>_Improve the Product._ | `CONCEPT` | Session 06 |  |
| SLOT3-S29 | **Lab 01: Build Your AI Automation**<br>_30 minutes_ | `LAB` | Session 06 | **Lab 01: Build Your AI Automation**<br>Target: Teaching Task Manager or team repo<br>Task: Create reusable skill/command (e.g., `.claude/commands/test-and-fix.md`) or subagent<br>Evidence: Committed command file, execution trace in `docs/automations.md` |
| SLOT3-S30 | **Lab 02: AI UI Decision Challenge**<br>_30 minutes_ | `LAB` | Session 06 | **Lab 02: AI UI Decision Challenge**<br>Target: `apps/web`<br>Task: Compare generated UI vs accessible component; add keyboard navigation (tabIndex, aria-labels)<br>Evidence: A11y audit report in `docs/ui-a11y-report.md` |
| SLOT3-S31 | **LAB 03: STUDENT MVP INTEGRATION**<br>_40 minutes_ | `LAB` | Session 06 | **Lab 03: Student MVP Integration (M2)**<br>Target: Student team project repo<br>Task: Connect frontend to real API/database, verify 1 complete flow<br>Evidence: Working MVP demo, GitHub Milestone M2 evidence |
| SLOT3-S32 | **Reusable AI workflows accelerate development.**<br>_Engineering verification turns them into reliable software._ | `REVIEW` | Session 06 |  |

---
## Slot 4: Secure AI Code, Human vs AI Code Review & Debugging (4 Hours)
**Mapped Original Sessions:** Session 07 (Secure AI Code & SAST) + Session 08 (Code Review & Debugging)  
**Slide Count:** 32 slides  

| Slide # | Title & Focus | Type | Original Session | Technical Context / Demo / Lab Specifics |
|:---|:---|:---:|:---:|:---|
| SLOT4-S01 | **SECURE, REVIEW &**<br>_DEBUG_ | `CONCEPT` | Session 07 |  |
| SLOT4-S02 | **Your MVP works.**<br>_Is it safe?_ | `CONCEPT` | Session 07 |  |
| SLOT4-S03 | **What Will You**<br>_Prove Today?_ | `REVIEW` | Session 07 |  |
| SLOT4-S04 | **AI can generate working code — including**<br>_vulnerabilities._ | `CONCEPT` | Session 07 |  |
| SLOT4-S05 | **What Can**<br>_Go Wrong?_ | `CONCEPT` | Session 07 |  |
| SLOT4-S06 | **Broken**<br>_Access Control_ | `CONCEPT` | Session 07 |  |
| SLOT4-S07 | **Ownership Check**<br>_BEFORE_ | `CONCEPT` | Session 07 |  |
| SLOT4-S08 | **Find**<br>_Vulnerabilities_ | `CONCEPT` | Session 07 |  |
| SLOT4-S09 | **One loop, four stages.**<br>_Each stage below is explained by its own detailed steps._ | `DIAGRAM` | Session 07 |  |
| SLOT4-S10 | **Instruction Confusion**<br>_When Untrusted Data Becomes Instructions_ | `CONCEPT` | Session 07 |  |
| SLOT4-S11 | **Three rules that**<br>_keep agents safe._ | `CONCEPT` | Session 07 |  |
| SLOT4-S12 | **Don’t Let Vulnerabilities**<br>_Reach Main._ | `DIAGRAM` | Session 07 |  |
| SLOT4-S13 | **Live Demo:**<br>_Security Investigation_ | `LIVE_DEMO` | Session 07 | **[PLANNED] Demo 1: Security Investigation (SAST & SCA)**<br>Checkpoint: `checkpoint/slot-04-security-vulns` (Dedicated training branch)<br>Commands: `npm run security:scan` (Semgrep + `npm audit`)<br>Outcome: Identifies IDOR in simulated identity training fixture (not authentication; blocked in production)<br>Evidence: Terminal scan report, triage table |
| SLOT4-S14 | **Why Review**<br>_AI-Generated Code?_ | `CONCEPT` | Session 08 |  |
| SLOT4-S15 | **What Should a**<br>_Reviewer_ | `CONCEPT` | Session 08 |  |
| SLOT4-S16 | **What Makes a Good**<br>_Review Comment?_ | `CONCEPT` | Session 08 |  |
| SLOT4-S17 | **AI Review: Strengths &**<br>_Blind Spots_ | `CONCEPT` | Session 08 |  |
| SLOT4-S18 | **Human vs AI**<br>_Review Experiment_ | `CONCEPT` | Session 08 |  |
| SLOT4-S19 | **Live Demo:**<br>_Review a Pull Request_ | `LIVE_DEMO` | Session 08 | **Demo 2: Human vs AI Code Review**<br>Checkpoint: `checkpoint/slot-04-start`<br>Commands: Inspect PR #12 diff manually first; run AI code review prompt; compare findings<br>Outcome: Side-by-side comparison matrix (AI finds syntax/typos, human catches logic/business bugs)<br>Evidence: Review comparison markdown |
| SLOT4-S20 | **Stop Guessing.**<br>_Start Investigating._ | `CONCEPT` | Session 08 |  |
| SLOT4-S21 | **The Debugging**<br>_Workflow_ | `CONCEPT` | Session 08 |  |
| SLOT4-S22 | **Symptom vs**<br>_Root Cause_ | `CONCEPT` | Session 08 |  |
| SLOT4-S23 | **Test First,**<br>_Fix Second_ | `CONCEPT` | Session 08 |  |
| SLOT4-S24 | **AI-Assisted**<br>_Debugging_ | `CONCEPT` | Session 08 |  |
| SLOT4-S25 | **Live Demo:**<br>_Bug Hunt_ | `LIVE_DEMO` | Session 08 | **Demo 3: Bug Hunt (5 Seeded Bugs)**<br>Checkpoint: `checkpoint/slot-04-bug-hunt`<br>Commands: `npm test -w tests/bug-hunt`<br>Outcome: Instructor demonstrates reproducing Bug 1 (pagination off-by-one) and Bug 4 (missing ownership check)<br>Evidence: Failing regression test, applied fix, green test |
| SLOT4-S26 | **INVESTIGATE. REVIEW.**<br>_FIX._ | `REVIEW` | Session 08 |  |
| SLOT4-S27 | **Lab 01:**<br>_Security Investigation_ | `LAB` | Session 08 | **[PLANNED] Lab 01: Security Investigation & Remediation**<br>Target: `apps/api` on training branch `checkpoint/slot-04-security-vulns`<br>Task: Fix 3 security vulnerabilities in simulated fixture, add automated regression tests. *X-User-Id is simulated identity for testing only, not auth.*<br>Evidence: `docs/security-report.md`, green Semgrep scan in CI |
| SLOT4-S28 | **Lab 02: Human vs AI Code Review**<br>_Scenario_ | `LAB` | Session 08 | **Lab 02: Human vs AI Code Review**<br>Target: Cross-team PR (100–400 LOC)<br>Task: Human review first, AI review second, compare validity & false positives<br>Evidence: `docs/review-comparison.md`, PR review comments on GitHub |
| SLOT4-S29 | **Lab 03:**<br>_Seeded Bug Hunt_ | `LAB` | Session 08 | **Lab 03: Seeded Bug Hunt**<br>Target: 5 Seeded Bugs in Task Manager<br>Task: Reproduce all 5 bugs with failing tests, isolate root cause, apply minimal fix<br>Evidence: 5/5 regression tests passing, bug-hunt report |
| SLOT4-S30 | **Make Your MVP Safer.**<br>_01_ | `CONCEPT` | Session 08 |  |
| SLOT4-S31 | **Slot 4**<br>_Deliverables_ | `REVIEW` | Session 08 |  |
| SLOT4-S32 | **AI Can Write the Code.**<br>_Engineers Must Prove It Is Safe._ | `REVIEW` | Session 08 |  |

---
## Slot 5: Production Deployment, Incident Response & Final Demo Day (4 Hours)
**Mapped Original Sessions:** Session 09 (Ship It: Deploy & Operate) + Session 10 (Demo Day & Individual Defense)  
**Slide Count:** 23 slides  

| Slide # | Title & Focus | Type | Original Session | Technical Context / Demo / Lab Specifics |
|:---|:---|:---:|:---:|:---|
| SLOT5-S01 | **SHIP IT.**<br>_OPERATE IT._ | `CONCEPT` | Session 09 |  |
| SLOT5-S02 | **From AI-Generated**<br>_Code to a_ | `CONCEPT` | Session 09 |  |
| SLOT5-S03 | **CODE IS NOT**<br>_THE FINISH LINE_ | `CONCEPT` | Session 09 |  |
| SLOT5-S04 | **From Localhost to the**<br>_Internet_ | `CONCEPT` | Session 09 |  |
| SLOT5-S05 | **Same Application.**<br>_Development_ | `CONCEPT` | Session 09 |  |
| SLOT5-S06 | **Configuration Belongs**<br>_Outside the Code_ | `CONCEPT` | Session 09 |  |
| SLOT5-S07 | **From GitHub to a**<br>_Public URL_ | `DIAGRAM` | Session 09 |  |
| SLOT5-S08 | **LIVE DEMO:**<br>_DEPLOYED TASK MANAGER_ | `LIVE_DEMO` | Session 09 | **Demo 1: Deployed Task Manager & Observability**<br>Checkpoint: `checkpoint/slot-05-deployed`<br>Commands: `curl https://api.../health`, inspect structured Pino logs, verify live web app<br>Outcome: Production web & API with working DB, health check returning 200 JSON<br>Evidence: Live URL verification, structured JSON logs |
| SLOT5-S09 | **You Cannot**<br>_Fix What You_ | `CONCEPT` | Session 09 |  |
| SLOT5-S10 | **Know Whether**<br>_GET /health_ | `DIAGRAM` | Session 09 |  |
| SLOT5-S11 | **What Should Engineers Monitor?**<br>_Latency_ | `CONCEPT` | Session 09 |  |
| SLOT5-S12 | **WHEN**<br>_PRODUCTION_ | `CONCEPT` | Session 09 | Production incident anatomy & rollback triage |
| SLOT5-S13 | **Mitigate First.**<br>_Investigate the Root Cause Next._ | `CONCEPT` | Session 09 | Production incident anatomy & rollback triage |
| SLOT5-S14 | **AI Can Investigate. Engineers Stay in Control.**<br>_AI may summarize sanitized logs, rank hypotheses with evidence, and suggest diagnostic checks._ | `CONCEPT` | Session 09 |  |
| SLOT5-S15 | **Incident roles**<br>_Deliverables_ | `DIAGRAM` | Session 09 |  |
| SLOT5-S16 | **SHOW THE**<br>_PRODUCT._ | `ASSESSMENT` | Session 10 | **Demo Day & Defense Rubric**<br>Format: 7 min presentation + 5 min individual Q&A<br>Rubric: 100 points (Product 15, Context 10, Workflow 15, Testing 15, Security 10, Operations 10, Automations 10, Communication 15) |
| SLOT5-S17 | **One Product. Real Evidence.**<br>_7 MINUTES – PRESENTATION & DEMO_ | `ASSESSMENT` | Session 10 | **Demo Day & Defense Rubric**<br>Format: 7 min presentation + 5 min individual Q&A<br>Rubric: 100 points (Product 15, Context 10, Workflow 15, Testing 15, Security 10, Operations 10, Automations 10, Communication 15) |
| SLOT5-S18 | **Demonstrate More Than**<br>_a Working UI._ | `ASSESSMENT` | Session 10 | **Demo Day & Defense Rubric**<br>Format: 7 min presentation + 5 min individual Q&A<br>Rubric: 100 points (Product 15, Context 10, Workflow 15, Testing 15, Security 10, Operations 10, Automations 10, Communication 15) |
| SLOT5-S19 | **Can You Explain**<br>_What You Built?_ | `ASSESSMENT` | Session 10 | **Demo Day & Defense Rubric**<br>Format: 7 min presentation + 5 min individual Q&A<br>Rubric: 100 points (Product 15, Context 10, Workflow 15, Testing 15, Security 10, Operations 10, Automations 10, Communication 15) |
| SLOT5-S20 | **Product Value**<br>_15_ | `ASSESSMENT` | Session 10 | **Demo Day & Defense Rubric**<br>Format: 7 min presentation + 5 min individual Q&A<br>Rubric: 100 points (Product 15, Context 10, Workflow 15, Testing 15, Security 10, Operations 10, Automations 10, Communication 15) |
| SLOT5-S21 | **What Must Be**<br>_Delivered?_ | `ASSESSMENT` | Session 10 | **M3 (Release Candidate) & M4 (Final Submission)**<br>Deliverables: Release tag `v1.0`, `docs/final-report.md`, `docs/runbook.md`, `docs/postmortem-drill.md`, AI Engineering Logs |
| SLOT5-S22 | **The Future**<br>_Software Engineer_ | `CONCEPT` | Session 10 |  |
| SLOT5-S23 | **AI Can Help You Build Software.**<br>_Engineering Makes It Reliable._ | `CONCEPT` | Session 10 |  |
