# Product Requirements Document (PRD) — Task Manager

> **Product Name:** Course 4 Teaching Task Manager (`course4-teaching-task-manager`)  
> **Course:** Course 4 — The Modern AI Software Developer (ADLC01)  
> **Version:** 1.0.0 (Slot 1 Baseline)  
> **Status:** APPROVED BASELINE SPECIFICATION

---

## 1. Problem Statement & User Need

In modern software teams, individuals struggle to maintain focus and track daily engineering deliverables when tasks are scattered or unorganized. Software developers need a lightweight, reliable, and accessible task tracking interface to record, update, and complete engineering action items.

### Target Persona:
- **Developer / Student Engineer:** Needs an uncluttered web interface to add tasks, view current obligations, edit task descriptions, and mark work complete.

---

## 2. Product Scope — Slot 1 Baseline

In accordance with Slot 1 curriculum constraints (Slot 1 Slide 14, Slide 21–23):
- **Included in Scope:**
  - View task list with status indicators (Completed / Pending).
  - Create a new task with a non-empty, validated title.
  - Edit existing task titles.
  - Toggle completion status (Mark complete or mark pending).
  - Delete an existing task.
  - Client-side and server-side validation rejecting empty or whitespace-only titles.
  - Active system health check endpoint (`/health`).
- **Explicitly Excluded from Slot 1 Scope:**
  - *No User Authentication or Multi-User Ownership* (single-user / team-shared workspace).
  - *No Task Priority* (deferred as optional Slot 2 demonstration).
  - *No Task Due Dates or Deadlines* (deferred to Slot 2 Planning Challenge).
  - *No MCP or Agent Automations* (deferred to Slot 3).
  - *No Security Vulnerabilities or IDOR Fixtures* (deferred to Slot 4).
  - *No Cloud Production Deployment* (deferred to Slot 5).

---

## 3. Functional Requirements & Acceptance Criteria

### FR-01: View Task List
The system shall display all created tasks ordered chronologically, showing their title, completion status, and total count.
- **AC-01.1 (Display Tasks):**
  - **Given:** The database contains seeded tasks.
  - **When:** The user opens the application in the browser or sends `GET /api/tasks`.
  - **Then:** The system returns HTTP 200 and renders the list of tasks with titles and status indicators.
- **AC-01.2 (Empty State):**
  - **Given:** The database contains zero tasks.
  - **When:** The user views the task board.
  - **Then:** The system displays a friendly empty-state message ("No tasks found") prompting the user to create a task.

---

### FR-02: Create Task
The system shall allow users to submit a new task with a valid title.
- **AC-02.1 (Valid Creation):**
  - **Given:** The user provides a non-empty string title (e.g., `"Review PRD v1 draft"`).
  - **When:** The user submits the task form or sends `POST /api/tasks` with `{ "title": "Review PRD v1 draft" }`.
  - **Then:** The system trims surrounding whitespace, persists the task with `completed: false`, returns HTTP 201 Created, and displays the new task immediately.
- **AC-02.2 (Reject Empty Title):**
  - **Given:** An empty title string `""` or missing title property.
  - **When:** The user attempts to submit the task.
  - **Then:** The system rejects the request with HTTP 400 Bad Request and displays `"Title cannot be empty"`. No task is created.
- **AC-02.3 (Reject Whitespace-Only Title):**
  - **Given:** A title consisting solely of spaces `"     "`.
  - **When:** The user submits the task.
  - **Then:** The system rejects the request with HTTP 400 Bad Request and validation error `"Title cannot be empty"`.

---

### FR-03: Edit Task Title
The system shall allow users to modify the title of an existing task.
- **AC-03.1 (Successful Edit):**
  - **Given:** An existing task with ID `TASK_ID`.
  - **When:** The user submits an updated valid title via `PATCH /api/tasks/:id`.
  - **Then:** The system updates the title, updates `updatedAt`, returns HTTP 200 with the modified task, and updates the UI.
- **AC-03.2 (Invalid Edit Rejection):**
  - **Given:** An existing task with ID `TASK_ID`.
  - **When:** The user attempts to edit the title to whitespace `"   "`.
  - **Then:** The system returns HTTP 400 Bad Request with validation error message, retaining the original title.

---

### FR-04: Toggle Task Completion
The system shall allow users to mark a task as completed or toggle it back to pending.
- **AC-04.1 (Complete Task):**
  - **Given:** An uncompleted task.
  - **When:** The user clicks the task checkbox or sends `PATCH /api/tasks/:id` with `{ "completed": true }`.
  - **Then:** The system sets `completed: true`, returns HTTP 200, and displays a strikethrough styling in the UI.
- **AC-04.2 (Reopen Task):**
  - **Given:** A completed task.
  - **When:** The user unchecks the task checkbox (`{ "completed": false }`).
  - **Then:** The system sets `completed: false` and removes the completed strikethrough styling.

---

### FR-05: Delete Task
The system shall allow users to permanently delete a task.
- **AC-05.1 (Delete Task):**
  - **Given:** An existing task with ID `TASK_ID`.
  - **When:** The user clicks the delete button or sends `DELETE /api/tasks/:id`.
  - **Then:** The system removes the task from database, returns HTTP 200, and removes it from the task board.

---

## 4. Requirement Traceability Matrix

| Requirement | Slide Deck Source | API Endpoint | Verification Test |
|:---|:---|:---|:---|
| **FR-01 (View List)** | `SLOT 1` Slide 14, 22 | `GET /api/tasks` | `api.test.ts` > `GET /api/tasks returns seeded tasks` |
| **FR-02 (Create Task)** | `SLOT 1` Slide 21, 22, 23 | `POST /api/tasks` | `api.test.ts` > `POST /api/tasks creates task & rejects whitespace` |
| **FR-03 (Edit Task)** | `SLOT 1` Slide 14, 17 | `PATCH /api/tasks/:id` | `api.test.ts` > `PATCH /api/tasks/:id edits title` |
| **FR-04 (Complete Task)** | `SLOT 1` Slide 14, 22 | `PATCH /api/tasks/:id` | `api.test.ts` > `PATCH /api/tasks/:id toggles completed` |
| **FR-05 (Delete Task)** | `SLOT 1` Slide 14 | `DELETE /api/tasks/:id` | `api.test.ts` > `DELETE /api/tasks/:id deletes task` |
