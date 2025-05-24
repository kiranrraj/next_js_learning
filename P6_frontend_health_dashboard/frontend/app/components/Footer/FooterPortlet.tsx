'use client';
import styles from './FooterPortlet.module.css';

export default function FooterPortlet() {
  const currentTime = '10:45 AM'; // placeholder
  const loginTime = '09:00 AM';   // placeholder

  return (
    <footer className={styles.footer}>
      <div>© 2025 All rights reserved</div>
      <div>Current Time: {currentTime}</div>
      <div>Login Time: {loginTime}</div>
    </footer>
  );
}
