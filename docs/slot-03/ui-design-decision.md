# UI Design Decision: Task Filtering & Status Management

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot:** Slot 3 — Rapid AI UI Development & Working Software  
> **Slide Reference:** `SLOT 3` Slides 18–25 ("A Good UI Begins with a Requirement", "Two Designs. One Requirement", "Beautiful Is Not the Same as Correct", "Responsive & Accessible UI")

---

## 1. Requirement Specification

### Business Need
As a user with multiple tasks on my board, I need to filter my view between **All**, **Active (Pending)**, and **Completed** tasks so that I can focus on unfinished work without deleting finished items.

### Functional Acceptance Criteria
- **AC-1:** System provides three distinct view filters: `All`, `Active`, and `Completed`.
- **AC-2:** The active filter must be visually prominent and announced to assistive technologies (`aria-selected="true"`).
- **AC-3:** Filter buttons must display live task counts reflecting actual database state.
- **AC-4:** The filter controls must be 100% operable via keyboard (`Tab`, `Enter`, `Space`) with visible focus rings.
- **AC-5:** The layout must adapt responsively from mobile viewports (375px) to desktop (1280px).

---

## 2. The Two UI Alternatives

### Option A: Compact Dropdown Menu (`TaskFilterDropdown.tsx`)
```text
┌─────────────────────────────────┐
│ View: [ All Tasks (5)       ▼ ] │
└─────────────────────────────────┘
```
- **Description:** A native or custom `<select>` dropdown placed next to the task counter.
- **Pros:**
  - Extremely compact footprint; saves vertical space on mobile screens.
  - Familiar default OS behavior on mobile devices.
- **Cons / Critical Flaws:**
  - **Zero Discoverability:** Hides filter options and active counts behind a click.
  - **Inconvenient Multi-Step Interaction:** User must click, scroll through options, and click again to switch between views.
  - **Poor Accessibility:** Assistive tech and screen reader users cannot perceive the number of active vs completed tasks at a glance.
  - **Aesthetic vs Functional Disconnect:** Many AI app generators output beautiful custom select menus that lack proper ARIA keyboard listeners and focus traps.

---

### Option B: Segmented Pill Filter Bar (`TaskFilterBar.tsx`)
```text
┌─────────────────────────────────────────────────────────┐
│ [ All (5) ]      [ Active (3) ]      [ Completed (2) ]  │
└─────────────────────────────────────────────────────────┘
```
- **Description:** A horizontal segmented control with rounded pills, embedded counter badges, and high-contrast focus rings.
- **Pros:**
  - **Instant Visibility & Feedback:** User immediately sees the distribution of tasks (`All 5`, `Active 3`, `Completed 2`).
  - **Single-Click Switching:** One click or one keypress toggles the board immediately.
  - **Full Accessibility (WCAG 2.1 AA):** Uses standard ARIA tablist semantics (`role="tablist"`, `role="tab"`, `aria-selected`), with prominent focus indicators (`focus:ring-2 focus:ring-blue-500`).
  - **Responsive Design:** Neatly stacks or scrolls horizontally on narrow mobile screens while centering on desktop.
- **Cons:**
  - Requires slightly more horizontal/vertical space than a collapsed dropdown.

---

## 3. Evaluation & Tradeoff Matrix

| Criterion | Weight | Option A (Dropdown) | Option B (Segmented Pills) | Winner |
|---|:---:|:---:|:---:|:---:|
| **Discoverability** | High | 2/5 (Hidden behind menu) | 5/5 (Immediately visible) | **Option B** |
| **Interaction Efficiency** | High | 2/5 (Two clicks required) | 5/5 (One click / keypress) | **Option B** |
| **Keyboard Accessibility** | Critical | 3/5 (Default focus only) | 5/5 (Full tablist / ARIA roles) | **Option B** |
| **Mobile Responsiveness** | Medium | 4/5 (Compact) | 4.5/5 (Flex wrap with gap) | **Option B** |
| **Real System State Feedback** | High | 2/5 (Counts obscured) | 5/5 (Live badge counters) | **Option B** |
| **Overall Score** | | **13 / 25** | **24.5 / 25** | **OPTION B** |

---

## 4. Architectural Decision & Integration Justification

**Decision:** **Adopt Option B (Segmented Pill Filter Bar)** for the production Task Manager.

### Implementation Grounding in Real System Behavior (Slide 23 & 25)
Option B is not just a visual mockup; it is fully wired into the React state and backed by the real SQLite database via Express:
1. `apps/web/src/components/TaskFilterBar.tsx`: Implements Option B with proper ARIA tablist semantics.
2. `apps/web/src/components/TaskFilterDropdown.tsx`: Maintained as a comparison reference component for student lab exercises.
3. `apps/web/src/App.tsx`: Manages active filter state (`'all' | 'active' | 'completed'`) and calculates dynamic counters directly from fetched `tasks`.
4. `apps/web/src/components/TaskList.tsx`: Renders filtered subsets dynamically without requiring redundant network queries or altering database state.
