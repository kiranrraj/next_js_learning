'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <main className={styles.landing}>
      <h1 className={styles.title}>Welcome to the Medical Lab Dashboard</h1>
      <nav className={styles.nav}>
        <Link href="/dashboard" className={styles.navLink}>
          Laboratory Tests
        </Link>
        <Link href="/contact" className={styles.navLink}>
          Contact
        </Link>
        <Link href="/about" className={styles.navLink}>
          About Us
        </Link>
      </nav>
    </main>
  );
}
