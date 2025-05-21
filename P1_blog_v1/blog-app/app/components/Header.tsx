'use client';

import React from 'react';
import styles from './Header.module.css';

// Define the type for the props that the Header component will receive
type HeaderProps = {
  onAddClick: () => void;             // Called when "Add" is clicked
  onSearch: (query: string) => void;  // Called when the user types in the search input
};

// Define the Header component
function Header({ onAddClick, onSearch }: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* Logo (emoji or image) */}
      <div className={styles.logo}></div>

      {/* Title */}
      <h1 className={styles.title}>My Blog</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search..."
        className={styles.search}
        onChange={(e) => onSearch(e.target.value)} // Pass search text to parent
      />

      {/* "Add" button to open modal */}
      <button className={styles.addButton} onClick={onAddClick}>Add</button>
    </header>
  );
}

export default Header;
