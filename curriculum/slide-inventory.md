# Master Slide Inventory — Course 4: The Modern AI Software Developer

> Extracted directly from the five primary PowerPoint presentations in `SLIDE-4HOURS` (Total: 157 slides).

## Slot 1: AI-Native Engineering Foundations & Requirements (35 Slides)
Source file: `SLOT 1.pptx` | Total slides: 35

### Slide 01: AI-Native Engineering Foundations & Requirements
**Slide Content:**
- From Prompt to Running App
- Course 4 | Slot 1 | FPT University

### Slide 02: One Course. Five Slots. One Real Project.
**Slide Content:**
- 01
- 02
- 03
- 04
- 05
- 5 teaching
- slots × 4 hours.
- One instructor teaching repository supports guided learning.
- Each team
- develops an independent
- student project.
- All teams present
- at Final Demo Day.

### Slide 03: Learning Objectives
**Slide Content:**
- 01
- Understand AI coding fundamentals.
- 02
- Work effectively with
- AI coding agents.
- 03
- Analyze business problems before proposing software.
- 04
- Define requirements
- that can be tested.
- 05
- Initialize a student project for continued development.

### Slide 04: Two Repositories, Two Purposes
**Slide Content:**
- Teaching Repository
- An instructor-provided Task Manager supports guided learning.
- Student Project Repository
- Each team chooses a separate project in Slot 1 and develops it through Slot 5.

### Slide 05: AI Can Code.
**Slide Content:**
- Can It Engineer?
- Code generation
- produces working code.
- AI-native engineering also
- requires context, control, and verification.
- Working code does not
- automatically mean correct software.

### Slide 06: How LLMs Work
**Slide Content:**
- Token
- Tokens are units
- of text the model processes.
- Context
- Window
- A context window limits what the model can consider at once.
- Probabilistic
- Output
- Probabilistic output means responses are generated from learned patterns.
- Hallucination
- Hallucinations are plausible-sounding outputs that may
- be unsupported.

### Slide 07: AI Assistant
**Slide Content:**
- Helps you understand and create.
- AI Agent
- Uses tools to execute and verify tasks.
- Assistant supports decisions. Agent executes workflows under defined controls.

### Slide 08: The Agent Execution Loop
**Slide Content:**
- Request
- Context
- Plan
- Approval
- Edit
- Test
- Review
- Review the plan before changes, then verify the behavior.

### Slide 09: Why AI-Generated Code Can Fail
**Slide Content:**
- Unverified assumptions can produce behavior nobody requested.
- Uncontrolled scope can introduce unnecessary changes.
- Missing verification leaves defects and regressions undiscovered.

### Slide 10: What Makes an Engineering Prompt?
**Slide Content:**
- Verification
- states how to check the result.
- 01
- Goal
- defines the outcome to achieve.
- 02
- Context
- explains the project and its current state.
- 03
- Constraints
- 04
- Expected Output
- makes the requested result explicit.
- 05
- Verification
- states how to check the result.
- set boundaries and requirements.

### Slide 11: From Vague Request to Testable Task
**Slide Content:**
- 01
- Start by clarifying the user, the problem, and the desired outcome.
- 02
- Add constraints, expected behavior, and boundaries for the change.
- 03
- Finish with acceptance criteria that can be tested.

### Slide 12: Inspect Before Edit
**Slide Content:**
- Read the existing code and project documentation.
- Identify constraints before proposing a change.
- Understand current behavior before editing it.

### Slide 13: Context
**Slide Content:**
- Understand the project.
- Control
- Control the change.
- Verify
- Verify the result.

### Slide 14: Meet the Teaching Project
**Slide Content:**
- Task Manager
- Task list, create task, edit task, complete task.

### Slide 15: Frontend
**Slide Content:**
- Backend
- Tests
- Documentation
- Inside the
- Teaching Repository

### Slide 16: LIVE DEMO:
**Slide Content:**
- Run the Application
- Open the repository.
- Install dependencies.
- Run the application.
- Observe the task management workflow.
- Objective:
- See the existing application running before making changes.
- 2.
- 3.
- 4.
- 1.

### Slide 17: LIVE DEMO:
**Slide Content:**
- Controlled AI Change
- 1.
- Read the requirements.
- 2.
- Ask AI to inspect the code.
- 3.
- Request a plan.
- Review the changes.
- 5.
- Verify the behavior.
- 4.

### Slide 18: Software Starts with a Problem
**Slide Content:**
- Business problems should drive software decisions.
- Understand the need before
- choosing a solution.

### Slide 19: Business Analysis Foundation
**Slide Content:**
- Problem
- Goal
- Stakeholder
- Actor
- Scope
- Business Rule

### Slide 20: Fact vs Assumption
**Slide Content:**
- Fact:
- supported by evidence or
- confirmed information.
- Assumption:
- plausible, but not yet supported.
- Check assumptions before
- treating them as requirements.

### Slide 21: From Business Need to Requirement
**Slide Content:**
- Business Need
- A user needs to track tasks.
- Business Rule
- A task must have a title before it can be created.
- Functional Requirement
- The system rejects a new task when its title is empty.

### Slide 22: Functional Requirements
**Slide Content:**
- The system creates a task when the user submits a valid title.
- The system displays tasks in the task list.
- The system marks a task complete when the user selects complete.

