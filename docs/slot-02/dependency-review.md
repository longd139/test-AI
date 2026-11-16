# Slot 2 Dependency Vulnerability Review

**Audit command:** `npm audit --json`
**Initial result:** exit 1, 7 findings (1 moderate, 4 high, 2 critical)

## High and Critical Paths

| Severity | Advisory/package path | Scope | Safe compatible fix |
|---|---|---|---|
| Critical | `vitest@3.2.7 → tinypool@1.1.1` (`GHSA-5gmw-xhrv-c9v3`, `GHSA-85c8-ppgw-ccpr`) | Development and CI test worker only | None on Vitest 3. npm proposes Vitest 4.1.12, a major upgrade. |
| High | `prisma@6.19.3 → @prisma/config@6.19.3 → deepmerge-ts@7.1.5` (`GHSA-ggr8-5vv4-36mx`) | Prisma CLI used for generation/schema operations; not the Express runtime client path | None on Prisma 6. npm marks a newer major line as the available remediation. |
| High | `zod@3.25.76` (`GHSA-mrhx-c7xc-m3w5`) | Runtime request validation and shared client validation | Fixed only in Zod 4.6.6+, a major upgrade. |

The moderate `@vitest/mocker` findings (`GHSA-82fw-gwwq-j7x9`, `GHSA-qxg6-89mg-rqv8`) also require Vitest 4.1.12.

## Decision

`npm audit fix --dry-run --json` proposed no compatible package change and retained all seven findings. No `--force`, major upgrade, override, or test weakening was used. Major migrations need separate compatibility review because Zod 4 and Vitest 4 can change validation and test behavior, while the available Prisma remediation is outside the approved P2 dependency scope.

## Compensating Controls

- Express JSON parsing is capped at 16 KB before Zod validation.
- The Task title is capped at 120 characters.
- Vitest and Tinypool run only on trusted local/CI test code and are never exposed as application servers.
- Prisma CLI commands consume repository-controlled schemas and configuration only.
- CI uses `npm ci` and the committed lockfile.
- External Pull Requests must not receive secrets and should run under least-privilege `contents: read` workflow permissions.

These controls reduce exposure but do not remove the advisories. The final report must keep them listed as unresolved.
