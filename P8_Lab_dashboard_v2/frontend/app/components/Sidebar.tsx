'use client';

import { useState } from 'react';
import styles from '../styles/Sidebar.module.css'
import medicalGroupData from '@/data/medicalGroupData';

export type Test = {
  id: string;
  name: string;
};

export type Group = {
  id: string;
  name: string;
  tests?: Test[];
  childrenGroups?: Group[];
};

type SidebarProps = {
  onOpenTest: (id: string, name: string) => void;
  onOpenGroup: (id: string, name: string) => void;
};

export default function Sidebar({ onOpenTest, onOpenGroup }: SidebarProps) {
  return (
    <div className={styles.sidebarContainer}>
      {medicalGroupData.map((group) => (
        <GroupNode
          key={group.id}
          group={group}
          onOpenTest={onOpenTest}
          onOpenGroup={onOpenGroup}
          level={0} // root level indentation 0
        />
      ))}
    </div>
  );
}

// Recursive group node with indentation based on level
function GroupNode({
  group,
  onOpenTest,
  onOpenGroup,
  level,
}: {
  group: Group;
  onOpenTest: (id: string, name: string) => void;
  onOpenGroup: (id: string, name: string) => void;
  level: number;
}) {
  const [expanded, setExpanded] = useState(false);

  // Arrow icon rotated on expanded
  const arrowStyle = {
    transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
    display: 'inline-block',
    marginRight: '6px',
  };

  // Indentation based on level (say 20px per level)
  const indentStyle = {
    paddingLeft: `${level * 20}px`,
  };

  return (
    <div>
      <div
        className={styles.groupName}
        style={indentStyle}
        onClick={() => setExpanded(!expanded)}
      >
        <span style={arrowStyle}>▶</span>
        {group.name}

        {/* Open button for group */}
        <button
          className={styles.openBtn}
          onClick={(e) => {
            e.stopPropagation(); // prevent toggle expand on button click
            onOpenGroup(group.id, group.name);
          }}
        >
          Open
        </button>
      </div>

      {expanded && (
        <div className={styles.childList}>
          {group.tests?.map((test) => (
            <div
              key={test.id}
              className={styles.testItem}
              style={{ paddingLeft: `${(level + 1) * 20}px` }}
            >
              <span>{test.name}</span>
              <button
                className={styles.openBtn}
                onClick={() => onOpenTest(test.id, test.name)}
              >
                Open
              </button>
            </div>
          ))}

          {group.childrenGroups?.map((childGroup) => (
            <GroupNode
              key={childGroup.id}
              group={childGroup}
              onOpenTest={onOpenTest}
              onOpenGroup={onOpenGroup}
              level={level + 1} // increment level for indentation
            />
          ))}
        </div>
      )}
    </div>
  );
}
