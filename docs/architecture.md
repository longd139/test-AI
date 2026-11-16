# Educational Architecture Specification — Course 4 Teaching Task Manager

> **System Name:** `course4-teaching-task-manager`  
> **Course:** Course 4 — The Modern AI Software Developer (ADLC01)  
> **Institution:** FPT University  
> **Status:** APPROVED IMPLEMENTATION DESIGN (PHASE P0.1) — All application code, endpoints, schemas, and deployment assets are **PLANNED** for implementation in Phases P1–P5.

---

## 1. System Overview & Monorepo Design

The teaching repository is organized as an **`npm workspaces` monorepo**, deliberately avoiding complex enterprise build tooling (Turborepo, Nx, Lerna) to maintain maximum accessibility for undergraduate students while upholding enterprise modularity.

```text
course4-teaching-task-manager/
├── apps/
│   ├── api/                   # Express + TypeScript backend (REST API) [PLANNED]
│   └── web/                   # React 18 + Vite + Tailwind CSS frontend [PLANNED]
├── packages/
│   └── shared/                # Shared domain contracts, types & Zod schemas [PLANNED]
├── prisma/                    # Schema, migrations & seed scripts (SQLite / PostgreSQL) [PLANNED]
├── tests/
│   ├── unit/                  # Fast Vitest unit tests [PLANNED]
│   ├── integration/           # Supertest API endpoint tests [PLANNED]
│   ├── e2e/                   # Playwright browser end-to-end tests [PLANNED]
│   └── bug-hunt/              # Seeded bug regression suite (Slot 4) [PLANNED]
├── curriculum/                # Pedagogical blueprints (traceability, inventories, conflicts)
├── labs/                      # Student workbooks (Slot 1 to Slot 5) [PLANNED]
├── instructor/                # Instructor run sheets, answer keys, recovery scripts [PLANNED]
├── docs/                      # Architectural specs, runbooks, security reports
└── scripts/                   # Cross-platform automation scripts (.mjs) [PLANNED]
```

---

## 2. Package & Dependency Boundaries [PLANNED DESIGN]

### 2.1. `packages/shared`
- **Purpose:** Single source of truth for domain schemas and type definitions, shared across frontend and backend.
- **Dependencies:** `zod`
- **Exports:**
  - `TaskSchema`, `CreateTaskSchema`, `UpdateTaskSchema`, `TaskQuerySchema`
  - Inferred TypeScript types: `Task`, `CreateTaskInput`, `UpdateTaskInput`, `TaskFilter`
  - Enums / Constants: `TaskStatus` (`TODO`, `IN_PROGRESS`, `DONE`)
  - Optional demonstration schema (Slot 2 demo only): `TaskPriority` (`LOW`, `MEDIUM`, `HIGH`) — *not required or present in Slot 1 baseline*.
  - Standard API envelopes: `ApiResponse<T>`, `ApiErrorResponse`

### 2.2. `apps/api`
- **Purpose:** Headless HTTP API serving JSON resources.
- **Runtime:** Node.js (LTS >= 20.x) + Express + TypeScript
- **Dependencies:**
  - `express`, `cors`, `dotenv`, `pino`, `pino-http` (production logging)
  - `@prisma/client`
  - Internal workspace dependency: `packages/shared`
- **Dev Dependencies:**
  - `tsx` (fast TS execution), `typescript`, `vitest`, `supertest`, `@types/express`, `@types/supertest`
- **Key Modules:**
  - `src/routes/tasks.ts`: CRUD endpoints with Zod middleware validation.
  - `src/routes/health.ts`: Observability endpoint returning system status and active DB ping.
  - `src/middleware/logger.ts`: Pino structured JSON request/response logging.
  - `src/middleware/errorHandler.ts`: Sanitized error responses preventing internal stack leakages.
  - `src/fixtures/simulated-auth.ts`: **Isolated test/training fixture only** (see Security Architecture).

### 2.3. `apps/web`
- **Purpose:** Interactive Single-Page Application (SPA).
- **Runtime:** Browser (Vite dev server & optimized static build)
- **Dependencies:**
  - `react`, `react-dom`, `lucide-react` (clean icons)
  - Internal workspace dependency: `packages/shared`
