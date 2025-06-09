'use client';

import { useState } from 'react';
import styles from './MainContainer.module.css';
import SideBar from './SideBar';
import ContentArea from './ContentArea';
import rawData from '../../data/lab_test_groups.json';
import { LabTestData, LabTestEntry } from '../../types/labTestTypes';

type Tab = {
  key: string;
  label: string;
  content: LabTestEntry[];
};

function MainContainer() {
  const labData: LabTestData = rawData as LabTestData;

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<string | null>(null);

  const openTab = (key: string, label: string, content: LabTestEntry[]) => {
    const exists = tabs.find(tab => tab.key === key);
    if (!exists) {
      setTabs(prev => [...prev, { key, label, content }]);
    }
    setActiveTabKey(key);
  };

  const handleTestOpen = (testKey: string, test: LabTestEntry) => {
    if (!('name' in test)) return;
    openTab(testKey, test.name, [test]);
  };

  const handleGroupOpen = (groupName: string, tests: LabTestEntry[]) => {
    openTab(`group-${groupName}`, groupName, tests);
  };

  const handleTabClose = (closingKey: string) => {
    setTabs(prev => {
      const idx = prev.findIndex(tab => tab.key === closingKey);
      const newTabs = prev.filter(tab => tab.key !== closingKey);

      if (closingKey === activeTabKey) {
        const newActive = newTabs[idx] || newTabs[idx - 1] || null;
        setActiveTabKey(newActive?.key || null);
      }

      return newTabs;
    });
  };

  const activeTab = tabs.find(tab => tab.key === activeTabKey);

  return (
    <div className={styles.mainContainer}>
      <SideBar
        labData={labData}
        onTestOpen={handleTestOpen}
        onGroupOpen={handleGroupOpen}
      />

      <div className={styles.contentSection}>
        <div className={styles.tabBar}>
          {tabs.map(tab => (
            <div
              key={tab.key}
              className={`${styles.tab} ${tab.key === activeTabKey ? styles.activeTab : ''}`}
              onClick={() => setActiveTabKey(tab.key)}
            >
              {tab.label}
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTabClose(tab.key);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <ContentArea tests={activeTab?.content || []} />
      </div>
    </div>
  );
}

export default MainContainer;