### Slide 23: Acceptance Criteria
**Slide Content:**
- Given:
- an empty title
- When:
- the user submits
- a new task
- Then:
- the system rejects
- the request and displays a validation message.
- Example:
- Task Manager

### Slide 24: Requirement Traceability
**Slide Content:**
- Business
- Requirement
- Acceptance
- Criteria
- Code
- Test
- Trace each implementation and test back to the need it serves.

### Slide 25: Why Agent Context Matters ?
**Slide Content:**
- Persistent project instructions help an AI agent understand project boundaries.
- Clear context reduces unsupported choices and unnecessary changes.

### Slide 26: PRD, CLAUDE.md & AGENTS.md
**Slide Content:**
- PRD
- PRD: Product requirements.
- CLAUDE.md
- CLAUDE.md: Claude Code project instructions.
- AGENTS.md
- AGENTS.md: Agent-oriented instructions where supported.

### Slide 27: From Specification to Running App
**Slide Content:**
- PRD
- Context
- Scaffold
- CRUD
- Verification
- Build from a clear specification and verify each step.

### Slide 28: Apply
**Slide Content:**
- What You Learned
- Prompt Engineering
- Business Analysis
- Project
- Kickoff

### Slide 29: LAB 01:
**Slide Content:**
- Prompt Engineering
- Scenario:
- Use AI to propose or implement a controlled Task Manager change.
- 1.  Inspect the context.
- 2.  Write a structured prompt.
- 3.  Evaluate the AI result.
- 4.  Identify assumptions.
- 5.  Describe verification.
- Duration:
- 30 minutes
- Deliverable:
- Prompt, AI response, and findings.

### Slide 30: LAB 02: AI Business Analyst
**Slide Content:**
- Scenario:
- A customer provides an incomplete software request.
- 1.
- Identify the real problem and choose three clarification questions.
- 2.
- Define MVP scope and write three functional requirements.
- 3.
- Write three acceptance criteria.
- Deliverable:
- Mini BA specification.
- Duration:
- 30 minutes.

### Slide 31: LAB 03: Project Kickoff
**Slide Content:**
- Form teams of 4-5.
- Choose a real problem.
- Identify users.
- Define MVP scope.
- Create a GitHub repository.
- Draft a Problem Statement and PRD.
- Duration:
- 45 minutes
- 2.
- 4.
- 3.
- 5.
- 6.
- 1.

### Slide 32: Student Project Ideas
**Slide Content:**
- Task Planner
- Inventory Manager
- Booking System
- Expense Tracker
- These are examples only.

### Slide 33: What to Submit
**Slide Content:**
- Lab 1:
- Prompt and
- analysis.
- Lab 2:
- Requirements and acceptance criteria.
- Lab 3:
- GitHub repository and project draft.

### Slide 34: Prepare for
**Slide Content:**
- Slot 2
- Complete PRD v1.
- Create project context.
- Build the application scaffold.
- Implement one basic CRUD entity.

### Slide 35: AI can generate code. Engineers make sure it solves the right problem.
**Slide Content:**
- Understand. Control. Verify.

## Slot 2: Controlled AI Development, Git Collaboration & Automated Testing (35 Slides)
Source file: `SLOT 2.pptx` | Total slides: 35

### Slide 01: PLAN
**Slide Content:**
- BUILD
- VERIFY
- Controlled AI Development,
- Git Collaboration & Automated Testing
- Course 4 | Slot 2 | FPT University

### Slide 02: From Understanding Requirements to Building Correct Software
**Slide Content:**
- Business Problem
- PRD
- Requirements
- Agent Plan
- Code
- Tests
- Slot 1 = Understand WHAT.
- Slot 2 = Control HOW and VERIFY.

### Slide 03: Slot 2 Learning Outcomes
**Slide Content:**
- 01
- Plan tasks with
- AI Coding Agents.
- 02
- Control AI-generated code changes.
- 03
- Collaborate through Git branches and
- Pull Requests.
- 04
- Build meaningful automated tests.
- 05
- Verify changes using Continuous Integration.

### Slide 04: Never Let AI Jump Directly from Request to Code.
**Slide Content:**
- 1.
- Requirement
- 2.
- Inspect
- 3.
- Plan
- 4.
- Approval
- 5.
- Implement
- 6.
- Test
- 7.
- Review
- 8.
- Merge

### Slide 05: What Makes an Engineering Agent?
**Slide Content:**
- Goal-driven.
- Context-aware.
- Tool-enabled.
- Verifiable.

### Slide 06: The Agent Execution Loop
**Slide Content:**
- Understand
- Inspect
- Act
- Verify
- Observe
- Plan

### Slide 07: Human Control
**Slide Content:**
- vs
- Agent Autonomy
- AI proposes
- Human reviews
- Agent executes
- Human verifies
- AI can execute steps, but engineering decisions need controlled boundaries.

### Slide 08: Plan First.
**Slide Content:**
- Edit Second.
- What needs to change?
- Which files are affected?
- How will success be verified?

### Slide 09: Inspect Before Edit
**Slide Content:**
- Read existing implementation.
- Check project conventions.
- Identify dependencies.
- Avoid unrelated edits.

### Slide 10: Small Batches, Lower Risk
**Slide Content:**
- One massive AI change
- BUILD
- VERIFY
- VERIFY
- BUILD
- VERIFY
- Several small, independent verifiable changes
- VERIFY
- PLAN
- BUILD
- BUILD
- PLAN
- PLAN
- PLAN

