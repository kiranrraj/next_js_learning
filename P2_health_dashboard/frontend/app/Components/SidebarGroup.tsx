'use client';

import { useState } from 'react';
import { Group, Test } from './Sidebar';
import SidebarTest from './SidebarTest'
import styles from './SidebarGroup.module.css';

interface SidebarGroupProps {
  group: Group;
  onTestClick: (test: Test) => void;
  onGroupClick: (group: Group) => void;
}

export default function SidebarGroup({ group, onTestClick, onGroupClick }: SidebarGroupProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((v) => !v);

  return (
    <div className={styles.group}>
      <div
        className={styles.groupTitle}
        onClick={() => {
          toggleExpand();
          onGroupClick(group);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand();
            onGroupClick(group);
          }
        }}
      >
        <span className={styles.expandIcon}>{expanded ? '▼' : '▶'}</span> {group.name}
      </div>

      {expanded && (
        <div className={styles.groupContent}>
          {group.tests?.map((test) => (
            <SidebarTest key={test.id} test={test} onClick={onTestClick} />
          ))}

          {group.childrenGroups?.map((childGroup) => (
            <SidebarGroup
              key={childGroup.id}
              group={childGroup}
              onTestClick={onTestClick}
              onGroupClick={onGroupClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
