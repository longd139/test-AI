# Security Vulnerability Investigation & Remediation Report (Template)

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 4 Lab 01 Deliverable**  
> **Student / Team Name:** `[Your Name / Team]`  
> **Date:** `[YYYY-MM-DD]`  
> **Target Branch:** `checkpoint/slot-04-security-vulns`

---

## 1. Executive Summary

This report documents the security audit, vulnerability triage, and remediation executed using SAST (`Semgrep`) and SCA (`npm audit`) scanning tools.

---

## 2. Vulnerability Triage Matrix

| Vuln ID | Title & OWASP Category | Affected File & Lines | Severity | True Positive? | Remediation Summary |
|:---:|---|---|:---:|:---:|---|
| **VULN-01** | Broken Object-Level Authorization (IDOR) | `apps/api/src/fixtures/simulated-ownership.ts:80-92` | High | Yes | Added fail-closed ownership check `task.ownerId !== callerId` returning HTTP 403. |
| **VULN-02** | Information Disclosure / Raw Exception Leak | `apps/api/src/app.ts:13-26` | Medium | Yes | Replaced raw `String(err)` with server-side `console.error` and sanitized HTTP 503 response. |
| **VULN-03** | Instruction Confusion / Indirect Prompt Injection | `apps/api/src/fixtures/prompt-injection-defense.ts:13-17` | High | Yes | Implemented delimiter encapsulation (`<user_data>`), length bounds, and JSON serialization. |

---

## 3. Detailed Remediation Evidence

### 3.1. Remediation for VULN-01 (IDOR)
- **Vulnerable Code:**
  ```typescript
  // Missing caller ownership check
  simulatedTasksStore.delete(id);
  ```
- **Remediated Code:**
  ```typescript
  if (task.ownerId !== callerId) {
    return res.status(403).json({ error: 'Forbidden: You do not have permission to delete this task' });
  }
  simulatedTasksStore.delete(id);
  ```
- **Regression Test:** `tests/security/ownership.test.ts` › `rejects Bob attempt to delete Alice task with HTTP 403 Forbidden`.

### 3.2. Remediation for VULN-02 (Exception Disclosure)
- **Vulnerable Code:** `res.status(503).json({ error: String(err) })`
- **Remediated Code:** Sanitized JSON payload with generic error message.
- **Regression Test:** `apps/api/tests/api.test.ts` › `returns sanitized 503 Service Unavailable when database connection fails`.

### 3.3. Remediation for VULN-03 (Prompt Injection)
- **Vulnerable Code:** Direct string interpolation of user task title into prompt.
- **Remediated Code:** Strict `<user_data>` XML delimiter boundary with breakout tag escaping.
- **Regression Test:** `tests/security/prompt-injection.test.ts` › `defends against instruction confusion by encapsulating untrusted input in strict delimiters`.

---

## 4. Verification Check
- [x] Semgrep scan exits with 0 high/critical errors.
- [x] Automated regression tests pass 100%.
- [x] Production startup assertion `assertSafeEnvironment()` verified.
