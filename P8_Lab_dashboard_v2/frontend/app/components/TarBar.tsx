'use client';

import React, { JSX } from 'react';
import styles from '../styles/TarBar.module.css'

export type Tab = {
  id: string;
  title: string;
  content: JSX.Element;
};

type TabBarProps = {
  tabs: Tab[];
  activeTabId: string | null;
  onSetActiveTab: (id: string) => void;
  onCloseTab: (id: string) => void;
};

export default function TabBar({ tabs, activeTabId, onSetActiveTab, onCloseTab }: TabBarProps) {
  return (
    <nav className={styles.tabBar} role="tablist" aria-label="Open test tabs">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <div
            key={tab.id}
            role="tab"
            tabIndex={isActive ? 0 : -1} // Make only active tab focusable by keyboard
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onSetActiveTab(tab.id)}
            onKeyDown={(e) => {
              // Allow keyboard selection: Enter or Space
              if (e.key === 'Enter' || e.key === ' ') {
                onSetActiveTab(tab.id);
              }
            }}
          >
            <span className={styles.title}>{tab.title}</span>
            <button
              className={styles.closeBtn}
              aria-label={`Close tab ${tab.title}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering tab change on close button click
                onCloseTab(tab.id);
              }}
            >
              ×
            </button>
          </div>
        );
      })}
    </nav>
  );
}
