# Human-First, AI-Second Code Review Methodology

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot 4:** Secure AI Code, Human vs AI Code Review & Debugging  
> **Slide Reference:** `SLOT 4` Slides 14–19 ("Why Review AI Code?", "What Makes a Good Review Comment?", "AI Review: Strengths & Blind Spots", "Human vs AI Review Experiment")

---

## 1. Why Human-First, AI-Second?

A critical trap in modern AI-assisted engineering is **Anchoring Bias**:
- If an engineer runs an AI code review first, the AI typically generates 5–10 nitpicks about variable naming, whitespace, or missing comments.
- The human brain subconsciously assumes the AI has done the hard work, leading the reviewer to gloss over **deep business logic bugs, timezone edge cases, and architectural mismatches**.

### The Rule
> **Always perform your independent human review FIRST (10–15 minutes).**  
> Formulate your questions, check business assumptions, and flag architectural risks.  
> **THEN run the AI code review tool SECOND.** Compare what the AI caught against what you found.

---

## 2. Review Taxonomy (Four Categories)

| Category | Typical Human Catches | Typical AI Catches |
|---|---|---|
| **1. Business Logic** | Timezone shifts, negative durations, broken requirements, race conditions | Often blind or hallucinates assumptions unless explicitly instructed |
| **2. Architecture & Scope** | Unapproved dependencies, violations of zero-auth boundary, breaking API contracts | Moderate (detects imports, but misses holistic project boundaries) |
| **3. Security & Safety** | IDOR vulnerabilities, missing authorization, unsafe error disclosure | High for known patterns (XSS, SQL injection, Semgrep rules) |
| **4. Syntax & Hygiene** | Frequently overlooked or considered low priority | Exceptional (unused imports, typos, type mismatches, dead code) |

---

## 3. Step-by-Step Lab 02 Protocol

### Step 1: Human Review (Independent)
1. Open the cross-team PR diff: [fixtures/pr-review/cross-team-pr.diff](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/fixtures/pr-review/cross-team-pr.diff).
2. Read the changes without running any AI tools.
3. Identify at least 3 distinct issues. Formulate constructive comments using the format:
   `[File:line] <Severity>: <Observation> + <Why it matters> + <Suggested alternative>`

### Step 2: AI-Assisted Review (Secondary)
1. Run the AI code review prompt on the diff:
   ```text
   Review this git diff from fixtures/pr-review/cross-team-pr.diff.
   Identify syntax errors, security vulnerabilities, edge-case bugs, and unused imports.
   Format findings by severity (Critical, Warning, Suggestion).
   ```

### Step 3: Comparison & Synthesis
1. Open [docs/slot-04/review-comparison-template.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/docs/slot-04/review-comparison-template.md).
2. Map your findings side-by-side with the AI's findings.
3. Calculate:
   - What did the human find that AI completely missed?
   - What did the AI find that human overlooked?
   - Did the AI produce any false positives (hallucinated warnings)?
