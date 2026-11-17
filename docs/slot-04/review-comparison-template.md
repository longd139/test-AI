# Code Review Comparison Report: Human vs AI

> **PR Under Review:** `feat(tasks): add task due date and reminder notifications`  
> **Diff Source:** `fixtures/pr-review/cross-team-pr.diff`  
> **Student / Reviewer Name:** `[Your Name]`  
> **AI Review Tool Used:** `[Claude Code / Antigravity / Cursor]`  
> **Date:** `[YYYY-MM-DD]`

---

## 1. Review Findings Matrix

| Finding # | File & Line | Identified Issue | Detected By (Human / AI / Both) | Category (Logic / Security / Syntax / Scope) | Validity (True Positive / False Alarm) |
|:---:|---|---|:---:|:---:|:---:|
| 1 | `dueDate.ts:20-25` | Timezone offset bug in `calculateIsOverdue` | Human Only | Business Logic | True Positive |
| 2 | `dueDate.ts:9` | Negative duration allowed (`reminderMinutesBefore`) | Human Only | Business Logic | True Positive |
| 3 | `DueDateBadge.tsx:20` | XSS vulnerability (`dangerouslySetInnerHTML`) | Both | Security | True Positive |
| 4 | `dueDate.ts:2` | Unused import (`format` from `date-fns`) | AI Only | Syntax / Hygiene | True Positive |
| 5 | `reminders.ts:22` | Typo in identifier (`isOverude`) | AI Only | Syntax / Hygiene | True Positive |

---

## 2. Comparison Analysis & Reflection

### 2.1. What did the Human catch that AI missed?
- *Example:* The AI did not recognize that comparing a local date against a UTC string causes tasks to flip to "overdue" prematurely in positive UTC time zones (+7 Asia/Saigon). The human understood the user experience impact.

### 2.2. What did the AI catch that Human missed?
- *Example:* The AI immediately flagged the unused import `import { format } from 'date-fns'` and the typo `isOverude`, which the human eye easily skimmed over.

### 2.3. Were there any AI False Positives?
- *Example:* [Note any warnings the AI produced that were incorrect or unnecessary].

---

## 3. Final Pull Request Verdict
- [ ] **APPROVE**
- [x] **REQUEST CHANGES**

**Blocking Issues Required Before Merge:**
1. Sanitize or eliminate `dangerouslySetInnerHTML` in `DueDateBadge.tsx`.
2. Add validation constraint `.min(0)` on `reminderMinutesBefore`.
3. Standardize timezone comparisons using UTC timestamps.
