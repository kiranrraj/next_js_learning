// utils/flattenTests.ts

import { Group, Test } from '../components/Sidebar'

/**
 * Recursively collects all tests inside a group and its child groups
 * @param group Group object with optional tests and childrenGroups
 * @returns Array of all tests found recursively
 */
export function flattenTests(group: Group): Test[] {
  let tests: Test[] = [];

  if (group.tests) {
    tests = tests.concat(group.tests);
  }

  if (group.childrenGroups) {
    for (const childGroup of group.childrenGroups) {
      tests = tests.concat(flattenTests(childGroup));
    }
  }

  return tests;
}
