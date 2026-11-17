# Slot 5 Student Practical Guide & Activities

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot:** Slot 5 — Production Deployment, Incident Response & Final Demo Day  
> **Prerequisites:** Approved Slot 4 baseline with passing test suites and security scans.

---

## Activity 5.1: Cloud Deployment & Production Observability (35 Minutes)

### 1. Objective
Deploy your Task Manager application to the cloud, configure external environment variables, enforce restricted CORS, and verify production observability with structured JSON logs.

### 2. Pre-Requisites
- GitHub repository with green CI status on `main`.
- Free accounts on **Neon** (Database), **Render** (API), and **Vercel** (Frontend).
- Zero local dependencies or daemon requirements.

### 3. Step-by-Step Instructions
1. **Provision Neon PostgreSQL:**
   - Create a free project on Neon Console. Copy the pooled connection string (`?sslmode=require`).
   - Run `npm run db:generate:postgres` locally to verify schema syntax.
2. **Deploy API on Render:**
   - Create a Web Service pointing to your GitHub repo.
   - Set environment variables in the Render dashboard:
     - `NODE_ENV=production`
     - `DATABASE_URL=<your-neon-url>`
     - `CORS_ORIGIN=https://<your-team-app>.vercel.app`
     - `PORT=10000`
   - Trigger deployment and record the public API URL: `https://<your-api>.onrender.com`.
3. **Deploy Web SPA on Vercel:**
   - Import repo in Vercel with root directory set to `apps/web`.
   - Set environment variable: `VITE_API_URL=https://<your-api>.onrender.com`.
   - Deploy and note your public frontend URL: `https://<your-team-app>.vercel.app`.
4. **Verification & Observability:**
   - Test `GET /health` on your public API URL. Ensure HTTP 200 with `"database": "connected"`.
   - Open Render log viewer: verify that incoming requests output structured JSON with `reqId`, `method`, `status`, and `responseTimeMs`.
   - Complete the **Public URL Verification Checklist** in `docs/slot-05/deployment-guide.md`.

---

## Activity 5.2: Production Incident Response & Postmortem Drill (25 Minutes)

### 1. Objective
Practice disciplined incident triage under pressure: mitigate service first, investigate root cause second, and document findings in a blameless postmortem.

### 2. The Scenario (Slide 12: WHEN PRODUCTION BREAKS)
> *The instructor or lead engineer simulates a production degradation. The frontend UI loads, but tasks no longer appear, and new tasks cannot be saved.*

### 3. Procedure & Incident Roles (Slide 15)
Divide your team into four roles:
- **Incident Lead:** Coordinates response, decides on rollback or config fix.
- **Investigators (2 engineers):** Inspect `/health`, query structured logs, isolate error code.
- **Communicator:** Drafts status updates to users/stakeholders.
- **Scribe:** Records exact timeline for the postmortem.

### 4. Triage Protocol
1. **Assess Immediately:** Probe `GET /health`. Does it return HTTP 503 with `"database": "disconnected"`?
2. **Mitigate First:**
   - Review recent deployments or configuration changes.
   - If an incident drill was triggered (`x-incident-drill: simulate-outage`), disable the drill trigger or revert faulty config.
3. **Verify Restoration:** Confirm `/health` returns HTTP 200 and web UI can create/view tasks again.
4. **Document Postmortem:** Use the template in `docs/postmortem-drill.md` to record timeline, root cause (5 Whys), and preventive action items.

---

## Summative Assessment 5.3: Demo Day Presentation & Defense (Milestones M3 & M4)

### 1. Deliverables Checklist
- [ ] Git release tag `v1.0` tagged on final commit of `main`.
- [ ] Live public frontend and backend URLs documented in `README.md`.
- [ ] `docs/runbook.md` (Operational Runbook).
- [ ] `docs/postmortem-drill.md` (Completed drill postmortem).
- [ ] `docs/final-report.md` (Maximum 6 pages).
- [ ] Demo presentation slides (Maximum 8 slides).
- [ ] Confidential peer evaluations submitted.

### 2. Presentation Timing (Strictly 7 Minutes + 5 Minutes Defense)
- **1 Min:** Problem & Target User Persona.
- **3 Min:** Live Product Demo on public production URL (NOT localhost).
- **2 Min:** How We Built It With AI (Prompts, Agent Steering, Diff Iterations).
- **1 Min:** Quality & Security Evidence (CI badge, 100% test pass rate, SAST scan).
- **5 Min:** Individual Oral Defense (every member defends their own code).