### Slide 11: Human Approval Gate
**Slide Content:**
- 01
- AI Plan
- 02
- Review Scope
- 03
- Approve / Reject
- 04
- Execute
- Rejected plans return to planning, not autonomous editing.

### Slide 12: Why Git Matters with AI ?
**Slide Content:**
- AI can write changes quickly. Git makes them inspectable and reversible.
- History.
- Isolation.
- Review.

### Slide 13: Branch-per-Feature Workflow
**Slide Content:**
- Main
- Feature
- Branch
- Commits
- Pull
- Request
- Review
- Merge

### Slide 14: Review the Change, Not Just the AI Explanation.
**Slide Content:**
- Added code.
- Removed code.
- Unexpected files.

### Slide 15: Pull Request Review
**Slide Content:**
- Does the change satisfy the requirement?
- Did AI modify unrelated files?
- Are tests and evidence included?

### Slide 16: Live Demo 1:
**Slide Content:**
- Controlled Feature Change
- 1.
- Review Requirement and AC.
- 2.
- Create feature branch.
- 3.
- Ask AI to inspect and plan.
- 4.
- Approve a minimal change.
- 5.
- Review Git diff and create PR.
- INSTRUCTOR LIVE DEMO – 25 MINUTES

### Slide 17: Working Code
**Slide Content:**
- Is Not Verified Code
- “AI says it's done” is not test evidence.

### Slide 18: Testing Starts from Acceptance Criteria
**Slide Content:**
- Business Rule
- AC
- Test Case
- Execution
- Evidence
- A task title cannot be blank or whitespace-only.

### Slide 19: Unit Tests
**Slide Content:**
- Integration Tests
- End-to-End
- Tests
- The Test Pyramid

### Slide 20: Unit Testing
**Slide Content:**
- Verify individual functions and business rules.
- Reject an empty or whitespace-only
- task title.

### Slide 21: API & Integration Testing
**Slide Content:**
- Verify interactions between application layers.
- Client
- API
- Application
- Database
- POST /tasks
- rejects invalid input.

### Slide 22: End-to-End Testing
**Slide Content:**
- Verify user visible workflows
- in a real browser environment.
- Create a valid task and see it in the task list.

### Slide 23: RED
**Slide Content:**
- GREEN
- REFACTOR
- Red:
- Write a failing test.
- Green:
- Make the smallest change to pass.
- Refactor:
- Improve code without breaking behavior.

### Slide 24: AI-Assisted
**Slide Content:**
- Test Generation
- AI can propose test cases, but humans must review coverage and assertions.
- Happy path
- Edge cases
- Failure scenarios

### Slide 25: Live Demo 2:
**Slide Content:**
- From Failing Test to Fix
- Translate the AC into a test.
- Execute and observe failure.
- Inspect the implementation.
- 4.
- Implement the minimal fix.
- Rerun tests.
- INSTRUCTOR LIVE DEMO – TEST-FIRST WORKFLOW
- IMAGE – REAL DEMO SCREENSHOT
- 2.
- 3.
- 5.
- 1.

### Slide 26: Every Pull Request Should Prove Itself.
**Slide Content:**
- Push
- GitHub Actions
- Test
- Build
- Results
- Lint

### Slide 27: CI Pass vs CI Failure
**Slide Content:**
- What a green or red status actually means
- CI - PASSED
- Lint
- Passed
- Automated Tests
- Passed
- Build
- Passed
- OUTCOME
- Ready for review and merge, subject to other required approvals.
- CI - FAILED
- Lint
- Passed
- Automated Tests
- Failed
- Build
- Not Run
- OUTCOME
- Investigate → Fix → Rerun.
- Required checks must pass before merging when branch protection is enabled.

### Slide 28: Live Demo: GitHub Actions
**Slide Content:**
- Push code to feature branch.
- Trigger CI workflow.
- Read test results.
- Investigate a failing check.

### Slide 29: Now You
**Slide Content:**
- Control
- the Agent.
- Agent Planning
- Testing & Bug Investigation
- Student Project Sprint

### Slide 30: Lab 01 - Agent Planning Challenge
**Slide Content:**
- Scenario: AI proposes several unrelated changes while implementing task deadline editing.
- Inspect the requirement.
- Identify affected files.
- Review AI's proposed plan.
- Reject scope creep.
- Define verification steps.
- 30
- minutes
- Deliverable:
- Implementation
- Plan Scope
- Review
- Verification Plan.

### Slide 31: Lab 02 - Testing & Bug Investigation
**Slide Content:**
- Scenario: Task creation accepts whitespace-only titles despite a validation requirement.
- Write acceptance criteria.
- Generate and review a test.
- Run the failing test.
- Identify the root cause.
- Fix or propose a fix and verify.
- 35
- minutes
- Test Case
- Failure Evidence
- Root Cause
- Verification
- Deliverable:

### Slide 32: Lab 03 - Student Project Sprint
**Slide Content:**
- Select one User Story from your own PRD.
- Create a feature branch.
- Use AI to plan the change.
- Define a testable AC.
- Begin controlled implementation.
- Record evidence for a PR.
- 35
- minutes
- Deliverable: Feature Branch + Plan + Test Evidence or Draft PR.

