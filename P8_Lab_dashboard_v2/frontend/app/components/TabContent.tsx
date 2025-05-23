'use client';

import React from 'react';
import styles from '../styles/TabContent.module.css';
import { Tab } from './TarBar'

type TabContentProps = {
  tabs: Tab[];
  activeTabId: string | null;
};

export default function TabContent({ tabs, activeTabId }: TabContentProps) {
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <section className={styles.tabContent}>
      {activeTab ? (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          tabIndex={0}
          className={styles.panel}
        >
          {activeTab.content}
        </div>
      ) : (
        <div className={styles.noContent}>Select a test to view details.</div>
      )}
    </section>
  );
}
