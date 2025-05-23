'use client';

import styles from '../styles/Footer.module.css'
import CurrentTime from '../utils/currentTime'

export default function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.info}>© 2025 Medical Dashboard App</div>
      <p>Updated at: <CurrentTime /></p>
    </footer>
  );
}
