import React from 'react';
import styles from './LoadingAnimation.module.css';

const LoadingAnimation: React.FC = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingAnimation;
