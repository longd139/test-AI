# Slot 2 Student Labs

Teaching-repository assets demonstrate the workflow. Student deliverables belong in each team’s independent project repository and must use that project’s own PRD and acceptance criteria.

## Lab 01: Agent Planning Challenge

**Slide 30**
**Time:** 30 minutes

Review `docs/slot-02/due-date-planning-challenge.md`. Inspect the proposed task-deadline change, reject priority/reminders/recurrence/calendar scope, and submit:

- approved file-by-file implementation plan;
- rejected-scope table;
- testable acceptance criteria;
- verification commands.

Do not implement the due-date feature in the teaching repository during this lab.

## Lab 02: Testing and Bug Investigation

**Slide 31**
**Time:** 35 minutes

Start from the instructor-provided red checkpoint in a disposable worktree.

1. Restate the whitespace-title acceptance criterion.
2. Run the failing unit/API regression and retain terminal evidence.
3. Identify the validation-order root cause.
4. Apply the smallest fix without changing the test.
5. Run unit, API, and relevant browser checks.
6. Record RED, GREEN, and refactor evidence.

Deliver: test case, failure evidence, root-cause explanation, fix diff, and verification result.

## Lab 03: Student Project Sprint

**Slide 32**
**Time:** 35 minutes

In the team’s own project repository:

1. select one user story from the team PRD;
2. create one feature branch;
3. ask the agent to inspect and plan before editing;
4. define at least one testable acceptance criterion;
5. begin a test-first implementation;
6. record evidence for a draft PR and AI Engineering Log.

Deliver: feature branch plus plan and test evidence, or a draft PR.

## Required Follow-up Before Slot 3

**Slide 33**

- Features 1–2 reviewed through Pull Requests.
- One AI Engineering Log per student.
- At least 10 meaningful tests, including browser E2E.
- Feature 3 built test-first, with the failing-test commit before the implementation commit.
- GitHub Actions CI working in the student repository.

The teaching repository’s CI file, red checkpoint, and answer key are demonstrations. They do not count as student-project submissions.
