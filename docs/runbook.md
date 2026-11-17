# Production Operational Runbook — Course 4 Task Manager

> **Service:** `course4-teaching-task-manager`  
> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Milestone:** M3 (Release Candidate Deliverable)  
> **Target Audience:** DevOps, Incident Responders, Software Engineers  
> **Primary SLA:** Health Check 200 OK, Latency p95 < 500ms, Error rate < 1%

---

## 1. System Overview & Architecture

The Course 4 Teaching Task Manager is a 12-factor production-oriented web application consisting of:
- **Frontend SPA:** React 18, TypeScript, Vite, Tailwind CSS (Hosted on Vercel or local static server).
- **Backend API:** Node.js, Express, TypeScript (Hosted on Render or local container).
- **Database:** Serverless PostgreSQL 16 on Neon (or local SQLite for dev/test).
- **Observability:** Pino-compatible structured JSON logs to stdout with correlation `x-request-id`, active dependency health checks on `/health`.

```
[Browser Client] 
      │ (HTTPS / CORS Restricted)
      ▼
[Frontend: Vercel] ──(API Requests + x-request-id)──► [Backend API: Render]
                                                              │ (Prisma ORM)
                                                              ▼
                                                    [Database: Neon PostgreSQL]
```

---

## 2. Health & Diagnostic Endpoints

### 2.1. GET /health
Used by cloud uptime monitors, load balancers, and on-call engineers.

**Normal Healthy Response (HTTP 200 OK):**
```json
{
  "status": "ok",
  "database": "connected",
  "latencyMs": 14,
  "uptime": 12845.2,
  "timestamp": "2026-11-17T12:00:00.000Z",
  "environment": "production",
  "reqId": "req-9a1b2c3d"
}
```

**Degraded / Unhealthy Response (HTTP 503 Service Unavailable):**
```json
{
  "status": "error",
  "database": "disconnected",
  "message": "Database connection unavailable",
  "timestamp": "2026-11-17T12:00:00.000Z",
  "reqId": "req-9a1b2c3d"
}
```

---

## 3. Incident Severity Levels & Roles (Slot 5 Slide 15)

| Severity | Definition | Response Target | Example |
|:---|:---|:---|:---|
| **SEV-1 (Critical)** | Core service completely down; users cannot view or manage tasks. | < 15 minutes | Database connection pool exhausted; API returning 503. |
| **SEV-2 (Major)** | Major functionality impaired; workarounds exist. | < 1 hour | Tasks load, but creation fails due to validation or DB lock. |
| **SEV-3 (Minor)** | Minor issue or aesthetic degradation; service operational. | < 24 hours | Latency spike under burst traffic; CORS warning on non-critical asset. |

### Incident Response Roles
1. **Incident Lead (Commander):** Owns incident triage, prioritizes service recovery over root-cause investigation, authorizes rollbacks or emergency patches.
2. **Investigators (Engineers):** Inspect structured logs (`stdout`), check `/health`, correlate requests via `reqId`, formulate testable hypotheses.
3. **Communicator:** Posts status updates to stakeholders (e.g. "Investigating degraded database connection", "Service restored").
4. **Scribe:** Records timeline of events, alerts, commands executed, and recovery confirmation for the postmortem.

---

## 4. Standard Incident Triage Procedure (Slide 13: Mitigate First, Investigate Second)

```
   [ALARM / USER REPORT]
             │
             ▼
   [1. Assess & Verify] ───► Check GET /health & Live Public URL
             │
             ▼
   [2. Mitigate Immediately]
        ├── Broken Configuration? ──► Correct env var in Render/Vercel dashboard
        ├── Failed Deployment?    ──► Rollback to previous Git release tag / commit
        └── DB Outage?            ──► Check Neon dashboard & restore branch snapshot
             │
             ▼
   [3. Verify Recovery] ───► Confirm GET /health returns 200 OK (< 50ms DB latency)
             │
             ▼
   [4. Root-Cause Analysis] ──► Inspect structured logs via reqId, write postmortem
```

