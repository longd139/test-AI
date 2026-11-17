# Instructor Answer Key — Slot 4 Lab 03 Seeded Bug Hunt Solutions

> **Confidential:** Instructor Reference Material ONLY — Do NOT distribute to students before Lab 03 completion.  
> **Target:** Solutions for Lab 03 (The Five Seeded Bugs in `tests/bug-hunt/`).

---

## Bug 1: Pagination Off-By-One Calculation
- **Location:** `tests/bug-hunt/bug-implementations.ts`
- **Symptom:** Page 1 with limit 5 returns offset 5, skipping the first 5 records.
- **Root Cause:** Calculating `offset = page * limit` instead of `(page - 1) * limit`.
- **Solution:**
  ```typescript
  export function calculatePaginationOffset(page: number, limit: number): number {
    return Math.max(0, (page - 1) * limit);
  }
  ```

---

## Bug 2: Case-Sensitive Search Matching
- **Location:** `tests/bug-hunt/bug-implementations.ts`
- **Symptom:** Searching for lowercase `"report"` fails to find task `"Report Q4"`.
- **Root Cause:** Using strict string `includes()` without case normalization.
- **Solution:**
  ```typescript
  export function filterTasksBySearchTerm(tasks: Task[], searchTerm: string): Task[] {
    const term = searchTerm.toLowerCase();
    return tasks.filter((t) => t.title.toLowerCase().includes(term));
  }
  ```

---

## Bug 3: Boolean Query String Coercion
- **Location:** `tests/bug-hunt/bug-implementations.ts`
- **Symptom:** Passing query param `?completed=false` returns completed tasks.
- **Root Cause:** In JavaScript, `Boolean("false") === true` because any non-empty string is truthy.
- **Solution:**
  ```typescript
  export function parseCompletedQueryParam(rawQueryValue: string | undefined): boolean | undefined {
    if (rawQueryValue === 'true') return true;
    if (rawQueryValue === 'false') return false;
    return undefined;
  }
  ```

---

## Bug 4: Broken Ownership Check in Simulated Fixture
- **Location:** `tests/bug-hunt/bug-implementations.ts`
- **Symptom:** User Bob can access or delete User Alice's private task.
- **Root Cause:** The access control function unconditionally returns `true` instead of validating `ownerId`.
- **Solution:**
  ```typescript
  export function verifyTaskAccess(task: Task, callerUserId: string): boolean {
    return task.ownerId === callerUserId;
  }
  ```

---

## Bug 5: Shared Mutable State / Default Object Leak
- **Location:** `tests/bug-hunt/bug-implementations.ts`
- **Symptom:** Adding tags to Task 1 causes Task 2 to inherit Task 1's tags.
- **Root Cause:** Mutating a single module-level default object reference `SHARED_DEFAULT_METADATA.tags.push(...)`.
- **Solution:**
  ```typescript
  export function createTaskWithMetadata(title: string, tags?: string[]) {
    return {
      title,
      metadata: {
        tags: tags ? [...tags] : [],
      },
    };
  }
  ```
