# Technical Requirements Specification — Task Manager (Slot 1)

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01)  
> **Repository:** `course4-teaching-task-manager`  
> **Status:** Phase P1 Verified Implementation

---

## 1. System Architecture Requirements

- **Runtime:** Node.js LTS (>= 20.12.0)
- **Monorepo Structure:** Managed via `npm workspaces` containing:
  - `packages/shared`: Common types and Zod schemas.
  - `apps/api`: Express TypeScript REST API.
  - `apps/web`: React 18 TypeScript Single Page Application (Vite + Tailwind CSS).
  - `prisma`: SQLite schema (`file:./dev.db`), seeder, and reset script.
- **Port Allocation:**
  - Backend API: `http://localhost:3000`
  - Frontend SPA: `http://localhost:5173`

---

## 2. API Contract Specification

### 2.1. Health Check
- **Endpoint:** `GET /health`
- **Response (200 OK):**
  ```json
  {
    "status": "ok",
    "database": "connected",
    "timestamp": "2026-11-16T14:26:35.123Z"
  }
  ```

### 2.2. List Tasks
- **Endpoint:** `GET /api/tasks`
- **Response (200 OK):**
  ```json
  [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Set up Git repository",
      "completed": true,
      "createdAt": "2026-11-16T14:00:00.000Z",
      "updatedAt": "2026-11-16T14:05:00.000Z"
    }
  ]
  ```

### 2.3. Create Task
- **Endpoint:** `POST /api/tasks`
- **Request Body:**
  ```json
  {
    "title": "Draft Problem Statement"
  }
  ```
- **Response (201 Created):** Returns created task object.
- **Error (400 Bad Request):**
  ```json
  {
    "error": "Title cannot be empty"
  }
  ```

### 2.4. Update Task
- **Endpoint:** `PATCH /api/tasks/:id`
- **Request Body (Partial Update):**
  ```json
  {
    "title": "New Title",
    "completed": true
  }
  ```
- **Response (200 OK):** Returns updated task object.
- **Error (400 Bad Request):** Returns validation failure message.
- **Error (404 Not Found):** Returns `{ "error": "Task not found" }`.

### 2.5. Delete Task
- **Endpoint:** `DELETE /api/tasks/:id`
- **Response (200 OK):** `{ "message": "Task deleted successfully", "id": "..." }`
- **Error (404 Not Found):** `{ "error": "Task not found" }`

---

## 3. Data Integrity & Validation Rules

1. **Title Trimming:** All titles are automatically trimmed of leading and trailing whitespace before validation.
2. **Non-Empty Constraint:** Minimum character length after trimming is 1 (`min(1)`).
3. **Partial Updates:** `PATCH` requires at least one defined property (`title` or `completed`).
4. **UUID Identifier:** Task IDs are cryptographically generated UUIDs.
