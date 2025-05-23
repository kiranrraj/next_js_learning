'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Global error captured:', error);
  }, [error]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.message}>{error.message || 'Unexpected error occurred.'}</p>
      <button onClick={reset} className={styles.retryBtn}>
        Try Again
      </button>
    </main>
  );
}
