import React from "react";
import styles from "./Spinner.module.css";

function Spinner({ size = 40 }) {
  return (
    <div
      className={styles.spinner}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );
}

export default Spinner;
