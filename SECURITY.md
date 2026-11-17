# Security Policy & AI Agent Engineering Rules

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 4:** Secure AI Code, Human vs AI Code Review & Debugging  
> **Status:** Educational Security Policy & Architectural Safety Boundaries

---

## 1. Architectural Security Boundaries

The `course4-teaching-task-manager` repository implements deliberate architectural boundaries to balance educational live demonstrations with production safety:

### 1.1. Baseline Scope (Slots 1–3)
- The baseline Task Manager is strictly a **single-user system**.
- **No authentication** is present or claimed in the baseline application.
- All requests are treated as coming from the local operator.

### 1.2. Simulated Identity Training Fixture (`X-User-Id` Rule)
- An isolated training fixture exists solely for Slot 4 educational exercises (e.g. demonstrating IDOR / broken access control).
- **NON-NEGOTIABLE RULE:** `X-User-Id` is **never** considered authentication. It is an untrusted test header used to simulate caller identity in training fixtures.
- **Boot Assertion:** Any simulated identity fixture is guarded by a hard boot-time assertion `assertSafeEnvironment()` that immediately aborts process startup if `NODE_ENV === 'production'`.
- The production application (`apps/api`) completely ignores and strips `X-User-Id` from client requests.

---

## 2. AI Coding Agent Security Rules (Slide 11)

When working on this codebase, all AI agents (Claude Code, Cursor, Antigravity) must strictly adhere to the **Three Rules of AI-Native Engineering**:

1. **Rule 1: Never Trust Client-Supplied Identity as Authentication**
   - Do not implement authorization checks based solely on arbitrary HTTP headers.
   - Any multi-user feature must use cryptographically signed tokens or verified session stores.

2. **Rule 2: Never Let Untrusted Data Become Executable Instructions (Prompt Injection Defense)**
   - Delimit and sanitize all user input before passing it into LLM contexts or HTML templates.
   - Use strict Zod schemas with character limits (`max(120)`) and trimmed inputs.

3. **Rule 3: Enforce Fail-Closed Defaults & Information Sanitization**
   - Catch blocks in HTTP endpoints must log full technical error diagnostics server-side only.
   - Client responses for 500/503 errors must be sanitized (e.g. `Database connection unavailable`) with zero stack traces, filesystem paths, or raw SQL queries disclosed.

---

## 3. Automated Security Scanning

This repository integrates automated security workflows:
- **Software Composition Analysis (SCA):** `npm run security:audit` scans dependencies for known CVEs.
- **Static Application Security Testing (SAST):** `.semgrep.yml` defines custom rules scanning for AI coding antipatterns (missing ownership checks, raw exception leaks, unbounded inputs).
- **CI Enforcement:** Automated security scans execute in `.github/workflows/security.yml` on every pull request.
