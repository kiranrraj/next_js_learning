"use client";

import Image from "next/image";
import styles from "./page.module.css";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.page}>
      <ProgressBar progress={progress} />
    </div>
  );
}
