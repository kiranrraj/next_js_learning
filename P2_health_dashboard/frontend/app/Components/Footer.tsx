'use client';

import { useEffect, useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateTime(); // Set initial time immediately
    const timer = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
    <footer className={styles.footer}>
      <p>© 2025 My Health Dashboard. Current time: {currentTime}</p>
    </footer>
  );
};

export default Footer;
