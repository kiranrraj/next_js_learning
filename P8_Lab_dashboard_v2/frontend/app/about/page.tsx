'use client';

import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.text}>This is a medical lab dashboard project built using Next.js.</p>
    </main>
  );
}
