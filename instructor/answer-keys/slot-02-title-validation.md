# Slot 2 Answer Key: Whitespace Title Regression

## Acceptance criterion

Given a task count of `N`, when a client sends `POST /api/tasks` with a whitespace-only title, then the API returns HTTP 400 and the database still contains `N` tasks.

## Red root cause

The intentional training checkpoint applies `.min(1)` before `.trim()`. Zod sees the original spaces as non-empty, then transforms them into an empty string. The API persists that empty value.

## Minimal fix

Apply `.trim()` before `.min(1)` in the shared title schema. Do not add special-case route logic and do not change the regression test.

## Verification

```powershell
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

The red checkpoint remains isolated for teaching. The stable feature branch contains the fixed schema and passing evidence.
