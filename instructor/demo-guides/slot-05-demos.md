# Slot 5 Instructor Demo Guide — Cloud Deployment, Observability & Incident Drill

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Source Deck:** `SLOT 5 - 4 HOURS.pptx` (23 Slides)  
> **Starting Checkpoint:** `checkpoint/slot-05-start`  
> **Ready Checkpoint:** `checkpoint/slot-05-ready`

---

## DEMO-5.1: Deployed Task Manager on Public Cloud

- **Slide Reference:** `SLOT 5` Slide 08 ("LIVE DEMO: DEPLOYED TASK MANAGER")
- **Category:** Explicit Slide Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Show the application running in production on public cloud infrastructure (Vercel + Render + Neon PostgreSQL), proving it works beyond localhost.
- **Reference Files:** `docs/slot-05/deployment-guide.md`, `prisma/schema.postgres.prisma`.
- **Prerequisites:** Public deployed instance (or live local simulation if offline/network restricted).
- **Manual Instructor Participation Required:** Yes (navigating to public URL or local staging, creating task, refreshing).

### Execution Steps
1. **Open Public Frontend URL:**
   - Navigate to `https://<your-team-app>.vercel.app` (or local production rehearsal `http://localhost:5173`).
   - Point out that frontend and backend communicate via HTTPS and restricted CORS.
2. **Execute Full User Flow on Cloud:**
   - Create task: "Prepare Demo Day slide deck".
   - Toggle completion.
   - Refresh browser tab (`F5`) to prove database round-trip via Neon PostgreSQL.
3. **Show Environment Variable Separation (Slide 06):**
   - Show Render dashboard: `DATABASE_URL` is configured securely in the hosting dashboard.
   - Open repository `.env.example`: show that only placeholder dummy values are checked into Git.

---

## DEMO-5.2: Health Check & Structured Pino Logging Observability

- **Slide Reference:** `SLOT 5` Slide 10 ("Know Whether Your System Is Healthy")
- **Category:** Supplementary Planned Demo
- **Allocated Time:** 15 minutes
- **Learning Objective:** Demonstrate production observability: machine-readable JSON logs with correlation request IDs (`x-request-id`), active database dependency monitoring on `/health`, and sanitized error responses.
- **Reference Files:** `apps/api/src/logger.ts`, `apps/api/src/app.ts`.
- **Manual Instructor Participation Required:** Yes (running curl commands, inspecting stdout logs).

### Execution Steps
1. **Query Active Health Check:**
   ```bash
   curl -i http://localhost:3000/health
   ```
   *Expected Output (HTTP 200 OK):*
   ```json
   {
     "status": "ok",
     "database": "connected",
     "latencyMs": 8,
     "uptime": 142.5,
     "timestamp": "2026-11-17T12:00:00.000Z",
     "environment": "development",
     "reqId": "req-b5a48c15"
   }
   ```
2. **Inspect Structured Pino JSON Log Line in Terminal:**
   - Show stdout:
     `{"level":30,"time":1794891807774,"msg":"request completed","reqId":"req-b5a48c15","method":"GET","url":"/health","status":200,"responseTimeMs":8}`
   - Explain how log collectors parse `status`, `responseTimeMs`, and `reqId`.
3. **Demonstrate Sanitized Error Response (Zero Stack Leakage):**
   ```bash
   curl -i http://localhost:3000/api/tasks/non-existent-uuid
   ```
   - Show that client receives: `{ "error": "Task not found" }`.
   - Point out that internal database paths (`/prisma/dev.db`) and Prisma internals are never exposed to the client.

---

## DEMO-5.3: Live Production Incident Response Drill

- **Slide Reference:** `SLOT 5` Slide 15 ("LIVE INCIDENT DRILL") & Slides 12–14
- **Category:** Explicit Slide Drill
- **Allocated Time:** 20 minutes
- **Learning Objective:** Lead students through disciplined incident triage: mitigate first, investigate root cause second, restore service, and write a blameless postmortem.
- **Reference Files:** `docs/runbook.md`, `docs/postmortem-drill.md`.
- **Manual Instructor Participation Required:** Yes (injecting fault, guiding student investigation, verifying recovery).

### Execution Steps
1. **Inject Simulated Database Outage (Safe & Reversible):**
   ```bash
   # Probe /health with incident drill header
   curl -i -H "x-incident-drill: simulate-outage" http://localhost:3000/health
   ```
   *Expected Output (HTTP 503 Service Unavailable):*
   ```json
   {
     "status": "error",
     "database": "disconnected",
     "message": "Database connection unavailable (Simulated incident drill)"
   }
   ```
2. **Follow Operational Runbook (`docs/runbook.md`):**
   - Step 1 (Assess): Confirm `/health` is reporting `database: disconnected`.
   - Step 2 (Mitigate): In live cloud, inspect recent deployment diffs or environment variables.
   - Step 3 (Root Cause): Check structured logs for `level: 50`.
3. **Restore Service (100% Reversible):**
   ```bash
   # Remove drill header
   curl -i http://localhost:3000/health
   ```
   - Status returns immediately to HTTP 200 OK `database: connected`.
4. **Postmortem Wrap-up:**
   - Open `docs/postmortem-drill.md`.
   - Review the 5 Whys and action items with students.