- **Dev Dependencies:**
  - `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`
- **Key Components:**
  - `TaskList`: Displays task cards with status checkboxes.
  - `TaskFilterBar`: Accessible filter tabs (All, Active, Completed) with keyboard navigation.
  - `TaskFormModal`: Create/edit modal powered by Zod schema validation.
  - `api/client.ts`: Typed fetch wrapper communicating with `apps/api`.

---

## 3. Database & Deployment Reference Architecture

### 3.1. Reference Hosting Stack
To prevent ambiguity during live instruction and deployment labs, the course standardizes on the following **Reference Production Stack**:

| Tier | Reference Platform | Free-Tier Characteristics | Approved Alternative |
|:---|:---|:---|:---|
| **Frontend** | **Vercel** | Edge network, automatic Vite builds, zero-config SPA routing (`vercel.json`). | Netlify |
| **API Backend** | **Render** | Docker / Node.js web service, automatic TLS, health check integration. | Railway |
| **Database** | **Neon** | Serverless PostgreSQL 16, connection pooling, instant branching, zero local daemon. | Supabase PostgreSQL |

---

### 3.2. Database Persistence Evolution (SQLite → PostgreSQL)

```mermaid
flowchart LR
    subgraph LocalDev["Slots 1–4: Local Development & CI"]
        direction TB
        CodeLocal["apps/api"] --> PrismaLocal["Prisma Client"]
        PrismaLocal --> SQLite[("SQLite: dev.db\nZero local installation\nPrisma Schema: schema.sqlite.prisma")]
    end
    subgraph Production["Slot 5: Production Deployment"]
        direction TB
        CodeProd["apps/api"] --> PrismaProd["Prisma Client"]
        PrismaProd --> Postgres[("Neon PostgreSQL\nManaged cloud database\nPrisma Schema: schema.postgres.prisma")]
    end
```

#### A. Local Development Checkpoints (Slots 1–4)
- **Engine:** **SQLite** (`file:./prisma/dev.db`).
- **Rationale:** Requires zero local daemon or Docker installation on student laptops. Operates identically across Windows, macOS, and Linux.
- **Schema Management:** Local schema `prisma/schema.sqlite.prisma`.
- **Reproducibility:** Seeded reproducibly via planned script `npm run db:seed` with standard task fixtures.

#### B. Production Cloud Deployment (Slot 5)
- **Engine:** **PostgreSQL 16** hosted on **Neon**.
- **Non-Destructive Transition Strategy:**
  1. *Schema Compatibility:* The domain models (`Task`) use strictly database-agnostic scalar types (`String`, `Boolean`, `DateTime`, `Int`) supported identically by SQLite and PostgreSQL.
  2. *Independent Migration Histories:* SQLite and PostgreSQL migration histories **must not be rewritten in place or treated as automatically interchangeable**. The repository maintains dedicated schema definitions:
     - `prisma/schema.sqlite.prisma` (provider = `sqlite`, used for local dev/testing)
     - `prisma/schema.postgres.prisma` (provider = `postgresql`, used for staging/production)
  3. *Environment Segregation:*
     - Development: `.env.development` (`DATABASE_URL="file:./prisma/dev.db"`)
     - Testing/CI: `.env.test` (`DATABASE_URL="file:./prisma/test.db"`)
     - Production: `.env.production` (`DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require"`)
  4. *Migration Rehearsal:* Before releasing Slot 5, CI executes `npx prisma migrate deploy --schema=prisma/schema.postgres.prisma` against a dedicated staging branch/database on Neon to verify migration syntax.
  5. *Rollback & Backup:* Neon provides instant copy-on-write database branching. Before deploying migrations, an automated snapshot/branch is created as a rollback target.
  6. *Connectivity Verification:* The `GET /health` endpoint issues an active `SELECT 1` query via `prisma.$queryRaw` to confirm live database connectivity before traffic routing.

*Note: In Phase P0, no database migrations or schemas have been executed. This is an architectural design.*

---

