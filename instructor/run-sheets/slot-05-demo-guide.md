# Slot 5 Instructor Run Sheet & Demo Guide

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot:** Slot 5 — Production Deployment, Incident Response & Final Demo Day  
> **Source Slides:** `SLOT 5 - 4 HOURS.pptx` (23 Slides)  
> **Duration:** 4 Hours (240 Minutes)

---

## 1. Slot 5 Timeline & Teaching Progression

| Window | Duration | Slide Range | Activity / Topic | Pedagogical Goal |
|:---|:---:|:---:|:---|:---|
| **00:00–00:40** | 40 min | Slides 01–07 | From Localhost to Internet & Production Configuration | Explain 12-factor configuration, secrets isolation, and fail-fast validation. |
| **00:40–01:15** | 35 min | Slide 08 | **Activity 5.1: Cloud Deployment & Observability** | Students deploy to Vercel/Render/Neon; verify live public URLs. |
| **01:15–01:45** | 30 min | Slides 09–11 | Production Observability & Health Checks | Demonstrate `GET /health`, structured Pino logs, and request correlation. |
| **01:45–02:10** | 25 min | Slides 12–15 | **Activity 5.2: Live Incident Drill & Postmortem** | Instructor injects simulated outage; students triage and document. |
| **02:10–02:20** | 10 min | — | *Break & Final Demo Day Setup* | Pre-warm instances, verify display outputs, check public links. |
| **02:20–03:50** | 90 min | Slides 16–21 | **Assessment 5.3: Demo Day Presentations & Defense** | 7-min demo + 5-min Q&A per team against 100-point rubric. |
| **03:50–04:00** | 10 min | Slides 22–23 | The Future Software Engineer & Course Wrap-up | Systems thinking, product judgment, and engineer responsibility. |

---

## 2. Instructor Live Demos

### Demo 1: Public URL Verification & Fail-Fast Configuration (Slide 08)
- **Objective:** Show students how a production application behaves differently from local development.
- **Script:**
  1. Open the deployed application in a private browser window. Show that `https://...vercel.app` connects to `https://...onrender.com`.
  2. Open Developer Tools Network tab: filter for Fetch/XHR. Show that requests carry `x-request-id` response headers.
  3. Show Render dashboard environment variables: point out `DATABASE_URL` is a reference, not hardcoded in code.
  4. Deliberately remove `DATABASE_URL` in a temporary test container and show immediate startup crash with:
     `[FATAL CONFIGURATION ERROR] Application failed to start due to invalid environment variables: - DATABASE_URL: is required`.
  5. Emphasize: *Fail fast at startup is 100x better than silently failing at 2 AM when a user makes a request.*

### Demo 2: Observability & Health Checks (Slide 10)
- **Objective:** Teach students how to monitor systems via structured telemetry.
- **Script:**
  1. Run in terminal: `curl -i http://localhost:3000/health`.
  2. Point out the JSON response:
     ```json
     {
       "status": "ok",
       "database": "connected",
       "latencyMs": 12,
       "uptime": 345.1,
       "reqId": "req-7bd2a6ec"
     }
     ```
  3. Switch to terminal stdout: show the structured Pino JSON log line emitted simultaneously:
     `{"level":30,"time":1794891822447,"msg":"request completed","reqId":"req-7bd2a6ec","method":"GET","url":"/health","status":200,"responseTimeMs":7}`.
  4. Explain: *Cloud log viewers (Render, Datadog, CloudWatch) index these JSON keys automatically, allowing instant filtering by `status >= 500` or `reqId`.*

### Demo 3: Live Incident Drill Facilitation (Slide 15)
- **Objective:** Conduct a controlled, high-engagement incident drill.
- **Facilitation Steps:**
  1. Announce: *"Production is down. Users are complaining that tasks have vanished. Triage starts now. 25 minutes on the clock."*
  2. Activate drill trigger in staging/demo environment:
     ```bash
     curl -H "x-incident-drill: simulate-outage" http://localhost:3000/health
     ```
  3. Observe team dynamics: ensure teams assign the 4 roles (Incident Lead, Investigators, Communicator, Scribe).
  4. Guide teams if they panic: remind them of Slide 13 (*Mitigate First, Investigate Root Cause Second*). Check `/health` first!
  5. Once the team identifies the simulated trigger, restore the service by removing the drill flag.
  6. Confirm recovery: `GET /health` returns 200 OK.
  7. Have teams immediately complete `docs/postmortem-drill.md`.

---

## 3. Demo Day Judging & Defense Guide (Slide 19)

During the 5-minute individual Q&A, target questions to different roles:

- **For Frontend Developer:**
  *"When a user submits an empty task, where is it caught first? Why do we also validate it on the server?"*
- **For Backend Developer:**
  *"Explain how Prisma connects to Neon PostgreSQL. What is connection pooling and why is it needed for serverless?"*
- **For AI/DevOps Engineer:**
  *"What prompt or workflow did you use to generate the Playwright E2E tests? Where did the AI hallucinate, and how did you detect it?"*
- **For QA/Security Lead:**
  *"Show the Semgrep rule you configured. How does it prevent IDOR or prompt injection attacks in future PRs?"*

**Scoring Reminder:** Award points strictly based on demonstrated ownership. If a student cannot explain a line of code in their repository, deduct points from *Code & Workflow* and *Demo & Communication*.
