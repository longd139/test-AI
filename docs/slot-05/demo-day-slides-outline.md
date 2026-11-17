# Demo Day Slide Deck Outline (Milestone M4)

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Presentation Duration:** Strictly 7 Minutes (followed by 5-minute individual Q&A)  
> **Slide Constraint:** Strictly maximum 8 slides.

---

### Slide 1: Title & Team
- **Title:** Course 4 Teaching Task Manager — Production-Grade Web Platform
- **Subtitle:** From Specification to Cloud Deployment with Autonomous AI Engineering
- **Team Members & Roles:** [Name 1 (Lead), Name 2 (Backend), Name 3 (Frontend), Name 4 (Security/QA)]
- **Release Tag:** `v1.0` | **Public Web:** `https://your-team-app.vercel.app`

---

### Slide 2: Problem & Target User (1 Minute)
- **The Problem:** Modern engineering teams need reliable task tracking without heavy bloated tools, requiring fast local execution with guaranteed server-side consistency.
- **Target Persona:** Developers and project leads needing rapid task creation, keyboard shortcuts, and verified data persistence.
- **Engineering Mission:** Build and operate a real cloud-deployed application adhering to the 12-factor methodology, driven by modern AI workflows.

---

### Slide 3: Architecture & Tech Stack
- **Architecture Diagram:** Monorepo (npm workspaces) separating `packages/shared`, `apps/api`, `apps/web`.
- **Frontend Tier:** React 18, TypeScript, Tailwind CSS (Vercel).
- **Backend Tier:** Express, Node.js, Prisma ORM, Fail-Fast Zod configuration, Pino structured logging (Render).
- **Database Tier:** Serverless PostgreSQL 16 with connection pooling (Neon).
- **Contract:** Shared Zod schemas ensuring zero divergence between client and server validation.

---

### Slide 4: Live Product Demonstration (3 Minutes)
- **Live Action 1:** Open public Vercel URL (prove it is running on the internet, not localhost).
- **Live Action 2:** Create a new task with real business title; demonstrate immediate rendering.
- **Live Action 3:** Edit title, toggle completion, demonstrate dynamic filter tabs (All / Active / Completed).
- **Live Action 4 (Persistence):** Refresh browser tab to prove database round-trip via Neon PostgreSQL.
- **Live Action 5 (Validation):** Submit whitespace-only title; show user-friendly validation error without crash.

---

### Slide 5: How We Built It with AI (2 Minutes)
- **Specification-First Prompting:** Prompting AI with exact Zod schemas and PRD acceptance criteria rather than vague feature descriptions.
- **Agent Steering & Context Management:** Using `AGENTS.md` to restrict AI edits to single-file scopes, preventing hallucinated architectural drifts.
- **Iterative Red-Green Feedback Loop:** Feeding Vitest test failures back into the agent to produce targeted, verifiable bug fixes.
- **Human-First, AI-Second Review:** Humans verify business logic and edge cases; AI assists in syntax and linting checks.

---

### Slide 6: Quality, Testing & CI/CD Pipeline (1 Minute)
- **Automated Test Suite:** 64 automated tests passing (100% pass rate) across unit, integration, and E2E tiers.
- **Playwright E2E:** Full headless browser automation testing real user flows and keyboard navigation.
- **GitHub Actions CI:** Automated pull request gate running typecheck (`tsc --noEmit`), lint, unit tests, and E2E specs on every push.

---

### Slide 7: Security Defenses & Incident Operations
- **Static Application Security Testing (SAST):** Semgrep rules preventing IDOR, sensitive exception leaks, and XSS.
- **Prompt Injection Defense:** Strict XML tags (`<user_data>`), length limits, and breakout tag neutralization.
- **Observability in Action:** Real-time structured Pino JSON logs with correlation `x-request-id` and active `GET /health` database monitoring.
- **Incident Readiness:** Operational runbook (`docs/runbook.md`) and verified 12-minute service recovery during simulated database outage drill.

---

### Slide 8: Engineering Reflections & Key Takeaways
- **Key Takeaway 1:** AI can write code rapidly, but engineering rigor (testing, typing, CI/CD) is what makes it reliable.
- **Key Takeaway 2:** Code you cannot explain is not demonstrated ownership.
- **Key Takeaway 3:** Single-tenant zero-auth boundaries keep baseline apps maintainable; security must be fail-closed by default.
- **Next Steps:** Multi-tenant organization support and automated webhook notifications.
