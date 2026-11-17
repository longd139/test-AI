# Lab 01 Security Investigation Report — Verified Baseline

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 4:** Secure AI Code, Human vs AI Code Review & Debugging  
> **Status:** Verified Deliverable for Lab 01 (SAST & SCA Remediation)

---

## 1. Executive Summary

This report documents the security audit and triage of the Course 4 Task Manager training infrastructure. Three verified security vulnerabilities were identified, triaged, and remediated with automated regression tests:
1. **Broken Object-Level Authorization (IDOR)** in simulated identity training endpoints.
2. **Information Disclosure** via unhandled database exception strings in HTTP error responses.
3. **Instruction Confusion (Indirect Prompt Injection)** when passing untrusted user task titles into LLM prompt templates.

---

## 2. Vulnerability Findings & Triage

| ID | Vulnerability | Severity | Classification | Status | Regression Test |
|---|---|:---:|---|:---:|---|
| **VULN-01** | Missing Ownership Check on Task Deletion | High | OWASP API1:2023 Broken Object Level Authorization | **REMEDIATED** | `tests/security/ownership.test.ts` |
| **VULN-02** | Raw Database Exception Disclosed in 503 Response | Medium | OWASP Top 10 A05:2021 Security Misconfiguration | **REMEDIATED** | `apps/api/tests/api.test.ts` |
| **VULN-03** | Prompt Injection via Task Title Input | High | OWASP Top 10 for LLM: LLM01 Prompt Injection | **REMEDIATED** | `tests/security/prompt-injection.test.ts` |

---

## 3. Detailed Fix Explanations

### 3.1. Remediation of VULN-01 (IDOR)
- **Root Cause:** The endpoint accepted a simulated `X-User-Id` header but deleted tasks strictly by `taskId` without asserting `task.ownerId === callerId`.
- **Fix:** Implemented fail-closed check returning `403 Forbidden` (`OWNERSHIP_CHECK_FAILED`) when the caller is not the owner.
- **Architectural Safeguard:** Confirmed `assertSafeEnvironment()` terminates startup if this training fixture is activated in production (`NODE_ENV === 'production'`).

### 3.2. Remediation of VULN-02 (Information Disclosure)
- **Root Cause:** `res.status(503).json({ error: String(err) })` leaked SQLite filesystem paths and driver error messages to clients.
- **Fix:** Logged raw diagnostic error to server console (`console.error('[Health Check Failure]')`) and returned a fixed, sanitized JSON object `{ status: 'error', database: 'disconnected', message: 'Database connection unavailable' }`.

### 3.3. Remediation of VULN-03 (Instruction Confusion)
- **Root Cause:** Untrusted user input was concatenated directly into system instructions without boundary delimiters.
- **Fix:** Implemented XML `<user_data>` tags, sanitized breakout attempts, and serialized task titles into a JSON envelope.

---

## 4. Verification Check
- **Automated Regression Suite:** 52/52 tests passing.
- **Dependency Audit:** SCA report recorded via `npm run security:audit`.
- **Semgrep Rules:** Rules configured in `.semgrep.yml` and verified in CI workflow `.github/workflows/security.yml`.