### Slide 33: Slot 2 Deliverables
**Slide Content:**
- IN CLASS
- Agent Plan
- Reviewed Change
- Test Case
- GitHub Branch or Draft PR
- BEFORE SLOT 3
- Features 1–2 through PR review
- AI Engineering Log
- At least 10 meaningful tests, including E2E
- Test-first Feature 3
- Working GitHub Actions CI

### Slide 34: Show
**Slide Content:**
- Evidence,
- Not Just Results.
- What did the agent change?
- How did you verify it?
- What risks remain?
- Reserve this slide for instructor feedback, selected student presentations or PR reviews.

### Slide 35: AI writes code.
**Slide Content:**
- Engineers control and verify the change.
- PLAN
- BUILD
- VERIFY

## Slot 3: Agent Automations, Subagents, MCP & Rapid AI UI Development (32 Slides)
Source file: `SLOT 3 - 4HOURi.pptx` | Total slides: 32

### Slide 01: EXTEND YOUR AGENT.
**Slide Content:**
- BUILD YOUR MVP.
- Agent Automations, Subagents, MCP & Rapid AI UI Development

### Slide 02: From Controlled Coding to
**Slide Content:**
- Intelligent Workflows
- Slot 1 —
- Understand
- Slot 2 —
- Control & Verify
- Slot 3 —
- Automate & Integrate
- Stop repeating instructions.
- Start building reusable workflows.

### Slide 03: WHAT YOU WILL
**Slide Content:**
- LEARN ?
- 01
- 02
- 03
- 04
- 05
- Build reusable agent automations
- Turn repeated instructions into repeatable workflows.
- Delegate to specialized subagents
- Split complex work across focused agents.
- Connect agents to tools through MCP
- Extend agent capabilities with external tools.
- Generate and integrate UI with AI
- Ship polished interfaces alongside the logic.
- Demonstrate a functional MVP
- Present a working end-to-end product.

### Slide 04: One Project, Expanding Capabilities
**Slide Content:**
- Slot 1
- Slot 2
- Slot 3
- Automations, MCP, UI Integration and MVP
- Controlled Features, Git and Tests
- Requirements and Context

### Slide 05: REPETITIVE WORK SHOULD BECOME A
**Slide Content:**
- WORKFLOW
- Repeated prompts waste effort.
- Manual repetition creates inconsistency.
- Reusable workflows standardize execution.

### Slide 06: FROM PROMPT TO
**Slide Content:**
- AUTOMATION
- One-Time Prompt
- Manual execution each time
- Reusable Workflow
- Defined input, steps and expected output
- Standardize the process, not just the wording.

### Slide 07: COMMANDS, SKILLS
**Slide Content:**
- AUTOMATIONS
- &
- Custom Command
- Reusable invocation.
- Skill
- Reusable instructions and knowledge for a defined task.
- Automation
- Repeatable workflow with defined inputs and outputs.
- Invocation and configuration depend on the AI coding tool.

### Slide 08: DESIGNING A REUSABLE
**Slide Content:**
- WORKFLOW
- Read Context
- Execute
- Input
- Permissions
- Expected Output
- Success Criteria
- Trigger
- Inspect
- Report
- Verify

### Slide 09: Automated PR Review
**Slide Content:**
- Read the Git diff.
- 2.
- Check changes against requirements.
- 3.
- Identify unrelated modifications.
- 4.
- Review test evidence.
- 5.
- Produce a structured review report.
- INSTRUCTOR LIVE DEMO
- 1.

### Slide 10: One Agent Does Not Need to Do
**Slide Content:**
- Everything
- Specialized responsibilities, controlled context and focused outputs.

### Slide 11: DELEGATING ENGINEERING
**Slide Content:**
- TASKS
- Main Engineering Agent
- Code Reviewer
- defined task, context and permission boundary
- Test Reviewer
- defined task, context and permission boundary
- Documentation Reviewer
- defined task, context and permission boundary

### Slide 12: Delegate Tasks.
**Slide Content:**
- Keep Control.
- Give each agent
- a clear responsibility.
- Limit tool and data permissions.
- Review evidence before accepting results.

### Slide 13: MCP Connects AI
**Slide Content:**
- Applications to Tools
- Model Context Protocol provides a standardized way for compatible AI applications to connect to external tools and context sources.
- MCP is not an AI model.

### Slide 14: MCP Architecture
**Slide Content:**
- Permission Boundary
- MCP Server
- Tools or
- External System
- AI Application /
- MCP Host
- MCP Client
- Tool Results

### Slide 15: MCP Changes What an Agent Can Access
**Slide Content:**
- WITHOUT CONNECTED TOOL
- Limited interaction with
- external systems
- WITH APPROVED MCP TOOL
- Invoke an exposed capability
- and inspect its results
- More tools create more capabilities — and more responsibility.

### Slide 16: Playwright MCP
**Slide Content:**
- 1.
- Connect a compatible Playwright MCP server.
- Inspect available browser tools.
- Open the running Task Manager.
- 4.
- Execute an approved UI interaction.
- Review results and limitations.
- INSTRUCTOR LIVE DEMO
- 2.
- 3.
- 5.

### Slide 17: A Tool Connection Is a
**Slide Content:**
- Permission Decision
- Request
- Permission Boundary
- Tool Execution
- Review
- Excessive tool access
- Untrusted tool output
- Unapproved external actions

### Slide 18: A GOOD UI BEGINS WITH A
**Slide Content:**
- REQUIREMENT
- Functional Requirement
- Screen
- Fields &
- Actions
- Validation
- UI State
- No screen or button without a reason.

