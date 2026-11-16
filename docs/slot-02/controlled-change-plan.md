# Slot 2 Controlled Feature Change Plan

## Requirement

Task titles must remain concise enough to review in the teaching board.

## Acceptance Criteria

1. Given a title containing 1–120 characters after trimming, when a user creates or edits a task, then the system accepts and persists the trimmed title.
2. Given a title containing more than 120 characters, when the client or API receives it, then the system rejects it and explains the 120-character limit.
3. Given an empty or whitespace-only title, when a user submits it, then the API returns HTTP 400 and creates no task.
4. Given the task form, when a user types, then the interface shows the current count and prevents input beyond 120 characters.

## Approved File Scope

| File area | Planned change | Verification |
|---|---|---|
| `packages/shared` | One shared title schema and exported maximum-length constant | Unit tests |
| `apps/api` | Reuse shared validation and bound JSON request parsing | Supertest integration tests |
| `apps/web` | Apply `maxLength` to create/edit inputs and show a count | React component tests and Playwright |
| `.github/workflows/ci.yml` | Run the full locked verification sequence | Local command parity; GitHub execution remains unverified until pushed |

## Explicitly Out of Scope

- due-date persistence or UI;
- task priority;
- authentication or ownership;
- unrelated refactors;
- deployment.

## Human Approval Gate

Review the table above before editing. Reject any proposed database migration, new UI framework, auth work, or broad component rewrite. The approved change should remain traceable to the four acceptance criteria.

## Review and PR Preparation

```powershell
git switch -c feat/slot-02-controlled-ai-engineering checkpoint/slot-02-start
git diff -- packages/shared apps/api apps/web
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
git diff --check
```

Use `.github/pull_request_template.md` to connect each acceptance criterion to its code and evidence. Preparing the template and diff does not create or publish a GitHub Pull Request.
