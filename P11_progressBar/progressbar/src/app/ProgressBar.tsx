import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ progress }) => {
  const progressLimit = Math.min(Math.max(0, progress), 100);
  return (
    <div className={styles.progressBarWrapper}>
      <div className={styles.progressBarOutline}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressLimit}%` }}
        ></div>
      </div>
      <div className={styles.progressBarText}>{progressLimit}%</div>
    </div>
  );
};

export default ProgressBar;
