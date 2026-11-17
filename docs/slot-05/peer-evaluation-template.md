# Confidential Individual Peer Evaluation Form (Milestone M4)

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Milestone:** M4 (Final Project Submission)  
> **Confidentiality:** This evaluation is confidential and submitted directly to instructors. Individual scores are not shared with teammates.  
> **Purpose:** Calculate the individual contribution factor to adjust project grading based on genuine ownership and peer collaboration.

---

## 1. Evaluation Instructions

1. Each student must evaluate all team members (including themselves) on a scale of **1 to 5** across five core engineering dimensions.
2. Provide specific, constructive qualitative evidence (e.g., specific PRs reviewed, incident roles assumed, or debugging leadership) to support your scoring.
3. Scoring Scale:
   - **5 (Exceptional):** Exceeded expectations; consistently unblocked teammates and demonstrated outstanding ownership.
   - **4 (Strong):** Fully met expectations; delivered assigned modules reliably and participated actively.
   - **3 (Acceptable):** Met baseline requirements; required periodic follow-up or assistance from peers.
   - **2 (Marginal):** Inconsistent contribution; missed deadlines or pushed untested code that caused CI failures.
   - **1 (Unacceptable):** Minimal to zero contribution; failed to participate in incident drills or team defense.

---

## 2. Evaluation Matrix

| Teammate Name | Git Handle | 1. Technical Contribution (Code, Tests, CI) | 2. AI Engineering Skill (Prompting, Verification) | 3. Operational Ownership (Runbook, Incident Drill) | 4. Team Collaboration & Communication | 5. Reliability & Commitment | Total Score (out of 25) | Calculated Factor (%) |
|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Self ([Your Name])** | `@handle` | 5 | 5 | 4 | 5 | 5 | 24 | 96% |
| **Member 2** | `@handle` | 4 | 4 | 5 | 4 | 4 | 21 | 84% |
| **Member 3** | `@handle` | 4 | 5 | 4 | 5 | 4 | 22 | 88% |
| **Member 4** | `@handle` | 5 | 4 | 5 | 4 | 5 | 23 | 92% |

---

## 3. Qualitative Feedback & Justification

### Teammate 1: [Member 2 Name]
- **Specific Contributions:** Implemented the Prisma PostgreSQL schema, configured database pooling on Neon, and authored the database troubleshooting section in `docs/runbook.md`.
- **Strengths:** Excellent database knowledge; verified connection pooling syntax during the incident drill.
- **Areas for Growth:** Could document PR descriptions in more detail to facilitate faster team code reviews.

### Teammate 2: [Member 3 Name]
- **Specific Contributions:** Built the responsive task filter tabs in React, ensured WCAG 2.1 AA keyboard accessibility, and authored Playwright E2E test scenarios.
- **Strengths:** High frontend speed using AI for Tailwind styling; very communicative in team standups.
- **Areas for Growth:** Needs to remember to run `npm run typecheck` locally before pushing to PR branch.

### Teammate 3: [Member 4 Name]
- **Specific Contributions:** Set up the Semgrep SAST rules in CI, created the incident drill simulation harness, and led the blameless postmortem documentation.
- **Strengths:** Outstanding attention to security and edge-case handling; caught subtle bugs during the PR review exercise.
- **Areas for Growth:** Encourage team members to participate earlier in architectural debates.

---

## 4. Overall Team Dynamics & Retrospective
- *What worked best in your team's AI-assisted workflow?*  
  Having a shared Zod schema and automated CI test suite gave everyone the confidence to let AI generate code, knowing that breaking changes would be caught immediately before merging.
- *What was the most challenging technical barrier?*  
  Configuring CORS and SSL parameters between Render and Neon on the cloud free tier.