### Slide 19: AI APP GENERATORS VS CODING AGENTS
**Slide Content:**
- AI App Generator
- Rapid layout and prototype exploration
- Coding Agent
- Codebase-aware implementation, integration and verification
- Prototype visually. Integrate carefully.

### Slide 20: Option A
**Slide Content:**
- Two Designs. One Requirement.
- List-Oriented Layout
- Option B
- — Card / Board-Oriented Layout
- Both options must satisfy the same functional requirements.

### Slide 21: Beautiful Is Not the Same
**Slide Content:**
- as Correct
- Requirement coverage
- Usability and accessibility
- Integration effort

### Slide 22: From Generated UI to
**Slide Content:**
- Working Software
- AI-Generated UI
- Review Components
- Connect
- State & API
- Validate
- Data
- Verify
- User Flow
- A generated visual prototype may not implement real business behavior.

### Slide 23: Every UI Action Must Match
**Slide Content:**
- Real System Behavior
- Create Task Form
- Validation
- Backend API
- Data Storage
- Updated Task List

### Slide 24: Responsive &
**Slide Content:**
- Accessible UI
- Responsive layouts.
- Keyboard navigation.
- Clear labels, validation and focus states.

### Slide 25: AI UI to
**Slide Content:**
- Working Task Manager
- Select an appropriate design.
- Connect UI to actual application behavior.
- Verify one end-to-end task flow.
- INSTRUCTOR LIVE DEMO
- Integrate components into the Teaching Repo.
- Review generated UI components.
- 1.
- 3.
- 2.
- 4.
- 5.

### Slide 26: An MVP Must Work,
**Slide Content:**
- Not Just Look Finished
- Core user flow
- works
- UI connects to real application behavior
- Validation and
- error states exist
- Verification evidence is available

### Slide 27: MVP Verification & Feedback
**Slide Content:**
- Run MVP
- Verify Main Flow
- Identify Issues
- Record GitHub Issues
- Plan Improvements
- Make limitations visible before release.

### Slide 28: Build the Workflow.
**Slide Content:**
- Improve the Product.
- Reusable Agent Automation
- 30 min
- AI UI Design Challenge
- 30 min
- Student MVP Integration
- 40 min
- Final Review
- 20 min

### Slide 29: Lab 01: Build Your AI Automation
**Slide Content:**
- 30 minutes
- Scenario: Your team repeatedly performs the same code-review checks after AI-generated changes.
- Define a reusable workflow.
- Specify inputs and expected outputs.
- Define tool permission boundaries.
- Run the workflow on a sample change.
- Compare manual prompting with automated execution.
- Deliverable:
- Automation Definition + Sample Output +
- Before/After Compairson
- 4.
- 2.
- 5.
- 3.
- 1.

### Slide 30: Lab 02: AI UI Decision Challenge
**Slide Content:**
- 30 minutes
- Scenario:
- Two UI concepts serve the same requirement; the more polished concept may handle user tasks less accurately.
- Deliverable:
- Two UI Alternatives Decision Rationale Improvement Plan
- Generate or inspect two alternatives.
- Compare requirement coverage.
- Evaluate usability and accessibility.
- Select an approach with justification.
- Identify improvements needed before integration.
- 3.
- 5.
- 4.
- 2.
- 1.

### Slide 31: LAB 03: STUDENT MVP INTEGRATION
**Slide Content:**
- 40 minutes
- Scenario: Integrate one core user flow into your team’s application from Slots 1 and 2.
- Select a main user journey.
- Identify its UI, API and data dependencies.
- 3.
- Use AI to assist controlled integration.
- 4.
- Verify the flow.
- Check basic responsive and keyboard behavior.
- 6.
- Record unresolved issues.
- Deliverable:
- MVP Progress + Verification Evidence + GitHub Issues
- 2.
- 5.
- 1.

### Slide 32: Reusable AI workflows accelerate development.
**Slide Content:**
- Engineering verification turns them into reliable software.
- Show one verified user flow.
- Explain one automation or AI-assisted
- decision.
- Complete two reusable automations;
- connect one approved MCP server;
- progress Feature 4 with automation support;
- complete UI integration and accessibility checks;
- prepare a demonstrable MVP;
- record feedback in GitHub Issues.
- Reserve 20 minutes for flexible review or
- instructor-approved presentation.
- NEXT SLOT: SECURITY, CODE REVIEW & DEBUGGING
- Identify a remaining limitation.
- IN-CLASS REVIEW
- BEFORE SLOT 4

## Slot 4: Secure AI Code, Human vs AI Code Review & Debugging (32 Slides)
Source file: `SLOT 4 - 4HOURS.pptx` | Total slides: 32

### Slide 01: SECURE, REVIEW &
**Slide Content:**
- DEBUG
- AI-GENERATED
- CODE
- From Working MVP to Trustworthy Software
- Course 4 | Slot 4 | FPT University

### Slide 02: Your MVP works.
**Slide Content:**
- Is it safe?
- Five slots from first idea to defended production.
- 01
- Understand
- Requirements
- 02
- Plan, Build
- & Verify
- 03
- Automate &
- Build MVP
- 04
- Secure, Review
- & Debug
- 05
- Deploy
- & Defend

