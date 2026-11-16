# Slot 2 Lab 01: Task Due-Date Planning Challenge

**Duration:** 30 minutes
**Mode:** planning and scope review only

## Scenario

An AI proposes adding due dates, priority, reminders, recurring tasks, notifications, and a calendar while implementing task deadline editing. Students must reject the unrelated work and approve the smallest coherent due-date plan.

## Testable Acceptance Criteria

1. Given a task without a due date, when the user assigns a valid ISO date (`YYYY-MM-DD`), then the API stores it and the UI displays it.
2. Given a task with a due date, when the user clears the field, then the API stores `null` and the UI displays no due date.
3. Given an impossible or malformed date, when the user submits it, then the API returns HTTP 400 and retains the previous value.
4. Given two otherwise identical tasks, one overdue and one not overdue, when the board renders, then only the past incomplete task receives an “Overdue” label.

## Approved Implementation Plan

1. Inspect the Prisma model, shared Zod schemas, API update route, task API client, and task item component.
2. Add nullable `dueDate` storage with one migration. Do not add priority, reminders, recurrence, notifications, or calendar dependencies.
3. Extend shared create/update/task schemas with a nullable date-only value and explicit validation.
4. Map the validated field in the API create/update paths.
5. Add a date input and an overdue label to the existing task item without redesigning the board.
6. Write unit tests for date validation, API tests for set/clear/invalid behavior, and one browser test for the visible overdue state.
7. Review the diff against the four criteria before proposing a PR.

## Plan Review Table

| Proposal | Decision | Reason |
|---|---|---|
| Nullable due date | Approve | Required by the exercise |
| Validation and tests | Approve | Direct acceptance evidence |
| Priority levels | Reject | Separate feature |
| Email reminders | Reject | Requires external delivery infrastructure |
| Recurring tasks | Reject | New domain behavior |
| Calendar redesign | Reject | Unrelated UI scope |

## Deliverable

Submit the reviewed plan, rejected-scope list, and verification plan. This teaching-repository document is an example only; students implement a selected story in their own team repository.
