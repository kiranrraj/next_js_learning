import React from 'react';
import Link from 'next/link'; 
import styles from './Header.module.css'; 

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Portal Name</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/logout">Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
