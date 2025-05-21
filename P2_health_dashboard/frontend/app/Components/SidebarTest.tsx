'use client';

import { Test } from './Sidebar';
import styles from './SidebatTest.module.css'

interface SidebarTestProps {
  test: Test;
  onClick: (test: Test) => void;
}

export default function SidebarTest({ test, onClick }: SidebarTestProps) {
  return (
    <div className={styles.testItem}>
      <span className={styles.testName}>{test.name}</span>
      <button
        className={styles.openBtn}
        onClick={() => onClick(test)}
        aria-label={`Open ${test.name}`}
        type="button"
      >
        Open
      </button>
    </div>
  );
}
