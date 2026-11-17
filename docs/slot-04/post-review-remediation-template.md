# Post-Review Remediation Plan (Template)

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 4 Post-Review Action Plan**  
> **PR Identifier:** `[e.g., PR #12 - Task Due Date Feature]`

---

## 1. Action Items from Code Review

| Priority | Issue Description | Source Category | Remediation Task | Assigned To | Status |
|:---:|---|:---:|---|---|:---:|
| **P0 (Blocker)** | XSS in DueDateBadge component | Security | Eliminate `dangerouslySetInnerHTML`, use safe text interpolation. | Reviewer 1 | Pending |
| **P0 (Blocker)** | Timezone date offset error | Business Logic | Migrate date comparison to UTC timestamp matching. | Reviewer 2 | Pending |
| **P1 (High)** | Negative reminder minutes allowed | Validation | Update Zod schema to enforce `.min(0)` on `reminderMinutesBefore`. | Reviewer 1 | Pending |
| **P2 (Normal)** | Unused imports & typo | Hygiene | Remove `date-fns` unused import and correct `isOverude` typo. | Reviewer 2 | Pending |

---

## 2. Verification Protocol Before Re-Requesting Review

1. **Local Test Execution:** Run full test suite with regression tests added for fixed bugs.
2. **Git Diff Audit:** Run `git diff main..HEAD` and verify only the agreed remediation changes exist.
3. **Automated Workflow:** Run `node scripts/review-pr.mjs` to confirm review automation status turns `APPROVED`.
