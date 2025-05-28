import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Image src="logo.png" alt="Logo" width={50} height={50} />
        <h1 className={styles.appName}>App Name</h1>
      </div>
      <div className={styles.right}>
        <Image src="profile-pic.jpg" alt="Profile" width={40} height={40} className={styles.profilePic} />
        <span className={styles.username}>John Doe</span>
        <Link href="/settings">
          <a className={styles.settings}>Settings</a>
        </Link>
        <button className={styles.logout}>Logout</button>
        <button className={styles.toggleDarkMode}>🌙</button>
      </div>
    </header>
  );
};

export default Header;
