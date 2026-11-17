# Accessibility (a11y) & Usability Audit Report — Slot 3 Task Manager

> **Component Evaluated:** `TaskFilterBar.tsx` (Option B: Segmented Pill Filter Bar) vs `TaskFilterDropdown.tsx` (Option A: Dropdown)  
> **Standards Reference:** WCAG 2.1 Level AA, WAI-ARIA 1.2  
> **Audit Tool:** Manual Keyboard Navigation, Screen Reader Semantics Inspection, Component Test Assertions

---

## 1. Executive Summary

As part of Slot 3 Lab 02, two UI alternatives were evaluated for task filtering. **Option B (Segmented Pill Filter Bar)** was chosen and integrated into the production UI. This report documents the accessibility audit proving Option B satisfies WCAG 2.1 AA requirements.

---

## 2. Accessibility Checklist & Findings

| WCAG Criteria | Requirement | Option A (Dropdown) | Option B (Segmented Pills) | Result |
|---|---|:---:|:---:|:---:|
| **2.1.1 Keyboard** | All interactive elements operable via keyboard | Partial (Native select operates, but custom selects often fail) | **PASS:** Every filter tab is in tab order (`tabIndex={0}`) and activates via `Enter` or `Space`. | **PASS** |
| **2.4.7 Focus Visible** | Focus indicator is clearly visible | Partial (Default browser outline can be faint) | **PASS:** High-contrast `focus:ring-2 focus:ring-blue-500 focus:ring-offset-1` indicator. | **PASS** |
| **4.1.2 Name, Role, Value** | Proper ARIA roles and state announcements | `<select aria-label="...">` | **PASS:** Uses `role="tablist"` on container and `role="tab"` with dynamic `aria-selected` on buttons. | **PASS** |
| **1.3.1 Info & Relationships** | Relationships conveyable programmatically | Implicit form element | **PASS:** Tab buttons have `aria-controls="task-list-panel"` linking them to the tasks container. | **PASS** |
| **4.1.3 Status Messages** | Dynamic content updates announced | Static select options | **PASS:** Uses `aria-live="polite"` to announce `"Showing: <filter> tasks"`. | **PASS** |
| **1.4.3 Contrast (Minimum)** | Contrast ratio at least 4.5:1 for text | Pass | **PASS:** Selected tab: `text-blue-700` on `bg-white` (ratio > 7:1); Inactive tab: `text-slate-600` on `bg-slate-100` (ratio > 4.8:1). | **PASS** |

---

## 3. Keyboard Interaction Verification Steps

1. Load `http://localhost:5173`.
2. Press `Tab` until focus reaches the Task Filter Bar.
3. Observe the blue ring surrounding the "All" tab.
4. Press `Tab` to move to "Active"; press `Enter`.
   - Active tab background turns white with blue bold text.
   - Task list instantly shows only pending tasks.
   - Screen reader announces the polite live region change.
5. Press `Tab` to move to "Completed"; press `Space`.
   - Completed tab activates.
   - Task list instantly shows only completed tasks.
