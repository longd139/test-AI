import { describe, it, expect, beforeEach } from 'vitest';
import {
  setSimulateBugs,
  calculatePaginationOffset,
  filterTasksBySearchTerm,
  parseCompletedQueryParam,
  verifyTaskAccess,
  createTaskWithMetadata,
} from './bug-implementations.js';

describe('Slot 4 Lab 03: Seeded Bug Hunt — Scientific Debugging Suite', () => {
  describe('Phase 1: Seeded Bug Reproduction (Demonstrating RED Failures)', () => {
    beforeEach(() => {
      setSimulateBugs(true);
    });

    it('Bug 1 Reproduction: Page 1 with limit 5 calculates offset 5 instead of 0 (skips first page)', () => {
      const offset = calculatePaginationOffset(1, 5);
      // Buggy behavior: offset is 5 instead of 0
      expect(offset).toBe(5);
    });

    it('Bug 2 Reproduction: Search for lowercase "report" fails to match uppercase "Report Q4"', () => {
      const tasks = [
        { id: '1', title: 'Report Q4 Financials' },
        { id: '2', title: 'Deploy release' },
      ];
      const results = filterTasksBySearchTerm(tasks, 'report');
      // Buggy behavior: 0 matches found due to case sensitivity
      expect(results.length).toBe(0);
    });

    it('Bug 3 Reproduction: Query param "false" incorrectly parses to true via Boolean("false")', () => {
      const parsed = parseCompletedQueryParam('false');
      // Buggy behavior: parsed is true rather than false!
      expect(parsed).toBe(true);
    });

    it('Bug 4 Reproduction: Bob is granted access to Alice task because check is missing', () => {
      const aliceTask = { id: 't1', title: 'Confidential Task', ownerId: 'user-alice' };
      const hasAccess = verifyTaskAccess(aliceTask, 'user-bob');
      // Buggy behavior: returns true
      expect(hasAccess).toBe(true);
    });

    it('Bug 5 Reproduction: Adding tags to Task 1 leaks those tags into subsequent Task 2', () => {
      const task1 = createTaskWithMetadata('Task 1', ['urgent', 'q4']);
      expect(task1.metadata.tags).toEqual(['urgent', 'q4']);

      // Creating task 2 without tags
      const task2 = createTaskWithMetadata('Task 2');
      // Buggy behavior: task 2 inherits task 1's tags due to shared object mutation!
      expect(task2.metadata.tags).toEqual(['urgent', 'q4']);
    });
  });

  describe('Phase 2: Remediated Bug Verification (Demonstrating GREEN Regression Pass)', () => {
    beforeEach(() => {
      setSimulateBugs(false);
    });

    it('Bug 1 Remediated: Page 1 with limit 5 correctly returns offset 0', () => {
      expect(calculatePaginationOffset(1, 5)).toBe(0);
      expect(calculatePaginationOffset(2, 5)).toBe(5);
    });

    it('Bug 2 Remediated: Search is case-insensitive and matches "Report Q4"', () => {
      const tasks = [
        { id: '1', title: 'Report Q4 Financials' },
        { id: '2', title: 'Deploy release' },
      ];
      const results = filterTasksBySearchTerm(tasks, 'report');
      expect(results.length).toBe(1);
      expect(results[0].title).toBe('Report Q4 Financials');
    });

    it('Bug 3 Remediated: Query param "false" strictly parses to boolean false', () => {
      expect(parseCompletedQueryParam('false')).toBe(false);
      expect(parseCompletedQueryParam('true')).toBe(true);
      expect(parseCompletedQueryParam(undefined)).toBeUndefined();
    });

    it('Bug 4 Remediated: Bob is denied access to Alice task (returns false)', () => {
      const aliceTask = { id: 't1', title: 'Confidential Task', ownerId: 'user-alice' };
      expect(verifyTaskAccess(aliceTask, 'user-bob')).toBe(false);
      expect(verifyTaskAccess(aliceTask, 'user-alice')).toBe(true);
    });

    it('Bug 5 Remediated: Default metadata is isolated; Task 2 has empty tags array', () => {
      const task1 = createTaskWithMetadata('Task 1', ['urgent', 'q4']);
      const task2 = createTaskWithMetadata('Task 2');
      expect(task1.metadata.tags).toEqual(['urgent', 'q4']);
      expect(task2.metadata.tags).toEqual([]);
    });
  });
});
