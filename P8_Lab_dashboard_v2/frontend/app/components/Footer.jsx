'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/Footer.module.css'

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.info}>© 2025 Medical Dashboard App</div>
      <div className={styles.time}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </footer>
  );
}
