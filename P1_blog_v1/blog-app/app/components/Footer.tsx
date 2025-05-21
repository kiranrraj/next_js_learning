'use client'; // We need this to use useState/useEffect on the client

import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';

function Footer() {
  const [currentTime, setCurrentTime] = useState<string>(() =>
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000); // update every second

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      <p className={styles.message}> Built with Next.js — Thanks for visiting!</p>
      <p className={styles.time}>{currentTime}</p>
    </footer>
  );
}

export default Footer;
