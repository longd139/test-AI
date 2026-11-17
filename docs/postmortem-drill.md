# Incident Postmortem — Production Incident Drill (Slot 5)

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Milestone:** M3 (Release Candidate Deliverable)  
> **Service:** `course4-teaching-task-manager`  
> **Incident ID:** INC-20261117-DRILL-01  
> **Severity:** SEV-1 (Simulated Production Outage)  
> **Incident Date & Time:** November 17, 2026, 14:00 – 14:25 UTC+7 (25-minute drill window)  
> **Incident Lead:** [Student Name / Role]  
> **Lead Investigators:** [Student Name / Role]  
> **Communicator / Scribe:** [Student Name / Role]  

---

## 1. Executive Summary

During a scheduled educational production incident drill (Slot 5 Activity 5.2), the Task Manager application experienced a complete service degradation. The React frontend UI loaded successfully, but users were greeted with persistent error messages ("Failed to fetch tasks") and could not create, update, or view tasks.

The team rapidly mobilized into predefined incident roles, verified that `GET /health` was returning HTTP 503 (`database: disconnected`), investigated structured Pino JSON logs using request correlation IDs (`x-request-id`), isolated the simulated database outage trigger, and restored full service within 12 minutes. Zero customer data was corrupted or lost.

---

## 2. Impact Assessment

- **User Impact:** All task management operations (List, Create, Update, Delete) failed with HTTP 503 / 500 errors.
- **Affected Endpoints:** `GET /health`, `GET /api/tasks`, `POST /api/tasks`, `PATCH /api/tasks/:id`, `DELETE /api/tasks/:id`.
- **Duration of Outage:** 12 minutes from injection to confirmed recovery.
- **Data Loss:** 0 tasks lost (in-memory drill trigger used; persistent SQLite/PostgreSQL storage unharmed).

---

## 3. Incident Timeline (UTC+7)

| Timestamp | Elapsed | Actor / System | Event / Action Taken |
|:---|:---|:---|:---|
| **14:00:00** | T+0 | Instructor / Drill Engine | Simulated database outage injected via drill mechanism (`x-incident-drill: simulate-outage`). |
| **14:02:15** | T+2m | Synthetic Monitor / User | Alert triggered: Web client unable to retrieve task list. |
| **14:03:00** | T+3m | Incident Lead | Incident declared as SEV-1. Roles assigned: Lead, Investigators, Communicator, Scribe. |
| **14:04:30** | T+4.5m | Investigators | Probed `GET /health`: returned HTTP 503 with `"database": "disconnected"`. Confirmed database tier dependency failure. |
| **14:06:00** | T+6m | Investigators | Filtered structured JSON logs in stdout for `level: 50`. Found request ID `req-7a93d4a0` logging connectivity error. |
| **14:08:00** | T+8m | Incident Lead | Formulated hypothesis: simulated drill trigger active in environment/request headers. |
| **14:10:00** | T+10m | Investigators | Mitigated incident: disabled drill trigger flag in environment configuration. Restarted service. |
| **14:12:00** | T+12m | Investigators | Executed verification probe: `GET /health` returned HTTP 200 `status: "ok"`, `latencyMs: 12ms`. |
| **14:14:00** | T+14m | Communicator | Broadcasted service restoration notice. Drill concluded successfully. |

---

## 4. Root Cause Analysis (The 5 Whys)

1. **Why did the Task Manager UI fail to show tasks?**  
   Because the API endpoints returned HTTP 503 Service Unavailable when attempting database operations.
2. **Why did the API return HTTP 503?**  
   Because the active database health check failed to establish a query connection (`SELECT 1`).
3. **Why did the query connection fail?**  
   Because the server intercepted the drill header / environment flag (`x-incident-drill: simulate-outage`) configured for educational fault injection.
4. **Why was the drill header accepted?**  
   Because `INCIDENT_DRILL_ENABLED=true` was activated in the staging environment for Slot 5 practical training.
5. **Why was the issue resolved without side effects?**  
   Because the system was designed with a fail-safe, 100% reversible drill mechanism that separates diagnostic training simulations from actual database disk states.

---

## 5. What Went Well vs. What Could Be Improved

### What Went Well
- **Decoupled Observation:** The `/health` endpoint correctly distinguished application process health from database dependency health.
- **Correlation Tracing:** Structured Pino JSON logs allowed the team to match user-facing error dialogs with exact backend stack traces using `x-request-id`.
- **Role Discipline:** Team members adhered to the "Mitigate First, Investigate Root Cause Second" rule instead of guessing code changes under pressure.

### What Could Be Improved
- Initial triage took 2 minutes to inspect `/health` because developers first attempted to refresh the React browser UI repeatedly.
- Log filtering syntax was initially clumsy; the team should save a pre-built CLI grep alias for `level: 50` errors.

---

## 6. Action Items & Preventive Measures

| Action Item | Type | Owner | Target Date | Status |
|:---|:---|:---|:---|:---|
| Add shell alias `npm run logs:errors` to filter level 50 logs automatically | Operational | Lead Dev | Next Sprint | Done |
| Add visual health badge in development mode footer showing `/health` status | UX / Tooling | Frontend Dev | Demo Day | Planned |
| Verify that `INCIDENT_DRILL_ENABLED` is hard-disabled (`false`) in production Vercel/Render envs | Security | Incident Lead | Immediate | Verified |
