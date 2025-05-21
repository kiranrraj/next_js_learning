'use client';

import styles from './page.module.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}
