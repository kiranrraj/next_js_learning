'use client';

import { JSX, useState } from 'react';
import styles from './page.module.css';

import Sidebar from '../components/Sidebar';
import TabBar from '../components/TarBar'
import TabContent from '../components/TabContent';
import ScrollToTopButton from '../components/ScrollToTopButton';

import medicalGroupData from '@/data/medicalGroupData';
import { findGroupById } from '../utils/findGroupById';
import { addOrActivateTab, closeTab as closeTabHelper } from '../utils/tabUtils';
import { buildTestTabContent, buildGroupTabContent } from '../utils/tabContentBuilders';

export type Tab = {
  id: string;
  title: string;
  content: JSX.Element;
};

export default function DashboardPage() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const openTestTab = (id: string, name: string) => {
    const newTab: Tab = {
      id,
      title: name,
      content: buildTestTabContent({ id, name }),
    };

    const result = addOrActivateTab(tabs, newTab);
    setTabs(result.tabs);
    setActiveTabId(result.activeTabId);
  };

  const openGroupTab = (id: string, name: string) => {
    const group = findGroupById(medicalGroupData, id);

    const newTab: Tab = {
      id,
      title: name,
      content: group ? buildGroupTabContent(group) : <div>Group not found</div>,
    };

    const result = addOrActivateTab(tabs, newTab);
    setTabs(result.tabs);
    setActiveTabId(result.activeTabId);
  };

  const closeTab = (id: string) => {
    const result = closeTabHelper(tabs, id, activeTabId);
    setTabs(result.tabs);
    setActiveTabId(result.activeTabId);
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <Sidebar onOpenTest={openTestTab} onOpenGroup={openGroupTab} />
      </aside>

      <div className={styles.main}>
        <TabBar
          tabs={tabs}
          activeTabId={activeTabId}
          onCloseTab={closeTab}
          onSetActiveTab={setActiveTabId}
        />
        <TabContent tabs={tabs} activeTabId={activeTabId} />
        <ScrollToTopButton />
      </div>
    </div>
  );
}