### Slide 03: What Will You
**Slide Content:**
- Prove Today?
- 01
- Identify security risks in AI-generated code.
- 02
- Run and interpret security scans.
- 03
- Prevent unsafe agent behavior.
- 04
- Compare human
- and AI code reviews.
- 05
- Debug systematically and verify fixes.

### Slide 04: AI can generate working code — including
**Slide Content:**
- vulnerabilities.
- Security must be checked during development, not only before release.

### Slide 05: What Can
**Slide Content:**
- Go Wrong?
- Broken
- Access Control
- Injection
- Exposed
- Secrets
- Cross-Site
- Scripting
- Weak
- Authentication
- Verbose
- Error Messages

### Slide 06: Broken
**Slide Content:**
- Access Control
- 1
- User A changes an ID to modify User B’s data.
- 2
- Request
- 3
- Authorization Check
- 4
- Allow / Deny
- Authentication is not authorization.

### Slide 07: Ownership Check
**Slide Content:**
- BEFORE
- Update resource by ID without verifying ownership.
- AFTER
- Validate input, retrieve resource, verify ownership, then update.
- VERIFICATION
- Unauthorized user receives HTTP 403.

### Slide 08: Find
**Slide Content:**
- Vulnerabilities
- Early
- Semgrep
- — Static Analysis
- npm audit
- — Dependency
- Vulnerabilities
- AI Security Review
- — Additional
- Findings
- Every finding needs human verification.

### Slide 09: One loop, four stages.
**Slide Content:**
- Each stage below is explained by its own detailed steps.
- 01
- Scan
- Scan finding
- 02
- Triage
- Classify finding
- Validate risk
- 03
- Fix
- Fix root cause
- 04
- Verify
- Test & rescan
- THE DECISION AT TRIAGE
- False Positive  vs  Real Vulnerability

### Slide 10: Instruction Confusion
**Slide Content:**
- When Untrusted Data Becomes Instructions
- Untrusted Content
- Agent
- Reads
- Tool
- Misuse

### Slide 11: Three rules that
**Slide Content:**
- keep agents safe.
- Least Privilege
- Human Permission Review
- Treat External Content as Data
- IN PRACTICE
- Review Git diffs and apply security rules in CLAUDE.md.

### Slide 12: Don’t Let Vulnerabilities
**Slide Content:**
- Reach Main.
- Pull Request
- Semgrep
- npm audit
- Tests
- Review
- Merge
- Begin with non-needed scans while existing findings are reviewed; enforce required checks once the baseline is clean.

### Slide 13: Live Demo:
**Slide Content:**
- Security Investigation
- INSTRUCTOR LIVE DEMO
- 1.
- Run Semgrep and npm audit.
- 2.
- Interpret findings.
- 3.
- Verify one real vulnerability.
- 4.
- Apply a minimal root-cause fix.
- 5.
- Run tests and rescan.

### Slide 14: Why Review
**Slide Content:**
- AI-Generated Code?
- Fast code generation makes human review more important.
- Catch defects.
- Preserve shared understanding.
- Protect architecture and quality.

### Slide 15: What Should a
**Slide Content:**
- Reviewer
- Check?
- Correctness
- Security
- Performance
- Readability
- Tests

### Slide 16: What Makes a Good
**Slide Content:**
- Review Comment?
- UNHELPFUL
- This is wrong.
- HELPFUL
- Missing ownership validation allows unauthorized deletion. Add an ownership check and a 403 test.
- Be specific. Explain impact. Suggest a fix.

### Slide 17: AI Review: Strengths &
**Slide Content:**
- Blind Spots
- AI often helps with missing
- error handling, common security patterns, duplication and style.
- Human reviewers contribute business intent, contextual
- trade-offs and project-specific rules.
- These are hypotheses to test, not universal guarantees.

### Slide 18: Human vs AI
**Slide Content:**
- Review Experiment
- 01
- Human
- Reviews First
- 02
- AI Reviews
- Same PR
- 03
- Author Team
- Validates Findings
- 04
- Compare
- Results
- 05
- Derive
- Heuristics
- Validity, severity, overlapping findings and time spent

### Slide 19: Live Demo:
**Slide Content:**
- Review a Pull Request
- 1
- 2
- 3
- 4
- 5
- Read the related User Story and AC.
- Inspect changed files.
- Run AI review.
- Compare and verify findings.
- Record human review before showing AI findings.
- Write one specific review comment.

### Slide 20: Stop Guessing.
**Slide Content:**
- Start Investigating.
- Debugging is a process of collecting evidence.
- Reproduce.
- Isolate.
- Verify.

### Slide 21: The Debugging
**Slide Content:**
- Workflow
- Reproduce
- 2
- Isolate
- 3
- Hypothesis
- 4
- Fix
- 5
- Regression Test
- 1

### Slide 22: Symptom vs
**Slide Content:**
- Root Cause
- Scenario
- A completed Task becomes Pending again after page refresh.
- Visible symptom
- UI state resets.
- Possible causes
- API failure, persistence error or incorrect state handling.
- Root cause must be established through evidence.

### Slide 23: Test First,
**Slide Content:**
- Fix Second
- 1.
- Reproduce
- the bug.
- 2.
- Write a failing regression test.
- 3.
- Check the hypothesis.
- 4.
- Fix the
- root cause.
- 5.
- Run the full test suite.

