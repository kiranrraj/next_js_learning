import React from 'react';
import styles from './LeftPortalList.module.css'; // Optional, if you have styling

const LeftPortalList: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li><a href="/portal/section1">Portal Section 1</a></li>
        <li><a href="/portal/section2">Portal Section 2</a></li>
        <li><a href="/portal/section3">Portal Section 3</a></li>
      </ul>
    </aside>
  );
};

export default LeftPortalList;
