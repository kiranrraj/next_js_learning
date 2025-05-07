import React from 'react';
import Header from '../components/Header';
import LeftPortalList from '../components/LeftPortalList';
import Footer from '../components/Footer';
import styles from './page.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <LeftPortalList />
        <div className={styles.mainContent}>
          <h1 className={styles.headText}>Welcome to the Home Page</h1>
          <p className={styles.para}>This is your portal dashboard.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
