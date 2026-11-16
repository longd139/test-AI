# Git Checkpoint & Versioning Strategy — Course 4

> **Purpose:** Provide deterministic, reliable, zero-drift starting states for instructors delivering 4-hour live lectures and students executing guided laboratory exercises across all 5 slots.

---

## 1. Checkpoint Tag Taxonomy

Every checkpoint is a tagged Git commit representing a pristine, verified snapshot of the repository.

| Checkpoint Tag | Purpose & Target Slot | State Description | Tests & Build State |
|:---|:---|:---|:---:|
| `checkpoint/slot-01-start` | Slot 1 Live Demo 1 & 2 | Clean baseline Task Manager. Basic task list, create, edit, mark complete. Prisma with SQLite. | Build: ✅<br>Tests: ✅ (5 unit tests) |
| `checkpoint/slot-02-start` | Slot 2 Live Demos & Labs | Ready for feature branching, TDD failing test demonstration, and GitHub Actions CI. | Build: ✅<br>Tests: ✅ (8 unit/integration) |
| `checkpoint/slot-03-start` | Slot 3 Automations & UI | Contains `.claude/commands/`, Playwright MCP config (`.mcp.json`), and baseline accessible UI components. | Build: ✅<br>Tests: ✅ (10 unit/integration/E2E) |
| `checkpoint/slot-04-start` | Slot 4 Security & Review | Stable application ready for SAST scanning and PR review comparison. | Build: ✅<br>Tests: ✅ (12 tests) |
| `checkpoint/slot-04-bug-hunt` | Slot 4 Lab 03 Bug Hunt | **Isolated training branch** containing the 5 seeded bugs. Never merged into `main`. | Build: ✅<br>Tests: ❌ (Seed bugs active) |
| `checkpoint/slot-04-security-vulns` | Slot 4 Lab 01 Security Lab | **Isolated training branch** with deliberate benign vulnerabilities (IDOR, permissive Zod). | Build: ✅<br>Semgrep: ❌ (Fails as expected) |
| `checkpoint/slot-05-deployed` | Slot 5 Deployment & Ops | Production release candidate. `GET /health` endpoint, Pino structured logging, Dockerfile, PostgreSQL config. | Build: ✅<br>Tests: ✅ (Full suite pass) |
| `checkpoint/slot-05-incident` | Slot 5 Incident Drill | **Simulated outage branch** (misconfigured DB connection or missing environment variable). | Build: ✅<br>Health: ❌ (Returns HTTP 503) |

---

## 2. Checkpoint Reset & Recovery Automation

To ensure an instructor can reset the environment in under 10 seconds during a live lecture, a cross-platform reset script is provided:

```bash
# Reset repository to any checkpoint cleanly
npm run checkpoint:reset -- checkpoint/slot-02-start
```

The reset workflow executes:
1. `git reset --hard <target-checkpoint>`
2. `git clean -fd` (removes untracked scratch files)
3. `npm run db:reset` (recreates SQLite schema and runs `prisma/seed.ts`)
4. Verifies `npm run build` and `npm test` exit with code 0.

---

## 3. Strict Isolation of Intentional Failures

To comply with **Design Principle D**:
- **Zero Vulnerabilities on `main`:** The `main` branch is always stable, passing all tests, lint checks, and security scans.
- **Dedicated Training Branches:** Deliberate bugs (such as the 5 Bug Hunt bugs or IDOR access flaws) live exclusively on dedicated training branches (`checkpoint/slot-04-bug-hunt`, `checkpoint/slot-04-security-vulns`).
- **No Real Secrets:** All sample environment files use dummy placeholders (`JWT_SECRET="training-dummy-secret-not-for-production"`).
- **Clear Fix Documentation:** Every intentional defect is accompanied by a verified fix patch and regression test in `instructor/answer-keys/`.

---

## 4. Academic Integrity & Publishing Control

- **Instructor Answer Keys:** Stored in `instructor/answer-keys/` and documented in `.gitignore` or stripped via automated export script (`scripts/publish-student-repo.mjs`) before creating public student templates.
- **Independent Student Repositories:** Student teams clone or generate their own independent repositories for their course projects. They do NOT submit PRs against the instructor teaching repo.
