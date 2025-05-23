// utils/findGroupById.tsx

import { Group } from '../components/Sidebar'

export function findGroupById(groups: Group[], id: string): Group | null {
  for (const group of groups) {
    if (group.id === id) return group;
    if (group.childrenGroups) {
      const found = findGroupById(group.childrenGroups, id);
      if (found) return found;
    }
  }
  return null;
}
