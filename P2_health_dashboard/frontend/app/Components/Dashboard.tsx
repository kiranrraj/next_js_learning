// 'use client';

// import { useState } from 'react';
// import Sidebar, { Test, Group } from './Sidebar';
// import styles from './Dashboard.module.css';

// type Tab = 
//   | { type: 'group'; group: Group }
//   | { type: 'test'; test: Test };

// export default function Dashboard() {
//   const [tabs, setTabs] = useState<Tab[]>([]);
//   const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);

//   // When group clicked: open group tab (if not exists) and activate it
//   const handleGroupClick = (group: Group) => {
//     const existingIndex = tabs.findIndex(
//       (tab) => tab.type === 'group' && tab.group.id === group.id
//     );
//     if (existingIndex !== -1) {
//       setActiveTabIndex(existingIndex);
//     } else {
//       setTabs((prev) => [...prev, { type: 'group', group }]);
//       setActiveTabIndex(tabs.length); // new tab is last
//     }
//   };

//   // When a test is clicked on sidebar (outside group), open single test tab
//   const handleTestClick = (test: Test) => {
//     const existingIndex = tabs.findIndex(
//       (tab) => tab.type === 'test' && tab.test.id === test.id
//     );
//     if (existingIndex !== -1) {
//       setActiveTabIndex(existingIndex);
//     } else {
//       setTabs((prev) => [...prev, { type: 'test', test }]);
//       setActiveTabIndex(tabs.length);
//     }
//   };

//   // Open individual test tab from inside group tab
//   const openTestFromGroup = (test: Test) => {
//     const existingIndex = tabs.findIndex(
//       (tab) => tab.type === 'test' && tab.test.id === test.id
//     );
//     if (existingIndex !== -1) {
//       setActiveTabIndex(existingIndex);
//     } else {
//       setTabs((prev) => [...prev, { type: 'test', test }]);
//       setActiveTabIndex(tabs.length);
//     }
//   };

//   // Close a tab and update activeTabIndex
//   const closeTab = (index: number) => {
//     setTabs((prev) => {
//       const newTabs = prev.filter((_, i) => i !== index);
//       // Fix active tab
//       if (activeTabIndex === index) {
//         if (newTabs.length === 0) {
//           setActiveTabIndex(null);
//         } else if (index === 0) {
//           setActiveTabIndex(0);
//         } else {
//           setActiveTabIndex(index - 1);
//         }
//       } else if (activeTabIndex && activeTabIndex > index) {
//         setActiveTabIndex((i) => (i ? i - 1 : null));
//       }
//       return newTabs;
//     });
//   };

//   return (
//     <div className={styles.dashboard}>
//       <Sidebar onTestClick={handleTestClick} onGroupClick={handleGroupClick} />
//       <main className={styles.content}>
//         {tabs.length === 0 && (
//           <p>Select a group or test from the sidebar to start.</p>
//         )}

//         {/* Tabs bar */}
//         <ul className={styles.tabList}>
//           {tabs.map((tab, idx) => (
//             <li
//               key={tab.type === 'group' ? tab.group.id : tab.test.id}
//               className={`${styles.tab} ${activeTabIndex === idx ? styles.activeTab : ''}`}
//               onClick={() => setActiveTabIndex(idx)}
//             >
//               {tab.type === 'group' ? tab.group.name : tab.test.name}
//               <button
//                 className={styles.closeBtn}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   closeTab(idx);
//                 }}
//                 aria-label={`Close tab ${
//                   tab.type === 'group' ? tab.group.name : tab.test.name
//                 }`}
//               >
//                 ×
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Tab content */}
//         <section className={styles.testContent}>
//           {activeTabIndex !== null && tabs[activeTabIndex] ? (
//             tabs[activeTabIndex].type === 'group' ? (
//               <>
//                 <h2>Group: {tabs[activeTabIndex].group.name}</h2>
//                 <ul className={styles.testList}>
//                   {(() => {
//                     // Flatten all tests inside group recursively
//                     const gatherTests = (g: Group): Test[] => {
//                       let all: Test[] = g.tests ?? [];
//                       if (g.childrenGroups) {
//                         for (const cg of g.childrenGroups) {
//                           all = all.concat(gatherTests(cg));
//                         }
//                       }
//                       return all;
//                     };
//                     const tests = gatherTests(tabs[activeTabIndex].group);
//                     return tests.map((test) => (
//                       <li key={test.id} className={styles.testListItem}>
//                         {test.name}{' '}
//                         <button
//                           onClick={() => openTestFromGroup(test)}
//                           className={styles.openBtn}
//                         >
//                           Open
//                         </button>
//                       </li>
//                     ));
//                   })()}
//                 </ul>
//               </>
//             ) : (
//               <>
//                 <h2>Test: {tabs[activeTabIndex].test.name}</h2>
//                 <p>
//                   Details for <em>{tabs[activeTabIndex].test.name}</em> (ID:{' '}
//                   {tabs[activeTabIndex].test.id})
//                 </p>
//               </>
//             )
//           ) : (
//             <p>No tab selected.</p>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

'use client';

import { JSX, useState } from 'react';
import Sidebar, { Test, Group } from './Sidebar';
import styles from './Dashboard.module.css';

type Tab = {
  id: string;
  title: string;
  content: JSX.Element;
};

export default function Dashboard() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const handleTestClick = (test: Test) => {
    const existingTab = tabs.find((tab) => tab.id === test.id);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    const newTab: Tab = {
      id: test.id,
      title: test.name,
      content: (
        <div>
          <strong>{test.name}</strong>
          <p>Details for <em>{test.name}</em> (ID: {test.id})</p>
        </div>
      ),
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleGroupClick = (group: Group) => {
    const getAllTests = (g: Group): Test[] => {
      let all: Test[] = g.tests ?? [];
      if (g.childrenGroups) {
        for (const child of g.childrenGroups) {
          all = all.concat(getAllTests(child));
        }
      }
      return all;
    };

    const allTests = getAllTests(group);
    const tabId = `group-${group.id}`;
    const existingTab = tabs.find((tab) => tab.id === tabId);
    if (existingTab) {
      setActiveTabId(tabId);
      return;
    }

    const newTab: Tab = {
      id: tabId,
      title: group.name,
      content: (
        <div>
          <h3>{group.name}</h3>
          <ul>
            {allTests.map((test) => (
              <li key={test.id}>
                <strong>{test.name}</strong> (ID: {test.id})
              </li>
            ))}
          </ul>
        </div>
      ),
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(tabId);
  };

  const closeTab = (id: string) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
    if (activeTabId === id) {
      const remainingTabs = tabs.filter((tab) => tab.id !== id);
      setActiveTabId(remainingTabs.length ? remainingTabs[0].id : null);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <Sidebar onTestClick={handleTestClick} onGroupClick={handleGroupClick} />
      </div>
      <main className={styles.content}>
        <div className={styles.tabBar}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${styles.tab} ${tab.id === activeTabId ? styles.activeTab : ''}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.title}
              <button className={styles.closeBtn} onClick={() => closeTab(tab.id)}>×</button>
            </div>
          ))}
        </div>

        <div className={styles.tabContent}>
          {tabs.find((tab) => tab.id === activeTabId)?.content || (
            <p>Select a test or group to view details.</p>
          )}
        </div>
      </main>
    </div>
  );
}
