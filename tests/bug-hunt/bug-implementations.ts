/**
 * tests/bug-hunt/bug-implementations.ts
 *
 * Seeded Bug Implementations for Slot 4 Lab 03 (Scientific Debugging & Bug Hunt)
 * Contains the EXACT FIVE seeded bugs described in Course 4 Slide 25 & 29.
 */

// Global toggle for training demonstration (defaults to true for bug reproduction)
export let simulateBugsActive = true;

export function setSimulateBugs(active: boolean): void {
  simulateBugsActive = active;
}

// -------------------------------------------------------------
// BUG 1: Pagination Off-By-One Calculation
// -------------------------------------------------------------
export function calculatePaginationOffset(page: number, limit: number): number {
  if (simulateBugsActive) {
    // SEEDED BUG 1: Offset starts at page * limit instead of (page - 1) * limit
    // When requesting page 1, offset is 5 instead of 0, skipping first 5 records!
    return page * limit;
  }
  // REMEDIATED FIX:
  return Math.max(0, (page - 1) * limit);
}

// -------------------------------------------------------------
// BUG 2: Case-Sensitive Search Matching
// -------------------------------------------------------------
export function filterTasksBySearchTerm(
  tasks: Array<{ id: string; title: string }>,
  searchTerm: string
): Array<{ id: string; title: string }> {
  if (simulateBugsActive) {
    // SEEDED BUG 2: Exact case-sensitive match
    // 'report' fails to match 'Report Q4'
    return tasks.filter((t) => t.title.includes(searchTerm));
  }
  // REMEDIATED FIX: Case-insensitive matching
  const normalizedTerm = searchTerm.toLowerCase();
  return tasks.filter((t) => t.title.toLowerCase().includes(normalizedTerm));
}

// -------------------------------------------------------------
// BUG 3: Boolean Query Parameter Coercion
// -------------------------------------------------------------
export function parseCompletedQueryParam(rawQueryValue: string | undefined): boolean | undefined {
  if (rawQueryValue === undefined) return undefined;

  if (simulateBugsActive) {
    // SEEDED BUG 3: Boolean("false") === true in JavaScript!
    // Any non-empty string is coerced to true, so '?completed=false' returns completed tasks!
    return Boolean(rawQueryValue);
  }
  // REMEDIATED FIX: Strict string comparison
  if (rawQueryValue === 'true') return true;
  if (rawQueryValue === 'false') return false;
  return undefined;
}

// -------------------------------------------------------------
// BUG 4: Broken Ownership / Identity Check in Simulated Fixture
// -------------------------------------------------------------
export function verifyTaskAccess(
  task: { id: string; title: string; ownerId: string },
  callerUserId: string
): boolean {
  if (simulateBugsActive) {
    // SEEDED BUG 4: Missing check: always returns true regardless of ownerId
    // Allows Bob to access or mutate Alice's private task
    return true;
  }
  // REMEDIATED FIX: Strict equality check
  return task.ownerId === callerUserId;
}

// -------------------------------------------------------------
// BUG 5: Shared Mutable State / Default Object Leak
// -------------------------------------------------------------
// SEEDED BUG 5: Shared module-level object instance mutated across requests
const SHARED_DEFAULT_METADATA = { tags: [] as string[] };

export function createTaskWithMetadata(title: string, tags?: string[]) {
  if (simulateBugsActive) {
    const meta = SHARED_DEFAULT_METADATA;
    if (tags) {
      meta.tags.push(...tags);
    }
    return { title, metadata: meta };
  }
  // REMEDIATED FIX: Return fresh, isolated copy every time
  return {
    title,
    metadata: {
      tags: tags ? [...tags] : [],
    },
  };
}
