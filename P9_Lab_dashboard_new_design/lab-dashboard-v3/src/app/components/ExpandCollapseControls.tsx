import styles from './ExpandCollapseControls.module.css';
import { LabTestData } from '../../types/labTestTypes';

type Props = {
  labData: LabTestData;
  setOpenGroups: (groups: Record<string, boolean>) => void;
  setOpenSubGroups: (subGroups: Record<string, boolean>) => void;
  openGroups: Record<string, boolean>;
  openSubGroups: Record<string, boolean>;
};

function ExpandCollapseControls({
  labData,
  setOpenGroups,
  setOpenSubGroups,
  openGroups,
  openSubGroups,
}: Props) {
  const allGroups = Object.keys(labData);
  const allSubGroups = Object.entries(labData).flatMap(([group, subs]) =>
    Object.keys(subs).map(sub => `${group}/${sub}`)
  );

  const allGroupsExpanded = allGroups.every(group => openGroups[group]);
  const allSubGroupsExpanded = allSubGroups.every(key => openSubGroups[key]);
  const allExpanded = allGroupsExpanded && allSubGroupsExpanded;

  const allGroupsCollapsed = allGroups.every(group => !openGroups[group]);
  const allSubGroupsCollapsed = allSubGroups.every(key => !openSubGroups[key]);
  const allCollapsed = allGroupsCollapsed && allSubGroupsCollapsed;

  const expandAll = () => {
    const groupState: Record<string, boolean> = {};
    const subGroupState: Record<string, boolean> = {};

    for (const [groupName, subGroups] of Object.entries(labData)) {
      groupState[groupName] = true;
      for (const subGroupName of Object.keys(subGroups)) {
        const key = `${groupName}/${subGroupName}`;
        subGroupState[key] = true;
      }
    }

    setOpenGroups(groupState);
    setOpenSubGroups(subGroupState);
  };

  const collapseAll = () => {
    setOpenGroups({});
    setOpenSubGroups({});
  };

  return (
    <div className={styles.sidebarControls}>
      <button onClick={expandAll} disabled={allExpanded} className={`${styles.expandBtn} ${styles.btn}`}>Expand All</button>
      <button onClick={collapseAll} disabled={allCollapsed} className={`${styles.collapseBtn} ${styles.btn}`}>Collapse All</button>
    </div>
  );
}

export default ExpandCollapseControls;
