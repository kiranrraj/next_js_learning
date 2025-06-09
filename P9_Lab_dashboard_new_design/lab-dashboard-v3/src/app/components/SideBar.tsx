import styles from './SideBar.module.css';
import { useState } from 'react';
import { LabTestData, LabTestEntry } from '../../types/labTestTypes';

type SideBarProps = {
  labData: LabTestData;
  onTestOpen: (testKey: string, test: LabTestEntry) => void;
  onGroupOpen?: (groupName: string, tests: LabTestEntry[]) => void;
};

function SideBar({ labData, onTestOpen, onGroupOpen }: SideBarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [openSubGroups, setOpenSubGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const toggleSubGroup = (groupName: string, subGroupName: string) => {
    const key = `${groupName}/${subGroupName}`;
    setOpenSubGroups(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const collectLeafTests = (obj: unknown): LabTestEntry[] => {
    const tests: LabTestEntry[] = [];

    for (const subGroup of Object.values(obj as Record<string, any>)) {
      for (const testEntry of Object.values(subGroup as Record<string, any>)) {
        if ('name' in testEntry) {
          tests.push(testEntry);
        }
      }
    }

    return tests;
  };

  const collectSubGroupTests = (subGroup: unknown): LabTestEntry[] => {
    const tests: LabTestEntry[] = [];

    for (const testEntry of Object.values(subGroup as Record<string, any>)) {
      if ('name' in testEntry) {
        tests.push(testEntry);
      }
    }

    return tests;
  };

  return (
    <div className={styles.sidebar}>
      {Object.entries(labData).map(([groupName, subGroups]) => {
        const isGroupOpen = openGroups[groupName] || false;

        return (
          <div key={groupName} className={styles.groupSection}>
            <div className={styles.groupHeader}>
              <h3
                className={styles.groupTitle}
                onClick={() => toggleGroup(groupName)}
              >
                {isGroupOpen ? '▼' : '▶'} {groupName}
              </h3>
              <button
                className={styles.openButton}
                onClick={() => {
                  const tests = collectLeafTests(subGroups);
                  if (onGroupOpen) onGroupOpen(groupName, tests);
                }}
              >
                Open
              </button>
            </div>

            {isGroupOpen && (
              <div className={styles.subGroups}>
                {Object.entries(subGroups as Record<string, any>).map(([subGroupName, tests]) => {
                  const subKey = `${groupName}/${subGroupName}`;
                  const isSubGroupOpen = openSubGroups[subKey] || false;

                  return (
                    <div key={subGroupName} className={styles.subGroupSection}>
                      <div className={styles.subGroupHeader}>
                        <h4
                          className={styles.subGroupTitle}
                          onClick={() => toggleSubGroup(groupName, subGroupName)}
                        >
                          {isSubGroupOpen ? '▼' : '▶'} {subGroupName}
                        </h4>
                        <button
                          className={styles.openButton}
                          onClick={() => {
                            const subTests = collectSubGroupTests(tests);
                            if (onGroupOpen) onGroupOpen(subKey, subTests);
                          }}
                        >
                          Open
                        </button>
                      </div>

                      {isSubGroupOpen && (
                        <ul className={styles.testList}>
                          {Object.entries(tests as Record<string, any>).map(([testKey, testEntry]) => (
                            <li key={testKey} className={styles.testItem}>
                              <span className={styles.testName}>
                                {'name' in testEntry
                                  ? testEntry.name
                                  : `Ref: ${testEntry.$ref}`}
                              </span>
                              {'name' in testEntry && (
                                <button
                                  className={styles.openButton}
                                  onClick={() => onTestOpen(testKey, testEntry)}
                                >
                                  Open
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SideBar;
