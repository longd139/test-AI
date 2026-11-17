# Demo Day Readiness Checklist & Defense Guide (Slot 5)

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Milestone:** M4 (Final Project Submission & Oral Defense)  
> **Evaluation Format:** 7-minute Live Presentation & Demo + 5-minute Individual Oral Defense per team  
> **Total Score:** 100 Points (Evaluated against the Slot 5 Slide 20 Rubric)

---

## 1. Demo Day Format & Time Allocation (Slide 17)

Every team has strictly **12 minutes** total:

```
┌─────────────────────────────────────────────────────────────┬───────────────────────────┐
│              7 MINUTES — Presentation & Live Demo           │ 5 MINUTES — Individual Q&A │
├───────────────┬──────────────────────┬─────────────┬────────┼───────────────────────────┤
│ 1 MINUTE      │ 3 MINUTES            │ 2 MINUTES   │ 1 MIN  │ 5 MINUTES                 │
│ Problem & User│ Live Public Demo     │ AI Workflow │ Quality│ Every member answers      │
│ Target persona│ (NOT localhost)      │ Prompts,    │ CI,    │ individual engineering    │
│ & core value  │ Create, Edit, Filter │ agents, diff│ test,  │ questions on own code     │
│               │ & persist data       │ iterations  │ SAST   │                           │
└───────────────┴──────────────────────┴─────────────┴────────┴───────────────────────────┘
```

---

## 2. Pre-Flight Readiness Checklist

Complete every check at least 2 hours before your scheduled presentation:

### A. Repository & Release Deliverables
- [ ] Git release tag `v1.0` is tagged on the final commit of `main`.
- [ ] All working directories are clean; no uncommitted debug files or scratch scripts.
- [ ] `docs/final-report.md` completed (strictly maximum 6 pages).
- [ ] Presentation deck compiled (strictly maximum 8 slides).
- [ ] Confidential peer evaluation forms submitted by all team members.

### B. Live Infrastructure & Warm-Up
- [ ] Public Frontend URL is live on Vercel: `https://your-team-app.vercel.app`.
- [ ] Public Backend API is live on Render: `https://your-api.onrender.com`.
- [ ] Pre-warmed Render API by visiting `/health` to prevent cold-start delay during presentation.
- [ ] Confirmed `GET /health` returns HTTP 200 with `"database": "connected"`.
- [ ] Database contains clean, realistic seed data (no offensive or placeholder test strings).
- [ ] Browser cache cleared and presentation tab pre-opened.

### C. Live Demo Walkthrough (3 Minutes)
- [ ] Task Creation: Type a realistic task title, verify immediate appearance in UI.
- [ ] Task Modification: Edit title, toggle completion checkbox.
- [ ] Task Filtering: Switch between All, Active, and Completed filters.
- [ ] Data Persistence: Refresh browser tab (`F5`) and prove data was saved to cloud database.
- [ ] Input Validation Demonstration: Attempt to submit empty/whitespace title, prove friendly error appears without crashing.

### D. Quality & Security Evidence (1 Minute)
- [ ] Green GitHub Actions CI badge showing all tests, lint, and build passing.
- [ ] Automated test suite proof (100% test pass rate).
- [ ] Semgrep SAST scan evidence proving zero high-severity vulnerabilities.
- [ ] Live structured JSON log excerpt displayed in terminal or Render dashboard showing request ID and latency.

---

## 3. 100-Point Evaluation Rubric (Slide 20)

| Category | Max Points | Evaluation Criteria |
|:---|:---:|:---|
| **Product Value** | 15 | Does the application solve a real problem for the target user? Is the UX responsive, intuitive, and accessible? |
| **Spec & Context** | 10 | Quality of PRD, requirements, acceptance criteria, and agent steering context. |
| **Code & Workflow** | 15 | Clean monorepo structure, effective use of AI tools, readable commit history, controlled PRs. |
| **Testing & CI** | 15 | Unit, integration, and E2E coverage; automated GitHub Actions CI running on PRs. |
| **Security** | 10 | Input validation via shared Zod schemas, restricted CORS, sanitized error messages, Semgrep SAST rules. |
| **Deployment & Ops** | 10 | Live public URLs (Vercel + Render + Neon), active `/health` check, structured Pino logging, operational runbook. |
| **Automations** | 10 | Effective reusable workflows, subagents, and automated verification tools. |
| **Demo & Communication** | 15 | Clarity of presentation, adherence to 7-min time limit, persuasive defense during 5-min individual Q&A. |
| **TOTAL** | **100** | **Comprehensive Engineering Assessment** |

---

## 4. Anticipated Individual Defense Questions (Slide 19)

Instructors will ask targeted questions to verify genuine individual ownership:
1. *"What happens under the hood when the user clicks 'Save Task'?"*  
   *(Expected answer: Client validates input via shared Zod schema → sends POST /api/tasks with JSON body → backend validates body with same shared Zod schema → Prisma executes INSERT query into PostgreSQL → server returns 201 Created → React updates local state).*
2. *"Why is title validation implemented on both client and server?"*  
   *(Expected answer: Client validation provides instant user feedback and eliminates unnecessary network latency. Server validation is a mandatory security boundary because external clients or malicious actors can bypass the browser).*
3. *"Show a mistake the AI agent made during development and how you caught and fixed it."*  
   *(Expected answer: Refer to red-green test cycle, CI failure, or PR review finding where human identified subtle logic flaw that AI generated).*
4. *"If your production service returns HTTP 500 right now, what are the first three things you would check?"*  
   *(Expected answer: 1. Check GET /health to isolate database dependency status. 2. Inspect structured Pino JSON logs in Render for level 50 errors matching the user's reqId. 3. Review recent git deployments or environment variable changes).*
