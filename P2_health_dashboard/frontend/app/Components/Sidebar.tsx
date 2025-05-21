'use client';

import data from './data.json';
import SidebarGroup from './SidebarGroup'
import styles from './Sidebar.module.css';

export interface Test {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
  tests?: Test[];
  childrenGroups?: Group[];
}

interface SidebarProps {
  onTestClick: (test: Test) => void;
  onGroupClick: (group: Group) => void;
}

export default function Sidebar({ onTestClick, onGroupClick }: SidebarProps) {
  return (
    <nav className={styles.sidebar}>
      {data.map((group) => (
        <SidebarGroup
          key={group.id}
          group={group}
          onTestClick={onTestClick}
          onGroupClick={onGroupClick}
        />
      ))}
    </nav>
  );
}