### Slide 24: AI-Assisted
**Slide Content:**
- Debugging
- Prompts
- Bug: [symptom]
- Steps: [reproduction]
- Expected: [result]
- Actual: [result]
- Write a failing test first.
- Do not modify implementation yet.
- Inspect
- Confirm Hypothesis
- Minimal Fix

### Slide 25: Live Demo:
**Slide Content:**
- Bug Hunt
- Five seeded bugs are available.
- Students reproduce and isolate failures.
- AI can propose hypotheses;
- humans validate causes.
- Regression tests prove fixes.

### Slide 26: INVESTIGATE. REVIEW.
**Slide Content:**
- FIX.
- Lab 1
- — Security Investigation.
- Lab 2
- — Human vs AI Review.
- Lab 3
- — Bug Hunt & Project Quality.
- Final flexible review:
- 20 minutes.

### Slide 27: Lab 01:
**Slide Content:**
- Security Investigation
- IN-CLASS FOCUS
- Scenario — A development repository contains potential security vulnerabilities.
- Run Semgrep and npm audit.
- 2.
- Add AI security review findings.
- 3.
- Triage and validate findings.
- Prioritize root-cause fixes.
- 5.
- Document security evidence.
- Mandatory full Lab07 outcome — at least three real security fixes; tests and before/after evidence; security scanning in CI; security rules in CLAUDE.md; docs/security-report.md.
- The full deliverable may continue in assigned project time after class.
- 35 minutes
- — in-class guided segment.
- 4.
- 1.

### Slide 28: Lab 02: Human vs AI Code Review
**Slide Content:**
- Scenario
- Two student teams review each other’s Pull Requests. Use a PR of approximately 100–400 changed lines.
- 1.
- Read the User Story and AC.
- 2.
- Human
- review first.
- 3.
- Record categorized comments.
- 4.
- Run AI review afterward.
- 5.
- Compare findings and validity.
- 30 minutes
- — in-class guided segment.
- Mandatory full Lab08 outcome —
- PR review comments; quantitative review comparison; validity and severity decisions;
- 3–5 evidence-based AI review heuristics; docs/review-comparison.md.

### Slide 29: Lab 03:
**Slide Content:**
- Seeded Bug Hunt
- 35 minutes — in-class guided segment.
- Scenario — An instructor-provided training app
- contains five seeded bugs.
- 1.  Reproduce bugs.
- 2.  Isolate possible causes.
- 3.  Form and verify hypotheses.
- 4.  Apply minimal fixes.
- 5.  Add regression tests.
- Record bugs found out of five, time per bug, and a case where AI's first hypothesis was wrong, if observed.
- Deliverable — Bug-hunt investigation notes and regression evidence.

### Slide 30: Make Your MVP Safer.
**Slide Content:**
- 01
- SECURE
- Validate findings and fix vulnerabilities.
- 02
- REVIEW
- Review PRs and improve code quality.
- 03
- VERIFY
- Fix defects and add regression tests.
- Evidence: Security Report · Reviewed PRs · Regression Tests · CI

### Slide 31: Slot 4
**Slide Content:**
- Deliverables
- IN-CLASS EVIDENCE
- Security scan and triage;
- human and AI PR review
- observations; bug investigation
- and verification.
- REQUIRED FOLLOW-UP
- docs/security-report.md;
- three verified security fixes with tests;
- security checks in CI;
- security rules in CLAUDE.md;
- docs/review-comparison.md;
- cross-team PR review evidence;
- bug-hunt notes;
- AI Engineering Log updates.
- Reserve a flexible review or presentation period.

### Slide 32: AI Can Write the Code.
**Slide Content:**
- Engineers Must Prove It Is Safe.
- SCAN
- REVIEW
- DEBUG
- VERIFY
- Next: Slot 5 — Deployment, Operations & Demo Day.

## Slot 5: Production Deployment, Incident Response & Final Demo Day (23 Slides)
Source file: `SLOT 5 - 4 HOURS.pptx` | Total slides: 23

### Slide 01: SHIP IT.
**Slide Content:**
- OPERATE IT.
- DEFEND IT.
- Production Deployment, Incident Response & Final Demo Day
- Course 4 | Slot 5 | FPT University

### Slide 02: From AI-Generated
**Slide Content:**
- Code to a
- Real Product
- Understand
- Slot 2
- Plan & Verify
- Slot 3
- Extend & Integrate
- Slot 4
- Secure & Improve
- Slot 5
- Deploy & Defend
- Today, your software must work beyond localhost.
- Slot 1

### Slide 03: CODE IS NOT
**Slide Content:**
- THE FINISH LINE
- Writing software is only the beginning. Running it is the responsibility.
- Availability.
- Reliability.
- Operability.

### Slide 04: From Localhost to the
**Slide Content:**
- Internet
- Browser
- Frontend:
- Vercel, React/Vite
- VITE_API_URL
- Backend API:
- Render,
- Node.js/Express
- Database:
- PostgreSQL,
- Neon or Supabase
- Backend request logs → stdout → hosting log viewer
- DATABASE_URL —
- configuration reference, not a secret
- Other approved hosting solutions are acceptable. Free-tier conditions are not guaranteed.

### Slide 05: Same Application.
**Slide Content:**
- Development
- Configuration
- differs.
- Testing / CI
- Secrets stay
- outside source code.
- Production
- Production failures need operational evidence.
- Different Environments.

