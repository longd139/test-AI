# Reusable Agent Automations & Workflows — Slot 3

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 3:** Agent Automations, Subagents, MCP & Rapid AI UI Development  
> **Slide Reference:** `SLOT 3` Slides 05–09 ("Repetitive Work Should Become a Workflow", "From Prompt to Automation", "Automated PR Review")

---

## 1. Catalog of Repository Automations

| Command / Workflow | Scope | Primary File | Execution Tool |
|---|---|---|---|
| **`/review-pr`** | Automated PR Review against PRD & Git diff | [.claude/commands/review-pr.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/.claude/commands/review-pr.md) | Claude Code CLI or `node scripts/review-pr.mjs` |
| **`/test-and-fix`** | Automated test failure isolation and targeted repair | [.claude/commands/test-and-fix.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/.claude/commands/test-and-fix.md) | Claude Code CLI or `node scripts/test-and-fix.mjs` |

---

## 2. Reviewer Subagent Roles

Specialized subagents configured in [agents/](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/agents/):
1. **Spec Compliance Reviewer (`spec-compliance-reviewer.md`):** Guards against scope creep, validates changes against `docs/prd.md` Acceptance Criteria, and ensures `@course4/shared` schemas are honored.
2. **Accessibility Auditor (`accessibility-auditor.md`):** Audits React components against WCAG 2.1 AA keyboard navigation, visible focus indicators, and screen reader labels.
3. **Security Boundary Reviewer (`security-boundary-reviewer.md`):** Audits API routes for single-user data isolation, input bounds (16 KB JSON limits), and sanitized error responses.

---

## 3. Sample Execution Transcripts

### 3.1. `/review-pr` Execution Transcript
```text
=== Automated PR Review Workflow ===
Comparing against base: feat/slot-02-controlled-ai-engineering

Changed files (5):
  - apps/web/src/App.tsx
  - apps/web/src/components/TaskFilterBar.tsx
  - apps/web/src/components/TaskList.tsx
  - docs/slot-03/ui-design-decision.md
  - e2e/task-manager.spec.ts

Diff Summary:
 5 files changed, 142 insertions(+), 8 deletions(-)

Running automated typecheck and tests...
TypeScript Typecheck: PASS (0 errors)
Automated Test Suites: PASS (33 passed)

========================================
AUTOMATED PR REVIEW DECISION: APPROVED
========================================
- Scope Violations: None (PASS)
- TypeScript Typecheck: PASS
- Automated Test Suites: PASS
```

### 3.2. `/test-and-fix` Execution Transcript
```text
=== Automated Test-and-Fix Runner ===
Executing test suite across all workspaces...

 RUN  v3.2.7 packages/shared
 ✓ tests/schemas.test.ts (10 tests) 5ms

 RUN  v3.2.7 apps/api
 ✓ tests/api.test.ts (19 tests) 520ms

 RUN  v3.2.7 apps/web
 ✓ tests/App.test.tsx (4 tests) 160ms

[RESULT] All tests passed! No repairs required.
```
