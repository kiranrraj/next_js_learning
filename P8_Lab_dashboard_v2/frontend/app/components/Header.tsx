'use client';

import Link from 'next/link';
import styles from '../styles/Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Logo section */}
      <div className={styles.logo}>
        <Link href="/">🧪 Lab Dashboard</Link>
      </div>

      {/* Navigation links */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
        <Link href="/about" className={styles.navLink}>About</Link>
        <Link href="/contact" className={styles.navLink}>Contact</Link>
      </nav>
    </header>
  );
}
