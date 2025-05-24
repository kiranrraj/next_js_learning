'use client';

import styles from './HeaderPortlet.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function HeaderPortlet({
  profileName = 'Admin',
}: {
  profileName: string;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.logo}>🩺 HealthDash</span>
        <Link href="/" className={styles.homeLink}>Home</Link>
      </div>
      <div className={styles.right}>
        <Image
          src="/default-profile.png"
          alt="Profile Picture"
          width={32}
          height={32}
          className={styles.profileImage}
        />
        <span className={styles.profileName}>{profileName}</span>
        <button className={styles.iconButton}>⚙️ Setting</button>
        <button className={styles.iconButton}>🔓 Logout</button>
        <button className={styles.iconButton}>🌙</button>
      </div>
    </header>
  );
}
