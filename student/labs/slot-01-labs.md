# Slot 1 Student Practical Guide & Labs

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot:** Slot 1 — Understand Requirements, Specifications & Baseline Architecture  
> **Target Checkpoint:** `checkpoint/slot-01-start`

---

## Lab 1.1: Prompt Engineering with Context Constraints (30 Minutes)

### 1. Objective
Experience firsthand how unstructured, vague prompts cause AI agents to hallucinate architectures and create bloated diffs, and how structured prompts with context constraints produce precise, reviewable single-file edits.

### 2. Pre-Requisites
- Working copy checked out at `checkpoint/slot-01-start`.
- AI Coding Assistant (Antigravity, Cursor, Claude Code, or Gemini CLI).

### 3. Student Instructions
1. **Experiment A (Unconstrained Prompt — The Anti-Pattern):**
   - In your AI assistant, submit this naive prompt:
     > *"Make the task input form better and add character limit validation."*
   - Inspect the resulting diff:
     - Did the AI modify backend APIs or add external packages?
     - Did it rewrite existing CSS or break existing tests?
     - Reject or discard this change: `git checkout .`.
2. **Experiment B (Constrained Prompt — The Disciplined Loop):**
   - Provide explicit file boundaries and acceptance criteria:
     > *"Inspect `packages/shared/src/schemas.ts` and `apps/web/src/components/TaskForm.tsx`. I want to show a character counter (e.g. '0/100') next to the task input field. Do not modify any backend files or schemas. Present an implementation plan first."*
   - Review the proposed plan before allowing edits.
   - Inspect the Git diff in VS Code.
3. **Acceptance Criteria:**
   - [ ] Input shows live character count updating on every keystroke.
   - [ ] No files outside `apps/web/src/components/TaskForm.tsx` were modified.
   - [ ] `npm test` and `npm run typecheck` pass cleanly.

---

## Lab 1.2: AI Business Analyst — Requirement Clarification (30 Minutes)

### 1. Objective
Practice using an AI agent as a Business Analyst to transform ambiguous stakeholder feature requests into unambiguous, testable engineering specifications and Zod schemas.

### 2. Input Scenario
> Stakeholder Request: *"We need users to be able to prioritize urgent tasks so they don't get lost, and maybe sort them or filter them somehow."*

### 3. Student Instructions
1. Direct your AI agent to role-play as a Senior Business Analyst:
   > *"Analyze this vague stakeholder request: 'We need users to be able to prioritize urgent tasks so they don't get lost'. Identify missing edge cases, define an explicit enum for priority levels, establish default fallback behavior, and write a drafted Zod schema definition."*
2. Critique the AI's output with your team:
   - What happens to existing tasks created before this feature? (Must have default `medium`).
   - Is priority required or optional in API requests?
   - How should sorting behave when two tasks have the same priority?
3. Deliverable:
   - Drafted specification in `docs/slot-01/priority-spec.md` with explicit Given-When-Then acceptance criteria.

---

## Lab 1.3: Student Team Project Kickoff — Milestone M0 (35 Minutes)

### 1. Objective
Establish team agreements, assign initial rotating roles, and create an independent Git repository for your semester project.

### 2. Team Deliverables
1. **Team Roster & Role Assignments (Milestone M0):**
   - *Product Lead / Architect:* Owns PRD, acceptance criteria, and system boundaries.
   - *Backend Lead:* Owns Express API, Prisma schemas, and database integrity.
   - *Frontend Lead:* Owns React SPA, accessible UI, and component tests.
   - *QA & Security Lead:* Owns automated tests, CI workflows, and SAST rules.
2. **Independent Project Repository:**
   - Create your team's GitHub repository.
   - Copy monorepo structure from Course 4 baseline.
   - Verify that `npm install`, `npm test`, and `npm run typecheck` run green on all teammates' machines.
