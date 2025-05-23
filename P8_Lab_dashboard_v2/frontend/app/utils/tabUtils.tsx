// utils/tabUtils.ts

import { Tab } from '../dashboard/page';

export function addOrActivateTab(tabs: Tab[], newTab: Tab): { tabs: Tab[]; activeTabId: string } {
  const exists = tabs.find(tab => tab.id === newTab.id);
  if (exists) {
    return { tabs, activeTabId: newTab.id };
  } else {
    return { tabs: [...tabs, newTab], activeTabId: newTab.id };
  }
}

export function closeTab(tabs: Tab[], idToClose: string, activeTabId: string | null): { tabs: Tab[]; activeTabId: string | null } {
  const newTabs = tabs.filter(tab => tab.id !== idToClose);
  let newActiveId = activeTabId;

  if (activeTabId === idToClose) {
    newActiveId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
  }

  return { tabs: newTabs, activeTabId: newActiveId };
}