---

## 5. Specific Triage Playbooks

### Playbook A: GET /health returns HTTP 503 (Database Disconnected)
1. **Symptoms:** Web UI loads, but task board shows "Failed to load tasks". `/health` returns `status: "error"`, `database: "disconnected"`.
2. **Immediate Checks:**
   - Open hosting log viewer (Render/stdout). Filter for `level: 50` (Error) or `msg: "Health Check Failure"`.
   - Verify `DATABASE_URL` environment variable in hosting dashboard:
     - Is the connection string present?
     - Does it include `?sslmode=require` for Neon?
     - Has the Neon database reached compute pause or connection limit?
3. **Mitigation:**
   - In Neon dashboard, verify compute endpoint is `Active` (unpause if idle).
   - If credentials expired or connection string changed, update `DATABASE_URL` in Render environment settings and trigger manual deploy.
   - If an incident drill was triggered (`INCIDENT_DRILL_ENABLED=true`), ensure `x-incident-drill` header or `SIMULATE_DB_OUTAGE` flag is disabled.
4. **Verification:**
   - Execute: `curl -i https://<your-api-url>/health`
   - Confirm status code is `200 OK` and `database: "connected"`.

---

### Playbook B: CORS Blocked (Origin Not Permitted)
1. **Symptoms:** Browser console displays `Access to fetch at '<api-url>' from origin '<web-url>' has been blocked by CORS policy`.
2. **Immediate Checks:**
   - Inspect Render API environment variable `CORS_ORIGIN`.
   - Compare with exact browser origin (protocol + domain + port, e.g. `https://my-team-app.vercel.app`).
   - Look for trailing slashes: `https://my-team-app.vercel.app/` will fail exact matching with `https://my-team-app.vercel.app`.
3. **Mitigation:**
   - Update `CORS_ORIGIN` in Render to match the Vercel frontend domain exactly:
     ```bash
     CORS_ORIGIN="https://my-team-app.vercel.app"
     ```
   - Restart the API service.
4. **Verification:**
   - Perform request with Origin header:
     ```bash
     curl -I -H "Origin: https://my-team-app.vercel.app" https://<your-api-url>/health
     ```
   - Confirm response includes `Access-Control-Allow-Origin: https://my-team-app.vercel.app`.

---

### Playbook C: Server Crashes on Startup (Fail-Fast Configuration Halt)
1. **Symptoms:** Deployment fails during boot. Render service stays in `Crashing` or `Exited` status.
2. **Immediate Checks:**
   - Inspect the first 20 lines of deployment stdout.
   - Look for `[FATAL CONFIGURATION ERROR] Application failed to start due to invalid environment variables:`
3. **Mitigation:**
   - Review diagnostic printout indicating which variable failed Zod validation:
     - Missing `DATABASE_URL`
     - Invalid `PORT` (must be integer 1–65535)
     - `CORS_ORIGIN="*"` (strictly forbidden in production mode)
   - Set the required variables in dashboard and re-deploy.

---

## 6. Safe & Reversible Incident Drill Procedure (Slide 15)

To prepare teams for live incident response without risking data loss:
1. **Pre-requisite:** In staging/drill environment, set `INCIDENT_DRILL_ENABLED=true`.
2. **Trigger Drill:**
   ```bash
   # Inject simulated database outage
   curl -H "x-incident-drill: simulate-outage" http://localhost:3000/health
   ```
3. **Expected Result:** API returns HTTP 503 `Database connection unavailable (Simulated incident drill)`.
4. **Drill Recovery (Reversible):**
   ```bash
   # Normal probe without drill header
   curl http://localhost:3000/health
   ```
5. **Expected Result:** API immediately returns HTTP 200 `status: "ok"`, `database: "connected"`.
