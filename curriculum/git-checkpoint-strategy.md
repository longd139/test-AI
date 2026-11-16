# Git Checkpoint & Safe Recovery Strategy — Course 4

> **System Name:** `course4-teaching-task-manager`  
> **Course:** Course 4 — The Modern AI Software Developer (ADLC01)  
> **Institution:** FPT University  
> **Status:** APPROVED IMPLEMENTATION DESIGN (PHASE P0.1) — All tags, branches, and scripts described herein are **PLANNED** for creation in Phases P1–P5.

---

## 1. Planned Checkpoint Taxonomy

Each checkpoint represents a verified milestone tag in Git, providing a clean starting state for instructors and students.

| Planned Checkpoint Tag | Purpose & Target Slot | Planned State Description | Planned Target State |
|:---|:---|:---|:---:|
| `checkpoint/slot-01-start` | Slot 1 Live Demos 1 & 2 | Clean baseline Task Manager. Basic CRUD, SQLite via Prisma, zero auth, single-user board. *No Priority or Due Date pre-implemented.* | Build: Planned<br>Tests: Planned (5 unit tests) |
| `checkpoint/slot-02-start` | Slot 2 Live Demos & Labs | Baseline with Acceptance Criteria ready for feature branching, TDD demo, and CI pipeline. | Build: Planned<br>Tests: Planned (8 unit/int) |
| `checkpoint/slot-02-demo-priority` | Slot 2 Optional Demo | Optional demonstration branch showing how AI adds a Task Priority field (`LOW`, `MEDIUM`, `HIGH`). | Build: Planned<br>Tests: Planned |
| `checkpoint/slot-03-start` | Slot 3 Automations & UI | Baseline with `.claude/commands/`, Playwright MCP config (`.mcp.json`), and accessible UI components. | Build: Planned<br>Tests: Planned (10 unit/int/E2E) |
| `checkpoint/slot-04-start` | Slot 4 Security & Review | Stable baseline application ready for SAST scanning and PR review comparison. | Build: Planned<br>Tests: Planned (12 tests) |
| `checkpoint/slot-04-bug-hunt` | Slot 4 Lab 03 Bug Hunt | **Isolated training branch** containing the 5 seeded bugs. Never merged into `main`. | Build: Planned<br>Tests: Planned (5 failing seeds) |
| `checkpoint/slot-04-security-vulns` | Slot 4 Lab 01 Security Lab | **Isolated training branch** with deliberate benign vulnerabilities (IDOR, permissive Zod). Prohibited in production. | Build: Planned<br>Semgrep: Planned (Flags flaws) |
| `checkpoint/slot-05-deployed` | Slot 5 Deployment & Ops | Production release candidate. `GET /health` endpoint, Pino structured logging, Dockerfile, Neon PostgreSQL config. | Build: Planned<br>Tests: Planned (Full suite pass) |
| `checkpoint/slot-05-incident` | Slot 5 Incident Drill | **Simulated outage branch** (misconfigured DB connection or missing environment variable). | Build: Planned<br>Health: Planned (HTTP 503) |

---

## 2. Non-Destructive Checkpoint Navigation & Reset Flow

### 2.1. Recommended Practice: Disposable Git Worktrees
To eliminate the danger of accidental data loss from destructive Git commands on a student or instructor's active working copy, the primary navigation mechanism is **disposable Git worktrees**:

```bash
# PowerShell / Bash: Create an isolated worktree for Slot 2 without touching active files
git worktree add ../task-manager-slot-02 checkpoint/slot-02-start

# Perform live demo or lab inside the isolated directory
cd ../task-manager-slot-02
npm install
npm run db:seed
npm run dev

# When finished, remove the worktree safely
cd ../SRC-GUIDE
git worktree remove ../task-manager-slot-02
```

---

### 2.2. Guarded Reset Automation (`scripts/reset-checkpoint.mjs`) [PLANNED]
For cases where a single working copy must be reset between class sections, a guarded Node.js script (`scripts/reset-checkpoint.mjs`) is planned for Phase P1.

#### Guarded Operational Rules:
1. **No Default Destruction:** Running `node scripts/reset-checkpoint.mjs` without flags executes a **`--dry-run`**, reporting what would change without modifying files.
2. **Interactive Confirmation:** Destructive resets require an explicit `--force` flag or interactive `[y/N]` prompt.
3. **Pre-flight Uncommitted Changes Check:** If `git status --porcelain` detects uncommitted edits, the script **aborts immediately** unless `--stash` is supplied to create an automated emergency stash (`git stash save "auto-stash-before-reset-<timestamp>"`).
4. **Targeted Reset Lifecycle:**
   - **Git State:** `git checkout <target-checkpoint>`
   - **Database State:** Recreates `prisma/dev.db` cleanly and runs `prisma/seed.ts`.
   - **Fixtures & Logs:** Clears runtime log files (`*.log`, `logs/*.jsonl`) and resets simulated identity fixtures.
   - **Temporary Build Artifacts:** Safely deletes known ephemeral directories (`dist/`, `.vite/`, `coverage/`) without touching untracked source files.

#### Planned Command Invocations:

**Windows PowerShell:**
```powershell
# 1. Inspect proposed reset actions (Dry Run)
node scripts/reset-checkpoint.mjs --target checkpoint/slot-02-start --dry-run

# 2. Execute guarded reset with automatic stash backup
node scripts/reset-checkpoint.mjs --target checkpoint/slot-02-start --stash --force
```

**macOS / Linux Bash:**
```bash
# 1. Inspect proposed reset actions (Dry Run)
node scripts/reset-checkpoint.mjs --target checkpoint/slot-02-start --dry-run

# 2. Execute guarded reset with automatic stash backup
node scripts/reset-checkpoint.mjs --target checkpoint/slot-02-start --stash --force
```

---

## 3. Strict Isolation of Intentional Failures

In compliance with **Design Principle D**:
- **Pristine `main` Branch:** The `main` branch represents the verified, stable codebase. It contains zero deliberate vulnerabilities, no failing tests, and no simulated outages.
- **Dedicated Training Branches:** Deliberate educational flaws live strictly on dedicated training branches:
  - `checkpoint/slot-04-bug-hunt`: Contains the 5 seeded bugs.
  - `checkpoint/slot-04-security-vulns`: Contains the IDOR and permissive input vulnerabilities.
  - `checkpoint/slot-05-incident`: Contains the broken database configuration.
- **Zero Real Secrets:** All sample environment files (`.env.example`) use dummy placeholders (`JWT_SECRET="training-dummy-secret-not-for-production"`).
- **Verified Fix Documentation:** Every intentional defect is paired with a verified regression test and documented fix in `instructor/answer-keys/`.

---

## 4. Academic Integrity & Publishing Boundaries

- **Instructor vs. Student Separation:**
  - Instructors use the `course4-teaching-task-manager` repository for live demonstrations and reference code.
  - Student teams work on **separate, independent project repositories** for their course projects. They do NOT submit PRs against or clone the instructor answer keys.
- **Answer Key Quarantine:**
  - Instructor-only run sheets and answer keys are located in `instructor/answer-keys/`.
  - When publishing student-facing templates or starter forks, a planned export script (`scripts/publish-student-repo.mjs`) strips the `instructor/` directory and unmerges training branches.