## 4. Security Architecture & Boundary Controls

### 4.1. Application Scope & Boundary Definitions

> [!IMPORTANT]
> **Authentication & Authorization Boundary Decision:**
> - **Slots 1–3 Baseline:** The Task Manager is a **single-user / team-shared workspace**. It requires **NO authentication**. All users access the shared task board directly.
> - **Slot 4 Security Exercise:** Demonstrates Broken Object Level Authorization (OWASP API1:2023 / IDOR) using an **isolated training fixture**.
> - **Production Scope (Slot 5):** Operates as a **single-tenant production application**. It **strictly forbids and rejects arbitrary client-supplied identity headers**.

### 4.2. Isolated Training Fixture (`simulated-auth.ts`)
In Slot 4 Lab 01 (Security Investigation) and Lab 03 (Bug Hunt Bug 4), students reproduce a vulnerability where User 2 deletes or edits User 1's tasks.

To reproduce this without building a fragile full-blown authentication provider:
1. **Fixture Isolation:** The header `X-User-Id` is parsed **exclusively within an isolated development/test fixture** (`src/fixtures/simulated-auth.ts`) on dedicated training branches (`checkpoint/slot-04-security-vulns`, `checkpoint/slot-04-bug-hunt`).
2. **Explicit Labeling:** The `X-User-Id` header is strictly classified as **SIMULATED TEST IDENTITY**, **NEVER AS AUTHENTICATION**. It provides mock caller context for vulnerability reproduction only.
3. **Hard Production Startup Safeguard:**
   ```typescript
   // apps/api/src/fixtures/simulated-auth.ts
   export function simulatedIdentityMiddleware(req: Request, res: Response, next: NextFunction) {
     if (process.env.NODE_ENV === 'production') {
       // HARD SECURITY HALT: Prevent execution in production
       return res.status(500).json({
         error: 'SECURITY CONFIGURATION ERROR: Simulated identity fixture is prohibited in production.'
       });
     }
     
     const rawHeader = req.header('x-user-id');
     req.simulatedUserId = rawHeader ? Number(rawHeader) : null;
     next();
   }
   ```
4. **Production Rejection:** In production (`NODE_ENV=production`), `apps/api` rejects or strips all incoming `X-User-Id` headers.
5. **Multi-User Production Specification (Future Extension):** If full multi-user isolation is added in future iterations, it must use server-validated authentication (e.g. signed HTTP-only session cookies or JWT verified against a server secret) with server-side ownership enforcement (`where: { id, userId: req.user.id }`).

---

## 5. Cross-Cutting Engineering Concerns [PLANNED]

### 5.1. Validation Architecture
- Both `apps/api` and `apps/web` import Zod validation schemas directly from `packages/shared`.
- API controllers validate `req.body` and `req.query` via middleware before invoking service layers.

### 5.2. Observability & Logging Architecture
- Development: Formatted console output for local debugging.
- Production: Machine-readable JSON logs via `pino`:
  ```json
  {"level":30,"time":1700000000000,"reqId":"req-1a2b","method":"GET","url":"/api/tasks","status":200,"responseTimeMs":12}
  ```
- Error logs capture stack traces server-side while clients receive sanitized messages (`{ "error": "Internal server error", "requestId": "req-1a2b" }`).

---

## 6. Technical Prerequisites for Instructors & Students

To successfully run and verify future implementation phases, the host environment must meet:

- **Runtime:** Node.js LTS (>= 20.12.0) and npm (>= 10.5.0)
- **Version Control:** Git (>= 2.40.0) with GitHub CLI (`gh`) recommended
- **Browser Automation:** Playwright Chromium (`npx playwright install chromium`)
- **Coding Agent:** Claude Code CLI (or compatible MCP host)
- **Security Scanners:** Semgrep CLI (`pip install semgrep` or Docker)
- **Cloud Accounts (Slot 5):** Vercel free tier, Render free tier, Neon free tier
- **Offline Fallback:** If internet access is unavailable during class, all Slot 1–4 demos run 100% offline using local SQLite and Vitest. Slot 5 includes an offline containerized simulation via local Docker Compose.
