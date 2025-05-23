'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/ScrollToTopButton.module.css';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mainContent = document.querySelector('div.main');
    if (!mainContent) return; 

    function handleScroll() {
      if (mainContent.scrollTop > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    mainContent.addEventListener('scroll', handleScroll);

    return () => {
      mainContent.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const mainContent = document.querySelector('div.main');
    if (!mainContent) return;  // Safety check

    mainContent.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      className={styles.scrollToTopBtn}
      aria-label="Scroll to top"
      onClick={scrollToTop}
      type="button"
    >
      ↑ Top
    </button>
  );
}
