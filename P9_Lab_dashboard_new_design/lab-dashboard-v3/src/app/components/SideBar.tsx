import styles from './SideBar.module.css';
import {
  LabTestEntry,
  LabTestGroup,
  LabTestSubGroup
} from '../../types/labtestTypes';

type SideBarProps = {
  groupNames: string[];
  onGroupSelect: (groupName: string) => void;
  onSubGroupSelect: (subGroupName: string) => void;
  onTestSelect: (test: LabTestEntry) => void;
  selectedGroupName: string | null;
  selectedSubGroupName: string | null;
  selectedTest: LabTestEntry | null;
  currentGroup: LabTestGroup | undefined;
  currentSubGroup: LabTestSubGroup | undefined;
};

function SideBar({
  groupNames,
  onGroupSelect,
  onSubGroupSelect,
  onTestSelect,
  selectedGroupName,
  selectedSubGroupName,
  selectedTest,
  currentGroup,
  currentSubGroup
}: SideBarProps) {
  return (
    <div className={styles.sidebar}>
      <h2>Test Groups</h2>
      <ul>
        {groupNames.map(group => (
          <li
            key={group}
            className={group === selectedGroupName ? styles.active : ''}
            onClick={() => onGroupSelect(group)}
          >
            {group}
          </li>
        ))}
      </ul>

      {currentGroup && (
        <>
          <h3>Subgroups</h3>
          <ul>
            {Object.keys(currentGroup).map(subGroup => (
              <li
                key={subGroup}
                className={subGroup === selectedSubGroupName ? styles.active : ''}
                onClick={() => onSubGroupSelect(subGroup)}
              >
                {subGroup}
              </li>
            ))}
          </ul>
        </>
      )}

      {currentSubGroup && (
        <>
          <h4>Tests</h4>
          <ul>
            {Object.entries(currentSubGroup).map(([testKey, testEntry]) => (
              <li
                key={testKey}
                className={testEntry === selectedTest ? styles.active : ''}
                onClick={() => onTestSelect(testEntry)}
              >
                {typeof testEntry === 'object' && '$ref' in testEntry
                  ? `Ref: ${testEntry.$ref}`
                  : testEntry.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default SideBar;