### Slide 06: Configuration Belongs
**Slide Content:**
- Outside the Code
- .env.example →
- Dummy Values
- Hosting Dashboard →
- Real Secrets
- Fail Fast →
- Missing Required Configuration
- DATABASE_URL  •  VITE_API_URL  •  CORS_ORIGIN
- Never commit production secrets.

### Slide 07: From GitHub to a
**Slide Content:**
- Public URL
- User
- Verification
- Verify
- the deployed product on a real public URL.
- Health Check
- Reviewed PR
- Main Branch
- Deploy
- Build

### Slide 08: LIVE DEMO:
**Slide Content:**
- DEPLOYED TASK MANAGER
- 1.
- Open the deployed application.
- 2.
- Check the frontend and backend URLs.
- 3.
- Verify a main user flow.
- 4.
- Show deployment status and configuration without exposing secrets.

### Slide 09: You Cannot
**Slide Content:**
- Fix What You
- Cannot Observe.
- Health Check
- Structured Logs
- Monitoring

### Slide 10: Know Whether
**Slide Content:**
- GET /health
- Returns application and database health.
- Returns an error status when a dependency is unavailable.
- Structured JSON Logs
- Method · Path · Status · Duration · Request ID
- Error details remain server-side.
- Your System Is Healthy

### Slide 11: What Should Engineers Monitor?
**Slide Content:**
- Latency
- how long requests take.
- Errors
- how often requests fail.
- Traffic
- how much demand the system receives.
- Saturation
- how close resources are to their limits.
- For student applications, prioritize Latency and Errors.

### Slide 12: WHEN
**Slide Content:**
- PRODUCTION
- BREAKS
- The UI Loads, But Tasks No Longer Appear.
- Is the API failing?
- Is the database unavailable?
- Did a recent deployment change configuration?
- These are hypotheses, not confirmed root causes.

### Slide 13: Mitigate First.
**Slide Content:**
- Investigate the Root Cause Next.
- Assess
- Check Logs
- & Health
- Review
- Recent
- Changes
- Verify
- Recovery
- Document
- Rollback or make a safe configuration correction when appropriate.
- Acknowledge
- Mitigate

### Slide 14: AI Can Investigate. Engineers Stay in Control.
**Slide Content:**
- AI may summarize sanitized logs, rank hypotheses with evidence, and suggest diagnostic checks.
- Engineers verify claims, approve production
- changes, and prioritize service recovery.
- Never grant an agent uncontrolled
- production access.

### Slide 15: Incident roles
**Slide Content:**
- Deliverables
- LIVE INCIDENT
- DRILL & POSTMORTEM
- Controlled educational simulation
- 1
- The instructor introduces a controlled incident.
- 2
- The team checks /health, logs and recent changes.
- 3
- Members take incident roles.
- 4
- The team mitigates and verifies recovery.
- 5
- The team writes a blameless postmortem.
- Incident Lead · Investigators · Communicator · Scribe
- docs/runbook.md · docs/postmortem-drill.md

### Slide 16: SHOW THE
**Slide Content:**
- PRODUCT.
- DEFEND THE
- ENGINEERING.
- Every team demonstrates a deployed application.
- Every member explains their own work.

### Slide 17: One Product. Real Evidence.
**Slide Content:**
- 7 MINUTES – PRESENTATION & DEMO
- 1 minute:
- 3 minutes:
- 2 minutes:
- 1 minute:
- Problem & User
- Live Product Demonstration
- How We Built It with AI
- Quality Evidence
- 5 MINUTES – INDIVIDUAL Q&A
- Every member answers a question about their own code or engineering decisions.
- Use the public production URL, not localhost.

### Slide 18: Demonstrate More Than
**Slide Content:**
- a Working UI.
- Product
- Value
- Architecture & Agent Workflow
- Tests & CI
- Security &
- Code Review
- Deployment & Operations

### Slide 19: Can You Explain
**Slide Content:**
- What You Built?
- What happens when the user clicks Save?
- Why is this validation implemented on the server?
- What mistake did the AI agent make?
- What would you check after an HTTP 500 in production?
- Code you cannot explain is not
- demonstrated ownership.

### Slide 20: Product Value
**Slide Content:**
- 15
- Spec & Context
- 10
- Code & Workflow
- 15
- Testing & CI
- 15
- Security
- 10
- Deployment & Operations
- 10
- Automations
- 10
- Demo & Communication
- 15
- TOTAL:
- 100
- POINTS
- This Final Rubric is not course assessment weight percentages.
- How Your Engineering Work Is
- Evaluated

### Slide 21: What Must Be
**Slide Content:**
- Delivered?
- M3 – Release Candidate
- Public frontend and backend URLs.
- GET /health and structured logs.
- docs/runbook.md
- docs/postmortem-drill.md
- Must-have stories completed and remaining bugs triaged.
- M4 – Final Submission
- Git release tag v1.0.
- docs/final-report.md, maximum six pages.
- docs/demo-day.pdf, maximum eight slides.
- AI Engineering Logs with final reflections.
- Confidential individual peer evaluation.

### Slide 22: The Future
**Slide Content:**
- Software Engineer
- Agent Orchestration
- Specification
- & Context
- Systems
- Thinking
- Product
- Judgment
- What surprised you most about building software with AI?

### Slide 23: AI Can Help You Build Software.
**Slide Content:**
- Engineering Makes It Reliable.
- UNDERSTAND → CONTROL → EXTEND → SECURE → SHIP
- Course 4 – The Modern AI Software Developer
- FPT University
